import { Link } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png'

import '../style.css'

export default function NavBar({ user, onLogout }) {
    const isLoggedIn = !!user;
    const isAdmin = user?.role === 'admin';

    return (
        <div className="d-flex align-items-center py-1">
            <img src={logo} className="HPLogo" alt="Logo"/>
            <div className="text-decoration-none d-flex mx-auto" style={{ gap: "260px"}}>
                <Link to="/profile" className="text-white text-decoration-none px-3 py-1 fs-4">Tervező</Link>
                <Link to="/aboutme" className="text-white text-decoration-none px-3 py-1 fs-4">Rólunk</Link>
                <Link to="/contact" className="text-white text-decoration-none px-3 py-1 fs-4">Kapcsolat</Link>
                <Link to="/admin" className="text-white text-decoration-none px-3 py-1 fs-4">Adminoldal</Link>
            </div>
        </div>
    )
}