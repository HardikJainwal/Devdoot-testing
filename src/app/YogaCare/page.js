'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Users, Star, ChevronRight, CheckCircle, ArrowRight, Loader2, Sparkles, Clock, Target } from 'lucide-react';

const YogaCarePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [instructors, setInstructors] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const [experience, setExperience] = useState('Beginner');
  const [goal, setGoal] = useState('Flexibility');
  const [timeAvailable, setTimeAvailable] = useState('15-30 minutes');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock instructors data
  useEffect(() => {
    const fetchInstructors = async () => {
      const mockInstructors = [
        {
          id: 1,
          name: "Maya Patel",
          specialization: "Hatha & Restorative Yoga",
          experience: "12+ years",
          rating: 4.9,
          certification: "RYT-500, Meditation Teacher",
          image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "James Wilson",
          specialization: "Vinyasa & Power Yoga",
          experience: "8+ years",
          rating: 4.8,
          certification: "RYT-200, Athletic Trainer",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Priya Sharma",
          specialization: "Yin Yoga & Mindfulness",
          experience: "10+ years",
          rating: 4.9,
          certification: "RYT-300, MBSR Certified",
          image: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=400&h=400&fit=crop&crop=face"
        },
        {
          id: 4,
          name: "Alex Chen",
          specialization: "Ashtanga & Alignment",
          experience: "7+ years",
          rating: 4.7,
          certification: "RYT-200, Anatomy Specialist",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
        }
      ];
      setInstructors(mockInstructors);
    };

    fetchInstructors();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Handle AI yoga plan generation
  const generateYogaPlan = async () => {
    setIsLoading(true);
    setGeneratedPlan(null);

    try {
      const response = await fetch('/api/yoga-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ experience, goal, timeAvailable }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch yoga plan');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedPlan(data);
    } catch (error) {
      console.error('Error fetching yoga plan:', error);
      setGeneratedPlan({
        sequence: [
          {
            pose: "Mountain Pose",
            duration: "1 minute",
            description: "Stand tall with feet together, arms at sides. Focus on your breath."
          },
          {
            pose: "Downward Dog",
            duration: "2 minutes", 
            description: "Hands and feet on floor, hips up. Great for stretching."
          },
          {
            pose: "Child's Pose",
            duration: "2 minutes",
            description: "Kneel and rest forehead on floor. Perfect for relaxation."
          }
        ],
        instructorRecommendation: "Maya Patel (Hatha & Restorative Yoga)",
        benefits: ["Improved flexibility", "Reduced stress", "Better posture"]
      });
    } finally {
      setIsLoading(false);
    }
  };

  const yogaSteps = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Start with Intention",
      description: "Begin your practice by setting a mindful intention and connecting with your breath to center your mind and body."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Practice with Purpose",
      description: "Follow guided sequences designed for your level, focusing on proper alignment and mindful movement."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Learn from Experts",
      description: "Connect with certified instructors who provide personalized guidance and support for your unique journey."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Cultivate Consistency",
      description: "Build a sustainable practice with our tracking tools and community support to maintain your wellness routine."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Busy Professional",
      content: "YogaCare helped me find peace in my hectic schedule. The personalized routines fit perfectly into my day, and I feel more balanced than ever.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Roberto Garcia",
      role: "Fitness Enthusiast", 
      content: "As someone who was skeptical about yoga, YogaCare completely changed my perspective. The instructors made it accessible and incredibly effective.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Emma Thompson",
      role: "Wellness Seeker",
      content: "The AI-powered recommendations are spot-on! Every session feels perfectly tailored to what my body and mind need that day.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <section className="relative min-h-[70vh] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-16 left-16 w-40 h-40 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-24 right-20 w-32 h-32 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white/10 rounded-full animate-ping"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[70vh] text-center text-white px-4">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              Find Your Inner Peace with YogaCare
            </h1>
            <p className="text-xl md:text-2xl text-orange-100 max-w-2xl mx-auto leading-relaxed">
              Personalized yoga practices designed for your lifestyle. Transform your mind, body, and spirit with expert guidance.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">5K+ Practitioners</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </section>

      
      <section
        id="steps"
        data-animate
        className={`py-20 bg-white ${isVisible["steps"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple Steps to Mindful Movement
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Begin your yoga journey with our structured approach designed to cultivate mindfulness and physical well-being.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {yogaSteps.map((step, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-purple-500 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeStep === index ? 'bg-purple-50 border-purple-500' : 'bg-white hover:shadow-xl'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-colors duration-300 ${
                  activeStep === index ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-500 group-hover:bg-purple-500 group-hover:text-white'
                }`}>
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
                <div className="absolute top-4 right-4 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-bold text-gray-600">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section
        id="instructors"
        data-animate
        className={`py-20 bg-gray-50 ${isVisible["instructors"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Certified Yoga Instructors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hand-picked specialists dedicated to guiding you on your wellness journey with expertise, compassion, and mindful practice.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {instructors.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <div className="relative">
                  <img
                    src={instructor.image}
                    alt={instructor.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{instructor.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{instructor.rating}</span>
                    </div>
                  </div>
                  <p className="text-purple-600 font-semibold mb-1">{instructor.specialization}</p>
                  <p className="text-gray-600 text-sm mb-2">{instructor.experience} Experience</p>
                  <p className="text-gray-500 text-xs mb-4">{instructor.certification}</p>
                  <div className="flex items-center text-purple-600 hover:text-purple-700 cursor-pointer group">
                    <span className="text-sm font-medium">View Profile</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      <section
        id="ai-yoga-plan"
        data-animate
        className={`py-20 bg-white ${isVisible["ai-yoga-plan"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Personalized Yoga Practice
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let AI create a custom yoga sequence based on your experience level, goals, and available time.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12">
            {/* Input Controls */}
            <div className="flex-1 w-full space-y-6">
              <div className="space-y-2">
                <label htmlFor="experience-select" className="block text-lg font-semibold text-gray-700 flex items-center">
                  <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                  Experience Level
                </label>
                <select
                  id="experience-select"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full p-4 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="goal-select" className="block text-lg font-semibold text-gray-700 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-500" />
                  Primary Goal
                </label>
                <select
                  id="goal-select"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-4 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option>Flexibility</option>
                  <option>Strength</option>
                  <option>Relaxation</option>
                  <option>Balance</option>
                  <option>Stress Relief</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="time-select" className="block text-lg font-semibold text-gray-700 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-purple-500" />
                  Available Time
                </label>
                <select
                  id="time-select"
                  value={timeAvailable}
                  onChange={(e) => setTimeAvailable(e.target.value)}
                  className="w-full p-4 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                >
                  <option>10-15 minutes</option>
                  <option>15-30 minutes</option>
                  <option>30-45 minutes</option>
                  <option>45-60 minutes</option>
                </select>
              </div>

              <button
                onClick={generateYogaPlan}
                disabled={isLoading}
                className="w-full bg-purple-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 hover:bg-purple-700 transition-colors duration-300 disabled:bg-purple-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Creating Your Practice...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate My Yoga Plan</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            
            {/* Generated Plan Display */}
            <div className="flex-1 w-full min-h-[400px] max-h-[600px] overflow-y-auto">
              {isLoading && !generatedPlan && (
                <div className="text-center text-gray-500 flex items-center justify-center h-full">
                  <div>
                    <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
                    <p>Crafting your personalized yoga sequence...</p>
                  </div>
                </div>
              )}

              {!isLoading && !generatedPlan && (
                <div className="text-center text-gray-400 flex items-center justify-center h-full">
                  <div>
                    <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p>Your personalized yoga plan will appear here</p>
                  </div>
                </div>
              )}

              {generatedPlan && !isLoading && (
                <div className="space-y-4 animate-fade-in-up">
                  {/* Yoga Sequence - Compact Cards */}
                  <div className="bg-white rounded-xl border border-purple-200 shadow-sm">
                    <div className="p-4 border-b border-purple-100">
                      <h3 className="text-lg font-bold text-purple-800 flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2" /> Your Sequence
                      </h3>
                    </div>
                    <div className="p-4 max-h-48 overflow-y-auto">
                      <div className="grid gap-3">
                        {generatedPlan.sequence?.slice(0, 6).map((pose, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-6 h-6 bg-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center flex-shrink-0">
                                  {index + 1}
                                </span>
                                <h4 className="font-semibold text-gray-900 text-sm truncate">{pose.pose}</h4>
                                <span className="text-xs text-purple-600 font-medium bg-purple-100 px-2 py-1 rounded-full flex-shrink-0">
                                  {pose.duration}
                                </span>
                              </div>
                              <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                                {pose.description?.length > 80 
                                  ? `${pose.description.substring(0, 80)}...` 
                                  : pose.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  
                  {generatedPlan.benefits && (
                    <div className="bg-white rounded-xl border border-purple-200 shadow-sm p-4">
                      <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <Star className="w-5 h-5 text-yellow-500 mr-2" />
                        Benefits
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedPlan.benefits.slice(0, 5).map((benefit, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {benefit.length > 20 ? `${benefit.substring(0, 20)}...` : benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Instructor - Compact */}
                  <div className="bg-white rounded-xl border border-purple-200 shadow-sm p-4">
                    <h4 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                      <Users className="w-5 h-5 text-purple-500 mr-2" />
                      Recommended Instructor
                    </h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-purple-600 flex-1">
                        {generatedPlan.instructorRecommendation?.length > 40 
                          ? `${generatedPlan.instructorRecommendation.substring(0, 40)}...`
                          : generatedPlan.instructorRecommendation}
                      </p>
                      <button className="ml-2 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium hover:bg-purple-200 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      
      <section
        id="testimonials"
        data-animate
        className={`py-20 bg-gray-50 ${isVisible["testimonials"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Transformative Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how YogaCare has brought peace, strength, and mindfulness to practitioners worldwide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="absolute top-4 right-4 text-4xl text-purple-200 font-serif"></div>
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-purple-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  {testimonial.content}
                </p>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "5K+", label: "Active Practitioners" },
              { number: "98%", label: "Satisfaction Rate" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "24/7", label: "Community Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        [data-animate] {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }
        [data-animate].animate {
          opacity: 1;
          transform: translateY(0);
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default YogaCarePage;