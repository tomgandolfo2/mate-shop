"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useSession, signIn, signOut } from "next-auth/react";
import FlyoutCart from "./FlyoutCart";

export default function Header() {
  const { cart } = useCart();
  const { data: session } = useSession();
  const [isCartOpen, setCartOpen] = useState(false);

  const cartItemCount =
    cart?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <header className="bg-green-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wider">
          <Link
            href="/"
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Mate Shop
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-6 items-center">
            <li>
              <Link
                href="/products"
                className="hover:text-gray-200 transition-colors duration-300"
              >
                Products
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  href="/order-history"
                  className="hover:text-gray-200 transition-colors duration-300"
                >
                  Order History
                </Link>
              </li>
            )}
            <li className="relative">
              <button
                onClick={() => setCartOpen(!isCartOpen)}
                className="relative focus:outline-none"
              >
                <span className="material-icons text-3xl hover:text-gray-200 transition-colors duration-300">
                  shopping_cart
                </span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <FlyoutCart
                isOpen={isCartOpen}
                onClose={() => setCartOpen(false)}
              />
            </li>
            {session ? (
              <>
                <li>
                  <span className="font-medium">
                    Welcome, {session.user.name}!
                  </span>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => signIn()}
                  className="bg-white text-green-600 px-4 py-2 rounded hover:bg-gray-200 transition-colors duration-300"
                >
                  Sign In
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
