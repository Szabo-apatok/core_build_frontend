import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import NavBar from '../components/NavBar'
import '../style.css'

import { whoami, logout } from '../../api'

export default function Homepage() {
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [errorUser, setErrorUser] = useState('')

    useEffect(() => {
        async function load() {
            const data = await whoami()
            // console.log(data);
            if (data.error) {
                return setErrorUser(data.error)
            }
            return setUser(data)
        }
        load()
    }, [])

    async function onLogout() {
        const data = await logout()
        if (data.error) {
            return setErrorUser(data.error)
        }
        setUser(null)
        navigate('/')
    }
    
    return (
        <>
            <div className='Fejlec'>
                <NavBar user={user} onLogout={onLogout}/>
            </div>
            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}