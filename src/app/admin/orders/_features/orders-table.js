"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { server } from "@/app/api/api";
import { StatusSelect } from "../_components/status-select";

export function OrdersTable({ orders: initialOrders }) {
  const [orders, setOrders] = useState(initialOrders);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpanded = (orderId) => {
    setExpandedOrderId((current) => (current === orderId ? null : orderId));
  };

  const handleStatusChange = async (orderId, status) => {
    const previousOrders = orders;
    setOrders((current) =>
      current.map((order) =>
        order._id === orderId ? { ...order, status } : order,
      ),
    );

    try {
      await server.put("/order/update-status", { id: orderId, status });
    } catch (err) {
      console.error(err);
      setOrders(previousOrders);
    }
  };

  if (orders.length === 0) {
    return <p className="text-sm text-muted-foreground">No orders yet.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-muted-foreground">
          <th className="p-2">#</th>
          <th className="p-2">Customer</th>
          <th className="p-2">Food</th>
          <th className="p-2">Date</th>
          <th className="p-2">Total</th>
          <th className="p-2">Delivery address</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order, index) => {
          const isExpanded = expandedOrderId === order._id;
          return (
            <Fragment key={order._id}>
              <tr className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{order.user?.email ?? "Unknown"}</td>
                <td className="p-2">
                  <button
                    type="button"
                    onClick={() => toggleExpanded(order._id)}
                    className="flex cursor-pointer items-center gap-1"
                  >
                    {order.items.length} foods
                    {isExpanded ? (
                      <ChevronDown size={14} />
                    ) : (
                      <ChevronRight size={14} />
                    )}
                  </button>
                </td>
                <td className="p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2">${order.total.toFixed(2)}</td>
                <td className="p-2">{order.address}</td>
                <td className="p-2">
                  <StatusSelect
                    value={order.status}
                    onChange={(status) => handleStatusChange(order._id, status)}
                  />
                </td>
              </tr>
              {isExpanded && (
                <tr className="border-t bg-muted/30">
                  <td />
                  <td colSpan={6} className="p-2">
                    <ul className="flex flex-col gap-1">
                      {order.items.map((item) => (
                        <li key={item._id} className="flex justify-between">
                          <p>{item.food?.foodName ?? "Deleted dish"}</p>
                          <p className="text-muted-foreground">
                            x{item.quantity} · ${item.price.toFixed(2)} each
                          </p>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}
