'use client';
import Image from 'next/image';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, User, Phone, Mail, Lock, Users, Sparkles, ChevronDown } from 'lucide-react';

export default function DevDootCaregiverForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showChildCareDropdown, setShowChildCareDropdown] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    whatsappNumber: '',
    userType: 'care-giver',
    coachType: '',
    childCareSpecialty: ''
  });

  const totalSteps = 4;

  const childCareOptions = [
    'Everyday Tasks',
    'Personal Care',
    'Companionship',
    'Mobility Assistance',
    'Memory Care',
    'Technology Assistance'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Show/hide dropdown based on coach type selection
    if (name === 'coachType') {
      setShowChildCareDropdown(value === 'child care');
      if (value !== 'child care') {
        setFormData(prev => ({ ...prev, childCareSpecialty: '' }));
      }
    }
  };

  const handleChildCareSpecialtyChange = (specialty) => {
    setFormData(prev => ({
      ...prev,
      childCareSpecialty: specialty
    }));
    setShowChildCareDropdown(false);
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Registration Data:', formData);
    alert('Registration completed successfully!');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName.trim() && formData.lastName.trim();
      case 2:
        return formData.email.trim() && formData.password.trim();
      case 3:
        return formData.mobile.trim() && formData.whatsappNumber.trim();
      case 4:
        return formData.coachType.trim() && (formData.coachType !== 'child care' || formData.childCareSpecialty.trim());
      default:
        return false;
    }
  };

  const stepTitles = [
    "What's your name?",
    "Create your account",
    "Your contact information",
    "Choose your specialty"
  ];

  const stepDescriptions = [
    "Let's start with your basic information to get you registered",
    "Set up your login credentials for secure access to your account",
    "Help families connect with you through your contact details",
    "Tell us what type of care services you specialize in providing"
  ];

  const stepIcons = [
    { icon: User, color: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50' },
    { icon: Mail, color: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50' },
    { icon: Phone, color: 'from-green-500 to-emerald-500', bg: 'from-green-50 to-emerald-50' },
    { icon: Users, color: 'from-orange-500 to-red-500', bg: 'from-orange-50 to-red-50' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
     
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="relative">
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-3xl backdrop-blur-sm"></div>
          <div className="absolute inset-0 bg-white/60 rounded-3xl shadow-2xl"></div>
          

          <div className="relative bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 md:p-16">
    
            <div className="text-center mb-12">
              <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${stepIcons[currentStep - 1].bg} rounded-2xl mb-6 shadow-lg`}>
                <div className={`w-12 h-12 bg-gradient-to-br ${stepIcons[currentStep - 1].color} rounded-xl flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = stepIcons[currentStep - 1].icon;
                    return <IconComponent className="w-6 h-6 text-white" />;
                  })()}
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4">
                {stepTitles[currentStep - 1]}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {stepDescriptions[currentStep - 1]}
              </p>
            </div>


            <div className="max-w-2xl mx-auto">
       
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-800 ml-1">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          className="w-full px-6 py-4 text-lg text-black bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-gray-300"
                          autoFocus
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-semibold text-gray-800 ml-1">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative group">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          className="w-full px-6 py-4 text-black text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 group-hover:border-gray-300"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

   
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-800 ml-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email address"
                        className="w-full px-6 text-black py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                        autoFocus
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-800 ml-1">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Create a secure password"
                        className="w-full px-6 text-black py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 group-hover:border-gray-300"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <div className="flex items-center space-x-2 ml-1">
                      <div className="flex space-x-1">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className={`h-1.5 w-6 rounded-full ${formData.password.length > i * 2 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-300'}`}></div>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">Password strength</span>
                    </div>
                  </div>
                </div>
              )}

         
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-800 ml-1">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-6 text-black py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-gray-300"
                        autoFocus
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-semibold text-gray-800 ml-1">
                      WhatsApp Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative group">
                      <input
                        type="tel"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full px-6 text-black py-4 text-lg bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 group-hover:border-gray-300"
                      />
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                    </div>
                    <p className="text-sm text-gray-500 ml-1 flex items-center space-x-1">
                      <span>💡</span>
                      <span>This can be the same as your mobile number</span>
                    </p>
                  </div>
                </div>
              )}

     
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { value: 'senior care', label: 'Senior Care', description: 'Compassionate care for elderly individuals', emoji: '👴', color: 'from-purple-500 to-indigo-500' },
                      { value: 'special needs', label: 'Special Needs Care', description: 'Specialized care for individuals with special needs', emoji: '🤝', color: 'from-green-500 to-emerald-500' },
                      { value: 'pet care', label: 'Pet Care', description: 'Loving care for pets and animals', emoji: '🐕', color: 'from-orange-500 to-amber-500' },
                      { value: 'housekeeping', label: 'Housekeeping', description: 'Professional home maintenance and cleaning', emoji: '🏠', color: 'from-pink-500 to-rose-500' }
                    ].map((option) => (
                      <label
                        key={option.value}
                        className={`group relative flex items-center space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                          formData.coachType === option.value
                            ? `border-transparent bg-gradient-to-r ${option.color} text-white shadow-lg`
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="coachType"
                          value={option.value}
                          checked={formData.coachType === option.value}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`text-3xl ${formData.coachType === option.value ? 'grayscale-0' : 'grayscale'} transition-all`}>
                          {option.emoji}
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-lg ${formData.coachType === option.value ? 'text-white' : 'text-gray-800'}`}>
                            {option.label}
                          </div>
                          <div className={`text-sm ${formData.coachType === option.value ? 'text-white/90' : 'text-gray-600'}`}>
                            {option.description}
                          </div>
                        </div>
                        {formData.coachType === option.value && (
                          <div className="text-white">
                            <Check className="w-6 h-6" />
                          </div>
                        )}
                      </label>
                    ))}

               
                    <div className="relative">
                      <label
                        className={`group relative flex items-center space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                          formData.coachType === 'child care'
                            ? 'border-transparent bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                            : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                        }`}
                      >
                        <input
                          type="radio"
                          name="coachType"
                          value="child care"
                          checked={formData.coachType === 'child care'}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <div className={`text-3xl ${formData.coachType === 'child care' ? 'grayscale-0' : 'grayscale'} transition-all`}>
                          👶
                        </div>
                        <div className="flex-1">
                          <div className={`font-bold text-lg ${formData.coachType === 'child care' ? 'text-white' : 'text-gray-800'}`}>
                            Child Care
                          </div>
                          <div className={`text-sm ${formData.coachType === 'child care' ? 'text-white/90' : 'text-gray-600'}`}>
                            Professional care for children and infants
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          {formData.coachType === 'child care' && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setShowChildCareDropdown(!showChildCareDropdown);
                              }}
                              className="flex items-center space-x-2 px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
                            >
                              <span className="text-sm text-white/90">
                                {formData.childCareSpecialty || 'Select specialty'}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-white transition-transform ${showChildCareDropdown ? 'rotate-180' : ''}`} />
                            </button>
                          )}
                          {formData.coachType === 'child care' && formData.childCareSpecialty && (
                            <div className="text-white">
                              <Check className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                      </label>

                    
                      {formData.coachType === 'child care' && showChildCareDropdown && (
                        <div className="absolute top-full left-0 right-0 z-10 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                          {childCareOptions.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => handleChildCareSpecialtyChange(option)}
                              className="w-full px-6 py-4 text-left text-gray-800 hover:bg-blue-50 transition-colors first:rounded-t-2xl last:rounded-b-2xl border-b border-gray-100 last:border-b-0"
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

           
            <div className="flex justify-between items-center mt-16 pt-8 border-t border-gray-200">
              <button
                onClick={handlePrev}
                disabled={currentStep === 1}
                className={`group flex items-center space-x-3 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100 hover:scale-105'
                }`}
              >
                <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
                <span>Back</span>
              </button>

              {currentStep === totalSteps ? (
                <button
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className={`group flex items-center space-x-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-5 h-5 group-hover:animate-pulse" />
                  <span>Complete Registration</span>
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  className={`group flex items-center space-x-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    isStepValid()
                      ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white transform hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5 group-hover:animate-pulse" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}