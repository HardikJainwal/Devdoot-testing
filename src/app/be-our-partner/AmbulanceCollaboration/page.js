'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function DevFootCollaborationForm() {
  const [formData, setFormData] = useState({
    registrationName: '',
    ownerName: '',
    registrationNumber: '',
    ownerFatherName: '',
    address: '',
    pincode: '',
    stateProvince: '',
    emailAddress: '',
    alternateContactName: '',
    phone: '',
    alternateContactEmailAddress: '',
    servicesCoverageArea: '',
    availability: '',
    responsesTimeExpectationMinutes: '',
    doYouHaveGPSTrackingAmbulance: '',
    businessLicenseRegistrationNumber: '',
    ambulanceInsuranceCopyBestInMind: '',
    driverLicenseBestInMind: '',
    offCertificateBestInMind: '',
    medicationDispenseCopyBestInMind: '',
    proofsOfAmbulanceBestInMind: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      <div className="w-full h-48 bg-black relative overflow-hidden">
        <div className="absolute inset-0  bg-opacity-30">
            <Image
              src="/banner/Ambulance.jpg"
              alt="Be Our Partner Banner"
              layout="fill"
              objectFit="cover"
              className="opacity-50"/>
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Devdoot Ambulance Services
            </h1>
            <p className="text-xl md:text-2xl font-light">
              Collaboration Partnership Form
            </p>
          </div>
        </div>
        
       
      </div>

      {/* Form Container */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Why Collaborate with Devdoot?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Devdoots rapidly expanding network of ambulance services is helping us care for communities all across India. We are here to help you develop partnerships that position you for success. Our diverse network of partners benefit from our extensive knowledge and best practices, marketing campaigns, and more.
            </p>
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-6">
            Devdoot Ambulance Collaboration Form
          </h3>

                      <div className="space-y-6">
            {/* Registration Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationName"
                  value={formData.registrationName}
                  onChange={handleInputChange}
                  placeholder="Enter registration name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Enter owner name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="Enter registration number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Father Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerFatherName"
                  value={formData.ownerFatherName}
                  onChange={handleInputChange}
                  placeholder="Enter father name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Enter address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="Enter pincode"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Province <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="stateProvince"
                  value={formData.stateProvince}
                  onChange={handleInputChange}
                  placeholder="Enter state/province"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleInputChange}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Contact Name
                </label>
                <input
                  type="text"
                  name="alternateContactName"
                  value={formData.alternateContactName}
                  onChange={handleInputChange}
                  placeholder="Enter alternate contact name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alternate Contact Email Address
                </label>
                <input
                  type="email"
                  name="alternateContactEmailAddress"
                  value={formData.alternateContactEmailAddress}
                  onChange={handleInputChange}
                  placeholder="Enter alternate email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Services Coverage Area <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="servicesCoverageArea"
                  value={formData.servicesCoverageArea}
                  onChange={handleInputChange}
                  placeholder="Enter coverage area"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select availability</option>
                  <option value="24/7">24/7</option>
                  <option value="Day time only">Day time only</option>
                  <option value="Night time only">Night time only</option>
                  <option value="Custom hours">Custom hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responses Time Expectation (in minutes) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="responsesTimeExpectationMinutes"
                  value={formData.responsesTimeExpectationMinutes}
                  onChange={handleInputChange}
                  placeholder="Enter response time in minutes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Do you have GPS Tracking in Ambulance? <span className="text-red-500">*</span>
                </label>
                <select
                  name="doYouHaveGPSTrackingAmbulance"
                  value={formData.doYouHaveGPSTrackingAmbulance}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            {/* Mandatory Document Attachments */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Mandatory Document Attachments
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business License/ Registration Number (Best in Mind) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="businessLicenseRegistrationNumber"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ambulance Insurance Copy (Best in Mind) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="ambulanceInsuranceCopyBestInMind"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Driver License (Best in Mind) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="driverLicenseBestInMind"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service License (Best in Mind) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="offCertificateBestInMind"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OFF Certificate (Best in Mind) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="medicationDispenseCopyBestInMind"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Optional Documents */}
            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Optional Documents
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medication/Poison Copy (if liked)
                  </label>
                  <input
                    type="file"
                    name="proofsOfAmbulanceBestInMind"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Proofs of Ambulance (Best in Mind)
                  </label>
                  <input
                    type="file"
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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