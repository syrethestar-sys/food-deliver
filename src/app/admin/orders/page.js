"use client";

import { useEffect, useState } from "react";
import { OrdersTable } from "./_features/orders-table";
import { server } from "@/app/api/api";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    server
      .get("/order/all")
      .then((response) => setOrders(response.data.orders ?? []))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <section className="rounded-2xl bg-white p-6">
        <h2 className="text-xl font-semibold">Orders</h2>
        {orders && <OrdersTable orders={orders} />}
      </section>
    </div>
  );
}
