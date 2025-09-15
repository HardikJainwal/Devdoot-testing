'use client'
import { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  GraduationCap,
  FileText,
  DollarSign,
  Clock,
  Star,
  Users,
  Home,
  Building2,
  Globe,
  Award,
  CheckCircle2
} from 'lucide-react';

export default function JobRegistrationForm() {
  const [formData, setFormData] = useState({
    // Register Your Job section
    jobTitle: '',
    companyName: '',
    location: '',
    jobType: '',
    workSchedule: '',
    experienceLevel: '',
    salaryRange: '',
    applicationDeadline: '',
    contactEmail: '',
    contactPhone: '',
    jobDescription: '',
    requirements: '',
    benefits: '',
    
    // Company & Recruiting Manager Info section
    companySize: '',
    industry: '',
    companyWebsite: '',
    recruiterName: '',
    recruiterTitle: '',
    recruiterEmail: '',
    recruiterPhone: '',
    companyAddress: '',
    companyDescription: '',
    companyValues: '',
    remoteWork: '',
    additionalNotes: ''
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
    console.log('Job Registration Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-32 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl font-bold mb-2">Post Your Job Opening</h1>
          <p className="text-lg opacity-90">Connect with qualified candidates today</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Introduction Text */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Collaborate with Seekers?</h2>
            <p className="text-gray-600 leading-relaxed">
              At job Seekers we are committed to helping job seekers and employers with the process of recruiting 
              and finding a new career. We offer a comprehensive approach to recruiting that includes sourcing, 
              screening, and matching the best candidates for your open positions. Our team of experienced 
              recruiters will work with you to understand your companys unique needs and culture to ensure 
              we find the right fit for your team.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="space-y-8">
              
              {/* Register Your Job Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Briefcase className="mr-3 text-blue-600" size={28} />
                  Register Your Job
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Job Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Star className="mr-2 text-yellow-500" size={16} />
                      Job Title *
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. Senior Software Engineer"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Building2 className="mr-2 text-blue-500" size={16} />
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <MapPin className="mr-2 text-red-500" size={16} />
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="City, State or Remote"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Job Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Clock className="mr-2 text-green-500" size={16} />
                      Job Type *
                    </label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Job Type</option>
                      <option value="full-time">Full-time</option>
                      <option value="part-time">Part-time</option>
                      <option value="contract">Contract</option>
                      <option value="temporary">Temporary</option>
                      <option value="internship">Internship</option>
                    </select>
                  </div>

                  {/* Work Schedule */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="mr-2 text-purple-500" size={16} />
                      Work Schedule
                    </label>
                    <input
                      type="text"
                      name="workSchedule"
                      value={formData.workSchedule}
                      onChange={handleInputChange}
                      placeholder="e.g. Monday-Friday, 9AM-5PM"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Experience Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Award className="mr-2 text-orange-500" size={16} />
                      Experience Level *
                    </label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Experience Level</option>
                      <option value="entry-level">Entry Level (0-2 years)</option>
                      <option value="mid-level">Mid Level (2-5 years)</option>
                      <option value="senior-level">Senior Level (5-10 years)</option>
                      <option value="executive">Executive (10+ years)</option>
                    </select>
                  </div>

                  {/* Salary Range */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <DollarSign className="mr-2 text-green-600" size={16} />
                      Salary Range
                    </label>
                    <input
                      type="text"
                      name="salaryRange"
                      value={formData.salaryRange}
                      onChange={handleInputChange}
                      placeholder="e.g. $50,000 - $70,000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Application Deadline */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Calendar className="mr-2 text-red-500" size={16} />
                      Application Deadline
                    </label>
                    <input
                      type="date"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Contact Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Mail className="mr-2 text-blue-500" size={16} />
                      Contact Email *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      placeholder="hiring@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Contact Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Phone className="mr-2 text-green-500" size={16} />
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Job Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FileText className="mr-2 text-gray-600" size={16} />
                      Job Description *
                    </label>
                    <textarea
                      name="jobDescription"
                      value={formData.jobDescription}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Describe the role, responsibilities, and what makes this position exciting..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Requirements */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <CheckCircle2 className="mr-2 text-green-600" size={16} />
                      Requirements & Qualifications *
                    </label>
                    <textarea
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="List required skills, education, experience, certifications..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Benefits */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Star className="mr-2 text-yellow-500" size={16} />
                      Benefits & Perks
                    </label>
                    <textarea
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Health insurance, retirement plans, flexible hours, remote work options..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Company & Recruiting Manager Info Section */}
              <div className="border-t pt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                  <Users className="mr-3 text-purple-600" size={28} />
                  Company & Recruiting Manager Info
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Company Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Building2 className="mr-2 text-blue-500" size={16} />
                      Company Size
                    </label>
                    <select
                      name="companySize"
                      value={formData.companySize}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Company Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-1000">201-1000 employees</option>
                      <option value="1000+">1000+ employees</option>
                    </select>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Briefcase className="mr-2 text-orange-500" size={16} />
                      Industry
                    </label>
                    <input
                      type="text"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                      placeholder="e.g. Technology, Healthcare, Finance"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company Website */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Globe className="mr-2 text-green-500" size={16} />
                      Company Website
                    </label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleInputChange}
                      placeholder="https://www.company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Recruiter Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <User className="mr-2 text-purple-500" size={16} />
                      Recruiter/Hiring Manager Name *
                    </label>
                    <input
                      type="text"
                      name="recruiterName"
                      value={formData.recruiterName}
                      onChange={handleInputChange}
                      placeholder="Full name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Recruiter Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Award className="mr-2 text-yellow-500" size={16} />
                      Title/Position
                    </label>
                    <input
                      type="text"
                      name="recruiterTitle"
                      value={formData.recruiterTitle}
                      onChange={handleInputChange}
                      placeholder="e.g. HR Manager, Talent Acquisition"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Recruiter Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Mail className="mr-2 text-blue-500" size={16} />
                      Recruiter Email
                    </label>
                    <input
                      type="email"
                      name="recruiterEmail"
                      value={formData.recruiterEmail}
                      onChange={handleInputChange}
                      placeholder="recruiter@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Recruiter Phone */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Phone className="mr-2 text-green-500" size={16} />
                      Recruiter Phone
                    </label>
                    <input
                      type="tel"
                      name="recruiterPhone"
                      value={formData.recruiterPhone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company Address */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Home className="mr-2 text-red-500" size={16} />
                      Company Address
                    </label>
                    <input
                      type="text"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      placeholder="Street, City, State, ZIP"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Company Description */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FileText className="mr-2 text-gray-600" size={16} />
                      Company Description
                    </label>
                    <textarea
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Tell us about your company, mission, and culture..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Remote Work Options */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <Globe className="mr-2 text-blue-500" size={16} />
                      Remote Work Options
                    </label>
                    <select
                      name="remoteWork"
                      value={formData.remoteWork}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Option</option>
                      <option value="on-site">On-site only</option>
                      <option value="hybrid">Hybrid</option>
                      <option value="remote">Fully remote</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </div>

                  {/* Additional Notes */}
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FileText className="mr-2 text-gray-600" size={16} />
                      Additional Notes
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any additional information or special requirements..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Agreement */}
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I certify that all information provided is accurate and complete. I agree to the terms and conditions 
                    and privacy policy. I understand that posting this job listing constitutes agreement to pay applicable 
                    fees and that false information may result in removal of the listing.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-12 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg flex items-center mx-auto"
                >
                  <CheckCircle2 className="mr-2" size={20} />
                  Post Job Opening
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}