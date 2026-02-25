import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'

import '../style.css'

export default function RegPage() {
    const navigate = useNavigate()
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [phone, setPhone] = useState('')
    
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [phoneError, setPhoneError] = useState('')

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }


    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="logo" alt="Logo" />
            </div>

            <form onSubmit=''>
                <div className="form-container">
                    <div className="form-group">
                        <label>Email cím:</label>
                        <input 
                            type="email" 
                            placeholder="Email cím"
                            value={email}
                            onChange=''
                            className={emailError ? 'error-input' : ''}
                        />
                        {emailError && <span className="error-message">{emailError}</span>}
                    </div>

                    <div className="form-group">
                        <label>Jelszó:</label>
                        <input 
                            type="password" 
                            placeholder="Jelszó"
                            value={password}
                            onChange=''
                        />
                        {passwordError && <span className="error-message">{passwordError}</span>}
                    </div>

                    <div className="form-group">
                        <label>Jelszó újra:</label>
                        <input 
                            type="password" 
                            placeholder="Jelszó"
                            value={passwordAgain}
                            onChange=''
                            className={passwordError && passwordError.includes('egyezik') ? 'error-input' : ''}
                        />
                        {passwordError && <span className="error-message">{passwordError}</span>}
                    </div>

                    <div className="form-group">
                        <label>Telefonszám:</label>
                        <input 
                            type="tel" 
                            placeholder="Telefonszám"
                            maxLength={12}
                            value={phone}
                            onChange=''
                            className={phoneError ? 'error-input' : ''}
                        />
                        {phoneError && <span className="error-message">{phoneError}</span>}
                    </div>
                </div>
                
                <button type="submit" className='Gomb'>REGISZTRÁLOK</button>
            </form>
            
            <p className='regtext'>
                Már van fiókod? <a href="/login"><span className='SecondLogin'>Jelentkezz be!</span></a>
            </p>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}