'use client'

import { useState } from 'react'
import { 
  Settings, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Hash,
  CreditCard,
  FileText,
  Upload,
  CheckCircle,
  Wrench,
  Calendar,
  DollarSign,
  Clock,
  Shield
} from 'lucide-react'

export default function EquipmentRentalPage() {
  const [formData, setFormData] = useState({
    // Organization Details
    organizationName: '',
    representativeName: '',
    
    // Registration Information
    registrationNumber: '',
    
    // Number of Equipment Units Available
    equipmentUnits: '',
    
    // Contact Information
    officialAddress: '',
    addressLine1: '',
    city: '',
    stateProvinceRegion: '',
    postalCode: '',
    
    // Contact Details
    primaryPhoneNumber: '',
    primaryEmailAddress: '',
    alternativePhoneNumber: '',
    alternativeEmailAddress: '',
    
    // Service Details
    serviceCoverageAreas: '',
    deliveryResponsibility: '',
    
    // Business Terms
    businessTerms: '',
    
    // Additional Information
    additionalInfo: '',
    
    // Documents
    documents: [],
    
    // Agreement
    agreeToTerms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: e.target.checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleFileUpload = (e) => {
    const files = e.target.files
    if (!files) return

    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...Array.from(files)]
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-orange-600 via-red-600 to-red-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold drop-shadow-lg">
              Equipment Rental Registration
            </h1>
            <p className="mt-2 text-lg drop-shadow-md">
              Register your equipment for rental services
            </p>
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="w-full px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Why Collaborate with DevRoot Section */}
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <div className="mb-4 flex items-center space-x-3">
              <Settings className="h-6 w-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Why Collaborate with Devdoot?</h2>
            </div>
            <div className="text-gray-700 space-y-2">
              <p>Devdoot is a leading digital platform offering comprehensive equipment and technical development solutions. By partnering with us, you can:</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Expand your reach to a broader customer base</li>
                <li>Benefit from our advanced booking and management system</li>
                <li>Access reliable payment processing and customer support</li>
                <li>Leverage our marketing and promotional tools</li>
                <li>Ensure secure transactions and professional service delivery</li>
              </ul>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Organization Details */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <User className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Organization Details</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Organization/Business Representative Name *</label>
                  <input
                    type="text"
                    name="organizationName"
                    value={formData.organizationName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter organization name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Representative Name *</label>
                  <input
                    type="text"
                    name="representativeName"
                    value={formData.representativeName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Enter representative name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Registration Information */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <FileText className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Registration Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Registration Number *</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Enter registration number"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Equipment Units Available *</label>
                  <div className="relative">
                    <Wrench className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      name="equipmentUnits"
                      value={formData.equipmentUnits}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Number of units"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Official Address *</label>
                    <input
                      type="text"
                      name="officialAddress"
                      value={formData.officialAddress}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Enter official address"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 1 *</label>
                    <input
                      type="text"
                      name="addressLine1"
                      value={formData.addressLine1}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Street address"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Enter city"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">State/Province/Region *</label>
                    <input
                      type="text"
                      name="stateProvinceRegion"
                      value={formData.stateProvinceRegion}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="State/Province/Region"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postal Code *</label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Postal code"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Phone className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="primaryPhoneNumber"
                      value={formData.primaryPhoneNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Primary phone number"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="primaryEmailAddress"
                      value={formData.primaryEmailAddress}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Primary email address"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alternative Phone Number (Optional)</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="alternativePhoneNumber"
                      value={formData.alternativePhoneNumber}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Alternative phone number"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Alternative Email Address (Optional)</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="alternativeEmailAddress"
                      value={formData.alternativeEmailAddress}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                      placeholder="Alternative email address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Service Details */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Clock className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Service Details</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Service Coverage Areas (Cities/Regions) *</label>
                  <textarea
                    name="serviceCoverageAreas"
                    value={formData.serviceCoverageAreas}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="List the cities and regions you provide service to..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Responsibility *</label>
                  <textarea
                    name="deliveryResponsibility"
                    value={formData.deliveryResponsibility}
                    onChange={handleInputChange}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                    placeholder="Specify delivery, installation, maintenance responsibilities..."
                    required
                  />
                </div>
              </div>
            </div>

            {/* Business Terms */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Business Terms and Equipment Request for Specialized Equipment (Optional)</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Terms and Special Equipment Requirements
                </label>
                <textarea
                  name="businessTerms"
                  value={formData.businessTerms}
                  onChange={handleInputChange}
                  rows={6}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Describe your business terms, pricing structure, specialized equipment, rental conditions, etc..."
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <FileText className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Additional Information</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information (Optional)
                </label>
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleInputChange}
                  rows={5}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                  placeholder="Any additional information you would like to provide..."
                />
              </div>
            </div>

            {/* Documents Upload */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Upload className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Documents to Attach (Mandatory)</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Please upload the following documents:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-4">
                  <li>Business registration certificate</li>
                  <li>Equipment insurance documents</li>
                  <li>Equipment specifications and photos</li>
                  <li>Safety certifications</li>
                  <li>Any other relevant documentation</li>
                </ul>
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> documents
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX, JPG, PNG (MAX. 10MB each)</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                    />
                  </label>
                </div>
                
                {formData.documents.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Uploaded Documents:</h4>
                    {formData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="h-4 w-4" />
                        <span className="text-sm">{doc.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Shield className="h-6 w-6 text-orange-600" />
                <h2 className="text-2xl font-bold text-gray-900">Terms and Conditions</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    required
                  />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">I agree to the terms and conditions *</p>
                    <p className="mt-1 text-gray-600">
                      I understand and agree to DevDoots terms of service, privacy policy, and equipment rental 
                      partnership agreement. I confirm that all information provided is accurate and complete.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 rounded-md bg-orange-600 px-8 py-3 text-lg font-medium text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Registration</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}