'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon, ScaleIcon, ShieldCheckIcon, UserGroupIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

export default function TermsAndConditions() {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const termsData = [
    {
      id: 'acceptance',
      title: 'Acceptance of Terms',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      content: 'By accessing or using the TaskMaster website and services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use our services.'
    },
    {
      id: 'description',
      title: 'Description of Service',
      icon: <GlobeAltIcon className="w-6 h-6" />,
      content: 'TaskMaster provides a productivity platform designed to help users manage tasks, projects, and collaborate effectively. We reserve the right to modify or discontinue the service at any time.'
    },
    {
      id: 'accounts',
      title: 'User Accounts',
      icon: <UserGroupIcon className="w-6 h-6" />,
      content: 'To use certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.'
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable Use',
      icon: <ScaleIcon className="w-6 h-6" />,
      content: 'You agree to use TaskMaster only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else\'s use and enjoyment of the service.'
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      content: 'All content and materials on TaskMaster, including but not limited to software, text, graphics, logos, and images, are the property of TaskMaster or its licensors and are protected by copyright and other intellectual property laws.'
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      icon: <GlobeAltIcon className="w-6 h-6" />,
      content: 'TaskMaster is provided on an "as is" and "as available" basis. We make no warranties, express or implied, regarding the service\'s availability, reliability, or accuracy.'
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <ScaleIcon className="w-6 h-6" />,
      content: 'To the fullest extent permitted by law, TaskMaster shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly.'
    },
    {
      id: 'changes-terms',
      title: 'Changes to Terms',
      icon: <UserGroupIcon className="w-6 h-6" />,
      content: 'We reserve the right to modify these Terms & Conditions at any time. We will notify users of any significant changes, and your continued use of the service after such changes constitutes your acceptance of the new terms.'
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      icon: <ShieldCheckIcon className="w-6 h-6" />,
      content: 'These Terms & Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which TaskMaster is based, without regard to its conflict of law provisions.'
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <GlobeAltIcon className="w-6 h-6" />,
      content: 'If you have any questions about these Terms & Conditions, please contact us at support@taskmaster.com.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center">
            <ScaleIcon className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Please read these terms carefully before using our services
            </p>
           
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <ShieldCheckIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Important Notice</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            By using TaskMaster, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. 
            These terms govern your use of our platform and services.
          </p>
        </div>

        {/* Expandable Sections */}
        <div className="space-y-4">
          {termsData.map((section, index) => (
            <div key={section.id} className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full px-6 py-5 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white hover:from-blue-50 hover:to-indigo-50 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="bg-blue-100 p-2 rounded-lg mr-4 text-blue-600">
                    {section.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {index + 1}. {section.title}
                    </h3>
                  </div>
                </div>
                <div className="text-blue-600">
                  {expandedSections[section.id] ? (
                    <ChevronDownIcon className="w-5 h-5 transform transition-transform duration-300" />
                  ) : (
                    <ChevronRightIcon className="w-5 h-5 transform transition-transform duration-300" />
                  )}
                </div>
              </button>
              
              {expandedSections[section.id] && (
                <div className="px-6 pb-6 pt-2 animate-in slide-in-from-top-2 duration-300">
                  <div className="pl-14">
                    <p className="text-gray-700 leading-relaxed">
                      {section.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl p-8 text-white">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Questions About Our Terms?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              We are here to help. If you have any questions about these Terms & Conditions, 
              do not hesitate to reach out to our support team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="mailto:support@taskmaster.com" 
                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300 flex items-center"
              >
                📧 support@taskmaster.com
              </a>
              <span className="text-blue-200 hidden sm:block">or</span>
              <a 
                href="/contact" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        
      </div>
    </div>
  );
}