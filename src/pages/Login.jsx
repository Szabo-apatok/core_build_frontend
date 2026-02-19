import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'

import '../style.css'

export default function Login() {
    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="logo" alt="Logo" />
            </div>

            <div className="form-container">
                <div className="form-group">
                    <label>Email cím:</label>
                    <input type="email" placeholder="Email cím" />
                </div>

                <div className="form-group">
                    <label>Jelszó:</label>
                    <input type="password" placeholder="Jelszó" />
                </div>
            </div>
            <a href='/homepage'><button className='Gomb'>BEJELENTKEZÉS</button></a>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}