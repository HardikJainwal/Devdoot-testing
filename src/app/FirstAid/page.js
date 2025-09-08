'use client';

import React, { useState } from 'react';
import { Download, Play, CheckCircle, Clock, Users, BookOpen, Heart, Shield, AlertTriangle, Award, Calendar, ExternalLink, Phone, AlertCircle } from 'lucide-react';

const DevdootFirstAid = () => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedLessons, setCompletedLessons] = useState(new Set());
  const [showFullGuide, setShowFullGuide] = useState(false);

  // Sample data for resources
  const resources = [
    {
      id: 1,
      title: "Complete First Aid Manual",
      description: "Comprehensive manual covering all essential first aid techniques and emergency procedures",
      type: "Guide",
      size: "2.4 MB",
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 2,
      title: "Emergency Response Checklist",
      description: "Quick reference checklist for emergency situations and critical response protocols",
      type: "Checklist",
      size: "1.2 MB",
      icon: <AlertTriangle className="w-6 h-6" />
    },
    {
      id: 3,
      title: "CPR & AED Quick Reference",
      description: "Step-by-step CPR and AED instructions with visual aids for all age groups",
      type: "Guide",
      size: "3.1 MB",
      icon: <Heart className="w-6 h-6" />
    },
    {
      id: 4,
      title: "Wound Care & Bleeding Control",
      description: "Complete guide for treating various wounds and controlling severe bleeding",
      type: "Guide",
      size: "1.8 MB",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  // Sample data for certifications
  const certifications = [
    {
      id: 1,
      title: "CPR/AED Certification",
      organization: "American Heart Association",
      issueDate: "March 15, 2024",
      expiryDate: "March 15, 2026",
      status: "Active",
      credentialId: "AHA-CPR-2024-789123",
      badge: "https://images.unsplash.com/photo-1606166187734-a4cb3c22e5f5?w=100&h=100&fit=crop"
    },
    {
      id: 2,
      title: "Basic Life Support (BLS)",
      organization: "Red Cross",
      issueDate: "January 22, 2024",
      expiryDate: "January 22, 2026",
      status: "Active",
      credentialId: "RC-BLS-2024-456789",
      badge: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=100&h=100&fit=crop"
    },
    {
      id: 3,
      title: "Wilderness First Aid",
      organization: "National Safety Council",
      issueDate: "November 10, 2023",
      expiryDate: "November 10, 2025",
      status: "Active",
      credentialId: "NSC-WFA-2023-321654",
      badge: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=100&h=100&fit=crop"
    },
    {
      id: 4,
      title: "Workplace First Aid",
      organization: "Occupational Safety Institute",
      issueDate: "August 5, 2023",
      expiryDate: "August 5, 2024",
      status: "Expired",
      credentialId: "OSI-WFA-2023-987321",
      badge: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    }
  ];

  // Emergency guide data
  const emergencyGuide = [
    {
      id: 1,
      title: "Cardiac Arrest",
      description: "Call emergency services. Start CPR immediately. Use AED if available.",
      icon: <Heart className="w-6 h-6 text-[#C42323]" />,
      color: "border-[#C42323] bg-red-50"
    },
    {
      id: 2,
      title: "Choking",
      description: "Perform back blows and abdominal thrusts (Heimlich maneuver).",
      icon: <AlertCircle className="w-6 h-6 text-[#C42323]" />,
      color: "border-[#C42323] bg-red-50"
    },
    {
      id: 3,
      title: "Severe Bleeding",
      description: "Apply direct pressure. Elevate the wound above heart level if possible.",
      icon: <Shield className="w-6 h-6 text-[#C42323]" />,
      color: "border-[#C42323] bg-red-50"
    },
    {
      id: 4,
      title: "Unconsciousness",
      description: "Check responsiveness. Place in recovery position. Monitor breathing.",
      icon: <AlertTriangle className="w-6 h-6 text-[#C42323]" />,
      color: "border-[#C42323] bg-red-50"
    }
  ];

  // Sample data for courses
  const courses = [
    {
      id: 1,
      title: "Basic Life Support (BLS)",
      instructor: "Dr. Sarah Johnson",
      duration: "4 hours",
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      thumbnail: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop",
      lessons: [
        { id: 1, title: "Introduction to BLS", duration: "15 min", completed: true },
        { id: 2, title: "Scene Safety Assessment", duration: "20 min", completed: true },
        { id: 3, title: "Adult CPR Techniques", duration: "25 min", completed: true },
        { id: 4, title: "Pediatric CPR", duration: "20 min", completed: false },
        { id: 5, title: "AED Usage", duration: "18 min", completed: false }
      ]
    },
    {
      id: 2,
      title: "Advanced Wilderness First Aid",
      instructor: "Mark Thompson",
      duration: "6 hours",
      progress: 40,
      totalLessons: 15,
      completedLessons: 6,
      thumbnail: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop",
      lessons: [
        { id: 1, title: "Wilderness Assessment", duration: "22 min", completed: true },
        { id: 2, title: "Trauma Management", duration: "30 min", completed: true },
        { id: 3, title: "Environmental Injuries", duration: "25 min", completed: false },
        { id: 4, title: "Evacuation Procedures", duration: "35 min", completed: false }
      ]
    },
    {
      id: 3,
      title: "Workplace Emergency Response",
      instructor: "Lisa Chen",
      duration: "3 hours",
      progress: 90,
      totalLessons: 10,
      completedLessons: 9,
      thumbnail: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=200&fit=crop",
      lessons: [
        { id: 1, title: "Workplace Hazards", duration: "18 min", completed: true },
        { id: 2, title: "Burns and Cuts", duration: "20 min", completed: true },
        { id: 3, title: "Chemical Exposure", duration: "25 min", completed: true },
        { id: 4, title: "Emergency Protocols", duration: "15 min", completed: false }
      ]
    }
  ];

  const handleDownload = (resource) => {
    alert(`Downloading ${resource.title}...`);
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
  };

  const handleLessonComplete = (lessonId) => {
    setCompletedLessons(prev => new Set([...prev, lessonId]));
  };

  const closeCourseView = () => {
    setSelectedCourse(null);
  };

  const toggleFullGuide = () => {
    setShowFullGuide(!showFullGuide);
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: 'Poppins, sans-serif' }}>
    
     

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedCourse ? (
          <>
            {/* Emergency Guide Section */}
            <section className="mb-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Emergency Quick Guide</h2>
                <p className="text-gray-600">Critical emergency procedures for immediate response</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-l-4 border-[#C42323]">
                <div className="grid md:grid-cols-2 gap-6">
                  {emergencyGuide.map((item) => (
                    <div key={item.id} className={`p-4 rounded-xl border-2 ${item.color} hover:shadow-md transition-all duration-200`}>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                          <p className="text-gray-700 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-6">
                  <button 
                    onClick={toggleFullGuide}
                    className="inline-flex items-center space-x-2 bg-[#C42323] hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Full Emergency Guide</span>
                  </button>
                </div>
              </div>
            </section>

            {/* First Aid Resources Section */}
            <section className="mb-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">First Aid Resources</h2>
                <p className="text-gray-600">Download essential guides and reference materials</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {resources.map((resource) => (
                  <div key={resource.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                    <div className="text-center mb-4">
                      <div className="inline-flex p-4 bg-[#2C8C91] bg-opacity-10 rounded-2xl text-[#2C8C91] mb-3">
                        {resource.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-sm">{resource.title}</h3>
                      <p className="text-gray-600 text-xs mb-3 line-clamp-2">{resource.description}</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-gray-600">{resource.type}</span>
                        <span className="text-gray-500">{resource.size}</span>
                      </div>
                      <button
                        onClick={() => handleDownload(resource)}
                        className="w-full flex items-center justify-center space-x-2 bg-[#C42323] hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Your Certifications Section */}
            <section className="mb-12">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Certifications</h2>
                <p className="text-gray-600">Track and manage your professional certifications</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {certifications.map((cert) => (
                  <div key={cert.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <img 
                          src={cert.badge} 
                          alt={cert.title}
                          className="w-16 h-16 rounded-xl object-cover border-2 border-[#2C8C91]"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900 mb-1">{cert.title}</h3>
                            <p className="text-[#2C8C91] text-sm font-medium mb-2">{cert.organization}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            cert.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {cert.status}
                          </span>
                        </div>
                        
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Issued: {cert.issueDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>Expires: {cert.expiryDate}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4" />
                            <span className="text-xs">ID: {cert.credentialId}</span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <button className="text-[#C42323] hover:text-red-700 text-sm font-medium flex items-center space-x-1">
                            <ExternalLink className="w-4 h-4" />
                            <span>View Certificate</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Your Courses Section */}
            <section>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Courses</h2>
                <p className="text-gray-600">Continue your first aid training journey</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <div 
                    key={course.id} 
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                    onClick={() => handleCourseClick(course)}
                  >
                    <div className="relative">
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-t-xl flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="p-4 bg-[#C42323] rounded-full">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-[#2C8C91] text-sm font-medium mb-4">By {course.instructor}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.totalLessons} lessons</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span className="font-medium">Progress</span>
                          <span className="font-bold text-[#C42323]">{course.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-[#C42323] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 font-medium">{course.completedLessons}/{course.totalLessons} completed</span>
                        <button className="text-[#C42323] hover:text-red-700 font-bold text-sm">
                          Continue →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          /* Course Video View */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <button 
                onClick={closeCourseView}
                className="text-[#C42323] hover:text-red-700 mb-4 flex items-center space-x-2 font-medium"
              >
                <span>← Back to Courses</span>
              </button>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedCourse.title}</h2>
              <p className="text-[#2C8C91] font-medium">Instructor: {selectedCourse.instructor}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 p-6">
              {/* Video Player */}
              <div className="lg:col-span-2">
                <div className="bg-gray-900 rounded-xl aspect-video flex items-center justify-center mb-6 relative overflow-hidden">
                  <div className="text-center text-white z-10">
                    <div className="p-6 bg-[#C42323] rounded-full mb-4 inline-block">
                      <Play className="w-12 h-12" />
                    </div>
                    <p className="text-xl font-bold mb-2">Video Player</p>
                    <p className="text-gray-300">Select a lesson from the sidebar to begin</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#C42323] to-[#2C8C91] opacity-20"></div>
                </div>
                
                {/* Course Description */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">About this course</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    This comprehensive course covers essential life support techniques that every healthcare provider 
                    and first responder should master. Learn the latest evidence-based guidelines, hands-on techniques, 
                    and best practices for emergency response situations.
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg">
                      <Clock className="w-4 h-4 text-[#C42323]" />
                      <span className="font-medium">{selectedCourse.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg">
                      <Users className="w-4 h-4 text-[#2C8C91]" />
                      <span className="font-medium">2,340 enrolled</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg">
                      <BookOpen className="w-4 h-4 text-[#C42323]" />
                      <span className="font-medium">{selectedCourse.totalLessons} lessons</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lessons List */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900">Course Content</h3>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#C42323]">{selectedCourse.progress}% Complete</p>
                    <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-[#C42323] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${selectedCourse.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {selectedCourse.lessons.map((lesson) => (
                    <div 
                      key={lesson.id}
                      className="flex items-center justify-between p-4 bg-white rounded-lg hover:bg-gray-50 cursor-pointer transition-all duration-200 border border-gray-100 hover:border-[#C42323]"
                    >
                      <div className="flex items-center space-x-3">
                        {lesson.completed || completedLessons.has(lesson.id) ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <div className="p-1 bg-[#C42323] rounded-full">
                            <Play className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{lesson.title}</p>
                          <p className="text-xs text-gray-500 font-medium">{lesson.duration}</p>
                        </div>
                      </div>
                      {!lesson.completed && !completedLessons.has(lesson.id) && (
                        <button
                          onClick={() => handleLessonComplete(lesson.id)}
                          className="text-xs text-[#2C8C91] hover:text-teal-700 font-medium"
                        >
                          Mark Complete
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Emergency Guide Modal */}
        {showFullGuide && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900">Complete Emergency Guide</h3>
                  <button 
                    onClick={toggleFullGuide}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid gap-6">
                  {emergencyGuide.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-red-50 rounded-xl">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-sm text-gray-600">
                              <strong>Detailed Steps:</strong> This section would contain comprehensive step-by-step 
                              instructions for handling {item.title.toLowerCase()} situations, including assessment, 
                              intervention techniques, and when to seek additional help.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <div className="flex items-center justify-center space-x-2 text-[#C42323] font-medium">
                    <Phone className="w-5 h-5" />
                    <span>Emergency Services: 911</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DevdootFirstAid;