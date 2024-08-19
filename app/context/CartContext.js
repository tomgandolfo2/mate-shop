"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [savedForLater, setSavedForLater] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize cart and saved items from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined" && !isInitialized) {
      const storedCart = localStorage.getItem("cart");
      const storedSavedItems = localStorage.getItem("savedForLater");

      if (storedCart) {
        console.log("Cart loaded from localStorage:", JSON.parse(storedCart));
        setCart(JSON.parse(storedCart));
      } else {
        console.log("No cart found in localStorage");
      }

      if (storedSavedItems) {
        console.log(
          "Saved items loaded from localStorage:",
          JSON.parse(storedSavedItems)
        );
        setSavedForLater(JSON.parse(storedSavedItems));
      } else {
        console.log("No saved items found in localStorage");
      }

      setIsInitialized(true); // Ensure initialization only happens once
    }
  }, [isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      console.log("Saving cart to localStorage:", cart);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      console.log("Saving saved items to localStorage:", savedForLater);
      localStorage.setItem("savedForLater", JSON.stringify(savedForLater));
    }
  }, [savedForLater, isInitialized]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const saveForLater = (productId) => {
    const productToSave = cart.find((product) => product.id === productId);
    if (productToSave) {
      setCart(cart.filter((product) => product.id !== productId));
      setSavedForLater([...savedForLater, productToSave]);
    }
  };

  const moveToCart = (productId) => {
    const productToMove = savedForLater.find(
      (product) => product.id === productId
    );
    if (productToMove) {
      setSavedForLater(
        savedForLater.filter((product) => product.id !== productId)
      );
      addToCart(productToMove);
    }
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) } // Prevents quantity going below 1
          : item
      );
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        savedForLater,
        addToCart,
        removeFromCart,
        saveForLater,
        moveToCart,
        updateCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
