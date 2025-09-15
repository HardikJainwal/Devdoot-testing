'use client'

import { useState } from 'react'
import Image from 'next/image'
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  FileText,
  Upload,
  Camera,
  Heart,
  Star,
  CheckCircle,
  Users
} from 'lucide-react'

export default function PetCareApplicationPage() {
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    dateOfBirth: '',
    
    // Experience & Availability
    experience: '',
    availability: [],
    petTypes: [],
    services: [],
    
    // Background & References
    backgroundCheck: false,
    references: [
      { name: '', relationship: '', phone: '', email: '' },
      { name: '', relationship: '', phone: '', email: '' },
      { name: '', relationship: '', phone: '', email: '' }
    ],
    
    // Additional Information
    bio: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    },
    
    // File uploads
    profilePhoto: null,
    documents: []
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

  const handleCheckboxArrayChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: prev[name].includes(value)
        ? prev[name].filter(item => item !== value)
        : [...prev[name], value]
    }))
  }

  const handleReferenceChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      references: prev.references.map((ref, i) => 
        i === index ? { ...ref, [field]: value } : ref
      )
    }))
  }

  const handleEmergencyContactChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: {
        ...prev.emergencyContact,
        [field]: value
      }
    }))
  }

  const handleFileUpload = (e, type) => {
    const files = e.target.files
    if (!files) return

    if (type === 'profile') {
      setFormData(prev => ({
        ...prev,
        profilePhoto: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)]
      }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
<div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800">
  {/* Background image */}
  <Image
    src="/banner/Pet-Care-Add.jpg"
    alt="Pet Care Banner"
    fill
    className="object-cover opacity-50 z-0"
    priority
  />

  {/* Overlay */}
  <div className="absolute inset-0  z-10" />

  {/* Text Content */}
  <div className="relative z-20 flex h-full items-center justify-center">
    <div className="text-center text-white">
      <h1 className="text-4xl font-bold drop-shadow-lg">
        Become a Pet Care Provider
      </h1>
      <p className="mt-2 text-lg drop-shadow-md">
        Join our community of trusted pet caregivers
      </p>
    </div>
  </div>
</div>


      {/* Form Container */}
      <div className="w-full px-4 py-8">
        <div className="mx-auto max-w-7xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            
            {/* Personal Information Section */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <User className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date of Birth *</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700">Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="AL">Alabama</option>
                    <option value="CA">California</option>
                    <option value="FL">Florida</option>
                    <option value="NY">New York</option>
                    <option value="TX">Texas</option>
                    {/* Add more states as needed */}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">ZIP Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Profile Photo Upload */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Camera className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Profile Photo</h2>
              </div>
              
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> your profile photo
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'profile')}
                  />
                </label>
              </div>
              {formData.profilePhoto && (
                <div className="mt-4 flex items-center space-x-2 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm">{formData.profilePhoto.name} uploaded successfully</span>
                </div>
              )}
            </div>

            {/* Experience & Services */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Heart className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Experience & Services</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Experience with Pets</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <textarea
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={4}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Tell us about your experience with pets..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Types of Pets You Can Care For</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Dogs', 'Cats', 'Birds', 'Fish', 'Rabbits', 'Hamsters', 'Reptiles', 'Other'].map((pet) => (
                      <label key={pet} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.petTypes.includes(pet)}
                          onChange={() => handleCheckboxArrayChange('petTypes', pet)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{pet}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Services You Can Provide</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      'Pet Sitting',
                      'Dog Walking',
                      'Pet Grooming',
                      'Pet Training',
                      'Overnight Care',
                      'Pet Transportation',
                      'Pet Feeding',
                      'Medication Administration'
                    ].map((service) => (
                      <label key={service} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => handleCheckboxArrayChange('services', service)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Availability</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                      <label key={day} className="flex items-center space-x-2 cursor-pointer p-2 rounded-md hover:bg-gray-50 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.availability.includes(day)}
                          onChange={() => handleCheckboxArrayChange('availability', day)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm">{day}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <FileText className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">About You</h2>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tell us about yourself and why you would be a great pet care provider
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={5}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Share your passion for pets, your approach to pet care, and what makes you special..."
                />
              </div>
            </div>

            {/* References */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">References</h2>
              </div>

              <div className="space-y-6">
                {formData.references.map((reference, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h3 className="text-lg font-medium mb-4 flex items-center space-x-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      <span>Reference {index + 1}</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={reference.name}
                          onChange={(e) => handleReferenceChange(index, 'name', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="Reference name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Relationship</label>
                        <input
                          type="text"
                          value={reference.relationship}
                          onChange={(e) => handleReferenceChange(index, 'relationship', e.target.value)}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                          placeholder="e.g., Former employer, Client, Friend"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type="tel"
                            value={reference.phone}
                            onChange={(e) => handleReferenceChange(index, 'phone', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                          <input
                            type="email"
                            value={reference.email}
                            onChange={(e) => handleReferenceChange(index, 'email', e.target.value)}
                            className="mt-1 block w-full rounded-md border border-gray-300 pl-9 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="Email address"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Phone className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Emergency Contact</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name *</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) => handleEmergencyContactChange('name', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Emergency contact name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.emergencyContact.phone}
                      onChange={(e) => handleEmergencyContactChange('phone', e.target.value)}
                      className="mt-1 block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Phone number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Relationship *</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.relationship}
                    onChange={(e) => handleEmergencyContactChange('relationship', e.target.value)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="e.g., Parent, Spouse, Sibling"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Documents Upload */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <Upload className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Additional Documents</h2>
              </div>
              
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  Upload any relevant documents such as certifications, training certificates, or insurance documents.
                </p>
                
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> documents
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB each)</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'documents')}
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

            {/* Background Check Consent */}
            <div className="rounded-lg bg-white p-6 shadow-md">
              <div className="mb-6 flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-bold text-gray-900">Background Check Consent</h2>
              </div>
              
              <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="backgroundCheck"
                    checked={formData.backgroundCheck}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <div className="text-sm text-gray-700">
                    <p className="font-medium">I consent to a background check *</p>
                    <p className="mt-1 text-gray-600">
                      I understand that a background check is required for all pet care providers and 
                      I consent to this process. This helps ensure the safety and security of our clients and their pets.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex items-center space-x-2 rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <CheckCircle className="h-5 w-5" />
                <span>Submit Application</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}