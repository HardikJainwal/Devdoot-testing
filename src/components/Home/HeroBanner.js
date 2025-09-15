"use client";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = [
  {
    img: "/banner/Health-package.webp",
    title: "Healthcare on your terms",
    subtitle: "Book doctors, order medicines, schedule lab tests, and more.",
  },
  {
    img: "/banner/Banner2.webp",
    title: "Expert Doctors Anytime",
    subtitle: "Connect with specialists through instant video consultations.",
  },
  {
    img: "/banner/Care-Camp.webp",
    title: "Trusted Home Care",
    subtitle: "Get medical services delivered at your doorstep.",
  },
  {
    img: "/banner/Coaches.webp",
    title: "Diagnostics Made Easy",
    subtitle: "Book lab tests with free home sample collection.",
  },
  {
    img: "/banner/Medical-Equipment-Rental-2.webp",
    title: "Wellness for Everyone",
    subtitle: "Explore personalized care for your health and lifestyle.",
  },
  {
    img: "/banner/Pet-Well-Add.webp",
    title: "Your Health, Our Priority",
    subtitle: "Comprehensive care solutions for every need.",
  },
];

const bannerSettings = {
  dots: true,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 800,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
};

export default function BannerCarousel() {
  return (
    <div className="relative w-full min-h-[650px] mb-12">
      <Slider {...bannerSettings} className="w-full h-full">
        {bannerImages.map((item, idx) => (
          <div
            key={idx}
            className="relative w-full h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px]"
          >
            <img
              src={item.img}
              alt={`Banner ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center text-center px-4">
              <div className="max-w-3xl">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                  {item.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6">
                  {item.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors text-sm sm:text-base">
                    Book a service
                  </button>
                  <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
