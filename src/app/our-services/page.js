"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/contexts/ModalContext";
import {
  TrendingUp,
  X,
} from "lucide-react";

const AuthRequiredModal = ({ isOpen, onClose, onLoginClick, onSignupClick }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
          className="text-xl md:text-2xl font-bold text-gray-900 mb-3"
        >
          Login to Access Services
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-6 leading-relaxed text-sm"
        >
          Sign in to access premium services, book consultations, and connect with our certified healthcare professionals.
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
            onClick={onLoginClick}
            className="w-full bg-[#2C8C91] text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Login to Continue</span>
            <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onSignupClick}
            className="w-full border-2 border-[#2C8C91] text-[#2C8C91] hover:bg-[#2C8C91] hover:text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm"
          >
            Create New Account
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-xs text-gray-500 mt-5"
        >
          New to our platform?{" "}
          <button
            onClick={onSignupClick}
            className="text-[#2C8C91] hover:text-blue-700 font-medium cursor-pointer"
          >
            Sign up for free
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
};

const services = [
  {
    title: "Senior Care",
    image: "/service-img/Care-match.webp", 
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    isLive: false,
    description: "Comprehensive care for seniors with dignity and compassion"
  },
  {
    title: "Coach Match",
    image: "/service-img/virtual-health.webp",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    isLive: true,
    description: "Connect with certified health and wellness coaches"
  },
  {
    title: "Health Buddy",
    image: "/service-img/Health Buddy.png",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
    isLive: false,
    description: "Your personal AI-powered health companion"
  },
  {
    title: "MedEquip",
    image: "/service-img/medical-equip.webp",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-blue-50",
    isLive: false,
    description: "Medical equipment rental and purchase solutions"
  },
  {
    title: "PetWell",
    image: "/service-img/petwell.webp",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    isLive: false,
    description: "Complete healthcare solutions for your pets"
  },
  {
    title: "AyurCare",
    image: "/service-img/Ayurcare.png",
    color: "from-teal-500 to-green-500",
    bgColor: "bg-gradient-to-br from-teal-50 to-green-50",
    isLive: true,
    description: "Traditional Ayurvedic treatments and consultations"
  },
  {
    title: "Mental Health",
    image: "/service-img/Mental Health.png",
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-rose-50 to-pink-50",
    isLive: true,
    description: "Professional mental health support and therapy"
  },
  {
    title: "AidFirst",
    image: "/service-img/First Aid.png",
    color: "from-red-500 to-rose-500",
    bgColor: "bg-gradient-to-br from-red-50 to-rose-50",
    isLive: true,
    description: "Emergency first aid guidance and training"
  },
  {
    title: "SpeciFind",
    image: "/service-img/specifinder.webp",
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-gradient-to-br from-slate-50 to-gray-50",
    isLive: true,
    description: "Find and book appointments with specialists"
  },
  {
    title: "Social Wall",
    image: "/service-img/Social Wall.png",
    color: "from-red-600 to-red-500",
    bgColor: "bg-gradient-to-br from-red-50 to-red-100",
    isLive: false,
    description: "Community platform for health discussions"
  },
  {
    title: "ReproWell",
    image: "/service-img/Repowell.png",
    color: "from-pink-600 to-rose-500",
    bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
    isLive: true,
    description: "Reproductive health and wellness services"
  },
  {
    title: "ChildCare++",
    image: "/service-img/Child Care.png",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50",
    isLive: false,
    description: "Comprehensive pediatric care and guidance"
  },
  {
    title: "NutritiGuide",
    image: "/service-img/nutrition.webp",
    color: "from-lime-500 to-green-500",
    bgColor: "bg-gradient-to-br from-lime-50 to-green-50",
    isLive: true,
    description: "Personalized nutrition plans and dietary guidance"
  },
  {
    title: "DermaCare",
    image: "/service-img/Derma.png",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    isLive: true,
    description: "Expert dermatology consultations and skincare"
  },
  {
    title: "Yoga",
    image: "/service-img/Yoga.png",
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
    isLive: true,
    description: "Guided yoga sessions and mindfulness practices"
  },
  {
    title: "Home Check",
    image: "/service-img/Care-match.webp",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-violet-50 to-purple-50",
    isLive: false,
    description: "Professional home health assessments"
  },
];

export default function Services() {
  const [toasts, setToasts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();
  const { openLogin, openSignup } = useModal();

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const showToast = (service) => {
    const id = Date.now();
    const newToast = {
      id,
      title: service.title,
      color: service.color,
      image: service.image,
    };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleServiceClick = (service) => {
    if (service.isLive) {
      if (!isLoggedIn) {
        setShowAuthModal(true);
        return;
      }

      switch (service.title) {
        case "Coach Match":
          router.push("/coaches");
          break;
        case "AyurCare":
          router.push("/ayur-care");
          break;
        case "Mental Health":
          router.push("/mental-health");
          break;
        case "Yoga":
          router.push("/yoga-care");
          break;
        case "ReproWell":
          router.push("/repowell");
          break;
        case "SpeciFind":
          router.push("/specifind");
          break;
        case "NutritiGuide":
          router.push("/nutri-guide");
          break;
        case "AidFirst":
          router.push("/first-aid");
          break;
        case "DermaCare":
          router.push("/derma-care");
          break;
        default:
          showToast(service);
      }
    } else {
      showToast(service);
    }
  };

  const handleLoginClick = () => {
    setShowAuthModal(false);
    openLogin();
  };

  const handleSignupClick = () => {
    setShowAuthModal(false);
    openSignup();
  };

  const sortedServices = [...services].sort((a, b) => {
    if (a.isLive && !b.isLive) return -1;
    if (!a.isLive && b.isLive) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-4 sm:p-6">
      <AuthRequiredModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />

      {/* Toast Notifications */}
      <div className="fixed top-6 right-4 sm:right-6 z-50 space-y-3">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-4 min-w-[250px] sm:min-w-[300px]"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={toast.image}
                alt={toast.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div 
                className={`hidden w-full h-full bg-gradient-to-br ${toast.color} items-center justify-center text-white font-bold text-lg`}
              >
                {toast.title.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{toast.title}</p>
              <p className="text-sm text-gray-600">Coming Soon!</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C42323] mt-8 sm:mt-10 mb-4">
          Our <span className="text-[#2C8C91]">Services</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Comprehensive healthcare solutions designed to meet all your wellness needs
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedServices.map((service, idx) => (
            <motion.div
  key={idx}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: idx * 0.1 }}
  className={`group relative ${service.bgColor} rounded-3xl border border-white/50 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 transform hover:-translate-y-2 overflow-hidden`}
  onClick={() => handleServiceClick(service)}
>
  {/* Live Badge */}
  {service.isLive && (
    <div className="absolute top-4 right-4 z-20">
      <div className="bg-[#C42323] text-white px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
        <TrendingUp className="w-3 h-3" />
        <span className="text-xs font-bold">LIVE</span>
      </div>
    </div>
  )}

  {/* Image Section */}
  <div className="relative w-full h-48 sm:h-56 lg:h-60 overflow-hidden">
    <img
      src={service.image}
      alt={service.title}
      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      onError={(e) => {
        e.target.style.display = "none";
        e.target.nextSibling.style.display = "flex";
      }}
    />
    <div
      className={`hidden absolute inset-0 bg-gradient-to-br ${service.color} items-center justify-center text-white font-bold text-4xl`}
    >
      {service.title.charAt(0)}
    </div>
  </div>

  {/* Content Section */}
  <div className="relative p-6 text-center flex flex-col h-full">
    {/* Service Title */}
    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-gray-800 transition-colors">
      {service.title}
    </h3>

    {/* Service Description */}
    <p className="text-sm text-gray-600 mb-4 leading-relaxed flex-grow">
      {service.description}
    </p>

    {/* Status Badge */}
    <div className="mt-auto">
      {service.isLive ? (
        <div className="inline-flex items-center gap-2 bg-[#C42323] text-white px-4 py-2 rounded-full text-xs font-bold shadow-md">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          Available Now
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 bg-white/80 text-gray-700 px-4 py-2 rounded-full text-xs font-semibold border border-gray-200">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
          Coming Soon
        </div>
      )}
    </div>
  </div>

  {/* Decorative Elements */}
  <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform duration-700" />
  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700" />
</motion.div>

          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-12 sm:mt-16">
        <p className="text-gray-500 text-sm">
          More services launching soon. Stay tuned for updates!
        </p>
      </div>
    </div>
  );
}