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

    const handleEmailChange = (e) => {
        const value = e.target.value
        setEmail(value)
        
        if (value && !validateEmail(value)) {
            setEmailError('Kérlek adj meg egy érvényes email címet (tartalmaznia kell @-t és .-ot)')
        } else {
            setEmailError('')
        }
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }

    const handlePasswordAgainChange = (e) => {
        setPasswordAgain(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
        
        if (e.target.value && e.target.value.length < 11) {
            setPhoneError('A telefonszám túl rövid')
        } else {
            setPhoneError('')
        }
    }

    const validateForm = () => {
        let isValid = true
        let errors = {}

        // Email validáció
        if (!email) {
            setEmailError('Az email cím megadása kötelező')
            isValid = false
        } else if (!validateEmail(email)) {
            setEmailError('Kérlek adj meg egy érvényes email címet (tartalmaznia kell @-t és .-ot)')
            isValid = false
        } else {
            setEmailError('')
        }

        // Jelszó validáció
        if (!password) {
            setPasswordError('A jelszó megadása kötelező')
            isValid = false
        } else if (password.length < 6) {
            setPasswordError('A jelszónak legalább 6 karakter hosszúnak kell lennie')
            isValid = false
        } else if (password !== passwordAgain) {
            setPasswordError('A két jelszó nem egyezik')
            isValid = false
        } else {
            setPasswordError('')
        }

        // Telefonszám validáció
        if (!phone) {
            setPhoneError('A telefonszám megadása kötelező')
            isValid = false
        } else if (phone.length < 11) {
            setPhoneError('A telefonszám túl rövid (legalább 11 karakter)')
            isValid = false
        } else {
            setPhoneError('')
        }

        return isValid
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        if (validateForm()) {
            // Sikeres validáció után átirányítunk a /login oldalra
            navigate('/login')
        }
    }

    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="logo" alt="Logo" />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="form-container">
                    <div className="form-group">
                        <label>Email cím:</label>
                        <input 
                            type="email" 
                            placeholder="Email cím"
                            value={email}
                            onChange={handleEmailChange}
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
                            onChange={handlePasswordChange}
                            className={passwordError && passwordError.includes('jelszó') ? 'error-input' : ''}
                        />
                        {passwordError && <span className="error-message">{passwordError}</span>}
                    </div>

                    <div className="form-group">
                        <label>Jelszó újra:</label>
                        <input 
                            type="password" 
                            placeholder="Jelszó"
                            value={passwordAgain}
                            onChange={handlePasswordAgainChange}
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
                            onChange={handlePhoneChange}
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