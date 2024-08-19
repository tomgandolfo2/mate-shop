"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart } = useCart();
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
  });

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    if (!validateForm()) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          shippingInfo,
          paymentInfo,
          totalAmount: cart.reduce(
            (acc, item) =>
              acc + parseFloat(item.price.slice(1)) * item.quantity,
            0
          ),
        }),
      });

      if (response.ok) {
        alert("Order placed successfully!");
        // Redirect to order confirmation page or clear the cart
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const validateForm = () => {
    return (
      shippingInfo.name &&
      shippingInfo.address &&
      shippingInfo.city &&
      shippingInfo.state &&
      shippingInfo.zip &&
      shippingInfo.phone &&
      shippingInfo.email &&
      paymentInfo.cardNumber &&
      paymentInfo.expirationDate &&
      paymentInfo.cvv &&
      paymentInfo.cardholderName
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Review Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-4 p-4 border rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md mr-4"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </p>
                <p className="text-sm text-gray-600">Price: {item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Shipping Details</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={shippingInfo.name}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="Zip Code"
            value={shippingInfo.zip}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="expirationDate"
            placeholder="Expiration Date (MM/YY)"
            value={paymentInfo.expirationDate}
            onChange={handlePaymentChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            value={paymentInfo.cvv}
            onChange={handlePaymentChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
          <input
            type="text"
            name="cardholderName"
            placeholder="Cardholder Name"
            value={paymentInfo.cardholderName}
            onChange={handlePaymentChange}
            className="block w-full p-3 border border-gray-300 rounded"
            required
          />
        </form>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <p className="text-lg">
          Total Items: {cart.reduce((acc, item) => acc + item.quantity, 0)}
        </p>
        <p className="text-lg font-bold">
          Total Price: $
          {cart.reduce(
            (acc, item) =>
              acc + parseFloat(item.price.slice(1)) * item.quantity,
            0
          )}
        </p>
      </div>

      <button
        onClick={handleCheckout}
        className="w-full bg-green-600 text-white py-3 rounded-lg transition-transform transform hover:scale-105"
      >
        Confirm and Place Order
      </button>
    </div>
  );
}
