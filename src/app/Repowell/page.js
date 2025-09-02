// app/repowell-health/page.jsx
'use client'
import React, { useState, useEffect } from 'react';
import { Heart, Activity, Users, Star, ChevronRight, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

const RepowellHealthPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [coaches, setCoaches] = useState([]);
  const [isVisible, setIsVisible] = useState({});
  const [mood, setMood] = useState('Stressed');
  const [goal, setGoal] = useState('Reduce Stress');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock coaches data
  useEffect(() => {
    const fetchCoaches = async () => {
      const mockCoaches = [
        {
          id: 1,
          name: "Dr. Sarah Johnson",
          specialization: "Nutritionist & Wellness Coach",
          experience: "8+ years",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
        },
        {
          id: 2,
          name: "Mike Thompson",
          specialization: "Fitness & Personal Training",
          experience: "6+ years",
          rating: 4.8,
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=face"
        },
        {
          id: 3,
          name: "Dr. Emily Chen",
          specialization: "Mental Health & Mindfulness",
          experience: "10+ years",
          rating: 4.9,
          image: "https://images.unsplash.com/photo-1594824575008-24fb5f27f7d4?w=400&h=400&fit=crop&crop=face"
        }
      ];
      setCoaches(mockCoaches);
    };

    fetchCoaches();
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

  // Handle AI plan generation
  const generateAIPlan = async () => {
    setIsLoading(true);
    setGeneratedPlan(null);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mood, goal }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch AI response');
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedPlan(data);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setGeneratedPlan({
        plan: [
          {
            title: "Error",
            description: "Unable to generate plan. Please try again later."
          }
        ],
        coachRecommendation: "N/A"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const healthSteps = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Assess Your Current Health",
      description: "Complete our comprehensive health assessment to understand your starting point and identify areas for improvement."
    },
    {
      icon: <Activity className="w-8 h-8" />,
      title: "Create Your Personal Plan",
      description: "Get a customized wellness plan tailored to your goals, lifestyle, and health needs from our expert team."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Connect with Coaches",
      description: "Work with certified health coaches who provide guidance, motivation, and support throughout your journey."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Track Your Progress",
      description: "Monitor your achievements with our advanced tracking tools and celebrate every milestone along the way."
    }
  ];

  const testimonials = [
    {
      name: "Jennifer Martinez",
      role: "Working Professional",
      content: "Repowell transformed my approach to health. In just 6 months, I've lost 25 pounds and gained incredible energy. The coaches are amazing!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b494?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "David Kim",
      role: "Entrepreneur",
      content: "The personalized nutrition plan and fitness coaching helped me build sustainable habits. I finally feel in control of my health.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Lisa Thompson",
      role: "Mother of Two",
      content: "Balancing family and health seemed impossible until I found Repowell. The flexible approach made all the difference.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white/10 rounded-full animate-bounce"></div>
          <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-white/10 rounded-full animate-ping"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center min-h-[70vh] text-center text-white px-4">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              Transform Your Health with Repowell
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Your personalized journey to optimal wellness starts here. Expert guidance, proven methods, lasting results.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-8">
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-5 h-5 text-yellow-300 fill-current" />
                <span className="text-sm font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="w-5 h-5" />
                <span className="text-sm font-medium">10K+ Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white rotate-90" />
        </div>
      </section>

      {/* Simple Steps Section */}
      <section
        id="steps"
        data-animate
        className={`py-20 bg-white ${isVisible["steps"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple Steps to a Healthier You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proven methodology makes wellness achievable for everyone, regardless of your starting point or schedule.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {healthSteps.map((step, index) => (
              <div
                key={index}
                className={`group relative p-8 rounded-2xl border-2 border-gray-100 hover:border-blue-500 transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeStep === index ? 'bg-blue-50 border-blue-500' : 'bg-white hover:shadow-xl'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 transition-colors duration-300 ${
                  activeStep === index ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-500 group-hover:bg-blue-500 group-hover:text-white'
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

      {/* Expert Coaches Section */}
      <section
        id="coaches"
        data-animate
        className={`py-20 bg-gray-50 ${isVisible["coaches"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Expert Coaches
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Work with certified professionals who are passionate about helping you achieve your health goals.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coaches.map((coach) => (
              <div
                key={coach.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group"
              >
                <div className="relative">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{coach.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600">{coach.rating}</span>
                    </div>
                  </div>
                  <p className="text-blue-600 font-semibold mb-2">{coach.specialization}</p>
                  <p className="text-gray-600 text-sm mb-4">{coach.experience} Experience</p>
                  <div className="flex items-center text-blue-600 hover:text-blue-700 cursor-pointer group">
                    <span className="text-sm font-medium">View Profile</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Coach Section */}
      <section
        id="ai-coach"
        data-animate
        className={`py-20 bg-gray-100 ${isVisible["ai-coach"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Your Personalized AI Wellness Coach
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tell us how you're feeling and your goals, and get a custom plan in seconds.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl flex flex-col md:flex-row items-center gap-12">
            {/* Input Controls */}
            <div className="flex-1 w-full space-y-6">
              <div className="space-y-2">
                <label htmlFor="mood-select" className="block text-lg font-semibold text-gray-700">How are you feeling today? 🧘‍♀️</label>
                <select
                  id="mood-select"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full p-4 border border-gray-300 text-black rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option>Stressed</option>
                  <option>Tired</option>
                  <option>Anxious</option>
                  <option>Balanced</option>
                </select>
              </div>
              <div className="space-y-2">
                <label htmlFor="goal-select" className="block text-lg font-semibold text-gray-700">What is your primary goal? ✨</label>
                <select
                  id="goal-select"
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full p-4 border text-black border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option>Reduce Stress</option>
                  <option>Increase Energy</option>
                  <option>Improve Sleep</option>
                  <option>Hormonal Balance</option>
                  <option>Fitness Progress</option>
                </select>
              </div>
              <button
                onClick={generateAIPlan}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Generating Plan...</span>
                  </>
                ) : (
                  <>
                    <span>Generate My Plan</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            
            {/* Generated Plan Display */}
            <div className="flex-1 w-full min-h-[300px] flex items-center justify-center">
              {isLoading && !generatedPlan && (
                <div className="text-center text-gray-500">
                  <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                  <p>Crafting your personalized plan...</p>
                </div>
              )}

              {generatedPlan && !isLoading && (
                <div className="w-full space-y-6 animate-fade-in-up">
                  <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                    <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
                      <CheckCircle className="w-6 h-6 mr-2" /> Your Wellness Plan
                    </h3>
                    {generatedPlan.plan?.map((step, index) => (
                      <div key={index} className="mb-4 last:mb-0">
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        <p className="text-gray-600 text-sm">{step.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-gray-200">
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Recommended Coach</h4>
                    <p className="text-lg font-semibold text-blue-600">{generatedPlan.coachRecommendation}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real Stories Section */}
      <section
        id="testimonials"
        data-animate
        className={`py-20 bg-white ${isVisible["testimonials"] ? "animate" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Real Stories from Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Repowell has transformed the lives of thousands of people just like you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100 hover:shadow-xl transition-all duration-500 group"
              >
                <div className="absolute top-4 right-4 text-4xl text-blue-200 font-serif">"</div>
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 ring-2 ring-blue-200"
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
              { number: "10K+", label: "Success Stories" },
              { number: "95%", label: "Goal Achievement" },
              { number: "4.9/5", label: "Average Rating" },
              { number: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
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
      `}</style>
    </div>
  );
};

export default RepowellHealthPage;