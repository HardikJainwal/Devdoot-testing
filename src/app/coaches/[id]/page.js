"use client";
import { authUtils } from "@/api/auth";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faVideo,
    faHouse,
    faMapMarkerAlt,
    faCalendarAlt,
    faStar,
    faArrowLeft,
    faHeart,
    faLanguage,
    faRupeeSign,
    faGraduationCap,
    faClock,
    faCheckCircle,
    faShare,
    faUsers,
    faAward,
    faStethoscope,
    faCertificate,
    faPlus,
    faEdit,
    faPaperPlane,
    faThumbsUp,
    faThumbsDown,
    faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Poppins } from "next/font/google";
import { fetchCoachById, fetchCoaches } from "@/api/coaches";
import Shimmer from "@/app/components/Shimmer";
import { loadRazorpay } from "@/lib/loadRazorpay";
import { createOrderAPI } from "@/services/payment";
import { fetchAppointmentSlots } from "@/services/booking";
import { useAppStore } from "@/contexts/store";

const poppins = Poppins({
    weight: ["300", "400", "500", "600", "700"],
    subsets: ["latin"],
});


export default function CoachProfilePage() {
    const params = useParams();
    const router = useRouter();
    const [coach, setCoach] = useState(null);
    const [relatedCoaches, setRelatedCoaches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    // const [showReviewModal, setShowReviewModal] = useState(false);
    // const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [selectedTimeCategory, setSelectedTimeCategory] = useState("morning");
    const [availableSlots, setAvailableSlots] = useState([]);
    const [slotsLoading, setSlotsLoading] = useState(false);
    const [dateSlots, setDateSlots] = useState({}); // Store slots by date
    const paymentSuccess = useAppStore(state => state.paymentSuccess);
    const setPaymentSuccess = useAppStore(state => state.setPaymentSuccess);
    const booking = useAppStore(state => state.booking);
    const setBooking = useAppStore(state => state.setBooking);

    useEffect(() => {
        if (params.id) {
            loadCoachProfile(params.id);
            loadRelatedCoaches();
        }
    }, [params.id]);

    // Load slots when date changes
    useEffect(() => {
        if (selectedDate && coach?._id) {
            loadAvailableSlots();
        }
    }, [selectedDate, coach?._id]);

    const loadCoachProfile = async (coachId) => {
        try {
            setLoading(true);
            const response = await fetchCoachById(coachId);

            if (!response || !response.success) {
                setError(response?.message || "Failed to load coach profile");
                return;
            }

            const coachData = response.data;

            // Transform the API response to match component structure
            const mappedCoach = {
                _id: coachData._id,
                name: coachData.coachName || "Dr. Name",
                specialization: coachData.specialization || "General Physician",
                profilePicture: coachData.profilePhoto,
                experience: coachData.experienceYear || 5,
                rating: coachData.rating || 4.8,
                sessionTime: coachData.sessionTime || 45,
                pricePerMinute: coachData.pricePerMinute || 20,
                languages: coachData.languages || ["English"],
                currency: coachData.currency || "INR",
                fees: Math.round(
                    (coachData.pricePerMinute || 20) * (coachData.sessionTime || 45)
                ),

                consultationModes: ["video", "home"],
                location: coachData.location || "Available Online",

                // Updated this line to use the bio field from API
                about: coachData.bio || `Dr. ${coachData.coachName} is a highly experienced ${
coachData.specialization || "healthcare professional"
} with over ${
coachData.experienceYear || 5
} years of experience. With over ${
coachData.experienceYear || 5
} years of experience in healthcare, they are dedicated to providing excellent patient care and treatment. They specialize in ${
coachData.specialization?.toLowerCase() || "healthcare"
} and have helped numerous patients achieve better health outcomes.`,

                totalPatients: Math.floor(Math.random() * 500) + 100,
                reviewCount: Math.floor(Math.random() * 50) + 10,
            };


            setCoach(mappedCoach);
        } catch (err) {
            setError(`Error loading coach profile: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };


    const getDateRange = (selectedDate) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Start of today


        const selected = new Date(selectedDate);
        selected.setHours(0, 0, 0, 0);

        const startDate = new Date(selected);
        const endDate = new Date(selected);
        endDate.setDate(selected.getDate() + 1); 

        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        };
    };

    const loadAvailableSlots = async () => {
        try {
            setSlotsLoading(true);

            const dateRange = getDateRange(selectedDate);
            if (!dateRange) return;

            console.log("Fetching slots for date range:", dateRange);
            const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

            const response = await fetchAppointmentSlots(
                coach._id,
                dateRange.startDate,
                dateRange.endDate,
                timeZone || "Asia/Calcutta"
            );

            console.log("API Response:", response);

            if (response.success && response.data && Array.isArray(response.data)) {

                const processedSlots = response.data.map((slot, index) => {

                    const localStartStr = slot.local[0]; 
                    const localEndStr = slot.local[1];  
                    const startTime = localStartStr.split(' ')[1]; 
                    const endTime = localEndStr.split(' ')[1];     

                    return {
                        id: `slot-${index}`,
                        utcStart: slot.utc[0],
                        utcEnd: slot.utc[1],
                        localStart: localStartStr,
                        localEnd: localEndStr,
                        startTime: startTime,
                        endTime: endTime,
                        displayTime: formatTimeDisplay(startTime, endTime)
                    };
                });

                console.log("Processed slots:", processedSlots);
                setAvailableSlots(processedSlots);
            } else {
                console.error("Failed to load slots or empty data:", response.message);
                setAvailableSlots([]);
            }
        } catch (error) {
            console.error("Error loading available slots:", error);
            setAvailableSlots([]);
        } finally {
            setSlotsLoading(false);
        }
    };


    const formatTimeDisplay = (startTime, endTime) => {
        const formatTime = (timeStr) => {
            const [hour, minute] = timeStr.split(':');
            const hourInt = parseInt(hour);
            const hour12 = hourInt > 12 ? hourInt - 12 : hourInt === 0 ? 12 : hourInt;
            const ampm = hourInt >= 12 ? 'PM' : 'AM';
            return `${hour12}:${minute} ${ampm}`;
        };

        return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    };


    const categorizeSlots = (slots) => {
        const categorized = {
            morning: [],
            afternoon: [],
            evening: [],
        };

        slots.forEach((slot) => {
            const hour = parseInt(slot.startTime.split(':')[0]);

            if (hour >= 6 && hour < 12) {
                categorized.morning.push(slot);
            } else if (hour >= 12 && hour < 17) {
                categorized.afternoon.push(slot);
            } else {  
                categorized.evening.push(slot);
            }
        });

        return categorized;
    };

    // useEffect(() => {
    //   if (showReviewModal) {
    //     document.body.classList.add("overflow-hidden");
    //   } else {
    //     document.body.classList.remove("overflow-hidden");
    //   }

    //   return () => {
    //     document.body.classList.remove("overflow-hidden");
    //   };
    // }, [showReviewModal]);

    const loadRelatedCoaches = async () => {
        try {
            const response = await fetchCoaches(1, 8);

            if (response && response.success) {
                const doctorsData = response.data?.data || [];

                const mappedDoctors = doctorsData
                .filter((doctor) => doctor._id !== params.id)
                .slice(0, 4)
                .map((doctor, index) => ({
                    _id: doctor._id || `doctor-${index}`,
                    name: doctor.coachName || `Doctor ${index + 1}`,
                    specialization: doctor.specialization || "General Physician",
                    profilePicture: doctor.profilePhoto,
                    experience: doctor.experienceYear || 5,
                    rating: doctor.rating || Math.random() * 2 + 4,
                    sessionTime: doctor.sessionTime || 45,
                    pricePerMinute: doctor.pricePerMinute || 20,
                    fees: Math.round(
                        (doctor.pricePerMinute || 20) * (doctor.sessionTime || 45)
                    ),
                }));

                setRelatedCoaches(mappedDoctors);
            }
        } catch (err) {
            console.error("Error loading related coaches:", err);
        }
    };

    const getInitials = (name) => {
        if (!name) return "DR";
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const formatRating = (rating) => {
        return rating ? parseFloat(rating).toFixed(1) : "4.8";
    };

    const handleBookConsultation = () => {
        if (selectedTimeSlot && selectedDate) {
            console.log("Booking consultation:", {
                coach: coach._id,
                date: selectedDate,
                timeSlot: selectedTimeSlot
            });
            const workingWithRazorpay = async () =>{
                try{
                    const [data, res] = await Promise.all([
                        createOrderAPI({
                            coachId: coach._id,
                            startDate: selectedTimeSlot.utcStart,
                            endDate: selectedTimeSlot.utcEnd
                        }), loadRazorpay()
                    ]);
                    //need to save booking id for usage
                    if (!res){
                        alert('Failed To load Razorpay SDK');
                        throw new Error('Failed To load Razorpay SDK')
                    }
                    const {amount,id,currency,bookingId, txnId} = data.data;
                    if (!id || !amount || !currency){
                        throw new Error('Something went wrong!!');
                    }
                    setBooking({amount,id,currency,bookingId, txnId})
                    const options = {
                        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                        amount,//amount,
                        currency,
                        name: 'Health Consult',
                        description: `Consultation on ${selectedDate} at ${selectedTimeSlot}`,
                        order_id: id,
                        handler: function (response) {
                            setPaymentSuccess({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                orderData: data,
                                appointmentInfo: {
                                    date: selectedDate,
                                    timeSlot: selectedTimeSlot,
                                },
                            })
                        },
                        theme: {
                            color: '#2C8C91',
                        },
                    };
                    const rzp = new window.Razorpay(options);
                    rzp.open();
                }catch(err){
                    console.error(err)
                }
            }
            workingWithRazorpay();

            // Add your booking logic here
            //alert(`Booking consultation with ${coach.name} on ${selectedDate} at ${selectedTimeSlot.displayTime}`);
        }
    };
    useEffect(()=>{
        if (!paymentSuccess) {
            return
        }
    },[paymentSuccess]);

    const handleRelatedCoachClick = (coachId) => {
        router.push(`/coaches/${coachId}`);
    };

    // const handleReviewSubmit = (e) => {
    //   e.preventDefault();
    //   console.log("Review submitted:", newReview);
    //   setShowReviewModal(false);
    //   setNewReview({ rating: 5, comment: "" });
    // };

    if (loading) {
        return <Shimmer />;
    }

    if (error || !coach) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
                <div className="text-center bg-white rounded-2xl shadow-lg p-8">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FontAwesomeIcon icon={faTimes} className="text-red-500 text-2xl" />
                    </div>
                    <p className={`${poppins.className} text-lg text-red-600 mb-4`}>
                        {error || "Coach not found"}
                    </p>
                    <button
                        onClick={() => router.back()}
                        className={`${poppins.className} bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105`}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Get categorized slots
    const categorizedSlots = categorizeSlots(availableSlots);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">

            <div className="bg-gradient-to-r from-[#2C8C91] to-[#345268] shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <button
                        onClick={() => router.back()}
                        className={`${poppins.className} flex items-center text-white hover:text-blue-100 transition-colors transform hover:scale-105 mt-4`}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                        Back to Coaches
                    </button>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-8">

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform translate-x-16 -translate-y-16 opacity-50"></div>

                            <div className="flex flex-col sm:flex-row gap-6 relative z-10">
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <div className="w-36 h-36 rounded-2xl overflow-hidden border-gradient-to-r from-blue-400 to-purple-400 shadow-lg">
                                            {coach.profilePicture ? (
                                                <img
                                                    src={coach.profilePicture}
                                                    alt={coach.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                                        <span className="text-white text-3xl font-bold">
                                                            {getInitials(coach.name)}
                                                        </span>
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <h1
                                                className={`${poppins.className} text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2`}
                                            >
                                                {coach.name}
                                            </h1>
                                            <p
                                                className={`${poppins.className} text-xl text-gray-600 mb-2`}
                                            >
                                                {coach.specialization}
                                            </p>
                                            <p
                                                className={`${poppins.className} text-sm text-blue-600 font-semibold mb-3 bg-blue-50 px-3 py-1 rounded-full inline-block`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faGraduationCap}
                                                    className="mr-1"
                                                />
                                                {coach.experience} years experience
                                            </p>
                                        </div>

                                        <div className="flex space-x-2">
                                            <button className="p-3 text-gray-400 hover:text-red-500 transition-all duration-300 transform hover:scale-110 bg-gray-50 rounded-full">
                                                <FontAwesomeIcon icon={faHeart} className="w-5 h-5" />
                                            </button>
                                            <button className="p-3 text-gray-400 hover:text-blue-500 transition-all duration-300 transform hover:scale-110 bg-gray-50 rounded-full">
                                                <FontAwesomeIcon icon={faShare} className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                        <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
                                            <div className="flex items-center justify-center mb-2">
                                                <FontAwesomeIcon
                                                    icon={faStar}
                                                    className="text-yellow-400 mr-1"
                                                />
                                                <span
                                                    className={`${poppins.className} text-xl font-bold text-gray-900`}
                                                >
                                                    {formatRating(coach.rating)}
                                                </span>
                                            </div>
                                            <p
                                                className={`${poppins.className} text-xs text-gray-600`}
                                            >
                                                {coach.reviewCount} reviews
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                                            <div className="flex items-center justify-center mb-2">
                                                <FontAwesomeIcon
                                                    icon={faUsers}
                                                    className="text-blue-500 mr-1"
                                                />
                                                <span
                                                    className={`${poppins.className} text-xl font-bold text-gray-900`}
                                                >
                                                    {coach.totalPatients}+
                                                </span>
                                            </div>
                                            <p
                                                className={`${poppins.className} text-xs text-gray-600`}
                                            >
                                                Patients
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                                            <div className="flex items-center justify-center mb-2">
                                                <FontAwesomeIcon
                                                    icon={faClock}
                                                    className="text-green-500 mr-1"
                                                />
                                                <span
                                                    className={`${poppins.className} text-xl font-bold text-gray-900`}
                                                >
                                                    {coach.sessionTime}
                                                </span>
                                            </div>
                                            <p
                                                className={`${poppins.className} text-xs text-gray-600`}
                                            >
                                                mins/session
                                            </p>
                                        </div>

                                        <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                                            <div className="flex items-center justify-center mb-2">
                                                <FontAwesomeIcon
                                                    icon={faRupeeSign}
                                                    className="text-purple-500 mr-1"
                                                />
                                                <span
                                                    className={`${poppins.className} text-xl font-bold text-gray-900`}
                                                >
                                                    {coach.fees}
                                                </span>
                                            </div>
                                            <p
                                                className={`${poppins.className} text-xs text-gray-600`}
                                            >
                                                per session
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                        {coach.languages?.map((lang) => (
                                            <span
                                                key={lang}
                                                className={`px-4 py-2 rounded-full text-sm font-medium ${poppins.className} bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 border border-gray-300`}
                                            >
                                                <FontAwesomeIcon
                                                    icon={faLanguage}
                                                    className="mr-2 w-3 h-3"
                                                />
                                                {lang}
                                            </span>
                                        ))}

                                        <span
                                            className={`px-4 py-2 rounded-full text-sm font-medium ${poppins.className} bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-300`}
                                        >
                                            <FontAwesomeIcon
                                                icon={faVideo}
                                                className="mr-2 w-3 h-3"
                                            />
                                            Video Consultation
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-2xl shadow-xl p-8"
                        >
                            <h2
                                className={`${poppins.className} text-2xl font-bold text-gray-900 mb-6 flex items-center`}
                            >
                                <FontAwesomeIcon
                                    icon={faStethoscope}
                                    className="mr-3 text-blue-500"
                                />
                                About {coach.name}
                            </h2>
                            <p
                                className={`${poppins.className} text-gray-600 leading-relaxed text-lg`}
                            >
                                {coach.about}
                            </p>
                        </motion.div>

                        {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2
                  className={`${poppins.className} text-2xl font-bold text-gray-900 flex items-center`}
                >
                  <FontAwesomeIcon
                    icon={faStar}
                    className="mr-3 text-yellow-400"
                  />
                  What Patients Say
                </h2>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className={`${poppins.className} bg-gradient-to-r from-[#2C8C91] to-[#345268] hover:from-[#246e72] hover:to-[#2f3f55] text-white px-6 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 flex items-center`}
                >
                  <FontAwesomeIcon icon={faPlus} className="mr-2 w-4 h-4" />
                  Add Review
                </button>
              </div>

              <div className="mb-8">
                <div className="flex items-center mb-6">
                  <span
                    className={`${poppins.className} text-5xl font-bold text-gray-900 mr-4`}
                  >
                    {formatRating(coach.rating)}
                  </span>
                  <div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FontAwesomeIcon
                          key={i}
                          icon={faStar}
                          className={`w-6 h-6 ${
                            i <
                            Math.floor(parseFloat(formatRating(coach.rating)))
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className={`${poppins.className} text-gray-600`}>
                      Based on {coach.reviewCount} reviews
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <span
                        className={`${poppins.className} text-sm text-gray-600 mr-3 w-4`}
                      >
                        {rating}
                      </span>
                      <FontAwesomeIcon
                        icon={faStar}
                        className="text-yellow-400 w-4 h-4 mr-3"
                      />
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mr-3">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-1000"
                          style={{
                            width: `${
                              rating === 5
                                ? 70
                                : rating === 4
                                ? 20
                                : rating === 3
                                ? 7
                                : rating === 2
                                ? 2
                                : 1
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span
                        className={`${poppins.className} text-sm text-gray-600 w-12`}
                      >
                        {rating === 5
                          ? "70%"
                          : rating === 4
                          ? "20%"
                          : rating === 3
                          ? "7%"
                          : rating === 2
                          ? "2%"
                          : "1%"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 border-t pt-6">
                {[
                  {
                    name: "Priya Sharma",
                    initials: "PS",
                    rating: 5,
                    date: "2 days ago",
                    comment: `Dr. ${
                      coach.name.split(" ")[coach.name.split(" ").length - 1]
                    } is an excellent doctor. She listened to my concerns carefully and provided clear treatment plans. I highly recommend her!`,
                  },
                  {
                    name: "Rahul Kumar",
                    initials: "RK",
                    rating: 5,
                    date: "1 week ago",
                    comment:
                      "Very professional and knowledgeable. The consultation was thorough and helpful. Will definitely consult again.",
                  },
                ].map((review, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <span
                        className={`${poppins.className} text-sm font-semibold text-white`}
                      >
                        {review.initials}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h4
                          className={`${poppins.className} font-semibold text-gray-900 mr-3`}
                        >
                          {review.name}
                        </h4>
                        <div className="flex items-center mr-3">
                          {[...Array(5)].map((_, i) => (
                            <FontAwesomeIcon
                              key={i}
                              icon={faStar}
                              className={`w-4 h-4 ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span
                          className={`${poppins.className} text-sm text-gray-500`}
                        >
                          {review.date}
                        </span>
                      </div>
                      <p className={`${poppins.className} text-gray-700`}>
                        {review.comment}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div> */}
                    </div>

                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-2xl shadow-xl p-6 sticky top-8"
                        >
                            <h3
                                className={`${poppins.className} text-xl font-bold text-gray-900 mb-6 flex items-center`}
                            >
                                <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className="mr-3 text-blue-500"
                                />
                                Book a Consultation
                            </h3>

                            <div className="mb-6">
                                <h4
                                    className={`${poppins.className} font-semibold text-gray-900 mb-3`}
                                >
                                    Video Consultation
                                </h4>
                                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                                    <div className="flex items-center justify-between mb-3">
                                        <span
                                            className={`${poppins.className} text-3xl font-bold text-[#2C8C91] bg-clip-text`}
                                        >
                                            ₹{coach.fees}
                                        </span>
                                        <span
                                            className={`${poppins.className} text-sm text-gray-600 bg-white px-3 py-1 rounded-full`}
                                        >
                                            <FontAwesomeIcon icon={faClock} className="mr-1" />
                                            {coach.sessionTime} mins
                                        </span>
                                    </div>
                                    <p className={`${poppins.className} text-sm text-gray-600`}>
                                        Available slots today
                                    </p>
                                </div>
                            </div>

                            <div className="mb-6">
                                <label
                                    className={`${poppins.className} block text-sm font-semibold text-gray-700 mb-3`}
                                >
                                    Select Date
                                </label>
                                <select
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setSelectedTimeSlot(""); // Reset selected time slot when date changes
                                    }}
                                    className={`${poppins.className} w-full px-4 py-3 border border-gray-300 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300`}
                                >
                                    <option value="" className="text-black">Choose a date</option>
                                    {[...Array(7)].map((_, index) => {
                                        const date = new Date();
                                        date.setDate(date.getDate() + index);
                                        const dateString = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
                                        const displayDate = date.toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "short",
                                            day: "numeric",
                                        });
                                        return (
                                            <option  className="text-black" key={dateString} value={dateString}>
                                                {displayDate}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>

                            {selectedDate && (
                                <div className="mb-4">
                                    <label
                                        className={`${poppins.className} block text-sm font-semibold text-black mb-3`}
                                    >
                                        Preferred Time
                                    </label>
                                    <div className="grid grid-cols-3 gap-2 mb-4">
                                        {[
                                            { key: "morning", label: "Morning", count: categorizedSlots.morning?.length || 0 },
                                            { key: "afternoon", label: "Afternoon", count: categorizedSlots.afternoon?.length || 0 },
                                            { key: "evening", label: "Evening", count: categorizedSlots.evening?.length || 0 },
                                        ].map((category) => (
                                                <button
                                                    key={category.key}
                                                    onClick={() => setSelectedTimeCategory(category.key)}
                                                    disabled={category.count === 0}
                                                    className={`${
poppins.className
} py-3 px-2 text-xs font-medium rounded-lg border transition-all duration-300 relative ${
selectedTimeCategory === category.key
? "bg-gradient-to-r from-[#2C8C91] to-[#345268] text-white transform scale-105"
: category.count === 0
? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
: "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
}`}
                                                >
                                                    {category.label}
                                                    {category.count > 0 && (
                                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                                            {category.count}
                                                        </span>
                                                    )}
                                                </button>
                                            ))}
                                    </div>
                                </div>
                            )}

                            {selectedDate && (
                                <div className="mb-6">
                                    <label
                                        className={`${poppins.className} block text-sm font-semibold text-gray-700 mb-3`}
                                    >
                                        Available Slots ({selectedTimeCategory})
                                    </label>

                                    {slotsLoading ? (
                                        <div className="flex items-center justify-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2C8C91]"></div>
                                            <span
                                                className={`${poppins.className} ml-3 text-gray-600`}
                                            >
                                                Loading slots...
                                            </span>
                                        </div>
                                    ) : (
                                            <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-hidden overflow-x-hidden">
                                                {categorizedSlots[selectedTimeCategory]?.length > 0 ? (
                                                    categorizedSlots[selectedTimeCategory].map(
                                                        (slot, index) => (
                                                            <button
                                                                key={`${slot.id}-${index}`}
                                                                onClick={() => setSelectedTimeSlot(slot)}
                                                                className={`${
poppins.className
} py-3 px-4 text-sm font-medium rounded-lg border transition-all duration-300 ${
selectedTimeSlot?.id === slot.id
? "bg-gradient-to-r from-[#2C8C91] to-[#345268] text-white border-blue-500 transform scale-105"
: "bg-white text-gray-700 border-gray-300 hover:border-blue-400 hover:bg-blue-50"
}`}
                                                            >
                                                                {slot.displayTime}
                                                            </button>
                                                        )
                                                    )
                                                ) : (
                                                        <div className="text-center py-6">
                                                            <p
                                                                className={`${poppins.className} text-gray-500 text-sm`}
                                                            >
                                                                No slots available for {selectedTimeCategory}
                                                            </p>
                                                        </div>
                                                    )}
                                            </div>
                                        )}
                                </div>
                            )}

                            <button
                                onClick={handleBookConsultation}
                                disabled={!selectedDate || !selectedTimeSlot}
                                className={`${
poppins.className
} w-full py-4 px-4 rounded-xl font-semibold transition-all duration-300 transform flex items-center justify-center space-x-2 mb-4 shadow-lg ${
selectedDate && selectedTimeSlot
? "bg-gradient-to-r from-[#2C8C91] to-[#345268] hover:from-[#246e72] hover:to-[#2f3f55] text-white hover:scale-105"
: "bg-gray-300 text-gray-500 cursor-not-allowed"
}`}
                            >
                                <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" />
                                <span>
                                    {selectedDate && selectedTimeSlot
                                        ? "Confirm Appointment"
                                        : "Select Date & Time"}
                                </span>
                            </button>

                            <p
                                className={`${poppins.className} text-xs text-gray-500 text-center`}
                            >
                                By booking, you agree to our terms and conditions
                            </p>
                        </motion.div>
                    </div>
                </div>

                {relatedCoaches.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-12"
                    >
                        <h2
                            className={`${poppins.className} text-3xl font-bold text-gray-900 mb-8 text-center`}
                        >
                            You May Also Like
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedCoaches.map((relatedCoach, index) => (
                                <motion.div
                                    key={relatedCoach._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 + index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer transform hover:scale-105 relative overflow-hidden"
                                    onClick={() => handleRelatedCoachClick(relatedCoach._id)}
                                >
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full transform translate-x-8 -translate-y-8 opacity-50"></div>

                                    <div className="text-center relative z-10">
                                        <div className="w-24 h-24 mx-auto rounded-2xl overflow-hidden  border-gradient-to-r from-[#2C8C91] to-[#345268] mb-4 shadow-lg">
                                            {relatedCoach.profilePicture ? (
                                                <img
                                                    src={relatedCoach.profilePicture}
                                                    alt={relatedCoach.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-[#2C8C91] to-[#345268] flex items-center justify-center">
                                                        <span className="text-white text-xl font-bold">
                                                            {getInitials(relatedCoach.name)}
                                                        </span>
                                                    </div>
                                                )}
                                        </div>

                                        <h3
                                            className={`${poppins.className} font-bold text-gray-900 mb-2 text-lg`}
                                        >
                                            {relatedCoach.name}
                                        </h3>

                                        <p
                                            className={`${poppins.className} text-sm text-gray-600 mb-3`}
                                        >
                                            {relatedCoach.specialization}
                                        </p>

                                        <div className="flex items-center justify-center mb-3">
                                            <FontAwesomeIcon
                                                icon={faStar}
                                                className="text-yellow-400 w-4 h-4 mr-1"
                                            />
                                            <span
                                                className={`${poppins.className} text-sm text-gray-600 font-medium`}
                                            >
                                                {formatRating(relatedCoach.rating)}
                                            </span>
                                        </div>

                                        <p
                                            className={`${poppins.className} text-xl font-bold bg-gradient-to-r from-[#2C8C91] to-[#345268] bg-clip-text text-transparent mb-4`}
                                        >
                                            ₹{relatedCoach.fees}
                                        </p>

                                        <button
                                            className={`${poppins.className} w-full bg-gradient-to-r from-[#2C8C91] to-[#345268] hover:from-[#246e72] hover:to-[#2f3f55] text-white py-2 px-4 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105`}
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* {showReviewModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3
                className={`${poppins.className} text-xl font-bold text-gray-900`}
              >
                Add Your Review
              </h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleReviewSubmit}>
              <div className="mb-6">
                <label
                  className={`${poppins.className} block text-sm font-semibold text-gray-700 mb-3`}
                >
                  Your Rating
                </label>
                <div className="flex items-center justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating })}
                      className="transition-all duration-200 transform hover:scale-110"
                    >
                      <FontAwesomeIcon
                        icon={faStar}
                        className={`w-8 h-8 ${
                          rating <= newReview.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  className={`${poppins.className} block text-sm font-semibold text-gray-700 mb-3`}
                >
                  Your Review
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  placeholder="Share your experience with this doctor..."
                  className={`${poppins.className} w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none`}
                  rows="4"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className={`${poppins.className} flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-all duration-300`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${poppins.className} flex-1 bg-gradient-to-r from-[#2C8C91] to-[#345268] hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2`}
                >
                  <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )} */}
        </div>
    );
}
