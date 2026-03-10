export default function InputMezo({ label, type, value, setValue, placeholder }) {
    return (
        <div className="mb-3">
            <label className="mb-1 text-white text-left">{label}</label>
            <input className="form-control" value={value} onChange={(e) => setValue(e.target.value)} type={type} placeholder={placeholder} />
        </div>
    );
}