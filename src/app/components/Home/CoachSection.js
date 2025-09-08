"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faVideo, faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/contexts/ModalContext"; 
import { useAuth } from "@/contexts/AuthContext"; 

const DoctorsSection = ({ poppins, fetchCoaches }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const router = useRouter();
  const { openLogin, openSignup } = useModal();
  const { isAuthenticated, token } = useAuth(); // Use AuthContext

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  const PAID_COACH_IDS = [
    "67efda37e6e95655b525b82f",
    "67ee6ffce6e95655b525a75d",
    "681c58a244d01de413649c15",
  ];

  useEffect(() => {
    if (fetchCoaches && mounted) {
      loadFeaturedDoctors();
    }
  }, [fetchCoaches, mounted, isAuthenticated]); // Add isAuthenticated to dependencies

  const loadFeaturedDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowLoginPrompt(false);

      if (!isAuthenticated || !token) {
        console.log("No valid token found, showing login prompt");
        setShowLoginPrompt(true);
        setLoading(false);
        return;
      }

     
      const response = await fetchCoaches(1, 50, token); 
     

      if (!response || !response.success) {
        if (
          response?.status === 401 ||
          response?.message?.toLowerCase().includes("unauthorized") ||
          response?.message?.toLowerCase().includes("login") ||
          response?.message?.toLowerCase().includes("authentication") ||
          response?.message?.toLowerCase().includes("token")
        ) {
          console.log("Authentication error detected, showing login prompt");
          setShowLoginPrompt(true);
          setError(null);
          return;
        }
        throw new Error(response?.message || "Failed to fetch featured doctors");
      }

      let doctorsData;
      if (response.data) {
        if (Array.isArray(response.data)) {
          doctorsData = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          doctorsData = response.data.data;
        } else {
          doctorsData = [];
        }
      } else {
        doctorsData = [];
      }

      if (doctorsData.length === 0) {
        console.warn("No doctors data received from API");
        setDoctors([]);
        setError("No coaches available at the moment");
        return;
      }

      const mappedDoctors = doctorsData.map((doctor) => ({
        _id: doctor._id,
        name: doctor.coachName,
        profilePicture: doctor.profilePhoto,
        specialization: doctor.specialization,
        experience: doctor.experienceYear,
        rating: doctor.rating,
        fees: Math.round(doctor.pricePerMinute * doctor.sessionTime),
        consultationModes: ["video", "home"],
        isPaid: PAID_COACH_IDS.includes(doctor._id),
      }));

      const paidCoaches = mappedDoctors.filter((doctor) => doctor.isPaid);
      const unpaidCoaches = mappedDoctors.filter((doctor) => !doctor.isPaid);
      const featuredDoctors = [
        ...paidCoaches,
        ...unpaidCoaches.slice(0, Math.max(0, 4 - paidCoaches.length)),
      ].slice(0, 4);

      setDoctors(featuredDoctors);
      setError(null);
      setShowLoginPrompt(false);
    } catch (error) {
      console.error("Error in loadFeaturedDoctors:", error);
      const errorMessage = error.message?.toLowerCase() || "";
      if (
        errorMessage.includes("401") ||
        errorMessage.includes("unauthorized") ||
        errorMessage.includes("login") ||
        errorMessage.includes("authentication") ||
        errorMessage.includes("token")
      ) {
        setShowLoginPrompt(true);
        setError(null);
      } else {
        setError(error.message);
        setShowLoginPrompt(false);
      }
      setDoctors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCoachClick = (coachId) => {
    if (mounted && router) {
      try {
        router.push(`/coaches/${coachId}`);
      } catch (error) {
        console.error("Navigation error:", error);
        if (typeof window !== "undefined") {
          window.location.href = `/coaches/${coachId}`;
        }
      }
    }
  };

  const handleLoginClick = () => {
    setShowLoginPrompt(false);
    openLogin();
  };

  const handleSignupClick = () => {
    setShowLoginPrompt(false);
    openSignup();
  };

  const formatRating = (rating) => {
    return rating ? parseFloat(rating).toFixed(1) : "4.5";
  };

  // Loading timeout
  useEffect(() => {
    if (!mounted) return;

    const timeout = setTimeout(() => {
      if (loading) {
        console.error("Loading timeout - checking if auth issue");
        setLoading(false);
        setShowLoginPrompt(true);
      }
    }, 10000);

    return () => clearTimeout(timeout);
  }, [loading, mounted]);

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${poppins?.className || ''} text-3xl sm:text-5xl font-bold text-gray-900 mb-4`}>
              Our Trusted <span className="text-[#C42323]">Coaches</span>
            </h2>
            <p className={`${poppins?.className || ''} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Qualified and experienced healthcare professionals
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="text-center mb-4 space-y-2">
                  <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mx-auto" />
                  <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mx-auto" />
                  <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse mx-auto" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded-lg animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const mockDoctors = [
    {
      _id: "demo1",
      name: "Dr. Sarah Johnson",
      profilePicture: "/images/devdoot-round.png",
      specialization: "Cardiologist",
      experience: "15",
      rating: "4.8",
      fees: 500,
      consultationModes: ["video"],
      isPaid: true,
    },
    {
      _id: "demo2",
      name: "Dr. Michael Chen",
      profilePicture: "/images/devdoot-round.png",
      specialization: "Neurologist",
      experience: "12",
      rating: "4.9",
      fees: 450,
      consultationModes: ["video"],
      isPaid: true,
    },
    {
      _id: "demo3",
      name: "Dr. Emily Davis",
      profilePicture: "/images/devdoot-round.png",
      specialization: "Dermatologist",
      experience: "10",
      rating: "4.7",
      fees: 350,
      consultationModes: ["video"],
      isPaid: false,
    },
    {
      _id: "demo4",
      name: "Dr. Robert Wilson",
      profilePicture: "/images/devdoot-round.png",
      specialization: "Psychiatrist",
      experience: "18",
      rating: "4.9",
      fees: 600,
      consultationModes: ["video"],
      isPaid: false,
    },
  ];

  if (showLoginPrompt) {
    return (
      <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className={`${poppins?.className || ''} text-3xl sm:text-5xl font-bold text-gray-900 mb-4`}>
              Our Trusted <span className="text-[#C42323]">Coaches</span>
            </h2>
            <p className={`${poppins?.className || ''} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Qualified and experienced healthcare professionals
            </p>
          </div>

          <div className="relative">
            <div className="filter blur-sm pointer-events-none select-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {mockDoctors.map((doctor) => (
                  <div
                    key={doctor._id}
                    className="bg-white rounded-2xl shadow-md p-6 group"
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-100">
                        <img
                          src={doctor.profilePicture}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="text-center mb-4">
                      <h3 className={`${poppins?.className || ''} text-lg font-semibold text-gray-900 mb-1`}>
                        {doctor.name}
                      </h3>
                      <p className={`${poppins?.className || ''} text-sm text-gray-600 mb-3`}>
                        {doctor.specialization}
                      </p>
                      <p className={`${poppins?.className || ''} text-xs text-blue-600 font-medium`}>
                        {doctor.experience} years experience
                      </p>
                    </div>
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <FontAwesomeIcon
                            key={i}
                            icon={faStar}
                            className={`w-4 h-4 ${
                              i < Math.floor(parseFloat(formatRating(doctor.rating)))
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className={`${poppins?.className || ''} text-sm text-gray-600 ml-2`}>
                          {formatRating(doctor.rating)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          poppins?.className || ''
                        } bg-green-100 text-green-700`}
                      >
                        <FontAwesomeIcon icon={faVideo} className="mr-1 w-3 h-3" />
                        Video
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          poppins?.className || ''
                        } bg-purple-100 text-purple-700`}
                      >
                        ₹{doctor.fees}
                      </span>
                    </div>
                    <button
                      className={`${poppins?.className || ''} w-full bg-[#3fa4aa] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2`}
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Book Appointment</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-2xl border border-gray-200 max-w-md mx-4 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-14 h-14 mx-auto mb-5 bg-[#2C8C91] rounded-full flex items-center justify-center shadow-lg"
                >
                  <FontAwesomeIcon icon={faLock} className="text-white text-lg" />
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className={`${poppins?.className || ''} text-xl md:text-2xl font-bold text-gray-900 mb-3`}
                >
                  Login to View Our Coaches
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`${poppins?.className || ''} text-gray-600 mb-6 leading-relaxed text-sm`}
                >
                  Sign in to access detailed profiles, book consultations, and connect with our certified healthcare professionals.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3"
                >
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLoginClick}
                    className={`${poppins?.className || ''} w-full bg-[#2C8C91] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2`}
                  >
                    <span>Login to Continue</span>
                    <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignupClick}
                    className={`${poppins?.className || ''} w-full border-2 border-[#2C8C91] text-[#2C8C91] hover:bg-[#2C8C91] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm`}
                  >
                    Create New Account
                  </motion.button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className={`${poppins?.className || ''} text-xs text-gray-500 mt-5`}
                >
                  New to our platform?{" "}
                  <button
                    onClick={handleSignupClick}
                    className="text-[#2C8C91] hover:text-blue-700 font-medium cursor-pointer"
                  >
                    Sign up for free
                  </button>
                </motion.p>
              </motion.div>
            </div>
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
            <h2 className={`${poppins?.className || ''} text-3xl sm:text-5xl font-bold text-gray-900 mb-4`}>
              Our Trusted <span className="text-[#C42323]">Coaches</span>
            </h2>
            <p className={`${poppins?.className || ''} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Qualified and experienced healthcare professionals
            </p>
          </div>
          <div className="text-center text-red-600">
            {error}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className={`${poppins?.className || ''} text-3xl sm:text-5xl font-bold text-gray-900 mb-4`}>
            Our Trusted <span className="text-[#C42323]">Coaches</span>
          </h2>
          <p className={`${poppins?.className || ''} text-lg text-gray-600 max-w-2xl mx-auto`}>
            Qualified and experienced healthcare professionals
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-2xl shadow-md p-6 group hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => handleCoachClick(doctor._id)}
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-100">
                  <img
                    src={doctor.profilePicture}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {doctor.isPaid && (
                  <div className="absolute top-0 right-0 bg-[#C42323] text-white text-xs font-semibold px-2 py-1 rounded-full">
                    Premium
                  </div>
                )}
              </div>
              <div className="text-center mb-4">
                <h3 className={`${poppins?.className || ''} text-lg font-semibold text-gray-900 mb-1`}>
                  {doctor.name}
                </h3>
                <p className={`${poppins?.className || ''} text-sm text-gray-600 mb-3`}>
                  {doctor.specialization}
                </p>
                <p className={`${poppins?.className || ''} text-xs text-blue-600 font-medium`}>
                  {doctor.experience} years experience
                </p>
              </div>
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className={`w-4 h-4 ${
                        i < Math.floor(parseFloat(formatRating(doctor.rating)))
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className={`${poppins?.className || ''} text-sm text-gray-600 ml-2`}>
                    {formatRating(doctor.rating)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {doctor.consultationModes.includes("video") && (
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      poppins?.className || ''
                    } bg-green-100 text-green-700`}
                  >
                    <FontAwesomeIcon icon={faVideo} className="mr-1 w-3 h-3" />
                    Video
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    poppins?.className || ''
                  } bg-purple-100 text-purple-700`}
                >
                  ₹{doctor.fees}
                </span>
              </div>
              <button
                className={`${poppins?.className || ''} w-full bg-[#3fa4aa] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 hover:bg-[#2C8C91] transition-all duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCoachClick(doctor._id);
                }}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                  />
                </svg>
                <span>Book Appointment</span>
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link href="/coaches">
            <button
              className={`${poppins?.className || ''} bg-[#C42323] text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg`}
            >
              View All Coaches
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;