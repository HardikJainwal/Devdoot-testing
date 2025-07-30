'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVideo, faHouse, faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchCoaches } from '@/lib/api/coaches';

import {
  faAmbulance,
  faUserMd,
  faVial,
  faPills,
  faPlus,
  faQuoteLeft,
  faCheckCircle,
  faUsers,
  faHeadset,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  Ambulance,
  UserCheck,
  Video,
  TestTube,
  Pill,
  Plus,
  ArrowRight,
  PawPrint,
  Clock,
  MapPin,
  Heart, 
    Star, CheckCircle ,
} from "lucide-react";

const poppins = Poppins({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const steps = [
  {
    number: 1,
    title: "Choose Your Service",
    desc: "Browse and select from a wide range of healthcare solutions including doctor consultations, emergency assistance, lab tests, medicine delivery, pet care, and more..",
  },
  {
    number: 2,
    title: "Book Instantly",
    desc: "Pick your preferred date, time, and location. Enjoy seamless booking with secure online payment or opt for cash on delivery.",
  },
  {
    number: 3,
    title: "Get Care, Anytime, Anywhere",
    desc: "Whether at home, in a clinic, or via video consultation receive trusted medical services exactly how and where you need them.",
  },
];

const medicalServices = [
  {
    icon: Ambulance,
    title: "Emergency",
    desc: "Immediate medical transport with trained paramedics",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
    buttonText: "Book Now",
    badge: "24/7 Available",
  },
  {
    icon: UserCheck,
    title: "Doctor at Home",
    desc: "Qualified doctors available for home visits",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    buttonText: "Schedule Visit",
    badge: "Same Day",
  },
  {
    icon: Video,
    title: "Video Consultation",
    desc: "Consult specialists from the comfort of your home",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    buttonText: "Start Consultation",
    badge: "Instant",
  },
  {
    icon: TestTube,
    title: "Home Diagnostics",
    desc: "Sample collection and lab tests at your location",
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
    buttonText: "Book Tests",
    badge: "Free Collection",
  },
  {
    icon: PawPrint,
    title: "PetWell",
    desc: "Trusted health services and wellness support for your furry friends.",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    buttonText: "Explore Pet Care",
    badge: "Vet Approved",
  },
  {
    icon: Plus,
    title: "Other Services",
    desc: "Pet care, medical equipment rentals, and more",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50",
    buttonText: "Explore Now",
    badge: "Coming Soon",
  },
];

const DoctorsSection = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    loadFeaturedDoctors();
  }, []);

  const loadFeaturedDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetchCoaches(1, 12);
      
      if (!response || !response.success) {
        throw new Error(response?.message || 'Failed to fetch featured doctors');
      }

      let doctorsData;
      
      if (response.data) {
        if (Array.isArray(response.data)) {
          doctorsData = response.data;
        }
        else if (response.data.data && Array.isArray(response.data.data)) {
          doctorsData = response.data.data;
        }
        else {
          doctorsData = [];
        }
      } else {
        doctorsData = [];
      }

      const mappedDoctors = doctorsData.map(doctor => ({
        _id: doctor._id,
        name: doctor.coachName, 
        profilePicture: doctor.profilePhoto, 
        specialization: doctor.specialization,
        experience: doctor.experienceYear, 
        rating: doctor.rating,
        fees: Math.round(doctor.pricePerMinute * doctor.sessionTime), 
        consultationModes: ['video', 'home'], 
        isOnline: true 
      }));

      const featuredDoctors = mappedDoctors.slice(0, 4);
      
      setDoctors(featuredDoctors);
      setError(null);
      
    } catch (error) {
      setError(error.message);
      setDoctors([]); 
    } finally {
      setLoading(false);
    }
  };

  // Function to handle coach card click
  const handleCoachClick = (coachId) => {
    router.push(`/doctors/${coachId}`);
  };

  const getInitials = (name) => {
    if (!name) return 'DR';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatRating = (rating) => {
    return rating ? parseFloat(rating).toFixed(1) : '4.5';
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}>
              Our Trusted Coaches
            </h2>
            <p className={`${poppins.className} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Qualified and experienced healthcare professionals
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md p-6 border border-gray-100"
              >
                {/* Doctor Image Shimmer */}
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 animate-pulse" />
                  <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Doctor Info Shimmer */}
                <div className="text-center mb-4 space-y-2">
                  <div className={`${poppins.className} h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto`} />
                  <div className={`${poppins.className} h-5 w-1/2 bg-gray-200 rounded animate-pulse mx-auto`} />
                  <div className={`${poppins.className} h-4 w-1/3 bg-gray-200 rounded animate-pulse mx-auto`} />
                </div>

                {/* Rating Shimmer */}
                <div className="flex items-center justify-center mb-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse" />
                    ))}
                    <div className={`${poppins.className} h-4 w-8 bg-gray-200 rounded animate-pulse ml-2`} />
                  </div>
                </div>

                {/* Services Shimmer */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`${poppins.className} h-6 w-16 bg-gray-200 rounded-full animate-pulse`}
                    />
                  ))}
                </div>

                {/* Button Shimmer */}
                <div className={`${poppins.className} h-10 w-full bg-gray-200 rounded-lg animate-pulse`} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}>
              Our Trusted Doctors
            </h2>
            <p className={`${poppins.className} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Qualified and experienced healthcare professionals
            </p>
          </div>
          <div className="text-center py-12">
            <p className={`${poppins.className} text-red-600 mb-4`}>{error}</p>
            <button
              onClick={loadFeaturedDoctors}
              className={`${poppins.className} bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg`}
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`${poppins.className} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}>
            Our Trusted Coaches
          </h2>
          <p className={`${poppins.className} text-lg text-gray-600 max-w-2xl mx-auto`}>
            Qualified and experienced healthcare professionals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.slice(0, 4).map((doctor, index) => (
            <motion.div
              key={doctor._id || index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer"
              onClick={() => handleCoachClick(doctor._id)} // Add click handler to entire card
            >
              {/* Doctor Image */}
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-100 group-hover:border-blue-300 transition-colors duration-300">
                  {doctor.profilePicture ? (
                    <img
                      src={doctor.profilePicture}
                      alt={doctor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {getInitials(doctor.name)}
                      </span>
                    </div>
                  )}
                </div>
                {doctor.isOnline && (
                  <div className="absolute bottom-0 right-1/2 transform translate-x-1/2 translate-y-2">
                    <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                )}
              </div>

              {/* Doctor Info */}
              <div className="text-center mb-4">
                <h3 className={`${poppins.className} text-lg font-semibold text-gray-900 mb-1`}>
                  {doctor.name || 'Dr. Name'}
                </h3>
                <p className={`${poppins.className} text-sm text-gray-600 mb-3`}>
                  {doctor.specialization || 'General Physician'}
                </p>
                <p className={`${poppins.className} text-xs text-blue-600 font-medium`}>
                  {doctor.experience ? `${doctor.experience} years` : '10+ years'} experience
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(formatRating(doctor.rating)))
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className={`${poppins.className} text-sm text-gray-600 ml-2`}>
                    {formatRating(doctor.rating)}
                  </span>
                </div>
              </div>

              {/* Services */}
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {doctor.consultationModes?.includes('video') && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${poppins.className} bg-green-100 text-green-700`}>
                    <FontAwesomeIcon icon={faVideo} className="mr-1 w-3 h-3" />
                    Video
                  </span>
                )}
                
                {doctor.fees && (
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${poppins.className} bg-purple-100 text-purple-700`}>
                    ₹{doctor.fees}
                  </span>
                )}
              </div>

              {/* Book Appointment Button */}
              <button 
                className={`${poppins.className} w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 group-hover:shadow-md flex items-center justify-center space-x-2`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent card click when button is clicked
                  handleCoachClick(doctor._id);
                }}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Book Appointment</span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Doctors Button */}
        <div className="text-center mt-12">
          <Link href="/doctors">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${poppins.className} bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto`}
            >
              <span>View All Coaches</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const handleServiceClick = (service) => {
    console.log(`${service.title} clicked`);
  };

  return (
    <div className="w-full">
      {/* Banner Section */}
      <div
  className="relative min-h-[600px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[500px] w-full mb-32 sm:mb-20 md:mb-16"
  style={{
    background:
      "linear-gradient(90deg, rgba(0, 139, 139, 0.71) 0%, rgba(0, 165, 165, 0.18) 27.4%)",
  }}
>
  {/* Background Image - Hidden on mobile, visible on larger screens */}
  <div className="hidden sm:block absolute right-0 top-0 w-3/4 md:w-2/3 lg:w-1/2 h-full">
    <img
      src="/images/Banner.jpg"
      alt="Healthcare Banner"
      className="w-full h-full object-cover"
    />
  </div>

  {/* Mobile Background Image - Full width on mobile with overlay */}
  <div className="sm:hidden absolute inset-0">
    <img
      src="/images/Banner.jpg"
      alt="Healthcare Banner"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
    <div className="flex items-start sm:items-center min-h-[400px] sm:min-h-[350px] md:min-h-[400px] lg:min-h-[300px]">
      <div className="w-full lg:w-1/2 pr-0 lg:pr-8 pb-40 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mt-2 mb-4">
          <span className="text-white sm:text-gray-900">Healthcare</span>
          <br />
          <span className="text-red-400 sm:text-red-600">on your terms</span>
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed max-w-md">
          <span className="text-gray-200 sm:text-gray-700">
            Book doctors, order medicines, schedule lab tests, and
            <br className="hidden sm:block" />
            access wellness services - all in one place.
          </span>
        </p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors w-full sm:w-auto text-sm sm:text-base">
            Book a service
          </button>
          <button className="bg-white/90 sm:bg-white text-red-600 px-6 py-3 font-medium rounded-lg hover:bg-white sm:hover:text-red-700 transition-colors w-full sm:w-auto border border-white/20 sm:border-gray-200 text-sm sm:text-base">
            Learn more
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Search Card - Positioned differently on mobile */}
  <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4 sm:px-6 lg:px-8 -bottom-16 sm:translate-y-1/2 sm:bottom-0">
    <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-4 sm:p-6 border border-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service
          </label>
          <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white">
            <option>Doctor Consultation</option>
            <option>Lab Tests</option>
            <option>Medicine Order</option>
            <option>Wellness Services</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location
          </label>
          <input
            type="text"
            placeholder="Enter your location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date & Time
          </label>
          <input
            type="text"
            placeholder="DD/MM/YYYY"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm bg-white"
          />
        </div>
        <div>
          <button className="w-full bg-teal-600 text-white p-3 rounded-lg font-medium hover:bg-teal-700 transition-colors text-sm lg:mt-0 mt-2">
            Find Services
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

      {/* Our Medical Services Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 mt-24">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
              Our Medical <span className="text-[#C42323]"> Services</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Comprehensive healthcare solutions tailored to your needs,
              delivered with care and precision
            </p>
          </div>

          {/* Services Grid - Single Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
            {medicalServices.map((service, idx) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={idx}
                  className={`group relative ${service.bgColor} rounded-2xl border border-white/50 shadow-sm hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 overflow-hidden min-h-80`}
                  onClick={() => handleServiceClick(service)}
                >
                 
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  />

                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col items-center justify-between text-center">
                    
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg  group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-bold text-gray-900 text-base mb-2 group-hover:text-gray-800 transition-colors line-clamp-2">
                        {service.title}
                      </h3>

                      <p className="text-gray-600 text-xs leading-tight mb-4 line-clamp-3">
                        {service.desc}
                      </p>
                    </div>

                    {/* Button */}
                    <button
                      className={`group/btn relative overflow-hidden bg-gradient-to-r ${service.color} text-white font-semibold py-2 px-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-1">
                        <span className="text-xs truncate">
                          {service.buttonText}
                        </span>
                        <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform duration-300 flex-shrink-0" />
                      </span>
                      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/btn:translate-x-0 transition-transform duration-500" />
                    </button>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 -translate-x-10 group-hover:-translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                  <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 translate-x-8 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
                </div>
              );
            })}
          </div>
        </div>

        <style jsx>{`
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}</style>
      </div>

      {/* How Devdoot Works Section */}
      <div className="bg-gradient-to-r from-[#246e72] via-[#2C8C91] to-[#3fa4aa] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2
            className={`${poppins.className} text-3xl sm:text-4xl font-bold text-white mb-4`}
          >
            How <span className ="text-[#C42323]">Devdoot</span> Works
          </h2>
          <p
            className={`${poppins.className} text-sm sm:text-base text-gray-600 mb-10`}
          >
            Access quality healthcare in just a few simple steps
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-18 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-[#e0f3f4]/70 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-[#2C8C91]/20"

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
      <section className="section-padding bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="mt-12 font-poppins text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
          Why Choose <span className="text-gradient text-[#C42323]">Devdoot?</span>
        </h2>
        <p className="font-poppins text-xl text-gray-600 mb-8">
         We’re not just a service platform — we are your dependable health and 
         wellness companion. At Devdoot, we simplify access to critical medical services, ensuring care reaches you when and where you need it most.
        </p>

        <div className="space-y-4">
          {[
            'Personalized care coordination for every individual and family',
            'Robust network of verified doctors, paramedics, labs, and health vendors',
            'Comprehensive solutions from emergency response to daily wellness needs',
            'Transparent pricing with no hidden charges',
            '24/7 real-time assistance via our app and helpline',
            'Support beyond emergencies including medical documentation, follow-ups, and virtual health coaching'
          ].map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center space-x-3 font-poppins"
            >
              <CheckCircle className="w-6 h-6 text-[#36A0A4] flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="glass-effect rounded-3xl p-8 shadow-2xl">
          <div className="relative w-full rounded-2xl overflow-hidden">
            <img  
              className="w-full h-80 md:h-96 object-cover"
              alt="Beautiful wedding ceremony setup by VK wedding planner & events" 
              src="/images/dummy.png" 
            />
          </div>
        </div>

        
      </motion.div>
    </div>
  </div>
</section>

      {/* Use the DoctorsSection component instead of duplicating the code */}
      <DoctorsSection />
      {/* Get the Devdoot App Section */}
      <section className="relative bg-gradient-to-r from-[#246e72] via-[#2C8C91] to-[#3fa4aa] px-4 sm:px-6 lg:px-8 overflow-hidden">
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
