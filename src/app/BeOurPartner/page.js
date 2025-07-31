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

      {/* Additional Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Ready to Transform Your Business?
              </h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Join thousands of successful partners who have expanded their reach and increased their revenue through our comprehensive platform.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">24/7 Partner Support</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Advanced Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">Marketing & Training Resources</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="text-center mb-6">
                  <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-gray-900">Partner Success</h4>
                </div>
                
                <div className="grid grid-cols-2 gap-6 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-cyan-600">500+</div>
                    <div className="text-gray-600 text-sm">Active Partners</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-blue-600">95%</div>
                    <div className="text-gray-600 text-sm">Satisfaction Rate</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-green-600">2.5x</div>
                    <div className="text-gray-600 text-sm">Revenue Growth</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-purple-600">24/7</div>
                    <div className="text-gray-600 text-sm">Support Available</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Start Your Partnership Journey Today
          </h3>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Take the first step towards expanding your business with Devdoot trusted platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-cyan-600 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Apply Now
            </button>
            <button className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:border-white/50 hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>
      

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
      
    </div>
  );
}