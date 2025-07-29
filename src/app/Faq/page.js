'use client';

import React, { useState } from 'react';
import Head from 'next/head';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const faqData = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: 'fas fa-rocket',
      color: 'from-red-500 to-red-600',
      items: [
        {
          id: 'what-is-taskmaster',
          question: 'What is TaskMaster?',
          answer: 'TaskMaster is a productivity app designed to help individuals and teams manage tasks, projects, and workflows efficiently. It offers a range of features to streamline your work and boost productivity.'
        },
        {
          id: 'create-account',
          question: 'How do I create an account?',
          answer: 'To create an account, visit our sign-up page, enter your email address and create a secure password. Follow the verification steps sent to your email to activate your account.'
        },
        {
          id: 'key-features',
          question: 'What are the key features of TaskMaster?',
          answer: 'TaskMaster offers task management, project collaboration, team assignment, progress tracking, deadline management, file sharing, and comprehensive reporting tools.'
        }
      ]
    },
    {
      id: 'account-management',
      title: 'Account Management',
      icon: 'fas fa-user-cog',
      color: 'from-teal-500 to-teal-600',
      items: [
        {
          id: 'reset-password',
          question: 'How do I reset my password?',
          answer: 'To reset your password, go to the login page and click on "Forgot Password" link. Follow the instructions sent to your email to create a new password.'
        },
        {
          id: 'change-email',
          question: 'Can I change my email address?',
          answer: 'Yes, you can change your email address in your account settings. Go to Profile Settings and update your email address. You\'ll need to verify the new email.'
        },
        {
          id: 'delete-account',
          question: 'How do I delete my account?',
          answer: 'To delete your account, go to Account Settings and select "Delete Account". Please note that this action is irreversible and will remove all your data.'
        }
      ]
    },
    {
      id: 'features-functionality',
      title: 'Features & Functionality',
      icon: 'fas fa-cogs',
      color: 'from-slate-500 to-slate-600',
      items: [
        {
          id: 'create-task',
          question: 'How do I create a new task?',
          answer: 'To create a new task, click the "+" button in the top right corner of the dashboard. Fill in the task details, including title, description, due date, and assignee, then click "Create Task".'
        },
        {
          id: 'assign-tasks',
          question: 'Can I assign tasks to team members?',
          answer: 'Yes, you can assign tasks to team members by selecting their name from the assignee dropdown when creating or editing a task. They will receive notifications about the assignment.'
        },
        {
          id: 'track-progress',
          question: 'How do I track progress on my projects?',
          answer: 'You can track progress through the project dashboard, which shows completion percentages, milestone tracking, and detailed progress reports for all your projects.'
        }
      ]
    }
  ];

  const filteredFAQ = faqData.map(section => ({
    ...section,
    items: section.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.items.length > 0);

  return (
    <>
      <Head>
        <title>FAQ - TaskMaster | Frequently Asked Questions</title>
        <meta name="description" content="Find answers to common questions about TaskMaster - your productivity app for managing tasks, projects, and workflows efficiently." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" 
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                  <i className="fas fa-question-circle text-4xl"></i>
                </div>
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Find answers to common questions about TaskMaster
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-2xl mx-auto">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid gap-8">
            {filteredFAQ.map((section) => (
              <div key={section.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200/50">
                {/* Section Header */}
                <div className={`bg-gradient-to-r ${section.color} p-8`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <i className={`${section.icon} text-2xl text-white`}></i>
                    </div>
                    <h2 className="text-3xl font-bold text-white">{section.title}</h2>
                  </div>
                </div>

                {/* FAQ Items */}
                <div className="divide-y divide-slate-200">
                  {section.items.map((item) => (
                    <div key={item.id} className="group">
                      <button
                        onClick={() => toggleItem(item.id)}
                        className="w-full px-8 py-6 text-left hover:bg-slate-50 transition-all duration-300 focus:outline-none focus:bg-slate-50"
                      >
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-slate-800 group-hover:text-slate-900 pr-8">
                            {item.question}
                          </h3>
                          <div className="flex-shrink-0">
                            <i className={`fas ${openItems[item.id] ? 'fa-chevron-up' : 'fa-chevron-down'} text-slate-500 group-hover:text-slate-700 transition-colors`}></i>
                          </div>
                        </div>
                      </button>
                      
                      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        openItems[item.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}>
                        <div className="px-8 pb-6">
                          <div className="bg-gradient-to-r from-slate-50 to-white p-6 rounded-2xl border-l-4 border-slate-300">
                            <p className="text-slate-700 leading-relaxed text-lg">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredFAQ.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <div className="bg-white rounded-3xl shadow-xl p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-4xl text-slate-400"></i>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No results found</h3>
                <p className="text-slate-600 text-lg">
                  Try searching with different keywords or browse through our categories above.
                </p>
              </div>
            </div>
          )}

          {/* Contact Section */}
          <div className="mt-16 bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-12 text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm">
                <i className="fas fa-headset text-3xl"></i>
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Still have questions?</h3>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Cannot find what you are looking for? Our support team is here to help you get the most out of TaskMaster.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center justify-center gap-3">
                <i className="fas fa-envelope"></i>
                Contact Support
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold border border-white/20 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3">
                <i className="fas fa-book"></i>
                Browse Documentation
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQPage;