// import {useState, useEffect} from "react"
// import { useNavigate } from "react-router-dom"
// import { Link } from "react-router-dom"

// import hatter from '../assets/Core_build_background.gif'
// import { whoami } from "../../api"

// import NavBar from "../components/NavBar"

// export default function Profile() {
//     const [user, setUser] = useState(null)
//     const [orders, setOrders] = useState([])
//     const [error, setError] = useState('')
//     const [message, setMessage] = useState('')

//     const navigate = useNavigate()

//     const isLoggedIn = !!user;


//     return (
//         <>
//             <div className='Fejlec'>
//                 <NavBar user={user} onLogout='' />
//             </div>

//             <div className="card">
//                 <div className="card-body">
//                     <h5 className="card-title">Profilom</h5>
//                     <p className="card-text">Ez az oldal még fejlesztés alatt áll.</p>
//                 </div>
//             </div>

//             <Link to="/homepage" className="text-danger text-decoration-none fs-4">Vissza a főoldalra</Link>
//             <img src={hatter} className="body-background" alt="Background" />
//         </>
//     )
// }

import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

import hatter from '../assets/Core_build_background.gif'
import { whoami } from "../../api"

import NavBar from "../components/NavBar"

export default function Profile() {
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
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

    if (loading) {
        return (
            <>
                <NavBar user={null} onLogout={() => {}} />
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Betöltés...</h5>
                        <p className="card-text">Kérjük, várj!</p>
                    </div>
                </div>
                <img src={hatter} className="body-background" alt="Background" />
            </>
        )
    }

    if (error) {
        return (
            <>
                <NavBar user={null} onLogout={() => {}} />
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title text-danger">Hiba</h5>
                        <p className="card-text">{error}</p>
                        <p className="card-text">Átirányítás a bejelentkezéshez...</p>
                    </div>
                </div>
                <img src={hatter} className="body-background" alt="Background" />
            </>
        )
    }

    return (
        <>
            <div className='Fejlec'>
                <NavBar user={user} onLogout={() => {}} />
            </div>

            <div className="card">
                <div className="card-body">
                    {user && (
                        <div className="user-info mt-3">
                            <p><strong>Felhasználónév:</strong> {user.username}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                        </div>
                    )}
                </div>
            </div>

            <Link to="/homepage" className="text-danger text-decoration-none fs-4">Vissza a főoldalra</Link>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}