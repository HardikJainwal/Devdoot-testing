'use client';

import { useState } from 'react';
import { Upload, FileText, Calendar, Clock } from 'lucide-react';

export default function CoachNetworkForm() {
  const [formData, setFormData] = useState({
    // Become a Coach
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    preferredLanguage: '',
    specialization: '',
    biologicalGender: '',
    professionalExperience: '',
    locationStateCityProper: '',
    // Current Service Description
    currentServiceDescription: '',
    // Proposed Service Schedule
    proposedServiceSchedule: '',
    // Service Expertise Upload
    serviceExpertiseUpload: null,
    // Availability
    availability: {
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false
    },
    // Preferred Times
    preferredTimes: '',
    // Professional Gaming Certification Languages
    professionalGamingCertificationLanguages: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('availability.')) {
      const day = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        availability: {
          ...prev.availability,
          [day]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Full Width Banner */}
      <div className="w-full h-64 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Partner With DevDoot - Join Our Coach Network
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Connect with people seeking guidance and support. Whether you are helping with life skills, career decisions, health goals, education, and personal development, our 
              diverse network of health coaches benefit from our extensive knowledge base practices, marketing campaigns, and more.
            </p>
            <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200">
              Apply Now
            </button>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-16 left-16 w-24 h-24 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute bottom-16 right-20 w-20 h-20 bg-white bg-opacity-10 rounded-full"></div>
          <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Why Collaborate with DevDoot?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              DevDoots rapidly expanding network of health coaches is helping us care for communities all across India. We are here to help you develop partnerships that position you for success. Our diverse network of partners benefit from our extensive knowledge and best practices, marketing campaigns, and more.
            </p>
          </div>

          <div className="space-y-8">
            {/* Become a Coach Section */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Become a Coach
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select your preferred language</option>
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Gujarati">Gujarati</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Punjabi">Punjabi</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialization <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleInputChange}
                    placeholder="Enter your area of specialization"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biological Gender
                  </label>
                  <select
                    name="biologicalGender"
                    value={formData.biologicalGender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Experience <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="professionalExperience"
                    value={formData.professionalExperience}
                    onChange={handleInputChange}
                    placeholder="Describe your professional experience"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location (State & City) Proper <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="locationStateCityProper"
                  value={formData.locationStateCityProper}
                  onChange={handleInputChange}
                  placeholder="Enter your state and city"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Current Service Description */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Current Service Description
              </h3>
              <div>
                <textarea
                  name="currentServiceDescription"
                  value={formData.currentServiceDescription}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Describe your current services and expertise"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Proposed Service Schedule */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Proposed Service Schedule
              </h3>
              <div>
                <textarea
                  name="proposedServiceSchedule"
                  value={formData.proposedServiceSchedule}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your proposed service schedule"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Service Expertise Upload */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Service Expertise Upload
              </h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Certificates/Documents
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-400 transition-colors">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="serviceExpertiseUpload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload certificates</span>
                        <input
                          id="serviceExpertiseUpload"
                          name="serviceExpertiseUpload"
                          type="file"
                          className="sr-only"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PDF, PNG, JPG, DOC up to 10MB
                    </p>
                    {formData.serviceExpertiseUpload && (
                      <div className="flex items-center justify-center mt-2">
                        <FileText className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-green-600">
                          {formData.serviceExpertiseUpload.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Availability
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.keys(formData.availability).map((day) => (
                  <label key={day} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name={`availability.${day}`}
                      checked={formData.availability[day]}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Times */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2 flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Preferred Times
              </h3>
              <div>
                <textarea
                  name="preferredTimes"
                  value={formData.preferredTimes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Specify your preferred working hours (e.g., 9 AM - 5 PM, Evening hours, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Professional Gaming Certification Languages */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-2">
                Professional Gaming Certification Languages
              </h3>
              <div>
                <textarea
                  name="professionalGamingCertificationLanguages"
                  value={formData.professionalGamingCertificationLanguages}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="List any gaming certifications and languages you're proficient in"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-12 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-lg"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}