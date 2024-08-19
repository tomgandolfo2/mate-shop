import React from "react";
import Carousel from "./components/Carousel";
import ProductCard from "./components/ProductCard";
import products from "./products/products";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <Carousel />
      <h2 className="text-4xl font-bold mb-6 text-center">Featured Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
