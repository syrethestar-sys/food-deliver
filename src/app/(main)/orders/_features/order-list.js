"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { server } from "@/app/api/api";
import { OrderCard } from "../_components/order-card";

export function OrderList() {
  const { user, ready } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      router.replace("/login");
      return;
    }

    server
      .get("/order/my-orders", { headers: { "x-user-id": user.id } })
      .then((response) => setOrders(response.data.orders))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [ready, user, router]);

  if (!ready || loading) return null;

  if (orders.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        You haven&apos;t placed any orders yet.
      </p>
    );
  }
  return (
    <div className="grid gap-3">
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
