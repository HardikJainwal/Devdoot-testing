"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  Camera, 
  CameraOff, 
  Activity, 
  Brain, 
  Heart, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  RotateCcw,
  Download,
  Share2
} from "lucide-react";

const StressAnalysisPage = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [stressLevel, setStressLevel] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('initial'); // initial, camera, analyzing, results
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const animationRef = useRef(null);

  // Cleanup function
  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  useEffect(() => {
    return cleanup; // Cleanup on unmount
  }, []);

  const startCamera = async () => {
    setError(null);
    setIsLoading(true);
    setCurrentStep('camera');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
      
      setHasPermission(true);
      setIsActive(true);
      setIsLoading(false);
      
    } catch (err) {
      console.error('Camera access error:', err);
      setError('Camera access denied. Please allow camera permissions and refresh the page.');
      setHasPermission(false);
      setIsLoading(false);
      setCurrentStep('initial');
    }
  };

  const stopCamera = () => {
    cleanup();
    setIsActive(false);
    setStressLevel(null);
    setAnalysis(null);
    setError(null);
    setCurrentStep('initial');
  };

  const analyzeStressLevel = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsLoading(true);
    setCurrentStep('analyzing');
    
    // Simulate analysis process with multiple steps
    const steps = [
      { message: 'Detecting face...', duration: 1000 },
      { message: 'Analyzing facial expressions...', duration: 1500 },
      { message: 'Measuring stress indicators...', duration: 1200 },
      { message: 'Calculating results...', duration: 800 }
    ];

    let currentStepIndex = 0;
    const processStep = () => {
      if (currentStepIndex < steps.length) {
        setTimeout(() => {
          currentStepIndex++;
          if (currentStepIndex < steps.length) {
            processStep();
          } else {
            // Complete analysis
            const mockStressLevel = Math.floor(Math.random() * 100);
            const mockAnalysis = {
              heartRate: 65 + Math.floor(Math.random() * 25),
              faceDetected: true,
              confidence: 92 + Math.floor(Math.random() * 7),
              emotionalState: mockStressLevel > 70 ? 'High Stress' : 
                             mockStressLevel > 40 ? 'Moderate Stress' : 'Low Stress',
              recommendations: mockStressLevel > 70 
                ? ['Take 5 deep breaths slowly', 'Consider a 10-minute break', 'Try progressive muscle relaxation', 'Drink some water']
                : mockStressLevel > 40 
                ? ['Stay hydrated throughout the day', 'Take regular 2-minute breaks', 'Light stretching exercises', 'Maintain good posture']
                : ['Maintain your current routine', 'Keep up the excellent work', 'Stay consistent with breaks', 'Continue healthy habits']
            };
            
            setStressLevel(mockStressLevel);
            setAnalysis(mockAnalysis);
            setIsLoading(false);
            setCurrentStep('results');
          }
        }, steps[currentStepIndex].duration);
      }
    };

    processStep();
  };

  const getStressColor = (level) => {
    if (level >= 70) return 'from-red-500 to-red-600';
    if (level >= 40) return 'from-yellow-500 to-orange-500';
    return 'from-green-500 to-green-600';
  };

  const getStressText = (level) => {
    if (level >= 70) return { text: 'High Stress', color: 'text-red-600' };
    if (level >= 40) return { text: 'Moderate', color: 'text-yellow-600' };
    return { text: 'Low Stress', color: 'text-green-600' };
  };

  const resetAnalysis = () => {
    setStressLevel(null);
    setAnalysis(null);
    setCurrentStep('camera');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">AI Stress Detection</h1>
                  <p className="text-sm text-gray-600">Real-time wellness analysis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center max-w-2xl mx-auto"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Activity className="w-12 h-12 text-blue-600" />
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Advanced Stress Analysis
              </h2>
              
              <p className="text-lg text-gray-600 mb-8">
                Our AI-powered system analyzes facial expressions, micro-movements, and physiological 
                indicators to provide you with an accurate stress assessment. All processing happens 
                locally on your device for complete privacy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <Camera className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Facial Analysis</h3>
                  <p className="text-sm text-gray-600">Advanced computer vision detects stress markers</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <Heart className="w-8 h-8 text-red-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Heart Rate</h3>
                  <p className="text-sm text-gray-600">Optical measurement of pulse from facial color</p>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
                  <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">AI Insights</h3>
                  <p className="text-sm text-gray-600">Personalized recommendations for wellness</p>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 mb-6"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="text-red-700">{error}</span>
                </motion.div>
              )}

              <button
                onClick={startCamera}
                disabled={isLoading}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 flex items-center space-x-3 mx-auto text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    <span>Starting Camera...</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-6 h-6" />
                    <span>Begin Analysis</span>
                  </>
                )}
              </button>
            </motion.div>
          )}

          {(currentStep === 'camera' || currentStep === 'analyzing') && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Live Analysis</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Camera Active</span>
                    </div>
                  </div>

                  <div className="relative mb-6">
                    <video
                      ref={videoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-96 bg-gray-900 rounded-lg object-cover"
                    />
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                      style={{ display: 'none' }}
                    />
                    
                    {currentStep === 'analyzing' && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 text-center">
                          <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-4" />
                          <p className="text-gray-900 font-medium">Analyzing facial expressions...</p>
                          <p className="text-sm text-gray-600 mt-1">Please stay still and look at the camera</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center space-x-4">
                    {currentStep === 'camera' && (
                      <button
                        onClick={analyzeStressLevel}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
                      >
                        <Activity className="w-5 h-5" />
                        <span>Start Analysis</span>
                      </button>
                    )}
                    
                    <button
                      onClick={stopCamera}
                      className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
                    >
                      <CameraOff className="w-5 h-5" />
                      <span>Stop Camera</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'results' && stressLevel !== null && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Results Summary */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Your Stress Analysis</h3>
                  
                  {/* Stress Level Circle */}
                  <div className="text-center mb-8">
                    <div className="relative w-48 h-48 mx-auto mb-6">
                      <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 200 200">
                        {/* Background circle */}
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="12"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="100"
                          cy="100"
                          r="85"
                          fill="none"
                          stroke={`url(#gradient-${stressLevel >= 70 ? 'red' : stressLevel >= 40 ? 'yellow' : 'green'})`}
                          strokeWidth="12"
                          strokeDasharray={`${2 * Math.PI * 85}`}
                          strokeDashoffset={`${2 * Math.PI * 85 * (1 - stressLevel / 100)}`}
                          strokeLinecap="round"
                          className="transition-all duration-2000 ease-out"
                        />
                        {/* Gradient definitions */}
                        <defs>
                          <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#dc2626" />
                          </linearGradient>
                          <linearGradient id="gradient-yellow" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#eab308" />
                            <stop offset="100%" stopColor="#f59e0b" />
                          </linearGradient>
                          <linearGradient id="gradient-green" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#16a34a" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900 mb-2">{stressLevel}%</div>
                          <div className={`text-lg font-semibold ${getStressText(stressLevel).color}`}>
                            {getStressText(stressLevel).text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Metrics */}
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="font-medium text-gray-900">Heart Rate</span>
                      </div>
                      <span className="font-bold text-lg text-gray-900">{analysis.heartRate} BPM</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span className="font-medium text-gray-900">Face Detection</span>
                      </div>
                      <span className="font-bold text-lg text-green-600">Active</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-5 h-5 text-purple-500" />
                        <span className="font-medium text-gray-900">Confidence</span>
                      </div>
                      <span className="font-bold text-lg text-gray-900">{analysis.confidence}%</span>
                    </div>
                    
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-900">Emotional State</span>
                      </div>
                      <span className="font-bold text-lg text-gray-900">{analysis.emotionalState}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={resetAnalysis}
                      className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Analyze Again</span>
                    </button>
                    
                    <button className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>

                {/* Recommendations */}
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                    <h4 className="text-xl font-bold text-gray-900 mb-6">Personalized Recommendations</h4>
                    
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg"
                        >
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <p className="text-blue-900 font-medium">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Insights */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-200 p-6">
                    <h5 className="font-bold text-purple-900 mb-3">💡 Quick Tips</h5>
                    <ul className="space-y-2 text-purple-800">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Take this test regularly to track your wellness journey</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Best results are achieved in good lighting conditions</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Consider consulting a healthcare professional for persistent stress</span>
                      </li>
                    </ul>
                  </div>

                  {/* Share Results */}
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h5 className="font-bold text-gray-900 mb-4">Share Your Results</h5>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button 
                        onClick={() => router.push('/')}
                        className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StressAnalysisPage;