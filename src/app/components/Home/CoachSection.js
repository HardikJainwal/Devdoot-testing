import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo, faLock, faUserShield, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const DoctorsSection = ({ poppins, fetchCoaches }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const router = useRouter();

  // Ensure component is mounted on client side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fixed PAID_COACH_IDS array
  const PAID_COACH_IDS = ['67efda37e6e95655b525b82f', '67ee6ffce6e95655b525a75d', '681c58a244d01de413649c15'];

  useEffect(() => {
    if (fetchCoaches && mounted) {
      loadFeaturedDoctors();
    }
  }, [fetchCoaches, mounted]);

  const loadFeaturedDoctors = async () => {
    try {
      setLoading(true);
      setError(null);
      setShowLoginPrompt(false);
      
      console.log('Starting to fetch coaches...');
      const response = await fetchCoaches(1, 50);
      console.log('API Response:', response);

      if (!response || !response.success) {
        // Check if it's an authentication error
        if (response?.status === 401 || response?.message?.includes('401') || 
            response?.message?.toLowerCase().includes('unauthorized') ||
            response?.message?.toLowerCase().includes('login') ||
            response?.message?.toLowerCase().includes('authentication')) {
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
        console.warn('No doctors data received from API');
        setDoctors([]);
        setError('No coaches available at the moment');
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

      // Filter paid and unpaid coaches
      const paidCoaches = mappedDoctors.filter(doctor => doctor.isPaid);
      const unpaidCoaches = mappedDoctors.filter(doctor => !doctor.isPaid);

      // Prioritize paid coaches, then fill with unpaid ones
      const featuredDoctors = [
        ...paidCoaches, 
        ...unpaidCoaches.slice(0, Math.max(0, 4 - paidCoaches.length))
      ].slice(0, 4);

      setDoctors(featuredDoctors);
      setError(null);
      setShowLoginPrompt(false);
    } catch (error) {
      console.error('Error in loadFeaturedDoctors:', error);
      
      // Check if error message suggests authentication issue
      const errorMessage = error.message?.toLowerCase() || '';
      if (errorMessage.includes('401') || 
          errorMessage.includes('unauthorized') || 
          errorMessage.includes('login') || 
          errorMessage.includes('authentication') ||
          errorMessage.includes('token')) {
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
    // Only navigate if component is mounted and we have a router
    if (mounted && router) {
      try {
        router.push(`/coaches/${coachId}`);
      } catch (error) {
        console.error('Navigation error:', error);
        // Fallback to window.location if router fails
        if (typeof window !== 'undefined') {
          window.location.href = `/coaches/${coachId}`;
        }
      }
    }
  };

  const handleLoginClick = () => {
    if (mounted && router) {
      try {
        router.push('/signin');
      } catch (error) {
        console.error('Navigation error:', error);
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
    }
  };

  const formatRating = (rating) => {
    return rating ? parseFloat(rating).toFixed(1) : "4.5";
  };

  // Loading timeout
  useEffect(() => {
    if (!mounted) return;
    
    const timeout = setTimeout(() => {
      if (loading) {
        console.error('Loading timeout - checking if auth issue');
        setLoading(false);
        // Assume it might be an auth issue after timeout
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

  // Mock data for demo cards when login is required
  const mockDoctors = [
    {
      _id: 'demo1',
      name: 'Dr. Sarah Johnson',
      profilePicture: '/images/devdoot-round.png',
      specialization: 'Cardiologist',
      experience: '15',
      rating: '4.8',
      fees: 500,
      consultationModes: ['video'],
      isPaid: true,
    },
    {
      _id: 'demo2',
      name: 'Dr. Michael Chen',
      profilePicture: '/images/devdoot-round.png',
      specialization: 'Neurologist',
      experience: '12',
      rating: '4.9',
      fees: 450,
      consultationModes: ['video'],
      isPaid: true,
    },
    {
      _id: 'demo3',
      name: 'Dr. Emily Davis',
      profilePicture: '/images/devdoot-round.png',
      specialization: 'Dermatologist',
      experience: '10',
      rating: '4.7',
      fees: 350,
      consultationModes: ['video'],
      isPaid: false,
    },
    {
      _id: 'demo4',
      name: 'Dr. Robert Wilson',
      profilePicture: '/images/devdoot-round.png',
      specialization: 'Psychiatrist',
      experience: '18',
      rating: '4.9',
      fees: 600,
      consultationModes: ['video'],
      isPaid: false,
    },
  ];

  // Show blurred cards with login overlay for authentication issues
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

          {/* Blurred Cards with Overlay */}
          <div className="relative">
            {/* Blurred Doctor Cards */}
            <div className="filter blur-sm pointer-events-none select-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {mockDoctors.map((doctor, index) => (
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
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${poppins?.className || ''} bg-green-100 text-green-700`}>
                        <FontAwesomeIcon icon={faVideo} className="mr-1 w-3 h-3" />
                        Video
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${poppins?.className || ''} bg-purple-100 text-purple-700`}>
                        ₹{doctor.fees}
                      </span>
                    </div>

                    <button className={`${poppins?.className || ''} w-full bg-[#3fa4aa] text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center space-x-2`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                      </svg>
                      <span>Book Appointment</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Login Overlay */}
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
      className="w-14 h-14 mx-auto mb-5 bg-[#2C8C91] to-indigo-600 rounded-full flex items-center justify-center shadow-lg"
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
        className={`${poppins?.className || ''} w-full bg-[#2C8C91] hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2`}
      >
        <span >Login to Continue</span>
        <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
      </motion.button>

      <Link href="/signup">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${poppins?.className || ''} w-full border-2 border-[#2C8C91] text-[#2C8C91] hover:bg-[#2C8C91] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm`}
        >
          Create New Account
        </motion.button>
      </Link>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
      className={`${poppins?.className || ''} text-xs text-gray-500 mt-5`}
    >
      New to our platform?{" "}
      <Link href="/signup" className="text-[#2C8C91] hover:text-blue-700 font-medium">
        Sign up for free
      </Link>
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
            <h2 className={`${poppins?.className || ''} text-3xl sm:text-4xl font-bold text-gray-900 mb-4`}>
              Our Trusted <span className="text-[#C42323]">Coaches</span>
            </h2>
            <p className={`${poppins?.className || ''} text-lg text-gray-600 max-w-2xl mx-auto`}>
              Qualified and experienced healthcare professionals
            </p>
          </div>
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 16.5C3.498 18.333 4.46 20 6 20z" />
              </svg>
            </div>
            <p className={`${poppins?.className || ''} text-red-600 mb-4`}>{error}</p>
            <button
              onClick={loadFeaturedDoctors}
              className={`${poppins?.className || ''} bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-300`}
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
          <h2 className={`${poppins?.className || ''} text-3xl sm:text-5xl font-bold text-gray-900 mb-4`}>
            Our Trusted <span className="text-[#C42323]">Coaches</span>
          </h2>
          <p className={`${poppins?.className || ''} text-lg text-gray-600 max-w-2xl mx-auto mb-4`}>
            Qualified and experienced healthcare professionals
          </p>
        </div>

        {doctors.length === 0 ? (
          <div className="text-center py-12">
            <p className={`${poppins?.className || ''} text-gray-600 mb-4`}>No coaches available at the moment.</p>
            <button
              onClick={loadFeaturedDoctors}
              className={`${poppins?.className || ''} bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg`}
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
              {doctors.slice(0, 4).map((doctor, index) => (
                <motion.div
                  key={doctor._id || index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 group cursor-pointer"
                  onClick={() => handleCoachClick(doctor._id)}
                >
                  <div className="relative mb-6">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-blue-100 group-hover:border-blue-300 transition-colors duration-300">
                      {doctor.profilePicture ? (
                        <img
                          src={doctor.profilePicture}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src="/images/devdoot-round.png"
                          alt={doctor.name || "Doctor"}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <h3 className={`${poppins?.className || ''} text-lg font-semibold text-gray-900 mb-1`}>
                      {doctor.name || "Dr. Name"}
                    </h3>
                    <p className={`${poppins?.className || ''} text-sm text-gray-600 mb-3`}>
                      {doctor.specialization || "General Physician"}
                    </p>
                    <p className={`${poppins?.className || ''} text-xs text-blue-600 font-medium`}>
                      {doctor.experience ? `${doctor.experience} years` : "10+ years"} experience
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
                    {doctor.consultationModes?.includes("video") && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${poppins?.className || ''} bg-green-100 text-green-700`}>
                        <FontAwesomeIcon icon={faVideo} className="mr-1 w-3 h-3" />
                        Video
                      </span>
                    )}

                    {doctor.fees && (
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${poppins?.className || ''} bg-purple-100 text-purple-700`}>
                        ₹{doctor.fees}
                      </span>
                    )}
                  </div>

                  <button
                    className={`${poppins?.className || ''} w-full bg-[#3fa4aa] hover:bg-[#3fa4aa] text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 group-hover:shadow-md flex items-center justify-center space-x-2`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCoachClick(doctor._id);
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z" />
                    </svg>
                    <span>Book Appointment</span>
                  </button>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/coaches">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`${poppins?.className || ''} bg-[#3fa4aa] hover:bg-[#3fa4aa] text-white py-3 px-8 rounded-full font-medium transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2 mx-auto`}
                >
                  <span>View All Coaches</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default DoctorsSection;