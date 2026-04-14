import "../test.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png';
import hatter from '../assets/Core_build_background.gif';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

// --- API importok ---
// Ezeket a függvényeket a tervezoApi.js fájlban definiáltuk korábban
import {
  fetchProcessors,
  fetchCoolings,
  fetchBoards,
  fetchGraphicsCards,
  fetchRAM,
  fetchStorages,
  fetchPowerSupplies,
  fetchCases,
  fetchFans
} from '../../tervezoApi';
import { whoami } from '../../api';   // a bejelentkezett felhasználó adatait kéri le
import { createOrder } from '../../orderApi'; // a rendelés létrehozásához

// --- Segédfüggvény: kiveszi a megfelelő tömböt a backend válaszából ---
// Minden végpont egy objektumot ad vissza, pl: { processors: [ {...}, {...} ] }
function extractItems(response, key) {
  return response?.[key] || [];   // ha nincs ilyen kulcs, üres tömböt adunk
}

export default function ComputerBuilder() {
  // --- 1. State-ek a kiválasztott alkatrészekhez és a dropdown nyitottságához ---
  const [selections, setSelections] = useState({});  // pl: { processzor: { id, name, price } }
  const [openDropdown, setOpenDropdown] = useState(null); // éppen melyik dropdown van nyitva

  const navigate = useNavigate();
  const [user, setUser] = useState(null);             // bejelentkezett felhasználó

  // --- 2. State-ek a backendről letöltött alkatrészlistákhoz (mindegyik egy tömb) ---
  const [processors, setProcessors] = useState([]);
  const [coolings, setCoolings] = useState([]);
  const [boards, setBoards] = useState([]);
  const [graphicsCards, setGraphicsCards] = useState([]);
  const [rams, setRams] = useState([]);
  const [storages, setStorages] = useState([]);        // összes meghajtó (SSD+HDD)
  const [powerSupplies, setPowerSupplies] = useState([]);
  const [cases, setCases] = useState([]);
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(true);        // amíg töltődnek az adatok

  // --- 3. Felhasználó lekérése az oldal betöltésekor ---
  useEffect(() => {
    async function getUser() {
      try {
        const userData = await whoami();
        // A whoami válasza eltérhet; itt feltételezzük, hogy { user: {...} } vagy közvetlenül a user objektum
        setUser(userData.user || userData);
      } catch (err) {
        console.error("Nem sikerült lekérni a felhasználót:", err);
      }
    }
    getUser();
  }, []);

  // --- 4. Alkatrészek letöltése a backendről (párhuzamosan, hogy gyorsabb legyen) ---
  useEffect(() => {
    async function loadData() {
      try {
        // Promise.all egyszerre indítja el az összes API kérést
        const [
          procData,
          coolData,
          boardData,
          gpuData,
          ramData,
          storageData,
          psuData,
          caseData,
          fanData
        ] = await Promise.all([
          fetchProcessors(),
          fetchCoolings(),
          fetchBoards(),
          fetchGraphicsCards(),
          fetchRAM(),
          fetchStorages(),
          fetchPowerSupplies(),
          fetchCases(),
          fetchFans()
        ]);

        // A segédfüggvénnyel kivesszük a válaszból a tömböket és elmentjük a state-ekbe
        setProcessors(extractItems(procData, 'processors'));
        setCoolings(extractItems(coolData, 'coolings'));
        setBoards(extractItems(boardData, 'boards'));
        setGraphicsCards(extractItems(gpuData, 'graphicsCards'));
        setRams(extractItems(ramData, 'rams'));
        setStorages(extractItems(storageData, 'storages'));
        setPowerSupplies(extractItems(psuData, 'powerSupplies'));
        setCases(extractItems(caseData, 'cases'));
        setFans(extractItems(fanData, 'fans'));
      } catch (error) {
        console.error("Hiba az alkatrészek betöltésekor:", error);
      } finally {
        setLoading(false);   // betöltés vége
      }
    }
    loadData();
  }, []);   // üres függőség -> csak egyszer fut le

  // --- 5. Komponensek definiálása (melyik kategóriában milyen termékek jelenjenek meg) ---
  // A 'items' mező tartalmazza a termékobjektumok tömbjét (id, name, price)
  const components = {
    processzor: { label: "PROCESSZOR", items: processors },
    processzorHuto: { label: "PROCESSZOR HŰTŐ", items: coolings },
    alaplap: { label: "ALAPLAP", items: boards },
    videokartya: { label: "VIDEOKÁRTYA", items: graphicsCards },
    memoria: { label: "MEMÓRIA", items: rams },
    ssd1: {
      label: "SSD MEGHAJTÓ 1",
      items: storages.filter(item => item.name.toLowerCase().includes('ssd') || item.name.toLowerCase().includes('nvme'))
    },
    ssd2: {
      label: "SSD MEGHAJTÓ 2",
      // Hozzáadjuk a "Nincs / Később" opciót (id: null, price: 0)
      items: [
        { id: null, name: "Nincs / Később", price: 0 },
        ...storages.filter(item => item.name.toLowerCase().includes('ssd') || item.name.toLowerCase().includes('nvme'))
      ]
    },
    merevlemez: {
      label: "MEREVLEMEZ",
      items: [
        { id: null, name: "Nincs / Később", price: 0 },
        ...storages.filter(item => item.name.toLowerCase().includes('hdd') || item.name.toLowerCase().includes('barracuda'))
      ]
    },
    tapegyseg: { label: "TÁPEGYSÉG", items: powerSupplies },
    haz: { label: "SZÁMÍTÓGÉPHÁZ", items: cases },
    rendszerHuto: { label: "RENDSZER HŰTŐ", items: fans },
  };

  // --- 6. Dropdown kezelő függvények ---
  const toggleDropdown = (key) => {
    // Ha ugyanarra kattintunk, bezárjuk, egyébként megnyitjuk az adott dropdown-t
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const selectOption = (key, item) => {
    // Elmentjük a kiválasztott termék teljes objektumát a selections-be
    setSelections({ ...selections, [key]: item });
    setOpenDropdown(null);   // választás után bezárjuk a dropdown-t
  };

  // --- 7. Megrendelés gomb eseménykezelője ---
  const handleOrder = async () => {
    if (!user) {
      alert("A rendeléshez be kell jelentkezned!");
      navigate('/login');
      return;
    }

    // Csak azokat a termékeket vegyük figyelembe, amiknek van id-juk (nem "Nincs / Később")
    const selectedItems = Object.values(selections).filter(item => item && item.id);
    if (selectedItems.length === 0) {
      alert("Nincs kiválasztott alkatrész!");
      return;
    }

    // Fizetési mód bekérése
    const paymentMethod = prompt("Add meg a fizetési módot (kartya / utanvet / atutalas):");
    const validMethods = ['kartya', 'utanvet', 'atutalas'];
    if (!paymentMethod || !validMethods.includes(paymentMethod.toLowerCase())) {
      alert("Érvénytelen fizetési mód! Lehetséges: kartya, utanvet, atutalas");
      return;
    }

    let successCount = 0;
    let failedItems = [];

    // Végigmegyünk a kiválasztott termékeken, és mindegyikhez POST kérés
    for (const item of selectedItems) {
      try {
        await createOrder(item.id, 1, paymentMethod.toLowerCase());
        successCount++;
      } catch (err) {
        console.error(`Hiba a(z) ${item.name} rendelésekor:`, err.message);
        failedItems.push(`${item.name}: ${err.message}`);
      }
    }

    // Eredmény kiértesítése
    if (successCount > 0) {
      let message = `✅ Sikeresen megrendeltél ${successCount} terméket.`;
      if (failedItems.length > 0) {
        message += `\n❌ Sikertelen tételek:\n${failedItems.join('\n')}`;
      }
      alert(message);
      setSelections({}); // töröljük a kiválasztást
    } else {
      alert(`❌ Nem sikerült egy terméket sem megrendelni.\nHibák:\n${failedItems.join('\n')}`);
    }
  };

  // --- 8. Amíg töltődnek az adatok, egy egyszerű betöltő szöveget mutatunk ---
  if (loading) {
    return (
      <div className="loading-container">
        <p>Alkatrészek betöltése...</p>
      </div>
    );
  }

  // --- 9. Fő renderelés ---
  return (
    <>
      {/* Fejléc a navigációs sávval */}
      <div className='Fejlec'>
        <NavBar user={user} onLogout='' />
      </div>

      {/* Háttérkép */}
      <div className="logo-container">
        <img src={hatter} className="body-background" alt="Background" />
      </div>

      {/* Fő tartalom */}
      <div className="builder-container">
        <div className="builder-header">
          <img src={logo} className="logo" alt="Logo" />
          <p> | TERVEZŐ |</p>
        </div>

        {/* Alkatrész lista - minden kategóriához egy sor */}
        <div className="components-list">
          {Object.entries(components).map(([key, comp]) => (
            <div key={key} className="component-row">
              {/* Kategória neve */}
              <div className="component-label">{comp.label}</div>

              {/* Dropdown gomb és opciók */}
              <div className="component-selector">
                <button
                  className={`dropdown-btn ${selections[key] ? 'selected' : ''}`}
                  onClick={() => toggleDropdown(key)}
                >
                  <span>
                    {/* Ha van kiválasztva termék, a nevét mutatjuk, egyébként az alap szöveget */}
                    {selections[key]?.name || "Válassz alkatrészt..."}
                  </span>
                  {/* Kis nyíl ikon */}
                  <svg
                    className={`dropdown-arrow ${openDropdown === key ? 'rotate' : ''}`}
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
                  </svg>
                </button>

                {/* Ha ez a dropdown van nyitva, megjelenítjük az opciókat */}
                {openDropdown === key && (
                  <div className="dropdown-options">
                    {comp.items.map((item, idx) => (
                      <div
                        key={item.id || idx}   // a "Nincs / Később" esetén nincs id, ezért idx
                        className={`dropdown-option ${selections[key]?.id === item.id ? 'active' : ''}`}
                        onClick={() => selectOption(key, item)}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Összegzés panel */}
        <div className="builder-summary">
          <div className="summary-header">
            <h3>📦 ÖSSZEÁLLÍTÁS</h3>
            <button className="reset-btn" onClick={() => setSelections({})}>
              Összes törlése
            </button>
          </div>
          <div className="summary-content">
            {Object.values(selections).filter(Boolean).length === 0 ? (
              <p className="empty-summary">Még nincs kiválasztva alkatrész</p>
            ) : (
              <>
                {/* Kiválasztott alkatrészek listája */}
                <ul>
                  {Object.entries(selections).map(([key, value]) => {
                    const label = components[key]?.label || key;
                    return value ? (
                      <li key={key}>
                        <strong>{label}:</strong> {value.name}
                      </li>
                    ) : null;
                  })}
                </ul>
                {/* Megrendelés gomb */}
                <button className="megrendeles-btn" onClick={handleOrder}>
                  Megrendelés
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}