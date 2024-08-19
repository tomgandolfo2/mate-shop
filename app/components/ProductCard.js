"use client";

import React from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="w-full h-48 flex items-center justify-center overflow-hidden cursor-pointer relative">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-full max-w-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-25 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <p className="text-white text-lg font-semibold">Quick View</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-gray-800">
            {product.name}
          </h3>
          <p className="mt-2 text-gray-600 line-clamp-2">
            {product.description}
          </p>
          <p className="mt-4 text-lg font-bold text-green-600">
            {product.price}
          </p>
        </div>
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg transform hover:bg-green-600 transition-colors duration-300">
          View Details
        </button>
      </Link>
    </div>
  );
}
