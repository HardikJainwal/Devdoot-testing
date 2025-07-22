// components/HomePage.js
"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAmbulance,
  faUserMd,
  faVideo,
  faVial,
  faPills,
  faPlus,
  faStar,
  faQuoteLeft,
  faCheckCircle,
  faUsers,
  faHeadset,
  faArrowRight,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const steps = [
  {
    number: 1,
    title: "Choose Your Service",
    desc: "Select from doctor consultations, lab tests, medicine delivery, or other services.",
  },
  {
    number: 2,
    title: "Book Appointment",
    desc: "Select date, time and location. Pay securely online or choose cash on delivery.",
  },
  {
    number: 3,
    title: "Get Healthcare",
    desc: "Receive your service at home, clinic, or via video consultation as per your booking.",
  },
];
const services = [
    {
      icon: "fas fa-ambulance",
      title: "Emergency Services",
      desc: "24/7 emergency medical transport with trained paramedics and advanced life support",
      bgColor: "bg-red-50",
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      buttonBg: "bg-red-600",
      buttonHover: "hover:bg-red-700",
      buttonLabel: "Call Emergency",
      badge: "URGENT"
    },
    {
      icon: "fas fa-user-md",
      title: "Doctor at Home",
      desc: "Certified physicians available for comprehensive home consultations and treatments",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      buttonBg: "bg-blue-600",
      buttonHover: "hover:bg-blue-700",
      buttonLabel: "Book Appointment",
      badge: "POPULAR"
    },
    {
      icon: "fas fa-video",
      title: "Telemedicine",
      desc: "Connect with specialists worldwide through secure video consultations",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      buttonBg: "bg-green-600",
      buttonHover: "hover:bg-green-700",
      buttonLabel: "Start Video Call",
      badge: "INSTANT"
    },
    {
      icon: "fas fa-flask",
      title: "Lab & Diagnostics",
      desc: "Comprehensive lab tests, imaging, and diagnostic services at your doorstep",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      buttonBg: "bg-purple-600",
      buttonHover: "hover:bg-purple-700",
      buttonLabel: "Schedule Test",
      badge: "ACCURATE"
    },
    {
      icon: "fas fa-pills",
      title: "Pharmacy Delivery",
      desc: "Prescription medicines and healthcare products delivered within 2 hours",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      buttonBg: "bg-orange-600",
      buttonHover: "hover:bg-orange-700",
      buttonLabel: "Order Medicine",
      badge: "FAST"
    },
    {
      icon: "fas fa-heartbeat",
      title: "Specialized Care",
      desc: "Cardiology, neurology, pediatrics, and other specialized medical services",
      bgColor: "bg-pink-50",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-600",
      buttonBg: "bg-pink-600",
      buttonHover: "hover:bg-pink-700",
      buttonLabel: "Find Specialist",
      badge: "EXPERT"
    }
  ];

export default function Home() {
  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
        className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[450px] w-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(0, 139, 139, 0.71) 0%, rgba(0, 165, 165, 0.18) 27.4%)",
        }}
      >
        <div className="absolute right-0 top-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 h-full">
          <Image
            src="/images/Banner.jpg"
            alt="Healthcare Banner"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-10">
          <div className="flex items-center min-h-[200px] sm:min-h-[250px] md:min-h-[300px]">
            <div
              className={`${poppins.className} w-full lg:w-1/2 pr-0 lg:pr-8`}
            >
              <h1 className="text-2xl sm:text-4xl md:text-4xl lg:text-6xl font-bold text-gray-900 leading-[1.1] mt-2">
                Healthcare
                <br />
                <span className="text-red-600">on your terms</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
                Book doctors, order medicines, schedule lab tests, and
                <br />
                access wellness services - all in one place.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
                <button className="bg-red-600 text-white px-3 sm:px-5 py-2 sm:py-2.5 rounded font-medium hover:bg-red-700 transition-colors w-full sm:w-auto">
                  Book a service
                </button>
                <button className="bg-white text-red-600 px-3 sm:px-5 py-2 sm:py-2.5 font-medium rounded hover:text-red-700 transition-colors w-full sm:w-auto">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 sm:px-6 lg:px-8 translate-y-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-3 sm:p-4 border border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 items-end">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Service
                </label>
                <select className="w-full p-2 sm:p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs sm:text-sm">
                  <option>Doctor Consultation</option>
                  <option>Lab Tests</option>
                  <option>Medicine Order</option>
                  <option>Wellness Services</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter your location"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-600 mb-1">
                  Date & Time
                </label>
                <input
                  type="text"
                  placeholder="DD/MM/YYYY"
                  className="w-full p-2 sm:p-2.5 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs sm:text-sm"
                />
              </div>
              <div>
                <button className="w-full bg-teal-500 text-white p-2 sm:p-2.5 rounded font-medium hover:bg-teal-600 transition-colors text-xs sm:text-sm">
                  Find Services
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Medical Services Section */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 mt-24">
        <div className="max-w-7xl mx-auto text-center">
         <h2
  className={`${poppins.className} text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2`}
>
  Our Medical Services
</h2>

          <p
            className={`${poppins.className} text-sm sm:text-base text-gray-600 mb-6`}
          >
            Comprehensive healthcare solutions tailored to your needs, available
            24/7
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-items-center">
            {[
              {
                icon: faAmbulance,
                title: "Emergency",
                desc: "Immediate medical transport with trained paramedics",
                color: "red",
              },
              {
                icon: faUserMd,
                title: "Doctor at Home",
                desc: "Qualified doctors available for home visits",
                color: "blue",
              },
              {
                icon: faVideo,
                title: "Video Consultation",
                desc: "Consult specialists from the comfort of your home",
                color: "green",
              },
              {
                icon: faVial,
                title: "Home Diagnostics",
                desc: "Sample collection and lab tests at your location",
                color: "purple",
              },
              {
                icon: faPills,
                title: "Medicine Delivery",
                desc: "Prescription medicines delivered to your doorstep",
                color: "yellow",
              },
              {
                icon: faPlus,
                title: "Other Services",
                desc: "Pet care, medical equipment rentals, etc.",
                color: "red",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white hover:bg-gray-50 rounded-lg shadow-md p-4 text-center border border-gray-200 w-48 flex flex-col justify-between h-56 transition-all"
              >
                <div className="flex justify-center mb-2">
                  <FontAwesomeIcon
                    icon={service.icon}
                    className={`text-2xl text-${service.color}-600 bg-${service.color}-100 rounded-full p-2`}
                  />
                </div>
                <h3
                  className={`${poppins.className} text-sm font-medium text-gray-900 mb-1`}
                >
                  {service.title}
                </h3>
                <p
                  className={`${poppins.className} text-xs text-gray-600 mb-4`}
                >
                  {service.desc}
                </p>
                <button
                  className={`${poppins.className} text-xs text-${service.color}-600 hover:text-${service.color}-700 w-full py-1 rounded bg-${service.color}-100`}
                >
                  {service.title.includes("Doctor")
                    ? "Schedule Visit"
                    : service.title.includes("Emergency")
                    ? "Book Now"
                    : service.title.includes("Other")
                    ? "Explore Now"
                    : service.title.includes("Video")
                    ? "Start Consultation"
                    : service.title.includes("Medicine")
                    ? "Order Medicines"
                    : "Book Tests"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How Devdoot Works Section */}
      <div className="bg-[#f8f9fa] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}
          >
            How Devdoot Works
          </h2>
          <p
            className={`${poppins.className} text-sm sm:text-base text-gray-600 mb-10`}
          >
            Simple steps to access quality healthcare
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-18 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                <div className="bg-blue-100 text-blue-600 w-10 h-10 flex items-center justify-center rounded-full font-semibold mb-3 mx-auto">
                  {step.number}
                </div>
                <h3
                  className={`${poppins.className} text-sm font-semibold text-gray-900 mb-1`}
                >
                  {step.title}
                </h3>
                <p
                  className={`${poppins.className} text-xs sm:text-sm text-gray-600`}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <section className="bg-white py-10 px-4 sm:px-8 lg:px-16">
        <h2
          className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-8`}
        >
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left side with 5 cards (3 top, 2 bottom) */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* First row: 3 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                {
                  title: "Customized Health Programs",
                  desc: "We design programs tailored to the unique needs of your organization, school, or university.",
                },
                {
                  title: "Experienced Healthcare Professionals",
                  desc: "Our team of seasoned medical experts is committed to delivering top-tier services.",
                },
                {
                  title: "Proven Results",
                  desc: "Our services have a track record of enhancing health outcomes and lowering healthcare expenses.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="h-42 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 bg-gray-50 flex flex-col justify-between"
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-600">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Second row: 2 cards centered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-[90%] mx-auto">
              {[
                {
                  title: "24/7 Availability",
                  desc: "Our services are available around the clock to ensure continuous care and support.",
                },
                {
                  title: "Cutting-edge Technology",
                  desc: "We use advanced tools to streamline healthcare delivery and improve patient engagement.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="h-34 border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition duration-300 bg-gray-50 flex flex-col justify-between"
                >
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-blue-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center items-center">
            <div className="border-2 border-blue-500 rounded-xl overflow-hidden p-2">
              <Image
                src="/images/dummy.png"
                alt="Doctors illustration"
                width={350}
                height={450}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      {/* Our Trusted Doctors Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2
              className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}
            >
              Our Trusted Doctors
            </h2>
            <p
              className={`${poppins.className} text-lg text-gray-600 max-w-2xl mx-auto`}
            >
              Qualified and experienced healthcare professionals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                specialty: "Cardiologist",
                image: "/images/doctor1.jpg",
                rating: 4.8,
                services: ["Video Consult"],
                experience: "15+ years",
              },
              {
                name: "Dr. Michael Chen",
                specialty: "Pediatrician",
                image: "/images/doctor2.jpg",
                rating: 5.0,
                services: ["Video", "Home Visit"],
                experience: "12+ years",
              },
              {
                name: "Dr. Priya Patel",
                specialty: "Dermatologist",
                image: "/images/doctor3.jpg",
                rating: 4.2,
                services: ["Home Visit"],
                experience: "10+ years",
              },
              {
                name: "Dr. Robert Williams",
                specialty: "General Physician",
                image: "/images/doctor4.jpg",
                rating: 5.0,
                services: ["Video", "Home Visit"],
                experience: "18+ years",
              },
            ].map((doctor, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer"
              >
                {/* Doctor Image */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-100 group-hover:border-blue-300 transition-colors duration-300">
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {doctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="text-center mb-4">
                  <h3
                    className={`${poppins.className} text-lg font-semibold text-gray-900 mb-1`}
                  >
                    {doctor.name}
                  </h3>
                  <p
                    className={`${poppins.className} text-sm text-gray-600 mb-3`}
                  >
                    {doctor.specialty}
                  </p>
                  <p
                    className={`${poppins.className} text-xs text-blue-600 font-medium`}
                  >
                    {doctor.experience} experience
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(doctor.rating)
                            ? "text-yellow-400"
                            : i < doctor.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span
                      className={`${poppins.className} text-sm text-gray-600 ml-2`}
                    >
                      {doctor.rating}
                    </span>
                  </div>
                </div>

                {/* Services */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
  {doctor.services.map((service, idx) => (
    <span
      key={idx}
      className={`px-3 py-1 rounded-full text-xs font-medium ${poppins.className} ${
        service === "Video Consult" || service === "Video"
          ? "bg-green-100 text-green-700"
          : "bg-blue-100 text-blue-700"
      }`}
    >
      <FontAwesomeIcon
        icon={service === "Video Consult" || service === "Video" ? faVideo : faHouse}
        className="mr-1 w-3 h-3"
      />
      {service === "Video Consult" || service === "Video" ? "Video" : "Home Visit"}
    </span>
  ))}
</div>

                {/* Book Appointment Button */}
                <button
                  className={`${poppins.className} w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 group-hover:shadow-md flex items-center justify-center space-x-2`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Book Appointment</span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* View All Doctors Button */}
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${poppins.className} bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto`}
            >
              <span>View All Doctors</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </div>
        </div>
      </section>
      {/* Get the Devdoot App Section */}
      <section className="relative bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600  px-4 sm:px-6 lg:px-8 overflow-hidden">
  <div className="max-w-7xl mx-auto relative z-10">
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="lg:w-1/2 xl:w-2/5">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`${poppins.className} text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight`}
          >
            Get the Devdoot app
          </h2>
          <p
            className={`${poppins.className} text-lg text-white/90 mb-8 leading-relaxed`}
          >
            Download our mobile app for faster bookings, medicine orders,
            health records and more.
          </p>

          {/* App Store Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-8 h-8 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <div
                  className={`${poppins.className} text-xs text-gray-300`}
                >
                  Download on the
                </div>
                <div
                  className={`${poppins.className} text-lg font-semibold -mt-1`}
                >
                  App Store
                </div>
              </div>
            </motion.a>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center bg-black hover:bg-gray-800 text-white rounded-lg px-6 py-3 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-8 h-8 mr-3"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
              </svg>
              <div>
                <div
                  className={`${poppins.className} text-xs text-gray-300`}
                >
                  Get it on
                </div>
                <div
                  className={`${poppins.className} text-lg font-semibold -mt-1`}
                >
                  Google Play
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Image of hands holding mobile */}
      <div className="lg:w-1/2 xl:w-3/5 mt-20 lg:mt-0 lg:pl-10">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative mt-4 lg:mt-8"
        >
          <img
            src="images/mobile-download.png" 
            alt="Hands holding mobile with Devdoot app"
            className="w-full max-w-md mx-auto lg:max-w-lg xl:max-w-xl object-contain transform  lg:translate-x-30"
          />
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* What Our Patients Say Section */}

      {/* What Our Patients Say Section */}
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <div className="absolute top-8 right-16 w-16 h-20 bg-purple-400 rounded-lg transform rotate-12"></div>
          <div className="absolute top-16 right-32 w-12 h-12 bg-pink-400 rounded-full"></div>
          <div className="absolute top-4 right-8 w-8 h-8 bg-green-400 rounded-full"></div>
          <div className="absolute top-12 right-24 w-6 h-8 bg-blue-400 rounded-lg transform -rotate-12"></div>
          <div className="absolute top-20 right-12 w-4 h-4 bg-yellow-400 transform rotate-45"></div>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}
            >
              What Our Patients Say
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`${poppins.className} text-lg text-gray-600 max-w-2xl mx-auto`}
            >
              Trusted by thousands of happy customers
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Rodriguez",
                avatar: "ER",
                rating: 5,
                review:
                  "The doctor consultation was excellent. The video call quality was perfect and the doctor was very patient and knowledgeable. Got my prescription immediately after the call.",
                service: "Video Consultation",
                bgColor: "bg-red-500",
              },
              {
                name: "James Wilson",
                avatar: "JW",
                rating: 4.5,
                review:
                  "Medicine delivery was super fast! Ordered my prescription in the morning and got it by afternoon. The packaging was neat and they even included a small health tip card.",
                service: "Medicine Delivery",
                bgColor: "bg-blue-500",
              },
              {
                name: "Sarah Kim",
                avatar: "SK",
                rating: 5,
                review:
                  "Home sample collection for lab tests is a game changer! The technician was punctual, professional and made the process painless. Got my reports online within 24 hours.",
                service: "Lab Tests",
                bgColor: "bg-purple-500",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer border border-gray-100"
              >
                {/* Header with avatar and rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 ${testimonial.bgColor} rounded-full flex items-center justify-center text-white font-semibold`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3
                        className={`${poppins.className} font-semibold text-gray-900`}
                      >
                        {testimonial.name}
                      </h3>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`w-4 h-4 ${
                              i < Math.floor(testimonial.rating)
                                ? "text-yellow-400"
                                : i < testimonial.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {testimonial.service}
                  </span>
                </div>

                {/* Review text */}
                <div className="relative">
                  <FontAwesomeIcon
                    icon={faQuoteLeft}
                    className="absolute -top-2 -left-2 w-6 h-6 text-gray-300"
                  />
                  <p
                    className={`${poppins.className} text-gray-700 text-sm leading-relaxed pl-4`}
                  >
                    {testimonial.review}
                  </p>
                </div>

                {/* Verified badge */}
                <div className="flex items-center mt-4 pt-4 border-t border-gray-100">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="w-4 h-4 text-green-500 mr-2"
                  />
                  <span
                    className={`${poppins.className} text-xs text-gray-500`}
                  >
                    Verified Patient
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                number: "50,000+",
                label: "Happy Patients",
                icon: faUsers,
                color: "bg-blue-500",
              },
              {
                number: "1,200+",
                label: "Doctors",
                icon: faUserMd,
                color: "bg-green-500",
              },
              {
                number: "4.8/5",
                label: "Average Rating",
                icon: faStar,
                color: "bg-yellow-500",
              },
              {
                number: "24/7",
                label: "Support",
                icon: faHeadset,
                color: "bg-purple-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                  type: "spring",
                  stiffness: 120,
                  damping: 10,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="relative bg-gradient-to-br from-white to-blue-50 rounded-2xl p-6 border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div
                  className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${stat.color} rounded-full p-3 shadow-lg`}
                >
                  <FontAwesomeIcon
                    icon={stat.icon}
                    className="w-6 h-6 text-white"
                  />
                </div>
                <div
                  className={`${poppins.className} text-3xl font-bold text-blue-600 mt-6`}
                >
                  {stat.number}
                </div>
                <div
                  className={`${poppins.className} text-sm text-gray-700 font-medium`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="py-6 bg-gray-50"
        style={{ fontFamily: "Poppins, sans-serif" }}
      >
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Certified By
          </h2>

          {/* Certification Cards Container */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
              {/* ISO Certification */}
              <div className="flex flex-col items-center p-2 hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/iso.png"
                  alt="ISO Certification"
                  className="w-34 h-34 "
                />
              </div>

              {/* Ministry Certification */}
              <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/msme.png"
                  alt="Ministry Certification"
                  className="w-48 h-34"
                />
              </div>

              {/* Approved Certification */}
              <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300">
                <img
                  src="/images/govt-red.jpeg"
                  alt="Approved Certification"
                  className="w-34 h-34"
                />
              </div>

              {/* Government Approved */}
              <div className="flex flex-col items-center p-4 hover:scale-105 transition-transform duration-300">
                <img
                src="/images/GOV-APPROVED-STAMP.png"
                alt="Government Approved"
                className="w-34 h-34"
              />
              </div>
            </div>
          </div>
        </div>

        {/* Font import */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </section>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-50 rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
            {/* Left Content */}
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20 flex items-center">
              <div className="lg:self-center">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  <span className="block">Ready to take control of</span>
                  <span className="block text-blue-600">your healthcare?</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-gray-600">
                  Sign up today and get your first doctor consultation at 50%
                  off.
                </p>
                <div className="mt-8">
                  <a
                    href="#"
                    className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-md text-base font-medium hover:bg-blue-700 transition"
                  >
                    Get Started Now
                    <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="h-full w-full">
              <img
                className="h-full w-full object-cover object-left-top"
                src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                alt="Doctor with tablet"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
