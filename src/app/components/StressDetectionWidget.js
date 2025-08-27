"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CameraOff, Activity, Brain, Heart, Loader2, AlertCircle, CheckCircle } from "lucide-react";

const StressDetectionWidget = ({ router }) => {
  const handleStartAnalysis = () => {
    router.push('/stress-analysis');
  };



  return (
    <div className="absolute left-0 right-0 px-4 sm:px-6 lg:px-8 -bottom-12">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200">
        <div className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            {/* Icon and Title */}
            <div className="sm:col-span-1 flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                <Brain className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-sm">AI Stress Detection</h3>
                <p className="text-xs text-gray-600">Check your wellness level</p>
              </div>
            </div>

            {/* Description */}
            <div className="sm:col-span-1 hidden sm:block">
              <p className="text-sm text-gray-600">
                Advanced facial analysis to assess your current stress level using AI technology.
              </p>
            </div>

            {/* Button */}
            <div className="sm:col-span-1">
              <button
                onClick={handleStartAnalysis}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Activity className="w-4 h-4" />
                <span>Start Analysis</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressDetectionWidget;