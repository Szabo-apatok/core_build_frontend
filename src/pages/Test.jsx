import "../test.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import NavBar from '../components/NavBar'
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const components = {
    processzor: {
        label: "PROCESSZOR",
        options: [
            "Intel Core i9-13900K",
            "Intel Core i7-13700K",
            "AMD Ryzen 9 7950X",
            "AMD Ryzen 7 7800X3D",
            "Intel Core i5-13600K"
        ]
    },
    processzorHuto: {
        label: "PROCESSZOR HUTO",
        options: [
            "Noctua NH-D15",
            "be quiet! Dark Rock Pro 4",
            "Arctic Liquid Freezer II 360",
            "Corsair iCUE H150i Elite",
            "Cooler Master Hyper 212"
        ]
    },
    alaplap: {
        label: "ALAPLAP",
        options: [
            "ASUS ROG Strix Z790-E",
            "MSI MPG B650 Carbon",
            "Gigabyte Z790 AORUS Master",
            "ASRock B650E Taichi",
            "ASUS TUF Gaming B760-PLUS"
        ]
    },
    videokartya: {
        label: "VIDEOKÁRTYA",
        options: [
            "NVIDIA RTX 4090",
            "NVIDIA RTX 4080",
            "AMD Radeon RX 7900 XTX",
            "NVIDIA RTX 4070 Ti",
            "AMD Radeon RX 7800 XT"
        ]
    },
    memoria: {
        label: "MEMÓRIA",
        options: [
            "32GB DDR5 6000MHz Corsair",
            "32GB DDR5 5600MHz G.Skill",
            "16GB DDR5 5200MHz Kingston",
            "64GB DDR5 6000MHz TeamGroup",
            "32GB DDR4 3600MHz HyperX"
        ]
    },
    ssd1: {
        label: "SSD MEGHAJTÓ 1",
        options: [
            "Samsung 990 Pro 1TB",
            "WD Black SN850X 2TB",
            "Kingston KC3000 1TB",
            "Crucial P5 Plus 2TB",
            "Seagate FireCuda 530 1TB"
        ]
    },
    ssd2: {
        label: "SSD MEGHAJTÓ 2",
        options: [
            "Nincs / Később",
            "Samsung 980 Pro 500GB",
            "WD Blue SN570 1TB",
            "Kingston NV2 1TB",
            "Crucial P3 Plus 2TB"
        ]
    },
    merevlemez: {
        label: "MEREVLEMEZ",
        options: [
            "Nincs / Később",
            "Seagate BarraCuda 2TB",
            "WD Blue 4TB",
            "Seagate IronWolf 6TB",
            "WD Black 8TB"
        ]
    },
    tapegyseg: {
        label: "TÁPEGYSÉG",
        options: [
            "Corsair RM1000x 1000W",
            "Seasonic Focus GX-850 850W",
            "be quiet! Dark Power 13 1000W",
            "EVGA SuperNOVA 1000 G6",
            "Cooler Master MWE 850W"
        ]
    },
    haz: {
        label: "SZÁMÍTÓGÉPHÁZ",
        options: [
            "Fractal Design Meshify 2",
            "Lian Li PC-O11 Dynamic",
            "Corsair 5000D Airflow",
            "NZXT H7 Flow",
            "be quiet! Silent Base 802"
        ]
    },
    rendszerHuto: {
        label: "RENDSZER HUTO",
        options: [
            "Noctua NF-A12x25 (3db)",
            "Arctic P12 PWM (5db)",
            "Corsair ML120 (3db)",
            "Lian Li Uni Fan SL120 (3db)",
            "be quiet! Silent Wings 4 (3db)"
        ]
    },
    optikaiMeghajto: {
        label: "OPTIKAI MEGHAJTÓ",
        options: [
            "Nincs",
            "ASUS DRW-24D5MT",
            "LG GH24NSD5",
            "ASUS BW-16D1HT (Blu-ray)",
            "Pioneer BDR-212DBK"
        ]
    }
};

export default function ComputerBuilder() {
    // State-ek tárolása minden alkatrészhez
    const [selections, setSelections] = useState({});
    const [openDropdown, setOpenDropdown] = useState(null);
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

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

    return (
        <>
            <div className='Fejlec'>  {/* VISSZAÁLLÍTVA az eredeti osztálynév */}
                <NavBar user={user} onLogout='' />
            </div>
            {/* Logo */}
            <div className="logo-container">
                <img src={hatter} className="body-background" alt="Background" />
            </div>

            {/* Fő tartalom */}
            <div className="builder-container">
                {/* Header - eltávolítva a régi CORE-BUILD felirat */}
                <div className="builder-header">
                <img src={logo} className="logo" alt="Logo" />
                    <p> | TERVEZŐ |</p>
                </div>

                {/* Alkatrész lista */}
                <div className="components-list">
                    {Object.entries(components).map(([key, comp]) => (
                        <div key={key} className="component-row">
                            <div className="component-label">
                                {comp.label}
                            </div>

                            <div className="component-selector">
                                <button
                                    className={`dropdown-btn ${selections[key] ? 'selected' : ''}`}
                                    onClick={() => toggleDropdown(key)}
                                >
                                    <span>
                                        {selections[key] || "Válassz alkatrészt..."}
                                    </span>
                                    <svg
                                        className={`dropdown-arrow ${openDropdown === key ? 'rotate' : ''}`}
                                        viewBox="0 0 24 24"
                                        width="20"
                                        height="20"
                                    >
                                        <path fill="currentColor" d="M7 10l5 5 5-5H7z" />
                                    </svg>
                                </button>

                                {openDropdown === key && (
                                    <div className="dropdown-options">
                                        {comp.options.map((option, idx) => (
                                            <div
                                                key={idx}
                                                className={`dropdown-option ${selections[key] === option ? 'active' : ''}`}
                                                onClick={() => selectOption(key, option)}
                                            >
                                                {option}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Összegzés */}
                <div className="builder-summary">
                    <div className="summary-header">
                        <h3>📦 ÖSSZEÁLLÍTÁS</h3>
                        <button
                            className="reset-btn"
                            onClick={() => setSelections({})}
                        >
                            Összes törlése
                        </button>
                    </div>
                    <div className="summary-content">
                        {Object.values(selections).filter(Boolean).length === 0 ? (
                            <p className="empty-summary">Még nincs kiválasztva alkatrész</p>
                        ) : (
                            <ul>
                                {Object.entries(selections).map(([key, value]) => {
                                    const label = components[key].label;
                                    return (
                                        <li key={key}>
                                            <strong>{label}:</strong> {value}
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}