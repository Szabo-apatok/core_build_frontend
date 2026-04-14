import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import hatter from '../assets/Core_build_background.gif'
import { whoami, logout } from "../../api"

import NavBar from "../components/NavBar"

export default function Profile() {
    const [user, setUser] = useState([])
    console.log(user);
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [errorUser, setErrorUser] = useState('')
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await whoami()
                setUser(userData)
                setLoading(false)
            } catch (err) {
                setError('Kérjük, jelentkezz be az oldal megtekintéséhez.')
                setTimeout(() => {
                    navigate('/login')
                }, 2000)
            }
        }
        checkAuth()
    }, [navigate])

    async function onLogout() {
        const data = await logout()
        if (data.error) return setErrorUser(data.error)
        setUser(null)
        navigate('/')
    }

    return (
        <>
            <div className='Fejlec mb-4'>
                <NavBar user={user} onLogout={logout} />
            </div>

            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card border-0" style={{
                            background: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)',
                            WebkitBackdropFilter: 'blur(10px)',
                            borderRadius: '15px',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                        }}>
                            <div className="card-header bg-transparent text-white py-3 text-center" style={{
                                borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                <h4 className="mb-0">
                                    <i className="me-2"></i>
                                    Profiladataim
                                </h4>
                            </div>

                            <div className="card-body p-4">
                                {user && (
                                    <div className="user-info d-flex flex-column align-items-center">
                                        <div className="mb-4 pb-3 w-100" style={{
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                                        }}>
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div>
                                                    <small className="text-white-50 d-block">Felhasználónév</small>
                                                    <h5 className="mb-0 text-white mt-2">{user.username}</h5>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-3 w-100">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div>
                                                    <small className="text-white-50 d-block">Email cím</small>
                                                    <h5 className="mb-0 text-white mt-2">{user.email}</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4 pb-3 w-100" style={{
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
                                        }} />
                                        <div className="mb-3 w-100">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <div>
                                                    <small className="text-white-50 d-block">Telefonszám</small>
                                                    <h5 className="mb-0 text-white mt-2">{user?.phone_num || user?.phone_num === '' ? user.phone_num : 'Nincs megadva'}</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* gombok */}
                            <div className="card-footer bg-transparent border-0 pb-4 text-center">
                                <Link to="/homepage" className="btn btn-outline-light">
                                    <i className="bi bi-arrow-left"></i>
                                    Vissza a főoldalra
                                </Link>
                                
                                <Link to="/" onClick={onLogout} className="btn btn-outline-danger" style={{ marginLeft: '10px' }}>
                                    <i className="bi bi-arrow-left"></i>
                                    Kijelentkezés
                                </Link>

                                <Link className="btn btn-outline-light" style={{ marginLeft: '10px' }}>
                                    <i className="bi bi-arrow-left"></i>
                                    Profil módosítása
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}