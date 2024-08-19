"use client";

import React, { useEffect, useState } from "react";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders/history");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border p-4 mb-4">
            <h2 className="text-xl font-bold">Order #{order.id}</h2>
            <p>Status: {order.status}</p>
            <p>Total: ${order.totalAmount}</p>
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Items:</h3>
              <ul>
                {JSON.parse(order.items).map((item) => (
                  <li key={item.id}>
                    {item.name} - {item.quantity} x ${item.price}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
