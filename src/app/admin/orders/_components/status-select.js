const STATUS_OPTIONS = ["Pending", "Delivered", "Cancelled"];

export function StatusSelect({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-full border px-3 py-1 text-xs"
    >
      {STATUS_OPTIONS.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}