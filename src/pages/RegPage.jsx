import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'

import InputMezo from '../components/InputMezo.jsx'

import '../style.css'
import { register, login } from '../../api.js'

export default function RegPage() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [psw, setPassword] = useState('')
    const [psw2, setPasswordAgain] = useState('')
    const [phone, setPhone] = useState('')

    const [hiba, setHiba] = useState('');
    const [uzenet, setUzenet] = useState('');

    async function Registration() {
        setHiba('')
        setUzenet('')

        if (!email || !username || !psw || !psw2 || !phone) {
            setHiba('Minden mező kitöltése kötelező!')
            return
        }

        if (psw !== psw2) {
            setHiba('A jelszavak nem egyeznek!')
            return
        }

        try {
            const data = await register(email, username, psw, phone)
            if(data.error) {
                return setHiba(data.error)
            }
            setUzenet(data.message)
            setTimeout(() => navigate('/login'), 600)
        } catch (err) {
           return setHiba('Nem sikerult kapcsolodni a backendhez')
        }
    }

    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="logo" alt="Logo" />
            </div>

            

            <div className="form-container" style={{ maxWidth: 530 }}>
                {hiba && <div className="alert alert-danger text-center my-2">{hiba}</div>}
                {uzenet && <div className="alert alert-success text-center my-2">{uzenet}</div>}
                <InputMezo label="E-mail" type="text" value={email} setValue={setEmail} placeholder="example@example.com" />
                <InputMezo label="Felhasználónév" type="text" value={username} setValue={setUsername} placeholder="Írd be a felhasználóneved" />
                <InputMezo label="Telefonszám" type="text" value={phone} setValue={setPhone} placeholder="Írd be a telefonszámod" />
                <InputMezo label="Jelszó" type="password" value={psw} setValue={setPassword} placeholder="Írd be a jelszavad" />
                <InputMezo label="Jelszó megerősítése" type="password" value={psw2} setValue={setPasswordAgain} placeholder="Írd be a jelszavad" />
            </div>

            <button type="submit" onClick={Registration} className='Gomb'>REGISZTRÁLOK</button>

            <p className='regtext'>
                Már van fiókod? <a href="/login"><span className='SecondLogin'>Jelentkezz be!</span></a>
            </p>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}