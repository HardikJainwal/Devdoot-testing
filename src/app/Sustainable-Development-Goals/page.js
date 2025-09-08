"use client";

import Image from "next/image";
import React from "react";

const SDGPage = () => {
  const goals = [
    {
      id: 3,
      title: "Good Health and Well-Being",
      description:
        "Our virtual coaches deliver health education in nutrition, fitness, and lifestyle while first-aid training programs equip communities with vital skills. These efforts promote lifelong learning and sustainable development knowledge.",
      img: "/images/SDG3.jpg",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 4,
      title: "Quality Education",
      description:
        "Our virtual coaches deliver health education in nutrition, fitness, and lifestyle while first-aid training programs equip communities with vital skills. These efforts promote lifelong learning and sustainable development knowledge.",
      img: "/images/SDG4.webp",
      gradient: "from-red-500 to-rose-600",
    },
    {
      id: 5,
      title: "Gender Equality",
      description:
        "Devdoot’s inclusive platform ensures equal access to healthcare and caregiving for all genders. Virtual coaching and Care Match empower women with resources and opportunities, fostering gender equity in health and community roles.",
      img: "/images/SDG5.jpg",
      gradient: "from-orange-500 to-amber-600",
    },
    {
      id: 6,
      title: "Clean Water and Sanitation",
      description:
        "Through health education, we raise awareness about hygiene and clean water’s role in preventing disease. First-aid training addresses waterborne illness management and supporting sustainable sanitation practices. ",
      img: "/images/SDG6.jpg",
      gradient: "from-cyan-500 to-blue-600",
    },
    {
      id: 10,
      title: "Reduced Inequalities",
      description:
        "Our affordable services reach underserved rural and urban populations, leveling healthcare access. From pet care to elderly support, we cater to diverse needs, reducing disparities in care.",
      img: "/images/SDG10.jpg",
      gradient: "from-pink-500 to-purple-600",
    },
    {
      id: 11,
      title: "Sustainable Cities and Communities",
      description:
        "First-aid training and emergency services enhance community resilience, reducing disaster impacts. Our platform supports safe, sustainable living, whether in cities or rural areas.",
      img: "/images/SDG11.webp",
      gradient: "from-orange-400 to-yellow-500",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="relative w-full h-72 md:h-96 overflow-hidden">
        <Image
          src="/images/Form-cover-Picture.webp"
          alt="Sustainable Development Goals Banner"
          fill
          priority
          className="object-cover scale-105 hover:scale-100 transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent">
            <div className="flex flex-col justify-center items-start h-full px-4 md:px-8 lg:px-12">
              <div className="max-w-2xl">
                <h1 className="text-3xl md:text-6xl font-black text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Sustainable
                  </span>
                  <br />
                  <span className="text-white">Development Goals</span>
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-medium leading-relaxed">
                  Devdoot&apos;s Commitment to Sustainable Development Goals
                </p>

                <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mt-4 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
            <span className="text-gray-800">Devdoot&apos;s Commitment to</span>
            <br />
            <span className="bg-[#C42323] bg-clip-text text-transparent">
              Sustainable Development Goals
            </span>
          </h1>

          <div className="w-32 h-1 bg-[#C42323] mx-auto mb-8 rounded-full"></div>
        </div>

        <div className="max-w-5xl mx-auto mb-20">
          <p className="text-center text-gray-700 text-lg md:text-xl leading-relaxed mb-8 font-medium">
            At Devdoot, we believe healthcare is a cornerstone of sustainable
            progress. Our innovative services align with the United
            Nations&apos; Sustainable Development Goals (SDGs), a global
            framework to create a better future by 2030. Below, we showcase how
            Devdoot contributes to{" "}
            <span className="font-bold text-[#C42323]">
              Good Health and Well-being (SDG 3), Quality Education (SDG 4),
              Gender Equality (SDG 5), Clean Water and Sanitation (SDG 6),
              Reduced Inequalities (SDG 10), and Sustainable Cities and
              Communities (SDG 11)
            </span>
            , driving impact across India.
          </p>
        </div>

        <h2 className="text-center text-3xl md:text-4xl font-bold text-gray-800 mb-16">
          Our Commitment to
          <span className="text-[#C42323]"> Sustainable Development Goals</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl border border-white/50 overflow-hidden transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${goal.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}
              ></div>

              <div className="relative p-8">
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${goal.gradient} rounded-full blur-xl opacity-30 scale-150 group-hover:opacity-50 transition-opacity duration-300`}
                    ></div>
                    <div className="relative  rounded-full p-4 duration-300">
                      <Image
                        src={goal.img}
                        alt={goal.title}
                        width={96}
                        height={96}
                        className="object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mb-4">
                  <span
                    className={`inline-block bg-gradient-to-r ${goal.gradient}  text-white text-sm px-4 py-2 rounded-full `}
                  >
                    SDG {goal.id}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center leading-tight">
                  {goal.title}
                </h3>

                <p className="text-gray-600 text-base leading-relaxed text-center">
                  {goal.description}
                </p>

                <div
                  className={`w-16 h-1 bg-gradient-to-r ${goal.gradient} mx-auto mt-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-20">
          <div className="w-64 h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default SDGPage;
