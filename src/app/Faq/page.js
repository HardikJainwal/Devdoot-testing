"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  HeartIcon,
  VideoCameraIcon,
  CalendarIcon,
  AcademicCapIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ClockIcon,
  LockClosedIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";

const faqSections = [
  {
    id: "general",
    title: "General Questions",
    items: [
      {
        question: "What is Devdoot?",
        answer:
          "Devdoot is India’s all-in-one healthcare platform, built to make quality care accessible for everyone, anytime, anywhere. From emergency ambulance services to virtual health coaching, care camps for villages, health packages, and more, we are bringing healthcare closer to people’s lives with compassion and innovation.",
      },
      {
        question: "How can I access Devdoot's services?",
        answer:
          "You can book services through our website forms, call our 24/7 helpline, or download the Devdoot app for real-time tracking and support.",
      },
      {
        question: "Where does Devdoot operate?",
        answer:
          "We serve urban centers, rural villages, and remote areas across India, with a special focus on underserved communities.",
      },
    ],
  },
  {
    id: "ambulance",
    title: "Ambulance Services",
    items: [
      {
        question: "How do I book an ambulance?",
        answer:
          "Use the Ambulance Services form online or call our helpline for immediate dispatch. Real-time tracking keeps you updated on arrival.",
      },
      {
        question: "What types of ambulances are available?",
        answer:
          "We offer emergency response units, non-emergency transport, rural outreach vehicles, and special care units (e.g., neonatal and critical care).",
      },
      {
        question: "Are ambulance services affordable?",
        answer:
          "Yes, we provide low-cost options to ensure emergency care is accessible to everyone, especially in rural areas.",
      },
    ],
  },
  {
    id: "care-camps",
    title: "Care Camps",
    items: [
      {
        question: "What are Care Camps?",
        answer:
          "Care Camps bring free health checkups, mobile clinics, and education to Indian villages, addressing rural healthcare gaps.",
      },
      {
        question: "How can I request a Care Camp for my village?",
        answer:
          "Fill out the Care Camps request form with your village details, and we'll coordinate with you to schedule it.",
      },
    ],
  },
  {
    id: "health-packages",
    title: "Health Packages",
    items: [
      {
        question: "What health packages does Devdoot offer?",
        answer:
          "We provide corporate health packages for businesses and home health packages for families, including checkups, diagnostics, and coaching.",
      },
      {
        question: "How do I book a health package?",
        answer:
          "Select your package on the Health Packages page and submit the booking form. We'll confirm your appointment promptly.",
      },
    ],
  },
  {
    id: "girl-safety",
    title: "Girl Safety & Hygiene Program",
    items: [
      {
        question: "What is the Girl Safety & Hygiene Program?",
        answer:
          "This program offers safety workshops, martial arts training, and hygiene education to empower girls across India.",
      },
      {
        question: "Who can join the program?",
        answer:
          "Girls of all ages, schools, and community groups can participate. Register via the Girl Safety & Hygiene form.",
      },
    ],
  },
  {
    id: "virtual-coaching",
    title: "Virtual Health Coaching",
    items: [
      {
        question: "What do virtual health coaches do?",
        answer:
          "Our certified coaches provide guidance on fitness, nutrition, mental health, and lifestyle, accessible online or via App.",
      },
      {
        question: "How do I connect with a coach?",
        answer:
          "Visit the Coaches page, choose your expert, and book a session directly.",
      },
    ],
  },
  {
    id: "additional-info",
    title: "Additional Information",
    items: [
      {
        question: "Are Devdoot's services available 24/7?",
        answer:
          "Yes, our emergency services, including ambulances, operate round-the-clock for your peace of mind.",
      },
      {
        question: "How does Devdoot support rural areas?",
        answer:
          "Through care camps, rural ambulances, and affordable health packages, we ensure healthcare reaches every village.",
      },
      {
        question: "Is my data secure with Devdoot?",
        answer:
          "We prioritize your privacy with secure systems and clear data policies, compliant with healthcare standards.",
      },
      {
        question: "How can I volunteer with Devdoot?",
        answer:
          "Join the Devdoot Good Volunteer Network (DGVN) by contacting us or registering through the Care Camps form.",
      },
    ],
  },
];

const sectionIcons = {
  general: ShieldCheckIcon,
  ambulance: TruckIcon,
  "care-camps": UserGroupIcon,
  "health-packages": HeartIcon,
  "girl-safety": AcademicCapIcon,
  "virtual-coaching": VideoCameraIcon,
  "additional-info": ChatBubbleOvalLeftEllipsisIcon,
};

export default function FAQ() {
  const [activeSection, setActiveSection] = useState(faqSections[0].id);
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (sectionId, questionIndex) => {
    const key = `${sectionId}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = faqSections.map(section => section.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Hero Section */}
      <div className="bg-[#2C8C91] text-white">
        <div className="container mx-auto px-6 py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <div className="flex items-center mb-6">
                <div className="bg-white/10 p-4 rounded-2xl mr-4 backdrop-blur-sm">
                  <ChatBubbleOvalLeftEllipsisIcon className="w-12 h-12" />
                </div>
                <div>
                  <h1 className="text-5xl lg:text-6xl font-bold mb-2">Frequently Asked Questions</h1>
                  <p className="text-xl text-white">Get answers to common questions</p>
                </div>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Find comprehensive answers about Devdoots healthcare services, from emergency ambulances 
                to virtual coaching and care camps for rural communities.
              </p>
            </div>
            <div className="lg:w-1/2 lg:pl-12">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                <h3 className="text-2xl font-semibold mb-6">Quick Navigation</h3>
                <div className="space-y-3">
                  {faqSections.slice(0, 5).map((section) => {
                    const Icon = sectionIcons[section.id];
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className="flex items-center w-full text-left p-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="text-white mr-3">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium">{section.title}</span>
                      </button>
                    );
                  })}
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
                  {faqSections.map((section, index) => {
                    const Icon = sectionIcons[section.id];
                    return (
                      <button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center w-full text-left p-3 rounded-lg transition-all duration-300 ${
                          activeSection === section.id
                            ? 'bg-red-50 text-red-700 border-l-4 border-red-500'
                            : 'hover:bg-gray-50 text-gray-700'
                        }`}
                      >
                        <div className={`mr-3 ${activeSection === section.id ? 'text-red-500' : 'text-gray-400'}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-medium">{index + 1}. {section.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {faqSections.map((section, index) => {
                const Icon = sectionIcons[section.id];
                return (
                  <div
                    key={section.id}
                    id={section.id}
                    className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="flex items-start mb-6">
                      <div className="bg-[#C42323] p-4 rounded-xl mr-6 text-white">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                          {index + 1}. {section.title}
                        </h2>
                        <div className="w-16 h-1 bg-[#C42323] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="pl-20">
                      <div className="space-y-4">
                        {section.items.map((item, idx) => {
                          const key = `${section.id}-${idx}`;
                          const isOpen = !!openQuestions[key];
                          return (
                            <div
                              key={key}
                              className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
                            >
                              <button
                                onClick={() => toggleQuestion(section.id, idx)}
                                className="w-full flex justify-between items-center px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                aria-expanded={isOpen}
                              >
                                <span className="text-lg font-medium text-teal-700 pr-4">
                                  {item.question}
                                </span>
                                <span
                                  className={`transform transition-transform duration-300 text-2xl font-light text-teal-600 flex-shrink-0 ${
                                    isOpen ? "rotate-45" : "rotate-0"
                                  }`}
                                >
                                  +
                                </span>
                              </button>
                              <div
                                className={`transition-all duration-300 ease-in-out ${
                                  isOpen 
                                    ? "max-h-96 opacity-100 pb-6" 
                                    : "max-h-0 opacity-0 pb-0"
                                } overflow-hidden`}
                                aria-hidden={!isOpen}
                              >
                                <div className="px-6">
                                  <p className="text-gray-700 leading-relaxed">
                                    {item.answer}
                                  </p>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Contact Card */}
            <div className="mt-12 bg-[#2C8C91] rounded-2xl shadow-2xl p-8 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-2/3 mb-6 md:mb-0">
                  <h3 className="text-3xl font-bold mb-4">Still Have Questions?</h3>
                  <p className="text-white text-lg leading-relaxed">
                    Our support team is available 24/7 to help you with any questions about our healthcare services. 
                    Contact us for immediate assistance with emergency services or general inquiries.
                  </p>
                </div>
                <div className="md:w-1/3 text-center">
                  <a 
                    href="tel:+911234567890"
                    className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-red-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5 mr-2" />
                    Contact Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}