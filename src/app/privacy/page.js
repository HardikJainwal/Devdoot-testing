'use client';

import { useState, useEffect } from 'react';
import { ShieldCheckIcon, EyeIcon, LockClosedIcon, UserIcon, ShareIcon, DatabaseIcon, ClockIcon, ScaleIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

import { ServerStackIcon } from '@heroicons/react/24/solid';


export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.pageYOffset / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <ShieldCheckIcon className="w-5 h-5" />,
      content: `Welcome to TaskMaster's Privacy Policy. This policy explains how we collect, use, and protect your information when you use our services. By using TaskMaster, you agree to the terms outlined in this privacy policy.`
    },
    {
      id: 'information-collect',
      title: 'Information We Collect',
      icon: <ServerStackIcon className="w-5 h-5" />,
      content: `We collect information you provide directly, such as your name, email address, and any content you create or upload. We also collect information automatically, including your IP address, device information, and usage data.`
    },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <EyeIcon className="w-5 h-5" />,
      content: `We use your information to provide and improve our services, personalize your experience, communicate with you, and ensure the security of our platform. This includes analyzing usage patterns to enhance functionality and offering tailored features.`
    },
    {
      id: 'information-sharing',
      title: 'Information Sharing and Disclosure',
      icon: <ShareIcon className="w-5 h-5" />,
      content: `We may share your information with service providers who assist us in operating our platform, conducting business, or servicing you. We may also disclose information if required by law or to protect our rights and safety.`
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <LockClosedIcon className="w-5 h-5" />,
      content: `We implement security measures to protect your information from unauthorized access, alteration, disclosure, or destruction. These measures include encryption, access controls, and regular security assessments.`
    },
    {
      id: 'data-retention',
      title: 'Data Retention',
      icon: <ClockIcon className="w-5 h-5" />,
      content: `We retain your information for as long as necessary to provide our services and comply with legal obligations. You can request deletion of your account and associated data, subject to certain exceptions.`
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <UserIcon className="w-5 h-5" />,
      content: `You have the right to access, correct, or delete your personal information. You can also object to or restrict certain processing of your data. Contact us to exercise these rights.`
    },
    {
      id: 'policy-changes',
      title: 'Changes to This Privacy Policy',
      icon: <ScaleIcon className="w-5 h-5" />,
      content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on our website or through other communication channels.`
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <ChatBubbleLeftRightIcon className="w-5 h-5" />,
      content: `If you have any questions or concerns about this Privacy Policy, please contact us at privacy@taskmaster.com.`
    }
  ];

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="flex items-center mb-6">
                <div className="bg-white/10 p-4 rounded-2xl mr-4 backdrop-blur-sm">
                  <ShieldCheckIcon className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-2">Privacy Policy</h1>
                  <p className="text-xl text-blue-200">Your privacy is our priority</p>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                We believe in transparency about how we collect, use, and protect your personal information. 
                This policy outlines our commitment to your privacy.
              </p>
             
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Quick Navigation</h3>
                <div className="space-y-3">
                  {sections.slice(0, 5).map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className="flex items-center w-full text-left p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      <div className="text-blue-300 mr-3">
                        {section.icon}
                      </div>
                      <span className="text-sm font-medium">{section.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  {sections.map((section, index) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        activeSection === section.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`mr-3 ${activeSection === section.id ? 'text-blue-500' : 'text-gray-400'}`}>
                        {section.icon}
                      </div>
                      <div>
                        <span className="text-sm font-medium">{index + 1}. {section.title}</span>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  id={section.id}
                  className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="flex items-start mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-xl mr-6 text-white">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {index + 1}. {section.title}
                      </h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="pl-20">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {section.content}
                    </p>
                    
                    {/* Add special content for specific sections */}
                    {section.id === 'information-collect' && (
                      <div className="mt-6 grid md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                          <h4 className="font-semibold text-blue-900 mb-2">Direct Information</h4>
                          <p className="text-blue-700 text-sm">Name, email, profile data, content you create</p>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                          <h4 className="font-semibold text-purple-900 mb-2">Automatic Information</h4>
                          <p className="text-purple-700 text-sm">IP address, device info, usage patterns</p>
                        </div>
                      </div>
                    )}

                    {section.id === 'data-security' && (
                      <div className="mt-6 bg-green-50 p-6 rounded-lg border border-green-200">
                        <div className="flex items-center mb-3">
                          <LockClosedIcon className="w-5 h-5 text-green-600 mr-2" />
                          <h4 className="font-semibold text-green-900">Security Measures</h4>
                        </div>
                        <ul className="text-green-700 text-sm space-y-1">
                          <li>• End-to-end encryption for sensitive data</li>
                          <li>• Regular security audits and assessments</li>
                          <li>• Multi-factor authentication options</li>
                          <li>• Secure data centers with 24/7 monitoring</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Card */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h3 className="text-3xl font-bold mb-4">Have Privacy Questions?</h3>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Our privacy team is here to help. Contact us if you have questions about how we handle your data 
                    or if you would like to exercise your privacy rights.
                  </p>
                </div>
                <div className="md:w-1/3 text-center">
                  <a 
                    href="mailto:privacy@taskmaster.com"
                    className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ChatBubbleLeftRightIcon className="w-5 h-5 mr-2" />
                    Contact Privacy Team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
}