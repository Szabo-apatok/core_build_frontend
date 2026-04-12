import { Link } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png'
import userlogo from '../assets/user.png'

import '../style.css'

export default function NavBar({ user, onLogout }) {
    // console.log(user);
    const isLoggedIn = !!user;
    // console.log(isLoggedIn);
    const isAdmin = user?.role === 'admin';
    console.log("Admin:", isAdmin);

    return (
        <div className="d-flex align-items-center py-1">
            <img src={logo} className="HPLogo" alt="Logo" />
            <div className="text-decoration-none d-flex mx-auto" style={{ gap: "175px" }}>
                <Link to="/homepage" className="text-white text-decoration-none py-1 fs-4">Kezdőlap</Link>
                <Link to="#rolunk" className="text-white text-decoration-none py-1 fs-4">Rólunk</Link>
                <Link to="#kapcsolat" className="text-white text-decoration-none py-1 fs-4">Kapcsolat</Link>
                {isLoggedIn ? (
                    <>
                        {/* admin oldal, profil */}
                        {isAdmin && <Link to="/admin" className="text-white text-decoration-none py-1 fs-4">Adminoldal</Link>}
                        <Link to="/profile" className="text-white text-decoration-none py-1 fs-4"><img src={userlogo} style={{ width: "40px"}} alt="" /></Link>
                        
                    </>
                ) : (
                    <>
                        {/* bejelentkezes, regisztracio */}
                        <Link to="/login" className="text-white text-decoration-none py-1 fs-4">Bejelentkezés</Link>
                        <Link to="/register" className="text-white text-decoration-none py-1 fs-4">Regisztráció</Link>
                    </>)}
            </div>
        </div>
    )
}