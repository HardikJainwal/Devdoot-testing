"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faHouse,
  faMapMarkerAlt,
  faCalendarAlt,
  faStar,
  faFilter,
  faHeart,
  faLanguage,
  faRupeeSign,
  faGraduationCap,
  faClock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
import { fetchCoaches } from "@/api/coaches";
import Shimmer from "../components/Shimmer";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function AllDoctorsPage() {
  const router = useRouter();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    specialization: "",
    language: "",
    priceRange: [0, 5000],
    experienceRange: [0, 25],
    rating: 0,
    country: "",
  });

  const [availableFilters, setAvailableFilters] = useState({
    specializations: [],
    languages: [],
    countries: [],
  });

  useEffect(() => {
    loadDoctors(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (doctors.length > 0) {
      extractFilterOptions();
    }
  }, [doctors]);

  const loadDoctors = async (page) => {
    try {
      setLoading(true);
      const response = await fetchCoaches(page, 10);

      if (!response || !response.success) {
        setError(response?.message || "Failed to load doctors");
        setLoading(false);
        return;
      }

      const doctorsData = response.data?.data || [];
      const totalCount = response.data?.total_results || 0;

      if (!Array.isArray(doctorsData)) {
        setError("Invalid data format received from API");
        setLoading(false);
        return;
      }

      const mappedDoctors = doctorsData.map((doctor, index) => ({
        _id: doctor._id || `doctor-${index}`,
        name: doctor.coachName || `Doctor ${index + 1}`,
        specialization: doctor.specialization,
        profilePicture: doctor.profilePhoto,
        experience: doctor.experienceYear || 5,
        rating: doctor.rating || Math.random() * 2 + 3.5,
        sessionTime: doctor.sessionTime || 45,
        pricePerMinute: doctor.pricePerMinute || 20,
        languages: doctor.languages || ["English"],
        currency: doctor.currency || "INR",
        fees: Math.round(
          (doctor.pricePerMinute || 20) * (doctor.sessionTime || 45)
        ),
        isOnline: Math.random() > 0.5,
        consultationModes: ["video", "home"],
        location: "Available Online",
      }));

      setDoctors(mappedDoctors);
      setTotalPages(Math.ceil(totalCount / 10));
    } catch (err) {
      setError(`Error loading doctors: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const extractFilterOptions = () => {
    const specializations = [
      ...new Set(doctors.map((d) => d.specialization).filter(Boolean)),
    ];
    const languages = [...new Set(doctors.flatMap((d) => d.languages || []))];
    const countries = [
      ...new Set(doctors.map((d) => d.location).filter(Boolean)),
    ];

    setAvailableFilters({
      specializations,
      languages,
      countries,
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      specialization: "",
      language: "",
      priceRange: [0, 5000],
      experienceRange: [0, 25],
      rating: 0,
      country: "",
    });
  };

  const handleCoachClick = (coachId) => {
    router.push(`coaches/${coachId}`);
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialization =
      !filters.specialization ||
      doctor.specialization === filters.specialization;

    const matchesLanguage =
      !filters.language || doctor.languages?.includes(filters.language);

    const matchesPrice =
      doctor.fees >= filters.priceRange[0] &&
      doctor.fees <= filters.priceRange[1];

    const matchesExperience =
      doctor.experience >= filters.experienceRange[0] &&
      doctor.experience <= filters.experienceRange[1];

    const matchesRating = doctor.rating >= filters.rating;
    const matchesCountry =
      !filters.country || doctor.location === filters.country;

    return (
      matchesSearch &&
      matchesSpecialization &&
      matchesLanguage &&
      matchesPrice &&
      matchesExperience &&
      matchesRating &&
      matchesCountry
    );
  });

  const getInitials = (name) => {
    if (!name) return "DR";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const formatRating = (rating) => {
    return rating ? parseFloat(rating).toFixed(1) : "4.5";
  };

  if (loading && doctors.length === 0) {
    return <Shimmer variant="list" />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className={`${poppins.className} text-lg text-red-600 mb-4`}>
            {error}
          </p>
          <button
            onClick={() => loadDoctors(currentPage)}
            className={`${poppins.className} bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg`}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-[#2C8C91] to-[#345268] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${poppins.className} text-3xl sm:text-4xl font-bold text-white mb-4`}
            >
              Our Expert Coaches
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`${poppins.className} text-lg text-blue-100 max-w-3xl mx-auto`}
            >
              Connect with qualified healthcare professionals for personalized
              care
            </motion.p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block w-full lg:w-80 bg-white rounded-lg shadow-sm p-6 h-fit`}
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`${poppins.className} text-lg font-semibold text-gray-900`}
              >
                <FontAwesomeIcon icon={faFilter} className="mr-2" />
                Filters
              </h3>
              <button
                onClick={clearFilters}
                className={`${poppins.className} text-sm text-blue-600 hover:text-blue-800`}
              >
                Clear All
              </button>
            </div>

            <div className="mb-6">
              <label
                className={`${poppins.className} block text-sm font-medium text-black mb-2`}
              >
                Country
              </label>
              <select
                value={filters.country}
                onChange={(e) => handleFilterChange("country", e.target.value)}
                className={`${poppins.className} w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="" className="text-black">All Countries</option>
                {availableFilters.countries.map((country) => (
                  <option className="text-black" key ={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                className={`${poppins.className} block text-sm font-medium text-black mb-2`}
              >
                Specialization
              </label>
              <select
                value={filters.specialization}
                onChange={(e) =>
                  handleFilterChange("specialization", e.target.value)
                }
                className={`${poppins.className} w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">All Specializations</option>
                {availableFilters.specializations.map((spec) => (
                  <option className="text-black" key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                className={`${poppins.className} block text-sm font-medium text-gray-700 mb-2`}
              >
                <FontAwesomeIcon icon={faLanguage} className="mr-1" />
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange("language", e.target.value)}
                className={`${poppins.className} w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="">All Languages</option>
                {availableFilters.languages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                className={`${poppins.className} block text-sm font-medium text-gray-700 mb-2`}
              >
                <FontAwesomeIcon icon={faRupeeSign} className="mr-1" />
                Price Range: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={filters.priceRange[1]}
                onChange={(e) =>
                  handleFilterChange("priceRange", [
                    filters.priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="mb-6">
              <label
                className={`${poppins.className} block text-sm font-medium text-gray-700 mb-2`}
              >
                <FontAwesomeIcon icon={faGraduationCap} className="mr-1" />
                Experience: {filters.experienceRange[0]}+ years
              </label>
              <input
  type="range"
  min="0"
  max="25"
  step="1"
  value={filters.experienceRange[0]}
  onChange={(e) =>
    handleFilterChange("experienceRange", [
      parseInt(e.target.value),
      filters.experienceRange[1],
    ])
  }
  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
/>

            </div>

            <div className="mb-6">
              <label
                className={`${poppins.className} block text-sm font-medium text-gray-700 mb-2`}
              >
                Minimum Rating
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleFilterChange("rating", star)}
                    className={`${
                      star <= filters.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search doctors by name or specialty..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className={`${poppins.className} w-full px-4 py-3 pl-10 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`${poppins.className} lg:hidden bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2`}
                  >
                    <FontAwesomeIcon icon={faFilter} />
                    <span>Filters</span>
                  </button>

                  <div className={`${poppins.className} text-sm text-gray-600`}>
                    Showing {filteredDoctors.length} of {doctors.length} doctors
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {filteredDoctors.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className={`${poppins.className} text-lg text-gray-600`}>
                    No doctors found matching your search criteria.
                  </p>
                </div>
              ) : (
                filteredDoctors.map((doctor, index) => (
                  <motion.div
                    key={doctor._id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6 border border-gray-100 cursor-pointer"
                    onClick={() => handleCoachClick(doctor._id)}
                  >
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                            {doctor.profilePicture ? (
                              <img
                                src={doctor.profilePicture}
                                alt={doctor.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = "/images/devdoot-round.png";
                                }} 
                              />
                            ) : (
                              <img
                                src="/images/devdoot-round.png" 
                                alt="Default Logo"
                                className="w-14 h-14 object-contain"
                              />
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3
                                className={`${poppins.className} text-xl font-semibold text-gray-900 mb-1`}
                              >
                                {doctor.name || "Dr. Name"}
                              </h3>
                              <p
                                className={`${poppins.className} text-sm text-gray-600 mb-1`}
                              >
                                {doctor.specialization || "General Physician"}
                              </p>
                              <p
                                className={`${poppins.className} text-xs text-blue-600 font-medium`}
                              >
                                <FontAwesomeIcon
                                  icon={faGraduationCap}
                                  className="mr-1"
                                />
                                {doctor.experience
                                  ? `${doctor.experience} years`
                                  : "10+ years"}{" "}
                                experience
                              </p>
                            </div>

                            <button
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <FontAwesomeIcon
                                icon={faHeart}
                                className="w-5 h-5"
                              />
                            </button>
                          </div>

                          <div className="flex items-center mb-3">
                            <div className="flex items-center space-x-1 mr-3">
                              {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon
                                  key={i}
                                  icon={faStar}
                                  className={`w-4 h-4 ${
                                    i <
                                    Math.floor(
                                      parseFloat(formatRating(doctor.rating))
                                    )
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span
                                className={`${poppins.className} text-sm text-gray-600 ml-2`}
                              >
                                {formatRating(doctor.rating)} • 3 reviews
                              </span>
                            </div>
                          </div>

                          <p
                            className={`${poppins.className} text-sm text-gray-600 mb-4 line-clamp-2`}
                          >
                            Energetic, motivated, loving healthcare professional
                            with extensive experience in{" "}
                            {doctor.specialization?.toLowerCase() ||
                              "healthcare"}
                            . Dedicated to providing excellent patient care and
                            treatment.
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {doctor.languages?.slice(0, 3).map((lang) => (
                              <span
                                key={lang}
                                className={`px-2 py-1 rounded-full text-xs font-medium ${poppins.className} bg-gray-100 text-gray-700`}
                              >
                                {lang}
                              </span>
                            ))}

                            {doctor.consultationModes?.includes("video") && (
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${poppins.className} bg-green-100 text-green-700`}
                              >
                                <FontAwesomeIcon
                                  icon={faVideo}
                                  className="mr-1 w-3 h-3"
                                />
                                Video
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="sm:w-48 flex flex-col justify-between">
                        <div className="text-right mb-4">
                          <div className="text-right mb-2">
                            <span
                              className={`${poppins.className} text-2xl font-bold text-gray-900`}
                            >
                              ₹{doctor.fees || "1200"}
                            </span>
                            <span
                              className={`${poppins.className} text-sm text-gray-600 block`}
                            >
                              per session
                            </span>
                            <span
                              className={`${poppins.className} text-xs text-gray-500`}
                            >
                              <FontAwesomeIcon
                                icon={faClock}
                                className="mr-1"
                              />
                              {doctor.sessionTime || 45} mins
                            </span>
                          </div>
                        </div>

                        <button
  className={`${poppins.className} w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center space-x-2 whitespace-nowrap`}
  onClick={(e) => {
    e.stopPropagation();
    handleCoachClick(doctor._id);
  }}
>
  <FontAwesomeIcon icon={faCalendarAlt} className="w-4 h-4" />
  <span>Book Session</span>
</button>

                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === 1}
                  className={`${
                    poppins.className
                  } px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Previous
                </button>

                <span className={`${poppins.className} text-gray-600`}>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => {
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  disabled={currentPage === totalPages}
                  className={`${
                    poppins.className
                  } px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
