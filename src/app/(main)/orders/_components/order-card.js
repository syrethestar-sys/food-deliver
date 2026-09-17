const STATUS_STYLES = {
  Pending: "bg-amber-50 text-amber-700 border-amber-200",
  Delivered: "bg-green-50 text-green-700 border-green-200",
  Cancelled: "bg-red-50 text-red-700 border-red-200",
};

export function OrderCard({ order }) {
  const badgeStyle =
    STATUS_STYLES[order.status] ?? "bg-muted text-muted-foreground border";

  return (
    <article className="rounded-xl border bg-white p-4">
      <div className="flex items-start justify-between">
        <p className="font-semibold">${order.total.toFixed(2)}</p>
        <span
          className={`rounded-full border px-3 py-1 text-xs font-medium ${badgeStyle}`}
        >
          {order.status}
        </span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        {new Date(order.createdAt).toLocaleDateString()}
      </p>
      <ul className="mt-3 flex flex-col gap-1">
        {order.items.map((item) => (
          <li key={item._id} className="flex justify-between text-sm">
            <p>{item.food?.foodName ?? "Deleted dish"}</p>
            <p className="text-muted-foreground">x{item.quantity}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}
