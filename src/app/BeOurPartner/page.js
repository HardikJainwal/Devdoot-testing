'use client';
import Image from 'next/image';
import { 
  Users, 
  Shield, 
  Headphones, 
  TrendingUp,
  Network,
  Award,
  Phone,
  Building2
} from 'lucide-react';

export default function BeOurPartner() {
  const partnerBenefits = [
    {
      icon: Network,
      title: "Expand Your Reach",
      description: "Grow your customer base with Devdoot's trusted network",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Trusted Brand",
      description: "Partner with a reputed and fast-growing service platform",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Headphones,
      title: "Technology & Support",
      description: "Access innovative tools and dedicated partner support",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Revenue Growth",
      description: "Increase profitability through collaborative programs",
      color: "from-red-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                  Partner with Devdoot – Grow Together,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Deliver More
                  </span>
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                  Join our network and unlock growth opportunities through trusted healthcare, petcare & 
                  virtual event solutions. Lets create value together.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Building2 className="w-5 h-5" />
                  Become a Partner
                </button>
                <button className="inline-flex items-center gap-2 border-2 border-white/30 hover:border-white/50 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="relative w-96 h-96 mx-auto">
                {/* Your logo */}
                <div className="w-full h-full  rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="relative w-98 h-98 mx-auto mb-4 mt-28 ml-20">
                      <Image
                        src="/images/Logo-round.png"
                        alt="Devdoot Logo"
                        width={300}
                        height={300}
                        className="rounded-full object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Partner Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Partner with Devdoot?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.color} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Partnership Opportunities
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Explore various partnership programs across our service portfolio
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Care Match Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-teal-500 to-cyan-500 text-white">
                <h3 className="text-xl font-bold mb-3">Care Match</h3>
                <button className="bg-white text-teal-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Virtual Health Coach Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <Headphones className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                <h3 className="text-xl font-bold mb-3">Virtual Health Coach</h3>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Medical Equipment Rental Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <Building2 className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-emerald-500 to-green-500 text-white">
                <h3 className="text-xl font-bold mb-3">Medical Equipment Rental</h3>
                <button className="bg-white text-emerald-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* PetWell Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <h3 className="text-xl font-bold mb-3">PetWell</h3>
                <button className="bg-white text-purple-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Specialist Finder Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Network className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <h3 className="text-xl font-bold mb-3">Specialist Finder</h3>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* ImmuniCare Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full flex items-center justify-center">
                  <Shield className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-yellow-500 to-amber-500 text-white">
                <h3 className="text-xl font-bold mb-3">ImmuniCare</h3>
                <button className="bg-white text-yellow-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* MedTravel Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-500 to-gray-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-slate-500 to-gray-500 text-white">
                <h3 className="text-xl font-bold mb-3">MedTravel</h3>
                <button className="bg-white text-slate-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>

            {/* Child Health Sponsorship Card */}
            <div className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100">
              <div className="relative h-48 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                <h3 className="text-xl font-bold mb-3">Child Health Sponsorship</h3>
                <button className="bg-white text-rose-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100"></section>
      

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
    </div>
  );
}