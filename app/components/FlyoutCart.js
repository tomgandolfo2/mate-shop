"use client";

import React, { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function FlyoutCart({ isOpen, onClose }) {
  const {
    cart,
    savedForLater,
    removeFromCart,
    saveForLater,
    moveToCart,
    updateCartItemQuantity,
  } = useCart();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && !event.target.closest(".flyout-cart")) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleCheckout = () => {
    onClose();
    router.push("/checkout");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-lg transform flyout-cart ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-black">Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close cart"
          >
            &times;
          </button>
        </div>
        <div
          className="p-4 overflow-y-auto text-black"
          style={{ maxHeight: "60vh" }}
        >
          {cart.length === 0 ? (
            <p className="text-center text-gray-500">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  <div className="flex items-center my-2">
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity - 1)
                      }
                      className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 hover:bg-gray-300"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <p className="text-sm mx-3">{item.quantity}</p>
                    <button
                      onClick={() =>
                        updateCartItemQuantity(item.id, item.quantity + 1)
                      }
                      className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 hover:bg-gray-300"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">{item.price}</p>
                  <div className="flex space-x-2 mt-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => saveForLater(item.id)}
                      className="text-blue-500 hover:text-blue-700 text-sm"
                      aria-label="Save for later"
                    >
                      Save for Later
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        {savedForLater.length > 0 && (
          <div className="p-4 border-t bg-gray-50">
            <h3 className="font-semibold mb-4">Saved for Later</h3>
            {savedForLater.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md mr-4"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-black">{item.name}</h3>
                  <button
                    onClick={() => moveToCart(item.id)}
                    className="text-green-500 hover:text-green-700 text-sm mt-2"
                    aria-label="Move to cart"
                  >
                    Move to Cart
                  </button>
                  <p className="text-sm text-gray-600">{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-transform transform hover:scale-105"
            aria-label="Proceed to checkout"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
}
