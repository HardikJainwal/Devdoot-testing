import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Changed from 'next/router' to 'next/navigation'
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faVideo } from '@fortawesome/free-solid-svg-icons';

const DoctorsSection = ({ poppins, fetchCoaches }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
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
      
      console.log('Starting to fetch coaches...');
      const response = await fetchCoaches(1, 50);
      console.log('API Response:', response);

      if (!response || !response.success) {
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
    } catch (error) {
      console.error('Error in loadFeaturedDoctors:', error);
      setError(error.message);
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

  const formatRating = (rating) => {
    return rating ? parseFloat(rating).toFixed(1) : "4.5";
  };

  // Loading timeout
  useEffect(() => {
    if (!mounted) return;
    
    const timeout = setTimeout(() => {
      if (loading) {
        console.error('Loading timeout - forcing error state');
        setLoading(false);
        setError('Loading timeout. Please try again.');
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
            <p className={`${poppins?.className || ''} text-red-600 mb-4`}>{error}</p>
            <button
              onClick={loadFeaturedDoctors}
              className={`${poppins?.className || ''} bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg`}
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