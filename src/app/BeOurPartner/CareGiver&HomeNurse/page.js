'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Upload, FileText, Calendar, Clock, Heart, Users, Shield, CheckCircle } from 'lucide-react';

export default function DevDootCaregiverForm() {
  const [formData, setFormData] = useState({
    // Become a Caregiver
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    alternateContactNumber: '',
    interviewFeedback: '',
    // Background Check Checkboxes
    backgroundCheck: {
      criminalCheck: false,
      employmentVerification: false,
      addressVerification: false,
      medicalRecord: false,
      referencesRequired: false
    },
    // Click on any 1 file to upload
    uploadFile: null,
    // Source of Reference
    sourceOfReference: '',
    address: '',
    // Personal Service Description
    personalServiceDescription: '',
    // Support Area CIN#
    supportAreaCIN: '',
    // Service Location
    serviceLocation: '',
    // Availability
    availability: {
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false
    },
    // Preferred Times
    preferredTimes: '',
    // Professional Gaming Certification Languages
    professionalGamingCertificationLanguages: '',
    // Second file upload
    secondUploadFile: null
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('backgroundCheck.')) {
      const checkType = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        backgroundCheck: {
          ...prev.backgroundCheck,
          [checkType]: checked
        }
      }));
    } else if (name.startsWith('availability.')) {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Full Width Banner */}
      <div className="w-full h-72 bg-gradient-to-r from-teal-600  via-cyan-600 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20">
            <Image 
                src="/banner/Care-Match-Add.webp"
                alt="Be Our Partner Banner"
                layout="fill"
                objectFit="cover"
                className="opacity-50"
                />
            
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-6xl px-4">
            <div className="flex items-center justify-center mb-4">
              
              <h1 className="text-5xl md:text-6xl font-bold">
                Join DevDoot Caregiver Network
              </h1>
            </div>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
              Make a meaningful difference in peoples lives. Become a certified caregiver and provide compassionate care to those who need it most.
            </p>
            
          </div>
        </div>
        {/* Decorative elements */}
        
      </div>

      {/* Form Container */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <Heart className="w-8 h-8 mr-3 text-teal-600" />
              Why Collaborate with DevDoot?
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              DevDoots rapidly expanding network of healthcare professionals is helping us care for communities all across India. We are here to help you develop partnerships that position you for success. Our diverse network of partners benefit from our extensive knowledge and best practices, marketing campaigns, and more.
            </p>
          </div>

          <div className="space-y-10">
            {/* Become a Caregiver Section */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-8 rounded-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-8 border-b-2 border-teal-200 pb-3 flex items-center">
                <Users className="w-6 h-6 mr-3 text-teal-600" />
                Become a Caregiver
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Alternate Contact Number
                  </label>
                  <input
                    type="tel"
                    name="alternateContactNumber"
                    value={formData.alternateContactNumber}
                    onChange={handleInputChange}
                    placeholder="Enter alternate contact number"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Interview Feedback
                  </label>
                  <input
                    type="text"
                    name="interviewFeedback"
                    value={formData.interviewFeedback}
                    onChange={handleInputChange}
                    placeholder="Interview feedback (if applicable)"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Background Check Section */}
              <div className="mt-8">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Background Check Requirements
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'criminalCheck', label: 'Criminal Check' },
                    { key: 'employmentVerification', label: 'Employment Verification' },
                    { key: 'addressVerification', label: 'Address Verification' },
                    { key: 'medicalRecord', label: 'Medical Record' },
                    { key: 'referencesRequired', label: 'References Required' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center space-x-3 cursor-pointer bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                      <input
                        type="checkbox"
                        name={`backgroundCheck.${item.key}`}
                        checked={formData.backgroundCheck[item.key]}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500 focus:ring-2"
                      />
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-blue-600" />
                Click on any 1 file to be upload
              </h3>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-blue-300 border-dashed rounded-xl hover:border-blue-400 transition-colors bg-white">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-blue-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="uploadFile"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="uploadFile"
                        name="uploadFile"
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
                  {formData.uploadFile && (
                    <div className="flex items-center justify-center mt-2">
                      <FileText className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600">
                        {formData.uploadFile.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Source of Reference
                </label>
                <textarea
                  name="sourceOfReference"
                  value={formData.sourceOfReference}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="How did you hear about us?"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your complete address"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Service Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Personal Service Description
                </label>
                <textarea
                  name="personalServiceDescription"
                  value={formData.personalServiceDescription}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your caregiving experience and services you can provide"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Support Area CIN#
                  </label>
                  <input
                    type="text"
                    name="supportAreaCIN"
                    value={formData.supportAreaCIN}
                    onChange={handleInputChange}
                    placeholder="Enter support area CIN number"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Service Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="serviceLocation"
                    value={formData.serviceLocation}
                    onChange={handleInputChange}
                    placeholder="Enter your service location"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-green-600" />
                Availability
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {Object.keys(formData.availability).map((day) => (
                  <label key={day} className="flex items-center space-x-2 cursor-pointer bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <input
                      type="checkbox"
                      name={`availability.${day}`}
                      checked={formData.availability[day]}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                    />
                    <span className="text-sm font-medium text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Preferred Times */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-purple-600" />
                Preferred Times
              </h3>
              <textarea
                name="preferredTimes"
                value={formData.preferredTimes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Specify your preferred working hours (e.g., 9 AM - 5 PM, Evening hours, Night shifts, etc.)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              />
            </div>

            {/* Professional Gaming Certification Languages */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-3">
                Professional Gaming Certification Languages
              </h3>
              <textarea
                name="professionalGamingCertificationLanguages"
                value={formData.professionalGamingCertificationLanguages}
                onChange={handleInputChange}
                rows={3}
                placeholder="List any professional certifications and languages you're proficient in"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
              />
            </div>

            {/* Second File Upload */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-orange-600" />
                Click on any 1 file to be upload
              </h3>
              <p className="text-sm text-gray-600 mb-4">Upload additional documents (certificates, references, etc.)</p>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-orange-300 border-dashed rounded-xl hover:border-orange-400 transition-colors bg-white">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-orange-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="secondUploadFile"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                    >
                      <span>Upload additional file</span>
                      <input
                        id="secondUploadFile"
                        name="secondUploadFile"
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
                  {formData.secondUploadFile && (
                    <div className="flex items-center justify-center mt-2">
                      <FileText className="h-4 w-4 text-green-500 mr-2" />
                      <span className="text-sm text-green-600">
                        {formData.secondUploadFile.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300"
              >
                Submit Application
              </button>
              <p className="text-sm text-gray-500 mt-4">
                By submitting this form, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}