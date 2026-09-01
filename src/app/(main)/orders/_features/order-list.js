import { OrderCard } from "../_components/order-card";

export function OrderList({ orders = [] }) {
  return (
    <div className="grid gap-3">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
