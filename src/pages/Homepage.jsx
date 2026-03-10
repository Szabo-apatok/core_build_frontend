import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import NavBar from '../components/NavBar'
import '../style.css'

export default function Homepage() {
    return (
        <>
            <div className='Fejlec' style={{ fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif" }}>
                
                <NavBar />
            </div>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}