export default function UserInfo({ id, email, username, phone_num, role, onDelete, onModify }) {
    return (
        <tr>
            <td>{id}</td>
            <td>{email}</td>
            <td>{username}</td>
            <td>{phone_num}</td>
            <td>{role}</td>
            <td>
                <button className="btn btn-sm btn-primary me-2" onClick={onModify}>Módosít</button>
                <button className="btn btn-sm btn-danger" onClick={() => onDelete(id)}>Töröl</button>
            </td>
        </tr>
    )
}