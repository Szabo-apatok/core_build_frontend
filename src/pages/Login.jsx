import { useState } from "react";
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'

import '../style.css'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [hiba, setHiba] = useState('')
    const [uzenet, setUzenet] = useState('')

    async function onLogin() {
        setHiba('')
        setUzenet('')

        if (!email || !password) {
            setHiba('Kérem töltse ki az összes mezőt')
            return
        }

        try {
            const data = await login(email, password)
            if(!data.ok){
                setHiba(data.error)
            }
            setUzenet(data.message)
        } catch (error) {
            setHiba('Nem sikerult kapcsolodni a backendhez')
        }
    }

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="logo" alt="Logo" />
            </div>

            <div className="form-container">
                <div className="form-group">
                    <label>Email cím:</label>
                    <input type="email" value={email} setValue={setEmail} placeholder="example@example.com" />
                </div>

                <div className="form-group">
                    <label>Jelszó:</label>
                    <input type="password" value={password} setValue={setPassword} placeholder="Jelszó" />
                </div>
            </div>
            <a href='/homepage'><button className='Gomb'>BEJELENTKEZÉS</button></a>

            <p className='regtext'>
                Még nincs fiókod? <a href="/register"><span className='SecondLogin'>Regisztrálj!</span></a>
            </p>

            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}