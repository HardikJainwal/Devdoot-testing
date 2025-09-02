"use client";

import { useState } from 'react';
import { 
  UserIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  UserCircleIcon,
  VideoCameraIcon,
  CalendarDaysIcon,
  ExclamationCircleIcon,
  ChatBubbleLeftRightIcon,
  InformationCircleIcon,
  PaperAirplaneIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  BoltIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

// Auth utilities using localStorage
const authUtils = {
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('authToken');
    return !!token;
  },

  getToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  },

  getUser: () => {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  setAuth: (token, userData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  },

  clearAuth: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  getAuthHeaders: () => {
    const token = authUtils.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'x-access-token': token })
    };
  }
};

// API endpoints
const API_ENDPOINTS = {
  SIGNUP: 'https://devdoot-backend.onrender.com/v1/api/user/signup',
  LOGIN: 'https://devdoot-backend.onrender.com/v1/api/user/login',
  VERIFY_OTP: 'https://devdoot-backend.onrender.com/v1/api/user/otp',
  SEND_LOGIN_OTP: 'https://devdoot-backend.onrender.com/v1/api/user/send-login-otp',
  VERIFY_LOGIN_OTP: 'https://devdoot-backend.onrender.com/v1/api/user/verify-login-otp'
};

const SpecialistFinderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    specialist: '',
    consultationType: '',
    preferredDate: '',
    urgency: '',
    description: '',
    aboutUs: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useState(() => {
    setIsAuthenticated(authUtils.isAuthenticated());
  }, []);

  // Function to test token manually
  
  const specialists = [
    'Cardiologist',
    'Dermatologist', 
    'Neurologist',
    'Orthopedist',
    'Pediatrician',
    'Psychiatrist',
    'General Physician',
    'Gynecologist',
    'ENT Specialist',
    'Ophthalmologist'
  ];

  const consultationTypes = [
    'Online',
    'In-person',
    'Phone'
  ];

  const urgencyLevels = [
    { value: 'normal', label: 'Normal', icon: ClockIcon },
    { value: 'urgent', label: 'Urgent', icon: BoltIcon },
    { value: 'emergency', label: 'Emergency', icon: TruckIcon }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Format mobile number
    if (name === 'mobile') {
      let formatted = value.replace(/[^\d+]/g, '');
      if (formatted && !formatted.startsWith('+')) {
        formatted = '+' + formatted;
      }
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      // Check if user is authenticated
      if (!authUtils.isAuthenticated()) {
        throw new Error('Please login first to submit the form');
      }

      // Debug token information
      const token = authUtils.getToken();
      const user = authUtils.getUser();
      console.log('Current token:', token);
      console.log('Token length:', token ? token.length : 0);
      console.log('Current user:', user);
      
      // Check token format
      if (token && token.includes(' ')) {
        console.warn('Token contains spaces, this might be an issue');
      }

      const submitData = {
        ...formData,
        preferredDate: new Date(formData.preferredDate).toISOString()
      };

      const headers = authUtils.getAuthHeaders();
      console.log('Request headers:', headers);
      console.log('Submit data:', submitData);

      const response = await fetch('https://devdoot-backend-1-uat.onrender.com/v1/api/specialist-finder', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(submitData)
      });

      const result = await response.json();
      console.log('Response status:', response.status);
      console.log('Response result:', result);

      if (response.ok && result.success) {
        setMessage({ type: 'success', text: 'Specialist form submitted successfully!' });
        setFormData({
          name: '',
          email: '',
          mobile: '',
          specialist: '',
          consultationType: '',
          preferredDate: '',
          urgency: '',
          description: '',
          aboutUs: ''
        });
      } else {
        throw new Error(result.message || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'An error occurred. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current datetime for min attribute
  const getCurrentDateTime = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
       

        {/* Authentication Check */}
        {!isAuthenticated && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-yellow-800">Authentication Required</h3>
              <p className="text-yellow-700">Please login first to submit the specialist finder form.</p>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white/95 backdrop-blur-sm rounded-t-3xl shadow-2xl">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-12 rounded-t-3xl text-center">
            <div className="flex justify-center mb-4">
              <UserCircleIcon className="w-16 h-16" />
            </div>
            <h1 className="text-4xl font-bold mb-3">Specialist Finder</h1>
            <p className="text-lg opacity-90">Connect with healthcare professionals tailored to your needs</p>
          </div>

          {/* Messages */}
          {message.text && (
            <div className={`mx-8 mt-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === 'success' 
                ? 'bg-green-50 text-green-800 border-2 border-green-200' 
                : 'bg-red-50 text-red-800 border-2 border-red-200'
            }`}>
              {message.type === 'success' ? (
                <CheckCircleIcon className="w-5 h-5 flex-shrink-0" />
              ) : (
                <ExclamationTriangleIcon className="w-5 h-5 flex-shrink-0" />
              )}
              <span className="font-medium">{message.text}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 pb-8 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <UserIcon className="w-4 h-4" />
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                  <UserIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <EnvelopeIcon className="w-4 h-4" />
                  Email Address *
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                  <EnvelopeIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <PhoneIcon className="w-4 h-4" />
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    placeholder="+1234567890"
                    className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                  />
                  <PhoneIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <UserCircleIcon className="w-4 h-4" />
                  Specialist Type *
                </label>
                <select
                  name="specialist"
                  value={formData.specialist}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                >
                  <option value="">Select a specialist</option>
                  {specialists.map((spec) => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>

              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <VideoCameraIcon className="w-4 h-4" />
                  Consultation Type *
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                >
                  <option value="">Select consultation type</option>
                  {consultationTypes.map((type) => (
                    <option key={type} value={type}>{type} Consultation</option>
                  ))}
                </select>
              </div>

              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <CalendarDaysIcon className="w-4 h-4" />
                  Preferred Date & Time *
                </label>
                <input
                  type="datetime-local"
                  name="preferredDate"
                  value={formData.preferredDate}
                  onChange={handleInputChange}
                  min={getCurrentDateTime()}
                  required
                  className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white"
                />
              </div>
            </div>

            
            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ExclamationCircleIcon className="w-4 h-4" />
                Urgency Level *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {urgencyLevels.map((level) => {
                  const IconComponent = level.icon;
                  return (
                    <div key={level.value} className="relative">
                      <input
                        type="radio"
                        id={level.value}
                        name="urgency"
                        value={level.value}
                        checked={formData.urgency === level.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <label
                        htmlFor={level.value}
                        className={`flex flex-col items-center justify-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:scale-105 ${
                          formData.urgency === level.value
                            ? 'border-indigo-500 bg-indigo-500 text-white shadow-lg'
                            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-indigo-300'
                        }`}
                      >
                        <IconComponent className="w-8 h-8 mb-2" />
                        <span className="font-semibold">{level.label}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>

            
            <div className="mt-6 space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <ChatBubbleLeftRightIcon className="w-4 h-4" />
                Reason for Consultation *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                placeholder="Please describe your symptoms, concerns, or reason for seeking consultation..."
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white resize-vertical"
              />
            </div>

            
            <div className="mt-6 space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <InformationCircleIcon className="w-4 h-4" />
                Additional Information
              </label>
              <textarea
                name="aboutUs"
                value={formData.aboutUs}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any additional information about your medical history, current medications, or specific preferences..."
                className="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 hover:bg-white resize-vertical"
              />
            </div>

            
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-8 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <div className="flex items-center justify-center gap-3">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-5 h-5" />
                    Submit Request
                  </>
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SpecialistFinderForm;