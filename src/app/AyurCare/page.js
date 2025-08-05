'use client';
import { useState, useEffect } from 'react';
import { Sparkles, ChevronLeft, ChevronRight, Star, Award, Calendar, MapPin, Users, Brain, Scale, Stethoscope, Leaf, MessageCircle, Pill, Droplet, User, X, CheckCircle } from 'lucide-react';
import ExpertCard from '../components/ExpertCard';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { fetchCoaches , fetchCoachesBySpecialization } from '@/lib/api/coaches';

// Quiz Data Configuration (unchanged)
const quizData = {
  prakriti: {
    title: 'Core Constitution (Prakriti) Quiz',
    questions: [
      {
        id: 'physical_frame',
        question: 'My physical frame is:',
        options: [
          { text: 'Thin, light, and slender', value: 'vata' },
          { text: 'Medium and well-proportioned', value: 'pitta' },
          { text: 'Large, heavy, and sturdy', value: 'kapha' }
        ]
      },
      {
        id: 'skin_type',
        question: 'My skin is typically:',
        options: [
          { text: 'Dry, thin, and cool to touch', value: 'vata' },
          { text: 'Oily, sensitive, and warm', value: 'pitta' },
          { text: 'Thick, smooth, and moist', value: 'kapha' }
        ]
      },
      {
        id: 'appetite',
        question: 'My appetite and digestion are:',
        options: [
          { text: 'Irregular, variable', value: 'vata' },
          { text: 'Strong, sharp, I get irritable when hungry', value: 'pitta' },
          { text: 'Slow, steady, I can skip meals easily', value: 'kapha' }
        ]
      },
      {
        id: 'stress_response',
        question: 'Under stress, I tend to become:',
        options: [
          { text: 'Anxious, worried, and overwhelmed', value: 'vata' },
          { text: 'Irritable, angry, and impatient', value: 'pitta' },
          { text: 'Withdrawn, lethargic, and complacent', value: 'kapha' }
        ]
      },
      {
        id: 'sleep_pattern',
        question: 'My sleep pattern is typically:',
        options: [
          { text: 'Light sleep, often wake up during the night', value: 'vata' },
          { text: 'Sound sleep, but need 6-8 hours to feel rested', value: 'pitta' },
          { text: 'Deep, long sleep, hard to wake up', value: 'kapha' }
        ]
      }
    ]
  },
  vikriti: {
    title: 'Current Imbalance (Vikriti) Quiz',
    questions: [
      {
        id: 'current_energy',
        question: 'How has your energy been lately?',
        options: [
          { text: 'Restless, scattered, up and down', value: 'vata' },
          { text: 'Intense, driven, sometimes burning out', value: 'pitta' },
          { text: 'Low, sluggish, feeling stuck', value: 'kapha' }
        ]
      },
      {
        id: 'recent_symptoms',
        question: 'What symptoms have you experienced recently?',
        options: [
          { text: 'Dry skin, constipation, anxiety', value: 'vata' },
          { text: 'Acidity, skin rashes, irritability', value: 'pitta' },
          { text: 'Weight gain, congestion, low motivation', value: 'kapha' }
        ]
      },
      {
        id: 'mood_lately',
        question: 'How would you describe your mood lately?',
        options: [
          { text: 'Worried, anxious, spacey', value: 'vata' },
          { text: 'Frustrated, impatient, critical', value: 'pitta' },
          { text: 'Sad, unmotivated, attached', value: 'kapha' }
        ]
      },
      {
        id: 'recent_cravings',
        question: 'What have you been craving lately?',
        options: [
          { text: 'Warm, oily, heavy foods', value: 'vata' },
          { text: 'Cold, sweet, refreshing foods', value: 'pitta' },
          { text: 'Spicy, stimulating, light foods', value: 'kapha' }
        ]
      }
    ]
  },
  manas: {
    title: 'Mental Wellness (Manas) Quiz',
    questions: [
      {
        id: 'mental_clarity',
        question: 'How clear is your thinking lately?',
        options: [
          { text: 'Scattered, jumping from thought to thought', value: 'vata' },
          { text: 'Sharp and focused, but sometimes too intense', value: 'pitta' },
          { text: 'Foggy, slow, hard to concentrate', value: 'kapha' }
        ]
      },
      {
        id: 'decision_making',
        question: 'How do you make decisions?',
        options: [
          { text: 'Quickly, then often change my mind', value: 'vata' },
          { text: 'Decisively, after analyzing all options', value: 'pitta' },
          { text: 'Slowly, prefer others to decide', value: 'kapha' }
        ]
      },
      {
        id: 'emotional_state',
        question: 'How do you handle emotions?',
        options: [
          { text: 'Feel deeply but emotions change quickly', value: 'vata' },
          { text: 'Intense emotions, can hold grudges', value: 'pitta' },
          { text: 'Steady emotions, avoid conflict', value: 'kapha' }
        ]
      },
      {
        id: 'stress_management',
        question: 'How do you handle stress?',
        options: [
          { text: 'Get overwhelmed easily, need calming activities', value: 'vata' },
          { text: 'Handle it well initially, but can burn out', value: 'pitta' },
          { text: 'Avoid stressful situations, prefer routine', value: 'kapha' }
        ]
      }
    ]
  }
};

// Enhanced Quiz Modal Component (unchanged)
const QuizModal = ({ isOpen, onClose, currentQuiz, doshaInfo }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < currentQuiz.questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
        setIsAnimating(false);
      }, 150);
    } else {
      calculateResults();
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion(prev => prev - 1);
        setIsAnimating(false);
      }, 150);
    }
  };

  const calculateResults = () => {
    const scores = { vata: 0, pitta: 0, kapha: 0 };
    
    Object.values(answers).forEach(answer => {
      scores[answer]++;
    });

    let dominantDosha = 'vata';
    if (scores.pitta > scores.vata && scores.pitta >= scores.kapha) {
      dominantDosha = 'pitta';
    } else if (scores.kapha > scores.vata && scores.kapha > scores.pitta) {
      dominantDosha = 'kapha';
    }

    setResults(doshaInfo[dominantDosha]);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setResults(null);
  };

  // Reset state when quiz changes
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setAnswers({});
      setShowResults(false);
      setResults(null);
    }
  }, [isOpen, currentQuiz]);

  if (!isOpen || !currentQuiz) return null;

  const progressPercentage = ((currentQuestion + 1) / currentQuiz.questions.length) * 100;
  const currentQ = currentQuiz.questions[currentQuestion];
  const isAnswered = answers[currentQ?.id];

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-slideUp">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-[#C42323] mb-2">{currentQuiz.title}</h3>
            {!showResults && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-[#C42323] to-[#2C8C91] h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            )}
          </div>
          <button 
            className="ml-4 text-gray-500 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-all duration-200" 
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showResults ? (
            <div className="min-h-[400px] flex flex-col">
              {/* Question Counter */}
              <div className="text-center mb-6">
                <span className="bg-[#C42323] text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Question {currentQuestion + 1} of {currentQuiz.questions.length}
                </span>
              </div>

              {/* Question */}
              <div className={`flex-1 transition-all duration-300 ${isAnimating ? 'opacity-0 transform translate-x-4' : 'opacity-100 transform translate-x-0'}`}>
                <div className="mb-8">
                  <h4 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
                    {currentQ?.question}
                  </h4>
                  
                  <div className="space-y-3">
                    {currentQ?.options.map((option, index) => (
                      <label 
                        key={index}
                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                          answers[currentQ.id] === option.value
                            ? 'border-[#C42323] bg-red-50 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <input 
                          type="radio" 
                          name={`question-${currentQ.id}`}
                          value={option.value}
                          checked={answers[currentQ.id] === option.value}
                          onChange={() => handleAnswerSelect(currentQ.id, option.value)}
                          className="sr-only"
                        />
                        <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center transition-all duration-200 ${
                          answers[currentQ.id] === option.value
                            ? 'border-[#C42323] bg-[#C42323]'
                            : 'border-gray-300'
                        }`}>
                          {answers[currentQ.id] === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full animate-scaleIn" />
                          )}
                        </div>
                        <span className="text-gray-700 font-medium">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-200">
                <button
                  onClick={handlePrev}
                  disabled={currentQuestion === 0}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    currentQuestion === 0
                      ? 'text-gray-400 cursor-not-allowed'
                      : 'text-[#C42323] hover:bg-red-50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <div className="text-sm text-gray-500">
                  {Object.keys(answers).length}/{currentQuiz.questions.length} answered
                </div>

                <button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    !isAnswered
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : currentQuestion === currentQuiz.questions.length - 1
                      ? 'bg-[#C42323] text-white hover:shadow-lg transform hover:scale-105'
                      : 'bg-[#C42323] text-white hover:bg-opacity-90 hover:shadow-lg transform hover:scale-105'
                  }`}
                >
                  {currentQuestion === currentQuiz.questions.length - 1 ? 'Results' : 'Next'}
                  {currentQuestion !== currentQuiz.questions.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                </button>
              </div>
            </div>
          ) : (
            // Results Section
            <div className="text-center animate-fadeIn">
              <div className="mb-6">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-3xl font-bold text-[#C42323] mb-4">{results?.title}</h3>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-teal-50 p-8 rounded-2xl mb-6">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">{results?.description}</p>
                
                <div className="text-left space-y-4">
                  <h4 className="font-semibold text-xl text-[#2C8C91] mb-4">Lifestyle Suggestions:</h4>
                  {results?.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#C42323] rounded-full mt-3 flex-shrink-0" />
                      <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: suggestion }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button 
                  className="bg-[#2C8C91] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-200 transform hover:scale-105" 
                  onClick={handleRestart}
                >
                  Take Quiz Again
                </button>
                <button 
                  className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition-all duration-200" 
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        @keyframes scaleIn {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default function AyurCare() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentExpert, setCurrentExpert] = useState(0);
  const [experts, setExperts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const doshaInfo = {
    vata: {
      title: 'You are predominantly Vata',
      description: 'Vata types are energetic, creative, and light. Governed by air and ether, you are always on the go. When out of balance, you may experience anxiety, insomnia, and dry skin.',
      suggestions: [
        '<strong>Stay Warm:</strong> Favor warm foods and drinks. Avoid cold, frozen, or raw foods.',
        '<strong>Maintain Routine:</strong> A regular daily routine for sleeping and eating helps ground Vata energy.',
      ],
    },
    pitta: {
      title: 'You are predominantly Pitta',
      description: 'Pitta types are intelligent, ambitious, and sharp. Governed by fire and water, you have a strong intellect and appetite. When out of balance, you can be irritable, and suffer from inflammation or acidity.',
      suggestions: [
        '<strong>Stay Cool:</strong> Avoid excessive heat, spicy foods, and over-exposure to the sun.',
        '<strong>Practice Moderation:</strong> Channel your competitive nature into healthy activities and avoid overworking.',
      ],
    },
    kapha: {
      title: 'You are predominantly Kapha',
      description: 'Kapha types are calm, loving, and steady. Governed by earth and water, you are naturally strong and have a caring nature. When out of balance, you may experience sluggishness, weight gain, and congestion.',
      suggestions: [
        '<strong>Stay Active:</strong> Regular, stimulating exercise is essential to keep your energy flowing.',
        '<strong>Eat Light & Spicy:</strong> Favor light, dry, and warm foods. Pungent and bitter tastes are beneficial.',
      ],
    },
  };

  const testimonials = [
    {
      img: 'https://i.pravatar.cc/100?img=1',
      name: 'Priya Sharma',
      rating: 5,
      text: 'AayurCare transformed my approach to health. The dosha quiz was incredibly accurate, and the consultation helped me understand my body like never before.',
    },
    {
      img: 'https://i.pravatar.cc/100?img=2',
      name: 'Rohan Mehta',
      rating: 4,
      text: 'The personalized plan was easy to follow and made a huge difference in my energy levels. Highly recommend their holistic approach!',
    },
    {
      img: 'https://i.pravatar.cc/100?img=3',
      name: 'Anjali Singh',
      rating: 5,
      text: 'The doctors are so knowledgeable and caring. I finally feel in control of my well-being. Thank you, AayurCare!',
    },
  ];
const handleCoachClick = (coachId) => {
  router.push(`/coaches/${coachId}`);
};
  // Fetch coaches from API
  useEffect(() => {
  const loadCoaches = async () => {
    setIsLoading(true);
    try {
      const response = await fetchCoachesBySpecialization('Ayurveda Consultant', 1, 10);
      if (response.success) {
        const mappedExperts = response.data.data.map(coach => ({
          id: coach._id,
          name: coach.coachName,
          qualification: coach.qualification || 'Not specified',
          specialization: coach.specialization || 'Not specified',
          experience: coach.experienceYear ? `${coach.experienceYear}+ Years` : 'Not specified',
          
          rating: coach.rating || 4.5,
          reviews: coach.reviews || 0,
          image: coach.profilePhoto || 'https://i.pravatar.cc/200',
          description: coach.description || 'Experienced Ayurveda consultant.',
          achievements: coach.achievements || []
        }));
        setExperts(mappedExperts);
      } else {
        throw new Error(response.message || 'Failed to fetch coaches');
      }
    } catch (err) {
      setError(err.message);
      // Fallback to dummy data
      setExperts([
        {
          id: 1,
          name: 'Dr. Anika Sharma',
          qualification: 'BAMS, MD (Ayurveda)',
          specialization: 'Ayurveda Consultant',
          experience: '12+ Years',
          location: 'Mumbai, Maharashtra',
          rating: 4.9,
          reviews: 245,
          image: 'https://i.pravatar.cc/200?img=5',
          description: 'Expert in women\'s health with a compassionate approach to holistic healing.',
          achievements: ['Best Ayurvedic Doctor 2023', 'Women\'s Health Specialist']
        },
        // Add more fallback data if needed, ensuring specialization is 'Ayurveda Consultant'
      ]);
    } finally {
      setIsLoading(false);
    }
  };
  loadCoaches();
}, []);

  const openModal = (quizType) => {
    const quiz = quizData[quizType];
    if (quiz) {
      setCurrentQuiz(quiz);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentQuiz(null);
  };

  const showSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextExpert = () => {
    setCurrentExpert((prev) => (prev + 1) % experts.length);
  };

  const prevExpert = () => {
    setCurrentExpert((prev) => (prev - 1 + experts.length) % experts.length);
  };

  const visibleExperts = () => {
    const result = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentExpert + i) % experts.length;
      result.push(experts[index]);
    }
    return result;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  useEffect(() => {
    const expertInterval = setInterval(nextExpert, 6000);
    return () => clearInterval(expertInterval);
  }, [experts.length]);

  return (
    <main className="text-gray-800">
      {/* Hero Section */}
      <section id="home" className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        {/* Background Image */}
        <Image
          src="/banner/Care-Camp.webp"
          alt="AayurCare Banner"
          fill
          className="absolute inset-0 object-cover z-0"
          priority
        />

        {/* Text Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="w-10 h-10 text-white" />
            <span className="text-4xl font-bold text-white">AayurCare</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Begin Your Ayurvedic Wellness Journey
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto mb-8">
            Rediscover harmony and vitality with timeless wisdom, tailored for modern life. Your path to natural healing starts here.
          </p>
          <div className="space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#dosha-quiz"
              className="inline-block bg-[#C42323] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Take a Wellness Quiz
            </a>
            <a
              href="#final-cta"
              className="inline-block bg-[#2C8C91] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-opacity-90 transition transform hover:scale-105"
            >
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Why AayurCare Section */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-[#C42323] mb-16">
            Why Choose <span className="text-[#2C8C91]"> AayurCare?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: Leaf,
                bg: "bg-teal-100",
                color: "text-[#2C8C91]",
                title: "Holistic Wellness Approach",
                desc: "We treat the root cause, not just the symptoms, by creating harmony between your mind, body, and spirit.",
              },
              {
                icon: Stethoscope,
                bg: "bg-red-100",
                color: "text-[#C42323]",
                title: "Certified Ayurvedic Doctors",
                desc: "Our team of experienced and certified Vaidyas provides authentic and trustworthy guidance.",
              },
              {
                icon: Users,
                bg: "bg-blue-100",
                color: "text-blue-600",
                title: "Personalized Healing Plans",
                desc: "Receive custom-tailored diet, lifestyle, and herbal plans designed specifically for your unique constitution.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center border border-gray-100"
              >
                <div className={`flex items-center justify-center h-20 w-20 mx-auto mb-6 rounded-full ${item.bg}`}>
                  <item.icon className={`w-8 h-8 ${item.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl font-bold text-center text-[#C42323] mb-12">
            Our <span className="text-[#2C8C91]">Services</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <MessageCircle className="w-16 h-16 text-[#C42323] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Ayurvedic Coaching</h3>
              <p className="text-gray-600 mb-4">Ongoing support to integrate Ayurvedic principles into your daily life for lasting change.</p>
              <a href="#final-cta" className="font-semibold text-[#C42323]">Know More &rarr;</a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <Pill className="w-16 h-16 text-[#2C8C91] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Herbal Medicines</h3>
              <p className="text-gray-600 mb-4">Potent, pure, and authentic herbal formulations to support your healing journey.</p>
              <a href="#final-cta" className="font-semibold text-[#C42323]">Know More &rarr;</a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
              <User className="w-16 h-16 text-[#C42323] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Panchakarma at Home</h3>
              <p className="text-gray-600 mb-4">Deep detoxification and rejuvenation in the comfort of your own home.</p>
              <a href="#final-cta" className="font-semibold text-[#C42323]">Know More &rarr;</a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coaches Section - Updated with Carousel */}
      <section id="experts" className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#C42323] mb-4">
              Meet Our <span className="text-[#2C8C91]">Expert Doctors</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team of certified Ayurvedic doctors brings decades of experience in traditional healing and modern wellness approaches.
            </p>
          </div>

          {isLoading ? (
            <div className="text-center">
              <p className="text-gray-600">Loading expert doctors...</p>
            </div>
          ) : error ? (
            <div className="text-center">
              <p className="text-red-500">Error: {error}</p>
              <p className="text-gray-600">Showing fallback data.</p>
            </div>
          ) : experts.length === 0 ? (
            <div className="text-center">
              <p className="text-gray-600">No experts found.</p>
            </div>
          ) : (
            <>
              {/* Desktop Carousel */}
              <div className="hidden lg:block relative">
                <div className="grid grid-cols-3 gap-8 transition-all duration-500 ease-in-out">
                  {visibleExperts().map((expert, index) => (
                    <div key={expert.id} className={`transform transition-all duration-500 ${index === 1 ? 'scale-105 z-10' : 'scale-95'}`}>
                     <ExpertCard 
  expert={expert} 
  isCenter={index === 1} 
  onClick={() => handleCoachClick(expert.id)}
/>
                    </div>
                  ))}
                </div>
                
                {/* Navigation Buttons */}
                <button
                  onClick={prevExpert}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-[#C42323] text-[#C42323] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextExpert}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-[#C42323] text-[#C42323] hover:text-white p-3 rounded-full shadow-lg transition-all duration-300 group"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile/Tablet Carousel */}
              <div className="lg:hidden relative">
                <div className="overflow-hidden">
                  <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentExpert * 100}%)` }}>
                    {experts.map((expert) => (
                      <div key={expert.id} className="w-full flex-shrink-0 px-4">
                       <ExpertCard 
  expert={expert} 
  isCenter={true} 
  onClick={() => handleCoachClick(expert.id)}
/>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Mobile Navigation */}
                <div className="flex justify-center space-x-4 mt-8">
                  <button
                    onClick={prevExpert}
                    className="bg-white hover:bg-[#C42323] text-[#C42323] hover:text-white p-2 rounded-full shadow-md transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextExpert}
                    className="bg-white hover:bg-[#C42323] text-[#C42323] hover:text-white p-2 rounded-full shadow-md transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {experts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentExpert(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentExpert 
                        ? 'bg-[#C42323] scale-125' 
                        : 'bg-gray-300 hover:bg-[#2C8C91]'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Wellness Quizzes Section */}
      <section id="dosha-quiz" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Explore Our Wellness Quizzes</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">These short quizzes are designed to give you a glimpse into your unique Ayurvedic profile and current state of balance.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
              <Users className="w-12 h-12 text-[#C42323] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Your Core Constitution (Prakriti)</h3>
              <p className="text-gray-600 mb-6 flex-grow">Discover your fundamental mind-body type to unlock personalized health insights.</p>
              <button 
                className="mt-auto bg-[#C42323] text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition" 
                onClick={() => openModal('prakriti')}
              >
                Start Quiz
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
              <Scale className="w-12 h-12 text-[#2C8C91] mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Your Current Imbalance (Vikriti)</h3>
              <p className="text-gray-600 mb-6 flex-grow">Assess your current symptoms to understand which doshas are presently out of balance.</p>
              <button 
                className="mt-auto bg-[#C42323] text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition" 
                onClick={() => openModal('vikriti')}
              >
                Start Quiz
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col text-center">
              <Brain className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-3">Mental Wellness (Manas)</h3>
              <p className="text-gray-600 mb-6 flex-grow">Evaluate your mental and emotional state to cultivate more peace and clarity.</p>
              <button 
                className="mt-auto bg-[#C42323] text-white px-6 py-2 rounded-full font-semibold hover:bg-opacity-90 transition" 
                onClick={() => openModal('manas')}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Clients Say</h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div key={index} className={`carousel-slide text-center p-4 ${index === currentSlide ? 'active fade-in' : 'hidden'}`}>
                  <img src={testimonial.img} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-[#C42323]" loading="lazy" />
                  <div className="text-yellow-400 mb-2 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <p className="text-lg text-gray-600 italic mb-4">{testimonial.text}</p>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                </div>
              ))}
            </div>
            <button className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white" onClick={() => showSlide((currentSlide - 1 + testimonials.length) % testimonials.length)}>
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <button className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/50 p-2 rounded-full shadow-md hover:bg-white" onClick={() => showSlide((currentSlide + 1) % testimonials.length)}>
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Quiz Modal */}
      {isModalOpen && currentQuiz && (
        <QuizModal
          isOpen={isModalOpen}
          onClose={closeModal}
          currentQuiz={currentQuiz}
          doshaInfo={doshaInfo}
        />
      )}
    </main>
  );
}