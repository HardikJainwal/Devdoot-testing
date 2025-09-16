'use client';
import React, { useState, useEffect } from 'react';
import { Crown, Rocket, Users, Brain, Heart, Award, CheckCircle, Star, Globe, Zap, Shield, TrendingUp } from 'lucide-react';

const SchoolWellnessPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const plans = [
    {
      name: "Essential Plan",
      icon: <Users className="w-8 h-8" />,
      color: "blue",
      description: "A cost-effective virtual model providing access to our global network of wellness coaches.",
      features: [
        "Group sessions (up to 35 students)",
        "Choice of Indian or Global coaches",
        "Discounts on 1-on-1 sessions",
        "Basic wellness resources",
        "Monthly progress reports"
      ],
      buttonText: "Request Details",
      popular: false
    },
    {
      name: "Premium Plan",
      icon: <Crown className="w-8 h-8" />,
      color: "purple",
      description: "Focused, small-group virtual sessions for personalized attention from our elite global coaches.",
      features: [
        "Small group size (up to 15 students)",
        "AI Smart Tracker & Personalized Plans",
        "Free Devdoot app membership",
        "Priority booking & premium workshops",
        "Exclusive Devdoot merchandise",
        "24/7 student support"
      ],
      buttonText: "Request Details",
      popular: true
    },
    {
      name: "Ultimate Curriculum",
      icon: <Rocket className="w-8 h-8" />,
      color: "orange",
      description: "A comprehensive hybrid program blending virtual and in-person experiences for total wellness immersion.",
      features: [
        "Hybrid model (virtual & in-person)",
        "Full AI Dashboard & Predictive Insights",
        "Curated challenges and events",
        "Free annual body check-up",
        "Includes Devdoot goodies",
        "Dedicated school liaison"
      ],
      buttonText: "Request Details",
      popular: false
    }
  ];

  const objectives = [
    {
      icon: <Heart className="w-12 h-12 text-pink-500" />,
      title: "Mental Health Support",
      description: "Comprehensive mental wellness programs designed to help students manage stress, anxiety, and emotional challenges."
    },
    {
      icon: <Brain className="w-12 h-12 text-blue-500" />,
      title: "Academic Performance",
      description: "Evidence-based techniques to improve focus, memory, and learning capabilities for better academic outcomes."
    },
    {
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Social Skills Development",
      description: "Building confidence, communication skills, and healthy relationships within the school community."
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-500" />,
      title: "Resilience Building",
      description: "Teaching students how to bounce back from challenges and develop emotional intelligence for life success."
    }
  ];

  const aiFeatures = [
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Smart Analytics",
      description: "AI-powered insights track student wellness patterns and provide personalized recommendations."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-green-500" />,
      title: "Predictive Wellness",
      description: "Advanced algorithms predict wellness needs and suggest preventive measures before issues arise."
    },
    {
      icon: <Brain className="w-8 h-8 text-blue-500" />,
      title: "Personalized Plans",
      description: "Custom wellness plans tailored to each student's unique needs, preferences, and goals."
    }
  ];

  const getColorClasses = (color, type = 'button') => {
    const colorMap = {
      blue: {
        button: 'bg-blue-600 hover:bg-blue-700 text-white',
        border: 'border-blue-200',
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        icon: 'text-blue-600'
      },
      purple: {
        button: 'bg-purple-600 hover:bg-purple-700 text-white',
        border: 'border-purple-200 ring-2 ring-purple-300',
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        icon: 'text-purple-600'
      },
      orange: {
        button: 'bg-orange-600 hover:bg-orange-700 text-white',
        border: 'border-orange-200',
        bg: 'bg-orange-50',
        text: 'text-orange-600',
        icon: 'text-orange-600'
      }
    };
    return colorMap[color][type];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className={`relative z-10 max-w-7xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Empowering Your
            <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent"> Student Community</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your school into a wellness-focused learning environment where students thrive academically, emotionally, and socially.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Journey
            </button>
            <button className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 backdrop-blur-sm transition-all duration-300">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

     
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Core Objectives & <span className="text-purple-600">Benefits</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive wellness program addresses every aspect of student wellbeing, creating a foundation for lifelong success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {objectives.map((objective, index) => (
              <div key={index} className={`group p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:scale-105 ${isVisible ? 'animate-fade-in' : ''}`} style={{animationDelay: `${index * 100}ms`}}>
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {objective.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{objective.title}</h3>
                <p className="text-gray-600 leading-relaxed">{objective.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Introducing <span className="bg-gradient-to-r from-yellow-400 to-pink-400 bg-clip-text text-transparent">AI-Powered Wellness</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Harness the power of artificial intelligence to create personalized wellness experiences for every student.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {aiFeatures.map((feature, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-200 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">Smart Wellness Dashboard</h3>
                <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                  Our AI dashboard provides real-time insights into student wellness patterns, helping schools make data-driven decisions for better student outcomes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Real-time wellness monitoring</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Predictive analytics for early intervention</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span>Customizable reporting for administrators</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-8 border border-white/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Student Engagement</span>
                    <span className="text-green-400 font-semibold">92%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Wellness Score</span>
                    <span className="text-yellow-400 font-semibold">8.7/10</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 h-2 rounded-full" style={{width: '87%'}}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300">Program Completion</span>
                    <span className="text-purple-400 font-semibold">85%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              A World of <span className="text-purple-600">Wellness Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with certified wellness coaches from around the globe, bringing diverse perspectives and proven methodologies to your school.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <Globe className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">50+</h4>
                  <p className="text-gray-600">Global Coaches</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <Award className="w-12 h-12 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">95%</h4>
                  <p className="text-gray-600">Success Rate</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <Users className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">10K+</h4>
                  <p className="text-gray-600">Students Served</p>
                </div>
                <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
                  <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">4.9</h4>
                  <p className="text-gray-600">Average Rating</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">Expert-Led Programs</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of certified wellness professionals brings years of experience working with educational institutions worldwide. Each coach is specially trained to work with students aged 12-18, understanding the unique challenges of adolescence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Certified Professionals</h4>
                    <p className="text-gray-600">All coaches hold relevant certifications in psychology, counseling, or wellness coaching.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Cultural Sensitivity</h4>
                    <p className="text-gray-600">Our diverse team understands and respects cultural differences in wellness approaches.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Ongoing Training</h4>
                    <p className="text-gray-600">Regular professional development ensures our coaches stay current with best practices.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Flexible <span className="text-purple-600">Wellness Plans</span>
            </h2>
           <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
  Customizable packages to fit your school&apos;s specific needs and budget requirements.
</p>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div key={index} className={`relative p-8 rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${getColorClasses(plan.color, 'border')} ${plan.popular ? 'transform scale-105' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${getColorClasses(plan.color, 'bg')}`}>
                    <div className={getColorClasses(plan.color, 'icon')}>
                      {plan.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${getColorClasses(plan.color, 'icon')}`} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${getColorClasses(plan.color, 'button')}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-purple-900 rounded-3xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">30-Day Implementation Plan</h3>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                A streamlined process to launch your wellness program with comprehensive support every step of the way.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">1-2</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Weeks 1-2</h4>
                  <p className="text-gray-300">Requirements & Customization</p>
                  <p className="text-sm text-gray-400 mt-2">Gathering student demographics and tailoring session topics, schedules, and coach selection.</p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Week 3</h4>
                  <p className="text-gray-300">System Setup & Onboarding</p>
                  <p className="text-sm text-gray-400 mt-2">Technical configuration of the admin panel, AI calibration, and student onboarding.</p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold">4</span>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Week 4</h4>
                  <p className="text-gray-300">Pilot Sessions & Launch</p>
                  <p className="text-sm text-gray-400 mt-2">Conducting initial wellness sessions with select groups to gather feedback before full rollout.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SchoolWellnessPage;