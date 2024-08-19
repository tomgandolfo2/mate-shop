import React from "react";
import ProductCard from "../components/ProductCard";
import products from "./products";

export default function ProductsPage() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-4xl font-bold mb-6 text-center">All Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
