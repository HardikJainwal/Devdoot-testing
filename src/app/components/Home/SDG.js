"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

const SDGGoalsSection = () => {
  const images = [
    "/images/SDG3.jpg",
    "/images/SDG4.webp",
    "/images/SDG5.jpg",
    "/images/SDG6.jpg",
    "/images/SDG10.jpg",
    "/images/SDG11.webp",
  ];

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-8 sm:py-12 md:py-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-4">
          <p className="text-gray-600 text-base sm:text-lg mb-2 font-medium">
            Driving Sustainable Development
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2">
            Devdoot&apos;s Commitment to
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C42323] mb-6 sm:mb-8">
            SDG Goals
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {images.map((src, index) => (
            <div
              key={index}
              className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md"
            >
              <Image
                src={src}
                alt={`SDG Goal ${index + 1}`}
                fill
                className="object-cover transform hover:scale-105 transition-all duration-300"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="text-center">
          <Link href="/Sustainable-Development-Goals">
            <button className="bg-[#C42323] mt-6 sm:mt-8 text-white font-semibold px-6 sm:px-8 py-2 sm:py-3 rounded-full text-base sm:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SDGGoalsSection;