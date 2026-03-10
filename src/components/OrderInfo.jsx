export default function OrderInfo({ order_id, user_id }) {
    return (
        <tr>
            <td>{order_id}</td>
            <td>{user_id}</td>
            <td>
            <button className="btn btn-sm btn-danger" onClick="">Töröl</button>
            </td>
        </tr>
    )
}