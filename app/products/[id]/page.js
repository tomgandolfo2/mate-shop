"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useCart } from "../../context/CartContext";
import Link from "next/link";
import products from "../products";

export default function ProductDetails() {
  const { id } = useParams();
  const { cart, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentCartQuantity, setCurrentCartQuantity] = useState(0);

  const productId = parseInt(id, 10);
  const product = products.find((p) => p.id === productId);

  useEffect(() => {
    const cartItem = cart.find((item) => item.id === productId);
    if (cartItem) {
      setCurrentCartQuantity(cartItem.quantity);
    }
  }, [cart, productId]);

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-red-500 text-xl font-semibold">
          Product not found. ID: {id}
        </p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="container mx-auto py-10">
      <Link href="/products">
        <button className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600 transition-colors duration-300">
          Back to Products
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto max-w-lg object-cover rounded shadow-lg transition-transform duration-300 hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-800">
            {product.name}
          </h2>
          <p className="text-lg mb-4 text-gray-700">{product.description}</p>
          <p className="text-2xl font-bold mb-4 text-green-600">
            {product.price}
          </p>
          <div className="mb-4">
            <label className="mr-2 text-gray-600 font-semibold">
              Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="border rounded px-3 py-2 w-20 text-center text-lg"
              min="1"
            />
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-6 py-3 rounded shadow-lg hover:bg-green-600 transition-colors duration-300"
          >
            Add to Cart
          </button>
          {currentCartQuantity > 0 && (
            <p className="mt-4 text-green-600 text-lg">
              You have {currentCartQuantity} of this item in your cart.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
