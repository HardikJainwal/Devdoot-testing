'use client'

import { useState, useEffect } from 'react'

export default function Home() {
  const [waterProgress, setWaterProgress] = useState(0)
  const [coachIndex, setCoachIndex] = useState(0)
  const [slidesInView, setSlidesInView] = useState(3)

  const coaches = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      title: "Certified Nutrition Expert",
      image: "https://i.pravatar.cc/300?img=5"
    },
    {
      id: 2,
      name: "Mark Johnson",
      title: "Fitness & Performance Coach",
      image: "https://i.pravatar.cc/300?img=8"
    },
    {
      id: 3,
      name: "Emily Chen",
      title: "Holistic Wellness Guide",
      image: "https://i.pravatar.cc/300?img=7"
    },
    {
      id: 4,
      name: "David Lee",
      title: "Mindfulness Practitioner",
      image: "https://i.pravatar.cc/300?img=10"
    }
  ]

  const meals = [
    {
      type: "Breakfast",
      name: "Oatmeal with Berries",
      calories: 350,
      image: "https://placehold.co/80x80/03989e/F7F8FC?text=Oats",
      color: "bg-brand-cyan"
    },
    {
      type: "Lunch",
      name: "Grilled Chicken Salad",
      calories: 450,
      image: "https://placehold.co/80x80/2c8c91/F7F8FC?text=Salad",
      color: "bg-brand-teal"
    },
    {
      type: "Dinner",
      name: "Baked Salmon & Asparagus",
      calories: 550,
      image: "https://placehold.co/80x80/345268/F7F8FC?text=Salmon",
      color: "bg-brand-slate"
    },
    {
      type: "Snacks",
      name: "Apple with Peanut Butter",
      calories: 200,
      image: "https://placehold.co/80x80/c42323/F7F8FC?text=Apple",
      color: "bg-brand-red"
    }
  ]

  const communityStories = [
    {
      name: "Sarah J.",
      achievement: "Lost 10kg in 3 months",
      quote: "The coaching was a game-changer. Finally found a plan that works for me!",
      image: "https://i.pravatar.cc/100?u=b",
      gradient: "from-brand-cyan to-brand-teal"
    },
    {
      name: "Mike R.",
      achievement: "Energy Levels Up 50%",
      quote: "My energy levels are through the roof. I feel more focused and in control of my health.",
      image: "https://i.pravatar.cc/100?u=c",
      gradient: "from-brand-red to-red-500"
    },
    {
      name: "Chloe T.",
      achievement: "Built a Healthy Lifestyle",
      quote: "Learned so much about nutrition. It's not a diet, it's a lifestyle that I actually enjoy.",
      image: "https://i.pravatar.cc/100?u=d",
      gradient: "from-brand-slate to-slate-600"
    },
    {
      name: "James F.",
      achievement: "Ran First 5k Race",
      quote: "Never thought I could be a runner. The structured plan made it possible!",
      image: "https://i.pravatar.cc/100?u=e",
      gradient: "from-brand-teal to-cyan-700"
    }
  ]

  useEffect(() => {
    // Animate water progress bar on load
    const timer = setTimeout(() => {
      setWaterProgress(75) // 6 out of 8 glasses
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const updateSlidesInView = () => {
      if (window.innerWidth < 768) {
        setSlidesInView(1)
      } else if (window.innerWidth < 1024) {
        setSlidesInView(2)
      } else {
        setSlidesInView(3)
      }
    }

    updateSlidesInView()
    window.addEventListener('resize', updateSlidesInView)
    return () => window.removeEventListener('resize', updateSlidesInView)
  }, [])

  const nextCoach = () => {
    if (coachIndex < coaches.length - slidesInView) {
      setCoachIndex(coachIndex + 1)
    }
  }

  const prevCoach = () => {
    if (coachIndex > 0) {
      setCoachIndex(coachIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header */}
      

      <main className="container mx-auto px-4 sm:px-6 py-6 space-y-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-slate via-brand-slate to-brand-teal rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[280px] shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[#345268] to-transparent"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-bold text-brand-light mb-4 text-white animate-slide-up">
              Transform Your Health! 
            </h1>
            <p className="max-w-md mb-8 text-slate-200 text-lg animate-fade-in items-center align-middle">
              Your personalized journey to wellness starts now. Connect with top experts who guide you every step of the way.
            </p>
            <button className="bg-[#c42323]  text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              Meet Our Coaches 
            </button>
          </div>
        </section>

        {/* User Greeting */}
        <section className="animate-fade-in">
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Hello, Alex! 👋</h2>
          <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <p className="text-gray-600 italic text-lg">The journey of a thousand miles begins with a single step.</p>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-red animate-bounce-gentle">🔥 12</div>
              <div className="text-xs text-gray-500 font-medium">Day Streak</div>
            </div>
          </div>
        </section>

        {/* Progress Tracker */}
        <section className="animate-slide-up">
          <h3 className="text-xl font-bold mb-4 text-brand-dark">Todays Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-sm text-gray-500 mb-1">Calories</div>
              <div className="text-2xl font-bold text-brand-teal">1,280</div>
              <div className="text-xs text-gray-400">/ 2,000 kcal</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-brand-teal h-1.5 rounded-full" style={{width: '64%'}}></div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-sm text-gray-500 mb-1">Protein</div>
              <div className="text-2xl font-bold text-brand-slate">80</div>
              <div className="text-xs text-gray-400">/ 120 g</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-brand-slate h-1.5 rounded-full" style={{width: '67%'}}></div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-sm text-gray-500 mb-1">Carbs</div>
              <div className="text-2xl font-bold text-brand-red">150</div>
              <div className="text-xs text-gray-400">/ 250 g</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-brand-red h-1.5 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="text-sm text-gray-500 mb-1">Water</div>
              <div className="text-2xl font-bold text-brand-cyan">6</div>
              <div className="text-xs text-gray-400">/ 8 glasses</div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-3">
                <div className="bg-brand-cyan h-1.5 rounded-full" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-gradient-to-r from-brand-cyan to-brand-teal text-brand-light py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
            📝 Log Todays Meals
          </button>
        </section>

        {/* Daily Challenge */}
        <section className="animate-fade-in">
          <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 text-brand-dark p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-brand-red flex items-center gap-2">
                💧 Daily Hydration Challenge
              </h3>
              <div className="flex items-center space-x-1 font-semibold text-brand-red bg-white px-3 py-1 rounded-full">
                <span>⭐</span>
                <span>+50 Points</span>
              </div>
            </div>
            <p className="text-sm mb-4 text-gray-700">
              Drink 8 glasses of water today to earn your reward!
            </p>
            <div className="w-full bg-red-200/50 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-brand-red to-red-600 h-3 rounded-full progress-bar-animated shadow-sm"
                style={{width: `${waterProgress}%`}}
              ></div>
            </div>
            <div className="text-right text-sm text-gray-600 mt-2">
              6 of 8 glasses completed
            </div>
          </div>
        </section>

        {/* Service Shortcuts */}
        <section className="animate-slide-up">
          <h3 className="text-xl font-bold mb-4 text-brand-dark">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4 text-center">
            <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100">
              <div className="text-3xl text-brand-cyan mb-3">👨‍⚕️</div>
              <div className="text-sm font-medium text-brand-dark">Coach</div>
            </button>
            
            <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100">
              <div className="text-3xl text-brand-cyan mb-3">🍽️</div>
              <div className="text-sm font-medium text-brand-dark">Meal Plan</div>
            </button>
            
            <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100">
              <div className="text-3xl text-brand-cyan mb-3">💪</div>
              <div className="text-sm font-medium text-brand-dark">Workout</div>
            </button>
            
            <button className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 border border-gray-100">
              <div className="text-3xl text-brand-cyan mb-3">📈</div>
              <div className="text-sm font-medium text-brand-dark">Progress</div>
            </button>
          </div>
        </section>

        {/* Featured Coach Section */}
        <section className="relative animate-fade-in">
          <h3 className="text-xl font-bold mb-6 text-brand-dark">Meet Our Expert Coaches</h3>
          <div className="relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out -mx-2"
                style={{transform: `translateX(-${coachIndex * (100 / slidesInView)}%)`}}
              >
                {coaches.map((coach) => (
                  <div key={coach.id} className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2">
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden text-center h-full border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                      <div className="relative overflow-hidden">
                        <img 
                          src={coach.image} 
                          alt={coach.name} 
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-brand-slate mb-2">{coach.name}</h4>
                        <p className="font-medium text-gray-500 mb-4">{coach.title}</p>
                        <button className="bg-gradient-to-r from-brand-cyan to-brand-teal text-brand-light px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 text-sm transform hover:scale-105">
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Slider Controls */}
            {coachIndex > 0 && (
              <button 
                onClick={prevCoach}
                className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-300 hover:scale-110"
              >
                <div className="text-brand-slate">⬅️</div>
              </button>
            )}
            
            {coachIndex < coaches.length - slidesInView && (
              <button 
                onClick={nextCoach}
                className="absolute top-1/2 -right-4 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg z-10 transition-all duration-300 hover:scale-110"
              >
                <div className="text-brand-slate">➡️</div>
              </button>
            )}
          </div>
        </section>

        {/* Meal Plan Preview */}
        <section className="animate-slide-up">
          <h3 className="text-xl font-bold mb-6 text-brand-dark">Todays Meal Plan</h3>
          <div className="space-y-4">
            {meals.map((meal, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-4 border border-gray-100 hover:shadow-xl transition-all duration-300">
                <img 
                  src={meal.image} 
                  alt={meal.name} 
                  className="w-20 h-20 rounded-lg object-cover shadow-md"
                />
                <div className="flex-grow">
                  <h4 className="font-bold text-brand-dark text-lg">{meal.type}</h4>
                  <p className="text-gray-600 mb-1">{meal.name}</p>
                  <p className="text-sm text-gray-500 font-medium">{meal.calories} kcal</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <button className="bg-gradient-to-r from-brand-cyan to-brand-teal text-brand-light px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                    Log
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300">
                    Swap
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Spotlight */}
        <section className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 shadow-lg border border-gray-200 animate-fade-in">
          <h3 className="text-xl font-bold mb-6 text-center text-brand-dark">Community Spotlight ⭐</h3>
          <div className="flex overflow-x-auto space-x-6 pb-4 community-scroll">
            {communityStories.map((story, index) => (
              <div key={index} className={`flex-shrink-0 w-72 bg-gradient-to-br ${story.gradient} text-brand-light rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-all duration-300`}>
                <img 
                  src={story.image} 
                  alt="User Avatar" 
                  className="w-20 h-20 rounded-full mb-4 border-4 border-white/50 shadow-lg"
                />
                <p className="font-bold text-lg">{story.name}</p>
                <p className="text-sm opacity-90 mb-3 font-medium">{story.achievement}</p>
                <p className="text-sm italic opacity-95 leading-relaxed">{story.quote}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Promo Section */}
        <section className="animate-slide-up">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center border-2 border-dashed border-brand-cyan hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-brand-slate mb-3">20% OFF Your First Coaching Session!</h3>
            <p className="text-gray-600 mb-6 text-lg">Limited time offer for new members. Start your journey with an expert guide.</p>
            <button className="bg-gradient-to-r from-brand-red to-red-600 text-brand-light px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1">
              🎯 Claim Discount Now
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
