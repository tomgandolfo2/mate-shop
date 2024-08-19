"use client";

import React, { useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/offer1.jpg",
    title: "Special Offer 1",
    description: "Get 20% off on all yerba mate products!",
  },
  {
    id: 2,
    image: "/images/offer2.jpg",
    title: "Bundle Deal",
    description: "Buy 3 packs, get 1 free!",
  },
  {
    id: 3,
    image: "/images/offer3.jpg",
    title: "Free Shipping",
    description: "Free shipping on orders over $50.",
  },
];

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-10">
      <div className="overflow-hidden rounded-lg">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-64 object-contain" // Changed from object-cover to object-contain
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
          <h3 className="text-2xl">{slides[currentSlide].title}</h3>
          <p>{slides[currentSlide].description}</p>
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-r-lg"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-l-lg"
      >
        &#10095;
      </button>
    </div>
  );
}
