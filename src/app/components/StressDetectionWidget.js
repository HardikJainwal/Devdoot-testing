"use client";
import { Activity, Brain } from "lucide-react";

const StressDetectionWidget = ({ router }) => {
  const handleStartAnalysis = () => {
    router.push("/stress-analysis");
  };

  return (
    <div className="absolute left-0 right-0 flex justify-center -bottom-14">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 w-full max-w-2xl">
        <div className="p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Left Side - Icon & Text */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-inner">
                <Brain className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">
                  Stress Detection
                </h3>
                <p className="text-sm text-gray-600">
                  Scan your face & check stress instantly
                </p>
              </div>
            </div>

            {/* Right Side - Button */}
            <button
              onClick={handleStartAnalysis}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2.5 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 text-sm sm:text-base shadow-md"
            >
              <Activity className="w-5 h-5" />
              <span>Start Analysis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressDetectionWidget;
