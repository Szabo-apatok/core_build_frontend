// Test.jsx
import "../test.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png';
import hatter from '../assets/Core_build_background.gif';
import NavBar from '../components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';

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

// Segédfüggvény: a válasz objektumból kiveszi a megadott kulcsú tömböt, majd a name mezőket
function extractNames(response, key) {
  const array = response?.[key] || [];
  return array.map(item => item.name);
}

export default function ComputerBuilder() {
  const [selections, setSelections] = useState({});
  const [openDropdown, setOpenDropdown] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [processors, setProcessors] = useState([]);
  const [coolings, setCoolings] = useState([]);
  const [boards, setBoards] = useState([]);
  const [graphicsCards, setGraphicsCards] = useState([]);
  const [rams, setRams] = useState([]);
  const [storages, setStorages] = useState([]);
  const [powerSupplies, setPowerSupplies] = useState([]);
  const [cases, setCases] = useState([]);
  const [fans, setFans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
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

        setProcessors(extractNames(procData, 'processors'));
        setCoolings(extractNames(coolData, 'coolings'));
        setBoards(extractNames(boardData, 'boards'));
        setGraphicsCards(extractNames(gpuData, 'graphicsCards'));
        setRams(extractNames(ramData, 'rams'));
        setStorages(extractNames(storageData, 'storages'));
        setPowerSupplies(extractNames(psuData, 'powerSupplies'));
        setCases(extractNames(caseData, 'cases'));
        setFans(extractNames(fanData, 'fans'));
      } catch (error) {
        console.error("Hiba az alkatrészek betöltésekor:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const components = {
    processzor: {
      label: "PROCESSZOR",
      options: processors
    },
    processzorHuto: {
      label: "PROCESSZOR HŰTŐ",
      options: coolings
    },
    alaplap: {
      label: "ALAPLAP",
      options: boards
    },
    videokartya: {
      label: "VIDEOKÁRTYA",
      options: graphicsCards
    },
    memoria: {
      label: "MEMÓRIA",
      options: rams
    },
    ssd1: {
      label: "SSD MEGHAJTÓ 1",
      options: storages.filter(s =>
        s.toLowerCase().includes('ssd') || s.toLowerCase().includes('nvme')
      )
    },
    ssd2: {
      label: "SSD MEGHAJTÓ 2",
      options: ["Nincs / Később", ...storages.filter(s =>
        s.toLowerCase().includes('ssd') || s.toLowerCase().includes('nvme')
      )]
    },
    merevlemez: {
      label: "MEREVLEMEZ",
      options: ["Nincs / Később", ...storages.filter(s =>
        s.toLowerCase().includes('hdd') || s.toLowerCase().includes('barracuda')
      )]
    },
    tapegyseg: {
      label: "TÁPEGYSÉG",
      options: powerSupplies
    },
    haz: {
      label: "SZÁMÍTÓGÉPHÁZ",
      options: cases
    },
    rendszerHuto: {
      label: "RENDSZER HŰTŐ",
      options: fans
    },
  };

  const toggleDropdown = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const selectOption = (key, option) => {
    setSelections({
      ...selections,
      [key]: option
    });
    setOpenDropdown(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <p>Alkatrészek betöltése...</p>
      </div>
    );
  }

  return (
    <>
      <div className='Fejlec'>
        <NavBar user={user} onLogout='' />
      </div>
      <div className="logo-container">
        <img src={hatter} className="body-background" alt="Background" />
      </div>

      <div className="builder-container">
        <div className="builder-header">
          <img src={logo} className="logo" alt="Logo" />
          <p> | TERVEZŐ |</p>
        </div>

        <div className="components-list">
          {Object.entries(components).map(([key, comp]) => (
            <div key={key} className="component-row">
              <div className="component-label">
                {comp.label}
              </div>
              <div className="component-selector">
                <button className={`dropdown-btn ${selections[key] ? 'selected' : ''}`} onClick={() => toggleDropdown(key)}>
                  <span>
                    {selections[key] || "Válassz alkatrészt..."}
                  </span>
                  <svg className={`dropdown-arrow ${openDropdown === key ? 'rotate' : ''}`} viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
                  </svg>
                </button>

                {openDropdown === key && (
                  <div className="dropdown-options">
                    {comp.options.map((option, idx) => (
                      <div key={idx} className={`dropdown-option ${selections[key] === option ? 'active' : ''}`} onClick={() => selectOption(key, option)}>
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="builder-summary">
          <div className="summary-header">
            <h3>📦 ÖSSZEÁLLÍTÁS</h3>
            <button className="reset-btn" onClick={() => setSelections({})}>Összes törlése</button>
          </div>
          <div className="summary-content">
            {Object.values(selections).filter(Boolean).length === 0 ? (
              <p className="empty-summary">Még nincs kiválasztva alkatrész</p>
            ) : (
              <ul>
                {Object.entries(selections).map(([key, value]) => {
                  const label = components[key]?.label || key;
                  return (
                    <li key={key}>
                      <strong>{label}:</strong> {value}
                    </li>
                  );
                })}
                <button className="megrendeles-btn" onClick="">Megrendelés</button>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}