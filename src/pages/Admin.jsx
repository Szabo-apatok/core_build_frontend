import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Core_build-no-bg.png'
import hatter from '../assets/Core_build_background.gif'
import UserInfo from '../components/UserInfo'
import { deleteFelh } from '../../api'
import OrderInfo from '../components/OrderInfo'

export default function Admin() {
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        fetch("http://127.0.0.1:4000/users/all")
            .then(res => res.json())
            .then(data => setUsers(data)
                .catch(err => console.error(err)))
    }, [])

    useEffect(() => {
        fetch("http://127.0.0.1:4000/orders/all")
            .then(res => res.json())
            .then(data => setOrders(data)
                .catch(err => console.error(err)))
    }, [])

    async function deleteUser(id) {
        try {
            const data = await deleteFelh(id)
            if (!data.ok) {
                return setError(data.error)
            }
            else {
                return setUzenet(data.message)
            }
        } catch (error) {
            setHiba('Nem sikerult kapcsolodni a backendhez')
        }
    }

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
                            <th>Telefonszám</th>
                            <th>Szerepkör</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <UserInfo
                                id={user.user_id}
                                email={user.email}
                                username={user.username}
                                phone_num={user.phone_num}
                                role={user.role}
                                onDelete={onDelete}
                            />
                        ))}
                    </tbody>
                </table>

                <h2>Rendelések kezelése</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Rendelés Id</th>
                            <th>Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <OrderInfo
                                order_id={order.order_id}
                                user_id={order.user_id}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {error && <div className="alert alert-danger text-center my-2">{error}</div>}
            {message && <div className="alert alert-success text-center my-2">{message}</div>}

            <div className="card-footer bg-transparent border-0 pb-4 mt-5 text-center">
                <Link to="/homepage" className="btn btn-outline-light">
                    <i className="bi bi-arrow-left"></i>
                    Vissza a főoldalra
                </Link>
            </div>

            <img src={hatter} className="body-background" alt="Background" />
        </>
    )
}