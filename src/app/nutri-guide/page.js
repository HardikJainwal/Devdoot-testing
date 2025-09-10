'use client'

import { useState, useEffect } from 'react'
import { Star, CheckCircle, Users, TrendingUp, Award, Heart, ArrowRight, Play, User, Clock, DollarSign } from 'lucide-react'

export default function CoachingPlatform() {
  const [coaches, setCoaches] = useState([])
  const [loading, setLoading] = useState(true)
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [stats, setStats] = useState({
    totalCoaches: 0,
    successStories: 2847,
    averageRating: 4.9,
    transformations: 15000
  })


  const mockNutritionCoaches = [
    {
      id: 1,
      name: "Dr. Sarah Mitchell",
      title: "Certified Nutrition Specialist",
      rating: 4.9,
      reviews: 127,
      experience: "8 years",
      price: 150,
      image: "https://i.pravatar.cc/400?img=1",
      specialties: ["Weight Management", "Sports Nutrition", "Meal Planning"],
      bio: "Transforming lives through personalized nutrition strategies and sustainable lifestyle changes.",
      featured: true,
      sessionsCompleted: 850
    },
    {
      id: 2,
      name: "Marcus Johnson",
      title: "Performance Nutrition Coach",
      rating: 4.8,
      reviews: 89,
      experience: "12 years",
      price: 200,
      image: "https://i.pravatar.cc/400?img=7",
      specialties: ["Athletic Performance", "Body Composition", "Supplement Guidance"],
      bio: "Helping athletes and fitness enthusiasts optimize their performance through targeted nutrition.", 
      featured: false,
      sessionsCompleted: 1200
    },
    {
      id: 3,
      name: "Dr. Emily Chen",
      title: "Holistic Nutrition Expert",
      rating: 5.0,
      reviews: 156,
      experience: "6 years",
      price: 120,
      image: "https://i.pravatar.cc/400?img=5",
      specialties: ["Gut Health", "Anti-inflammatory Diet", "Hormonal Balance"],
      bio: "Combining traditional nutrition science with holistic wellness approaches for optimal health.",
      
      featured: true,
      sessionsCompleted: 750
    },
    {
      id: 4,
      name: "Alex Rodriguez",
      title: "Clinical Nutritionist",
      rating: 4.9,
      reviews: 203,
      experience: "10 years",
      price: 180,
      image: "https://i.pravatar.cc/400?img=8",
      specialties: ["Diabetes Management", "Heart Health", "Weight Loss"],
      bio: "Clinical expertise in managing chronic conditions through evidence-based nutrition therapy.",
      
      featured: false,
      sessionsCompleted: 950
    },
    {
      id: 5,
      name: "Jennifer Adams",
      title: "Family Nutrition Coach",
      rating: 4.7,
      reviews: 94,
      experience: "7 years",
      price: 130,
      image: "https://i.pravatar.cc/400?img=9",
      specialties: ["Child Nutrition", "Family Meal Planning", "Picky Eaters"],
      bio: "Helping families develop healthy eating habits that work for everyone around the table.",
      
      featured: false,
      sessionsCompleted: 680
    },
    {
      id: 6,
      name: "David Park",
      title: "Plant-Based Nutrition Expert",
      rating: 4.8,
      reviews: 112,
      experience: "9 years",
      price: 160,
      image: "https://i.pravatar.cc/400?img=6",
      specialties: ["Vegan Nutrition", "Plant-Based Transitions", "Sustainable Eating"],
      bio: "Guiding individuals towards thriving plant-based lifestyles with proper nutritional balance.",
      featured: true,
      sessionsCompleted: 820
    }
  ]

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Working Mother",
      content: "My nutrition coach helped me lose 30 pounds while maintaining energy for my busy lifestyle. The personalized meal plans were game-changing!",
      image: "https://i.pravatar.cc/100?u=a",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Professional Athlete", 
      content: "My performance improved dramatically with proper nutrition guidance. Recovery time decreased and strength gains increased significantly.",
      image: "https://i.pravatar.cc/100?u=b",
      rating: 5
    },
    {
      name: "Lisa Rodriguez",
      role: "Health Enthusiast",
      content: "Finally found a sustainable approach to healthy eating. My energy levels and overall wellbeing have never been better.",
      image: "https://i.pravatar.cc/100?u=c", 
      rating: 5
    }
  ]

  // Simulate API call
  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true)
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      setCoaches(mockNutritionCoaches)
      setStats(prev => ({ ...prev, totalCoaches: mockNutritionCoaches.length }))
      setLoading(false)
    }

    fetchCoaches()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const featuredCoaches = coaches.filter(coach => coach.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Transform Your Health
              <br />
              <span className="text-gray-800">With Expert Nutrition Coaching</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with certified nutrition experts who will create personalized plans to help you achieve your health and wellness goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <ArrowRight className="w-5 h-5" />
                Find Your Nutrition Coach
              </button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalCoaches}+</div>
                <div className="text-gray-600 font-medium">Expert Coaches</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <Heart className="w-8 h-8 text-purple-600" />
                </div>
                <div className="text-3xl font-bold text-purple-600 mb-2">{stats.successStories.toLocaleString()}</div>
                <div className="text-gray-600 font-medium">Success Stories</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <Star className="w-8 h-8 text-pink-600 fill-current" />
                </div>
                <div className="text-3xl font-bold text-pink-600 mb-2">{stats.averageRating}</div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center justify-center mb-3">
                  <TrendingUp className="w-8 h-8 text-indigo-600" />
                </div>
                <div className="text-3xl font-bold text-indigo-600 mb-2">{stats.transformations.toLocaleString()}+</div>
                <div className="text-gray-600 font-medium">Lives Transformed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Coaches Preview */}
      <section className="py-16 px-6" id="featured">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Award className="w-8 h-8 text-yellow-500" />
              <h2 className="text-4xl font-bold text-gray-800">Featured Nutrition Experts</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our top-rated nutrition coaches who have helped thousands transform their health
            </p>
          </div>
          
          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4 w-2/3 mx-auto"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredCoaches.slice(0, 3).map(coach => (
                <div key={coach.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 overflow-hidden group">
                  <div className="relative">
                    <img 
                      src={coach.image} 
                      alt={coach.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      {coach.rating}
                    </div>
                    
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{coach.name}</h3>
                    <p className="text-gray-600 mb-4">{coach.title}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.specialties.slice(0, 2).map(specialty => (
                        <span key={specialty} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <User className="w-4 h-4" />
                        {coach.sessionsCompleted} sessions
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        {coach.experience}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-gray-600" />
                        <span className="text-2xl font-bold text-gray-800">{coach.price}</span>
                        <span className="text-gray-600">/session</span>
                      </div>
                      <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* All Nutrition Coaches */}
      <section className="py-16 px-6 bg-white/50" id="coaches">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">All Nutrition Coaches</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Browse our complete roster of certified nutrition experts, each specializing in different aspects of health and wellness
            </p>
          </div>

          {/* Coaches Grid */}
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coaches.map(coach => (
                <div key={coach.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <img 
                        src={coach.image} 
                        alt={coach.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800">{coach.name}</h3>
                        <p className="text-gray-600 text-sm">{coach.title}</p>
                        <div className="flex items-center mt-1 gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm text-gray-600">
                              {coach.rating} ({coach.reviews} reviews)
                            </span>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{coach.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {coach.specialties.map(specialty => (
                        <span key={specialty} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                          {specialty}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {coach.sessionsCompleted} sessions
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {coach.experience}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-5 h-5 text-gray-600" />
                        <span className="text-xl font-bold text-gray-800">{coach.price}</span>
                        <span className="text-gray-600 text-sm">/session</span>
                      </div>
                      <div className="space-y-2">
                        <button className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-1">
                          <ArrowRight className="w-4 h-4" />
                          Book Session
                        </button>
                        <button className="block w-full border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 transition-all duration-300">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white" id="testimonials">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">What Our Clients Say</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative h-64 flex items-center justify-center">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === testimonialIndex ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                  }`}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                    <div className="flex justify-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-300 fill-current" />
                      ))}
                    </div>
                    <p className="text-xl mb-6 italic">{testimonial.content}</p>
                    <div className="flex items-center justify-center">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4"
                      />
                      <div>
                        <div className="font-bold">{testimonial.name}</div>
                        <div className="text-sm opacity-75">{testimonial.role}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dots Indicator */}
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTestimonialIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === testimonialIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6">Ready to Transform Your Nutrition?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto text-gray-300">
            Start your personalized nutrition journey today with our certified experts.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
              <ArrowRight className="w-5 h-5" />
              Start Your Journey
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2">
              <Users className="w-5 h-5" />
              Talk to an Expert
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}