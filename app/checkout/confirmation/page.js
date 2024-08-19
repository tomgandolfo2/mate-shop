// app/checkout/confirmation/page.js
import React from "react";
import Link from "next/link";

export default function Confirmation() {
  return (
    <div className="container mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Thank You for Your Order!</h1>
      <p>
        Your order has been placed successfully. You will receive a confirmation
        email shortly.
      </p>
      <Link href="/products">
        <a className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded transition-transform transform hover:scale-105">
          Continue Shopping
        </a>
      </Link>
    </div>
  );
}
