import { useState, useEffect, use } from 'react'
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import UserInfo from '../components/UserInfo'

export default function Admin() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch("http://127.0.0.1:4000/users/allusers")
            .then(res => res.json())
            .then(data => setUsers(data)
            .catch(err => console.error(err)))
    }, [])

    async function onDelete(id) {
        setMessage('')
        setError('')

        try {
            await deleteUser(id)
            setUsers(users.filter(user => user.id !== id))
            setMessage('Felhasználó sikeresen törölve')
        } catch (err) {
            console.log(err);
            setError('Nem sikerült törölni a felhasználót')
        }
    }

    return (
        <>
            <div className='Fejlec'>
                <img src={logo} className="HPLogo" alt="Logo" />
            </div>

            <div className="section text-white">
                <h2>Felhasználók kezelése</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Felhasználónév</th>
                            <th>Szerepkör</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserInfo
                                key={user.id}
                                id={user.userid}
                                email={user.email}
                                username={user.username}
                                role={user.role}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {error && <div className="alert alert-danger text-center my-2">{error}</div>}
            {message && <div className="alert alert-success text-center my-2">{message}</div>}

            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}