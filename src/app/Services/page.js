"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Heart,
  Users,
  Activity,
  Shield,
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
  UserCheck,
  TrendingUp,
} from "lucide-react";

const services = [
  {
    title: "Care Match",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "Coach Match",
    icon: Users,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Health Buddy",
    icon: Activity,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Immuni Care",
    icon: Shield,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50",
  },
  {
    title: "MedEquip",
    icon: Stethoscope,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-50",
  },
  {
    title: "PetWell",
    icon: PawPrint,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50",
  },
  {
    title: "AyurCare",
    icon: Leaf,
    color: "from-teal-500 to-green-500",
    bgColor: "bg-teal-50",
  },
  {
    title: "Mental Health",
    icon: Brain,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-50",
  },
  {
    title: "AidFirst",
    icon: Cross,
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-50",
  },
  {
    title: "SpeciFind",
    icon: Search,
    color: "from-slate-500 to-gray-500",
    bgColor: "bg-slate-50",
  },
  {
    title: "Social Wall",
    icon: Droplets,
    color: "from-red-600 to-red-500",
    bgColor: "bg-red-50",
  },
  {
    title: "ReproWell",
    icon: Heart,
    color: "from-pink-600 to-rose-500",
    bgColor: "bg-pink-50",
  },
  {
    title: "ChildCare++",
    icon: Baby,
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "NutritiGuide",
    icon: Utensils,
    color: "from-lime-500 to-green-500",
    bgColor: "bg-lime-50",
  },
  {
    title: "DermaCare",
    icon: Sparkles,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
  },
];

export default function Services() {
  const [toasts, setToasts] = useState([]);
  const router = useRouter();

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 p-6">
      {/* Custom Toast Container */}
      <div className="fixed top-6 right-6 z-50 space-y-3">
        {toasts.map((toast) => {
          const IconComponent = toast.icon;
          return (
            <div
              key={toast.id}
              className="flex items-center gap-3 bg-white/95 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-4 min-w-72 animate-in slide-in-from-right duration-300"
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

      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mt-10 mb-4">
          Our Services
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Comprehensive healthcare solutions designed to meet all your wellness
          needs
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, idx) => {
            const IconComponent = service.icon;
            return (
              <div
                key={idx}
                className={`group relative ${service.bgColor} rounded-2xl border border-white/50 shadow-sm hover:shadow-xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 overflow-hidden`}
                onClick={() => {
                  if (service.title === "Coach Match") {
                    router.push("/coaches");
                  } else if (service.title === "AyurCare") {
                    router.push("/AyurCare");
                  } else if (service.title === "Mental Health") {
                    router.push("/MentalHealth");
                  } else {
                    showToast(service);
                  }
                }}
              >
                 {(service.title === "AyurCare" || service.title === "Coach Match" || service.title === "Mental Health") && (
    <div className="absolute top-3 right-3 z-10">
      <div className="bg-[#C42323] text-white p-1.5 rounded-full shadow-lg animate-pulse">
        <TrendingUp className="w-4 h-4" />
      </div>
    </div>
  )}
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative p-6 flex flex-col items-center text-center">
                  {/* Icon container */}
                  <div
                    className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 text-lg mb-2 group-hover:text-gray-800 transition-colors">
                    {service.title}
                  </h3>

                  {/* Coming soon badge */}
                  <div className="inline-flex items-center gap-1  text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                    {/* Status badge */}
                    {service.title === "AyurCare" ||
                    service.title === "Coach Match" ||
                    service.title === "Mental Health" ? (
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
                </div>

                {/* Decorative elements */}
                <div className="absolute top-2 right-2 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform duration-500" />
                <div className="absolute bottom-2 left-2 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:-translate-x-6 group-hover:translate-y-6 transition-transform duration-500" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom section */}
      <div className="text-center mt-16">
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
