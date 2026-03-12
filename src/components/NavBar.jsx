import { Link } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png'

import '../style.css'

export default function NavBar({ user, onLogout }) {
    // console.log(user);
    const isLoggedIn = !!user;
    // console.log(isLoggedIn);
    const isAdmin = user?.role === 'admin';
    // console.log(isAdmin);

    return (
        <div className="d-flex align-items-center py-1">
            <img src={logo} className="HPLogo" alt="Logo" />
            <div className="text-decoration-none d-flex mx-auto" style={{ gap: "155px" }}>
                <Link to="/design" className="text-white text-decoration-none py-1 fs-4">Tervező</Link>
                <Link to="/aboutme" className="text-white text-decoration-none py-1 fs-4">Rólunk</Link>
                <Link to="/contact" className="text-white text-decoration-none py-1 fs-4">Kapcsolat</Link>
                {isLoggedIn ? (
                    <>
                        {/* admin oldal */}
                        {isAdmin && <Link to="/admin" className="text-white text-decoration-none py-1 fs-4">Adminoldal</Link>}
                        <Link to="/profile" className="text-white text-decoration-none py-1 fs-4">Profil</Link>
                        <Link to="/" onClick={onLogout} className="text-white text-decoration-none py-1 fs-4">Kijelentkezés</Link>
                    </>
                ) : (
                    <>
                        {/* bejelentkezes, regisztracio */}
                        <Link to="/login" className="text-white text-decoration-none py-1 fs-4">Bejelentkezés</Link>
                        <Link to="/register" className="text-white text-decoration-none py-1 fs-4">Regisztráció</Link>
                    </>)}


                {/* <Link to="/admin" className="text-white text-decoration-none px-3 py-1 fs-4">Adminoldal</Link> */}
            </div>
        </div>
    )
}