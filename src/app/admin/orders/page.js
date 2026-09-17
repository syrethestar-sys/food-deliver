import { OrdersTable } from "./_features/orders-table";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:1000";

async function getOrders() {
  const res = await fetch(`${API_URL}/order/all`, { cache: "no-store" });
  const data = await res.json();
  return data.orders ?? [];
}

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-2xl bg-white p-6">
        <h2 className="text-xl font-semibold">Orders</h2>
        <OrdersTable orders={orders}/>
      </section>
    </div>
  );
}
