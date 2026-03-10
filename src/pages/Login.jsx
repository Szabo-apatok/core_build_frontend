import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import InputMezo from '../components/InputMezo.jsx'

import '../style.css'
import { login } from "../../api.js";

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [hiba, setHiba] = useState('')
    const [uzenet, setUzenet] = useState('')

    async function onLogin() {
        setHiba('')
        setUzenet('')

        if (!email || !password) {
            return setHiba('Kérem töltse ki az összes mezőt')
        }

        try {
            const data = await login(email, password)
            
            if(data.error) {
                return setHiba(data.error)
            }
            setUzenet(data.message)
            setTimeout(() => navigate('/homepage'), 600)
        } catch (error) {
            return setHiba('Nem sikerult kapcsolodni a backendhez')
        }
    }

    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="logo" alt="Logo" />
            </div>

            <div className="form-container">
                {hiba && <div className="alert alert-danger text-center my-2">{hiba}</div>}
                {uzenet && <div className="alert alert-success text-center my-2">{uzenet}</div>}

                <InputMezo label="Email" type="email" placeholder={"example@example.com"} value={email} setValue={setEmail} />
                <InputMezo label="Jelszó" type="password" placeholder={"Írd be a jelszavad"} value={password} setValue={setPassword} />
            </div>
            <button className='Gomb' onClick={onLogin}>BEJELENTKEZÉS</button>

            <p className='regtext'>
                Még nincs fiókod? <a href="/register"><span className='SecondLogin'>Regisztrálj!</span></a>
            </p>

            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}