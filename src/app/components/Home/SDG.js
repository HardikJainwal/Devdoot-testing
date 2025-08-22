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
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center py-4">
          <p className="text-gray-600 text-lg mb-2 font-medium ">
            Driving Sustainable Development
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Devdoot&apos;s Commitment to
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold text-[#C42323] mb-8">
            SDG Goals
          </h2>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          {images.map((src, index) => (
            <div key={index} className="relative w-full h-48 rounded-lg overflow-hidden shadow-md">
              <Image
                src={src}
                alt={`SDG Goal ${index + 1}`}
                fill
                className="object-cover transform hover:scale-105 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* Learn More Button */}
        <div className="text-center">
          <Link href="/Sustainable-Development-Goals">
            <button className="bg-[#C42323] mt-10 text-white font-semibold px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-red-300">
              Learn More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SDGGoalsSection;
