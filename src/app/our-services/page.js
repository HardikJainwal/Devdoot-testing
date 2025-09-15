"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/contexts/ModalContext";
import {
  Heart,
  Users,
  Activity,
  Stethoscope,
  PawPrint,
  Leaf,
  Brain,
  Cross,
  Search,
  Droplets,
  Baby,
  Utensils,
  Sparkles,
  TrendingUp,
  PersonStanding,
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
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-540",
    isLive: false,
  },
  {
    title: "Coach Match",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    isLive: true,
  },
  {
    title: "Health Buddy",
    icon: Activity,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    isLive: false,
  },
  {
    title: "MedEquip",
    icon: Stethoscope,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
    isLive: false,
  },
  {
    title: "PetWell",
    icon: PawPrint,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
    isLive: false,
  },
  {
    title: "AyurCare",
    icon: Leaf,
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-50",
    isLive: true,
  },
  {
    title: "Mental Health",
    icon: Brain,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
    isLive: true,
  },
  {
    title: "AidFirst",
    icon: Cross,
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
    isLive: true,
  },
  {
    title: "SpeciFind",
    icon: Search,
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50",
    isLive: true,
  },
  {
    title: "Social Wall",
    icon: Droplets,
    color: "from-red-600 to-red-500",
    bgColor: "bg-red-50",
    isLive: false,
  },
  {
    title: "ReproWell",
    icon: Heart,
    color: "from-pink-600 to-rose-500",
    bgColor: "bg-pink-50",
    isLive: true,
  },
  {
    title: "ChildCare++",
    icon: Baby,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
    isLive: false,
  },
  {
    title: "NutritiGuide",
    icon: Utensils,
    color: "from-lime-500 to-green-500",
    bgColor: "bg-lime-50",
    isLive: true,
  },
  {
    title: "DermaCare",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    isLive: true,
  },
  {
    title: "Yoga",
    icon: PersonStanding,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-violet-50",
    isLive: true,
  },
  {
    title: "Home Check",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    isLive: false,
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
      icon: service.icon,
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

     
      <div className="fixed top-6 right-4 sm:right-6 z-50 space-y-3">
        {toasts.map((toast) => {
          const IconComponent = toast.icon;
          return (
            <div
              key={toast.id}
              className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-4 min-w-[250px] sm:min-w-[300px] animate-in slide-in-from-right duration-300"
              style={{
                animation: "slideInRight 0.3s ease-out forwards",
              }}
            >
              <div
                className={`p-2 rounded-xl bg-gradient-to-br ${toast.color}`}
              >
                <IconComponent className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{toast.title}</p>
                <p className="text-sm text-gray-600">Coming Soon!</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Cross className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#C42323] mt-8 sm:mt-10 mb-4">

          Our <span className="text-[#2C8C91]">Services</span>
        </h1>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
          Comprehensive healthcare solutions designed to meet all your wellness
          needs
        </p>
      </div>

      
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {sortedServices.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className={`group relative ${service.bgColor} rounded-2xl border border-white/50 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
                onClick={() => handleServiceClick(service)}
              >
                {service.isLive && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="bg-[#C42323] text-white p-1.5 rounded-full shadow-lg animate-pulse">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                )}

              
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                
                <div className="relative p-6 flex flex-col items-center text-center">
                 
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-2 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>

                  
                  {service.isLive ? (
                    <div className="inline-flex items-center gap-1 bg-[#C42323] text-white px-3 py-1 rounded-full text-xs font-medium shadow-md animate-pulse">
                      <TrendingUp className="w-3 h-3" />
                      Live Now
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1 bg-white/70 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                      Coming Soon
                    </div>
                  )}
                </div>

               
                <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      
      <div className="text-center mt-12 sm:mt-16">
        <p className="text-gray-500 text-sm">
          More services launching soon. Stay tuned for updates!
        </p>
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-right {
          animation-name: slideInRight;
        }
      `}</style>
    </div>
  );
}