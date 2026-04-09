// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import logo from '../assets/Core_build-no-bg.png'
// import hatter from '../assets/Core_build_background.gif'
// import NavBar from '../components/NavBar'
// import '../style.css'

// import { whoami, logout } from '../../api'

// export default function Homepage() {
//     const navigate = useNavigate()
//     const [user, setUser] = useState(null)
//     const [errorUser, setErrorUser] = useState('')

//     useEffect(() => {
//         async function load() {
//             const data = await whoami()
//             // console.log(data);
//             if (data.error) {
//                 return setErrorUser(data.error)
//             }
//             return setUser(data)
//         }
//         load()
//     }, [])

//     async function onLogout() {
//         const data = await logout()
//         if (data.error) {
//             return setErrorUser(data.error)
//         }
//         setUser(null)
//         navigate('/')
//     }

//     return (
//         <>
//             <div className='Fejlec'>
//                 <NavBar user={user} onLogout={onLogout}/>
//             </div>
//             <img src={hatter} className="body-background" alt="Background" />
//         </>
//     )
// }

import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import NavBar from '../components/NavBar'
import '../style.css'

import { whoami, logout } from '../../api'

// Termékképek (cseréld ki!)
import product1 from '../assets/pc1.png'
import product2 from '../assets/pc2.png'
import product3 from '../assets/pc3.png'
import product4 from '../assets/pc4.png'

export default function Homepage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)

    // Referencia a Rólunk szekcióhoz
    const aboutSectionRef = useRef(null)

    // Termékek listája
    const products = [
        { id: 1, name: "Gamer PC PRO", price: "299.990 Ft", image: product1 },
        { id: 2, name: "RTX 4070 Ti", price: "389.990 Ft", image: product2 },
        { id: 3, name: "AMD Ryzen 7", price: "129.990 Ft", image: product3 },
        { id: 4, name: "32GB RAM Kit", price: "49.990 Ft", image: product4 }
    ]

    // Automatikus léptetés 4mp-ként
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [products.length])

    // A Homepage komponens useEffect-je a görgetéshez - ezt cseréld ki a meglévőre
    useEffect(() => {
        if (location.hash === '#rolunk' && aboutSectionRef.current) {
            setTimeout(() => {
                aboutSectionRef.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 100);
            // Tisztítsuk meg az URL-t a hash-től (opcionális)
            window.history.replaceState(null, '', '/');
        }
    }, [location]);

    useEffect(() => {
        async function load() {
            const data = await whoami()
            if (data.error) return setErrorUser(data.error)
            setUser(data)
        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data.error) return setErrorUser(data.error)
        setUser(null)
        navigate('/')
    }

    // Következő index kiszámítása (halvány kártyához)
    const nextIndex = (currentIndex + 1) % products.length
    const prevIndex = (currentIndex - 1 + products.length) % products.length

    return (
        <>
            <div className='Fejlec'>
                <NavBar user={user} onLogout={onLogout} />
            </div>
            <img src={hatter} className="body-background" alt="Background" />

            <div className="homepage-content">
                {/* BAL OLDAL - Egyszerű szöveg */}
                <div className="left-side">
                    <h1>Építsd meg az álmaid gépét</h1>
                    <p>Válogass a legújabb alkatrészek közül, és mi összerakjuk neked.</p>
                    <p>Gyorsan, garanciával.</p>
                    <div className="buttons">
                        <a href="/tervezo"><button className="primary">Irány a tervező</button></a>
                    </div>
                </div>

                {/* JOBB OLDAL - Csak ez az elem módosul */}
                <div className="popular-section">
                    <h2 className="section-title">Népszerű termékek</h2>

                    <div className="carousel-container">
                        {/* Előző kártya (halvány) */}
                        <div className="product-card prev">
                            <img src={products[prevIndex].image} alt={products[prevIndex].name} />
                            <h3>{products[prevIndex].name}</h3>
                            <p className="price">{products[prevIndex].price}</p>
                            <button>Kosárba</button>
                        </div>

                        {/* Aktuális kártya (középen) */}
                        <div className="product-card active">
                            <img src={products[currentIndex].image} alt={products[currentIndex].name} />
                            <h3>{products[currentIndex].name}</h3>
                            <p className="price">{products[currentIndex].price}</p>
                            <button>Kosárba</button>
                        </div>

                        {/* Következő kártya (halvány) */}
                        <div className="product-card next">
                            <img src={products[nextIndex].image} alt={products[nextIndex].name} />
                            <h3>{products[nextIndex].name}</h3>
                            <p className="price">{products[nextIndex].price}</p>
                            <button>Kosárba</button>
                        </div>
                    </div>

                    {/* Pöttyök */}
                    <div className="carousel-dots">
                        {products.map((_, index) => (
                            <span
                                key={index}
                                className={`dot ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => setCurrentIndex(index)}
                            />
                        ))}
                    </div>
                </div>
            </div>


            <div ref={aboutSectionRef} id="rolunk" className="about-section">
                <div className="about-container">
                    <h2 className="about-title">Rólunk</h2>
                    <div className="about-content">
                        <div className="about-text">
                            <p className="about-intro">
                                A Core Build 2020-ban alakult azzal a céllal, hogy Magyarország vezető
                                egyedi számítógép-összeszerelő műhelyévé váljon. Több mint 5000 elégedett
                                ügyfél és több száz pozitív értékelés bizonyítja, hogy jó úton járunk.
                            </p>
                            <p>
                                Csapatunkat szenvedélyes gamer-ek és hardver szakértők alkotják, akik
                                nap mint nap követik a legújabb technológiai trendeket. Legyen szó
                                high-end gaming gépről, professzionális munkagépről vagy belépő szintű
                                konfigurációról - nálunk mindenki megtalálja a számítását.
                            </p>
                            <p>
                                Büszkék vagyunk rá, hogy minden egyes gép összeszerelését személyesen,
                                nagy odafigyeléssel végezzük. A kábelezés rendezett, a hűtés optimalizált,
                                és minden rendszer alapos teszten esik át, mielőtt átadjuk.
                            </p>
                            <div className="about-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>3 év garancia minden gépre</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Ingyenes kiszállítás országszerte</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Élettartam támogatás</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Prémium szolgáltatás</span>
                                </div>
                            </div>
                            <p className="about-motto">
                                "Nem csak gépet építünk - élményt teremtünk."
                            </p>
                        </div>
                        <div className="about-stats">
                            <div className="stat-box">
                                <div className="stat-number">5000+</div>
                                <div className="stat-label">Elégedett ügyfél</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number">4.9</div>
                                <div className="stat-label">Google értékelés</div>
                            </div>
                            <div className="stat-box">
                                <div className="stat-number">3 év</div>
                                <div className="stat-label">Garancia</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}