import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'

import '../style.css'

export default function Homepage() {
    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="HPLogo" alt="Logo" />
            </div>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}