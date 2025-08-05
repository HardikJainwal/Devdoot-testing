// components/ui/ToastContainer.js
"use client";

import { Cross } from "lucide-react";

const ToastContainer = ({ toasts, removeToast }) => {
  return (
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
};

export default ToastContainer;