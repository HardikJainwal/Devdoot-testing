'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Users, Headphones, Building2, Award, Network, Phone, Shield, TrendingUp, Stethoscope, Heart, Baby } from 'lucide-react';

export default function BeOurPartner() {
  const router = useRouter();
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

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-y-12"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
                  Partner with Devdoot – Grow Together,{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                    Deliver More
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Join our network and unlock growth opportunities through trusted healthcare, petcare & 
                  virtual event solutions. Lets create value together.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  <Building2 className="w-5 h-5" />
                  Become a Partner
                </button>
                <button className="inline-flex items-center justify-center gap-2 border-2 border-white/30 hover:border-white/50 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm">
                  <Phone className="w-5 h-5" />
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
                <div className="w-full h-full rounded-full shadow-2xl flex items-center justify-center">
                  <div className="text-center p-4 sm:p-8">
                    <div className="relative w-32 h-32 sm:w-64 sm:h-64 lg:w-80 lg:h-80 mx-auto">
                      <Image
                        src="/images/Logo-round.png"
                        alt="Devdoot Logo"
                        width={100}
                        height={100}
                        className="rounded-full object-contain w-full h-full"
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
      

      {/* Partnership Opportunities Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C8C91] mb-4">
              Partnership <span className='text-[#C42323]'>Opportunities</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Explore various partnership programs across our service portfolio
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Ambulance Services Card */}
            <div className="group bg-gradient-to-b from-white to-red-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/ambulance-Services-1.webp"
                  alt="Ambulance Services"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-red-500 to-orange-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Ambulance Services</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/AmbulanceCollaboration')}
                  className="bg-white text-red-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Virtual Health Coaches Card */}
            <div className="group bg-gradient-to-b from-white to-blue-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/Virtual-Health.webp"
                  alt="Virtual Health Services"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-500 to-indigo-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Virtual Health Coaches</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/VirtualHealthCoaches')}
                  className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Caregiver & Home Nurse Services Card */}
            <div className="group bg-gradient-to-b from-white to-teal-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/care.webp"
                  alt="Caregiver Services"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-teal-500 to-cyan-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Caregiver & Home Nurse Services</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/CareGiver&HomeNurse')}
                  className="bg-white text-teal-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Pet Care Services Card */}
            <div className="group bg-gradient-to-b from-white to-purple-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/Pet-Care-Services.webp"
                  alt="Pet Care Services"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Pet Care Services</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/PetCareServices')}
                  className="bg-white text-purple-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Medical Equipment Rentals Card */}
            <div className="group bg-gradient-to-b from-white to-emerald-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/medical-equipment.jpg"
                  alt="Medical Equipment Rentals"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-emerald-500 to-green-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Medical Equipment Rentals</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/MedicalEquipmentRentals')}
                  className="bg-white text-emerald-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* ChildCare Services Card */}
            <div className="group bg-gradient-to-b from-white to-yellow-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/ChildCare-Services.webp"
                  alt="ChildCare Services"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-yellow-500 to-amber-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">ChildCare Services</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/ChildCare')}
                  className="bg-white text-yellow-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* Medical Labs Services Card */}
            <div className="group bg-gradient-to-b from-white to-slate-500 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden border border-gray-100 flex flex-col h-full">
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/labs.webp"
                  alt="Medical Labs Services"
                  width={200}
                  height={200}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 sm:p-6 bg-gradient-to-br from-slate-500 to-gray-500 text-white flex-grow flex flex-col justify-between">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Medical Labs Services</h3>
                <button 
                  onClick={() => handleNavigation('/be-our-partner/MedicalLab')}
                  className="bg-white text-slate-600 px-4 sm:px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors text-sm sm:text-base"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C8C91] mb-4">
              Why Partner with<span className='text-[#C42323]'> Devdoot?</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {partnerBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-gray-50 to-white p-6 lg:p-8 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                >
                  <div className={`inline-flex p-3 lg:p-4 rounded-2xl bg-gradient-to-br ${benefit.color} shadow-lg group-hover:scale-110 transition-transform duration-300 mb-4 lg:mb-6`}>
                    <IconComponent className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 lg:mb-3 group-hover:text-gray-800 transition-colors">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
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