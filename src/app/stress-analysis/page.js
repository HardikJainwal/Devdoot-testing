"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as faceapi from 'face-api.js';
import { fetchCoachesBySpecialization } from "@/api/coaches";
import { authUtils } from "@/api/auth";
import { useRouter } from "next/navigation";
import { 
  Camera, 
  CameraOff, 
  Activity, 
  Brain, 
  Loader2, 
  AlertCircle, 
  CheckCircle,
  Heart,
  Star,
  Video,
  Clock,
  Award,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const StressAnalysisPage = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [emotionalState, setEmotionalState] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState('initial');
  const [suggestedCoaches, setSuggestedCoaches] = useState([]);
  const [loadingCoaches, setLoadingCoaches] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const carouselRef = useRef(null);

  // Load suggested coaches
  const loadSuggestedCoaches = async () => {
    try {
      setLoadingCoaches(true);
      setError(null);
      if (!authUtils.isAuthenticated()) {
        setError('Please log in to view coaches.');
        router.push('/login');
        return;
      }
      const response = await fetchCoachesBySpecialization("Mental Health Support Coach", 1, 5);
      if (response && response.success) {
        const coachesData = response.data?.data || [];
        const mappedCoaches = coachesData.map((coach, index) => ({
          _id: coach._id || `coach-${index}`,
          name: coach.coachName || `Mental Health Coach ${index + 1}`,
          profilePicture: coach.profilePhoto,
          experience: coach.experienceYear || 5,
          rating: coach.rating || (3.5 + Math.random() * 1.5),
          sessionTime: coach.sessionTime || 45,
          pricePerMinute: coach.pricePerMinute || 20,
          languages: coach.languages || ["English"],
          currency: coach.currency || "INR",
          fees: Math.round((coach.pricePerMinute || 20) * (coach.sessionTime || 45)),
          
          specialties: ["Anxiety", "Depression", "Stress Management"],
          nextAvailable: "Today, 2:00 PM"
        }));
        setSuggestedCoaches(mappedCoaches);
      } else {
        setError(response?.message || 'Failed to load coaches.');
      }
    } catch (error) {
      console.error('Error loading suggested coaches:', error);
      setError('Authentication error. Please log in again.');
      authUtils.clearAuth();
      router.push('/login');
    } finally {
      setLoadingCoaches(false);
    }
  };

  const cleanup = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        
        if (!faceapi.nets.tinyFaceDetector.isLoaded) {
          await Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
            faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
            faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL)
          ]);
        }
        
        if (isMounted) {
          setModelsLoaded(true);
          console.log('Face-api models loaded successfully');
        }
      } catch (error) {
        if (isMounted) {
          console.error('Error loading models:', error);
          setError('Failed to load face detection models');
        }
      }
    };

    if (typeof window !== 'undefined') {
      loadModels();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return cleanup;
  }, []);

  useEffect(() => {
    if (currentStep === 'results') {
      console.log('Token:', localStorage.getItem('authToken'));
      loadSuggestedCoaches();
    }
  }, [currentStep]);

  const startCamera = async () => {
    setError(null);
    setIsLoading(true);
    setCurrentStep('camera');
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 1280, 
          height: 720,
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
    setEmotionalState(null);
    setAnalysis(null);
    setError(null);
    setCurrentStep('initial');
  };

  const analyzeEmotions = async () => {
    if (!videoRef.current || !canvasRef.current || !modelsLoaded) return;
    
    setIsLoading(true);
    setCurrentStep('analyzing');
    setError(null);

    try {
      const detection = await faceapi
        .detectSingleFace(
          videoRef.current, 
          new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceExpressions();

      if (!detection) {
        setError('No face detected. Please ensure your face is clearly visible.');
        setIsLoading(false);
        return;
      }

      const emotionAnalysis = getEmotionalState(detection.expressions);
      
      const analysis = {
        faceDetected: true,
        confidence: Math.round(detection.detection.score * 100),
        emotionalState: emotionAnalysis.state,
        description: emotionAnalysis.description,
        color: emotionAnalysis.color,
        recommendations: emotionAnalysis.recommendations,
        expressions: detection.expressions
      };

      setEmotionalState(emotionAnalysis);
      setAnalysis(analysis);
      setFaceDetected(true);
      setIsLoading(false);
      setCurrentStep('results');
      cleanup();
      setIsActive(false);

    } catch (error) {
      console.error('Analysis error:', error);
      setError('Error during analysis. Please try again.');
      setIsLoading(false);
    }
  };

  const getEmotionalState = (expressions) => {
    const dominantEmotion = Object.entries(expressions)
      .sort(([, a], [, b]) => b - a)[0][0];
    
    switch (dominantEmotion) {
      case 'happy':
        return {
          state: 'Happy',
          color: 'text-green-600',
          description: 'You appear to be in a great mood!',
          recommendations: [
            'Share your positive energy with others',
            'Document what makes you happy',
            'Engage in activities you enjoy',
            'Express gratitude for this moment'
          ]
        };
      case 'sad':
        return {
          state: 'Sad',
          color: 'text-blue-600',
          description: 'You might need some emotional support',
          recommendations: [
            'Talk to someone you trust',
            'Practice self-care activities',
            'Listen to uplifting music',
            'Take a peaceful walk outside'
          ]
        };
      case 'angry':
        return {
          state: 'Angry',
          color: 'text-red-600',
          description: 'You seem to be experiencing frustration',
          recommendations: [
            'Take deep calming breaths',
            'Find a quiet space to relax',
            'Practice anger management techniques',
            'Consider peaceful resolution strategies'
          ]
        };
      case 'neutral':
        return {
          state: 'Calm',
          color: 'text-gray-600',
          description: 'You appear to be balanced and composed',
          recommendations: [
            'Maintain this peaceful state',
            'Practice mindfulness',
            'Focus on present moment',
            'Continue your balanced approach'
          ]
        };
      default:
        return {
          state: 'Mixed',
          color: 'text-purple-600',
          description: 'Your emotions are complex right now',
          recommendations: [
            'Take time to process your feelings',
            'Practice self-awareness',
            'Focus on breathing exercises',
            'Consider journaling your thoughts'
          ]
        };
    }
  };

  const handleCoachBooking = (coachId) => {
    router.push(`/coaches/${coachId}`);
  };

  const getInitials = (name) => {
    if (!name) return "MH";
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const cardWidth = 320; // Approximate width of each coach card (w-80 = 320px)
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const CoachCard = ({ coach }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden cursor-pointer w-80 flex-shrink-0"
      onClick={() => handleCoachBooking(coach._id)}
    >
      <div className="relative h-30 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
  {coach.profilePicture ? (
    <img
      src={coach.profilePicture || "/images/devdoot-round.png"}
      alt={coach.name}
      onError={(e) => (e.currentTarget.src = "/images/devdoot-round.png")}
      className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
    />
  ) : (
    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center border-4 border-white shadow-md">
      <span className="text-white text-xl font-bold">{getInitials(coach.name)}</span>
    </div>
  )}
</div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{coach.name}</h3>
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold text-gray-900">{coach.rating.toFixed(1)}</span>
          </div>
          <span className="text-gray-500 text-sm">({Math.floor(Math.random() * 200 + 50)} reviews)</span>
        </div>
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center space-x-1.5">
            <Award className="w-5 h-5 text-blue-500" />
            <span>{coach.experience} years</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Clock className="w-5 h-5 text-blue-500" />
            <span>{coach.sessionTime} min</span>
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 text-sm">Price:</span>
            <span className="text-xl font-bold text-blue-600">₹{coach.fees}</span>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={(e) => {
            e.stopPropagation();
            handleCoachBooking(coach._id);
          }}
          className="w-full bg-[#2C8C91] text-white py-2.5 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 text-sm flex items-center justify-center space-x-1.5"
        >
          <Video className="w-5 h-5" />
          <span>Book Session</span>
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          {currentStep === 'initial' && (
            <motion.div
              key="initial"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto"
            >
              <div className="text-center mb-12">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Activity className="w-14 h-14 text-blue-600" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Advanced Stress Analysis
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Our AI-powered system analyzes facial expressions and physiological indicators to provide an accurate stress assessment, with all processing done locally for privacy.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 max-w-4xl mx-auto">
  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center flex flex-col items-center">
    <Camera className="w-10 h-10 text-blue-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">Facial Analysis</h3>
    <p className="text-gray-600">Advanced computer vision detects stress markers</p>
  </div>
  
  <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 text-center flex flex-col items-center">
    <Brain className="w-10 h-10 text-purple-600 mb-4" />
    <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Insights</h3>
    <p className="text-gray-600">Personalized recommendations for wellness</p>
  </div>
</div>


              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 mb-8 max-w-2xl mx-auto"
                >
                  <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                  <span className="text-red-700">{error}</span>
                </motion.div>
              )}

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startCamera}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 disabled:opacity-50 flex items-center space-x-3"
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
                </motion.button>
              </div>
            </motion.div>
          )}

          {(currentStep === 'camera' || currentStep === 'analyzing') && (
            <motion.div
              key="camera"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-gray-900">Live Analysis</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Camera Active</span>
                    </div>
                  </div>

                  <div className="relative mb-8">
                   <video
  ref={videoRef}
  autoPlay
  muted
  playsInline
  className="w-full max-h-[28rem] bg-gray-900 rounded-xl object-cover"
/>
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                      style={{ display: 'none' }}
                    />
                    {currentStep === 'analyzing' && (
  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
    <div className="bg-white rounded-xl p-6 text-center max-w-sm">
      <Loader2 className="w-8 h-8 animate-spin text-blue-500 mx-auto mb-3" />
      <p className="text-gray-900 font-semibold text-base">
        Analyzing facial expressions...
      </p>
      <p className="text-sm text-gray-600 mt-1">
        Please stay still and look at the camera
      </p>
    </div>
  </div>
)}

                  </div>

                  <div className="flex justify-center space-x-4">
                    {currentStep === 'camera' && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={analyzeEmotions}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-200 flex items-center space-x-2"
                      >
                        <Activity className="w-5 h-5" />
                        <span>Start Analysis</span>
                      </motion.button>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={stopCamera}
                      className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-200 flex items-center space-x-2"
                    >
                      <CameraOff className="w-5 h-5" />
                      <span>Stop Camera</span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 'results' && emotionalState && analysis && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-7xl mx-auto"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Emotional Analysis Results
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 mb-8">
                    <div className={`text-center ${analysis.color}`}>
                      <div className="text-5xl font-bold mb-4">{analysis.emotionalState}</div>
                      <div className="text-xl text-gray-600">{analysis.description}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500" />
                        <span className="font-semibold text-gray-900">Face Detection</span>
                      </div>
                      <span className="font-bold text-lg text-green-600">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Brain className="w-6 h-6 text-purple-500" />
                        <span className="font-semibold text-gray-900">Confidence</span>
                      </div>
                      <span className="font-bold text-lg text-gray-900">{analysis.confidence}%</span>
                    </div>
                  </div>
                  <div className="mt-8 flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={startCamera}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2"
                    >
                      <Activity className="w-5 h-5" />
                      <span>Try Again</span>
                    </motion.button>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-6">
                      Personalized Recommendations
                    </h4>
                    <div className="space-y-4">
                      {analysis.recommendations.map((rec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start space-x-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100"
                        >
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <p className="text-gray-800 font-medium">{rec}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 p-6">
                    <h5 className="text-xl font-bold text-purple-900 mb-4">Quick Tips</h5>
                    <ul className="space-y-3 text-purple-800">
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Track your emotional well-being regularly</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Ensure good lighting for best results</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <span className="text-purple-500 mt-1">•</span>
                        <span>Practice mindfulness between sessions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Recommended Mental <span className="text-[#C42323]"> Health Coaches</span>
                  </h2>
                  <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Connect with professional coaches to support your mental well-being
                  </p>
                </div>

                {loadingCoaches ? (
                  <div className="flex overflow-x-hidden space-x-6">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden w-80 flex-shrink-0"
                      >
                        <div className="h-36 bg-gray-200 animate-pulse" />
                        <div className="p-5 space-y-3">
                          <div className="h-6 bg-gray-200 rounded animate-pulse" />
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
                          <div className="h-9 bg-gray-200 rounded animate-pulse" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : suggestedCoaches.length > 0 ? (
                  <div className="relative">
                    <div
                      ref={carouselRef}
                      className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth space-x-6 pb-4"
                      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                      {suggestedCoaches.map((coach, index) => (
                        <div key={coach._id} className="snap-start">
                          <CoachCard coach={coach} />
                        </div>
                      ))}
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => scrollCarousel('left')}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg"
                    >
                      <ChevronLeft className="w-7 h-7" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => scrollCarousel('right')}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg"
                    >
                      <ChevronRight className="w-7 h-7" />
                    </motion.button>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">No coaches available</h3>
                    <p className="text-gray-600 mb-4">{error || 'Unable to load coaches at the moment'}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={loadSuggestedCoaches}
                      className="text-blue-500 hover:text-blue-600 font-semibold text-lg"
                    >
                      Try again
                    </motion.button>
                  </div>
                )}

                {suggestedCoaches.length > 0 && (
                  <div className="text-center mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => router.push('/MentalHealth')}
                      className="bg-[#2C8C91]  text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 flex items-center space-x-2 mx-auto"
                    >
                      <span>View All Coaches</span>
                    </motion.button>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default StressAnalysisPage;