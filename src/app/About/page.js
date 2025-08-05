"use client";

import { useState, useEffect } from "react";
import {
  HeartIcon,
  UserGroupIcon,
  StarIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  PhoneIcon,
  CalendarIcon,
  RocketLaunchIcon,
  GlobeAltIcon,
  SparklesIcon,
  EyeIcon,
  HandRaisedIcon,
  DevicePhoneMobileIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

// Counter Animation Hook
const useCountUp = (end, duration = 2000, isVisible = false) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    let animationFrame;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isVisible]);

  return count;
};

// Counter Component
const AnimatedCounter = ({ end, suffix = "", label, isVisible }) => {
  const count = useCountUp(end, 2000, isVisible);

  return (
    <div className="bg-cyan-50 rounded-2xl p-8 text-center hover:bg-cyan-100 transition-all duration-300">
      <div className="text-4xl md:text-5xl font-bold text-[#C42323] mb-2">
        {count}
        {suffix}
      </div>
      <div className="text-gray-700 font-medium">{label}</div>
    </div>
  );
};

export default function AboutUsPage() {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const [impactVisible, setImpactVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, entry.target.id]));

            // Special handling for impact section
            if (entry.target.id === "impact-section") {
              setImpactVisible(true);
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    const timelineItems = document.querySelectorAll(".timeline-item");
    const impactSection = document.getElementById("impact-section");

    timelineItems.forEach((item) => observer.observe(item));
    if (impactSection) observer.observe(impactSection);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-[70vh] bg-white font-['Poppins']">
      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/images/about-banner.jpg')" }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Empowering Health, Enriching Lives
          </h1>
          <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
            Delivering exceptional medical services with compassion and
            innovation at the heart of everything we do.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-[#2C8C91] hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition-all duration-300">
              Explore Our Services
            </button>
            <button className="bg-[#C42323] hover:bg-opacity-90 text-white px-8 py-3 rounded-md font-medium transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-[#2B2B2A] mb-8">
                Our Story
              </h2>

              <div className="space-y-6 text-gray-700 leading-relaxed text-base">
                <p>
                  Founded in 2010, DeviceX began as a small clinic with a big
                  vision – to transform healthcare delivery through innovation
                  and compassionate care. What started as a humble initiative
                  has now grown into a trusted multi-specialty healthcare
                  provider serving communities across the region.
                </p>

                <p>
                  Our journey has been guided by a simple yet powerful belief:
                  every patient deserves access to world-class medical care
                  delivered with dignity and respect. Over the years, we have
                  invested in cutting-edge technologies while maintaining our
                  focus on the human connection that defines quality healthcare.
                </p>

                <p>
                  Today, DeviceX stands as a beacon of healthcare excellence,
                  combining advanced medical expertise with a holistic approach
                  to wellness. Our patient-first philosophy continues to drive
                  our growth and innovations in medical care.
                </p>
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-4">
              {/* Top Image - Medical Professional */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Medical professional working"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Bottom Row - Two smaller images */}
              <div className="grid grid-cols-2 gap-4">
                {/* Doctor with Patient */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Doctor consulting with patient"
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Healthy Lifestyle */}
                <div className="rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Healthy food and lifestyle"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Section - The Devdoot Story */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2B2B2A] mb-4">
              The Devdoot Story
            </h2>
            <div className="w-16 h-1 bg-[#C42323] mx-auto"></div>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#C42323]"></div>

            {/* Timeline Items */}
            <div className="space-y-24">
              {/* 2018 - The Beginning */}
              <div
                id="timeline-2018"
                className={`timeline-item flex items-center transition-all duration-1000 ease-out ${
                  visibleItems.has("timeline-2018")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-bold text-[#2B2B2A] mb-2">
                    2018 - The Beginning
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Founded to solve the challenge of delayed emergency
                    response.
                  </p>
                </div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-[#C42323] rounded-full border-4 border-white shadow-lg">
                  <CalendarIcon className="w-6 h-6 text-white" />
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2020 - Digital Launch */}
              <div
                id="timeline-2020"
                className={`timeline-item flex items-center transition-all duration-1000 ease-out delay-200 ${
                  visibleItems.has("timeline-2020")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-1/2 pr-8"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-[#345268] rounded-full border-4 border-white shadow-lg">
                  <RocketLaunchIcon className="w-6 h-6 text-white" />
                </div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-2xl font-bold text-[#2B2B2A] mb-2">
                    2020 - Digital Launch
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Launched platform connecting patients to doctors and
                    ambulances.
                  </p>
                </div>
              </div>

              {/* 2022 - Nationwide Expansion */}
              <div
                id="timeline-2022"
                className={`timeline-item flex items-center transition-all duration-1000 ease-out delay-400 ${
                  visibleItems.has("timeline-2022")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-2xl font-bold text-[#2B2B2A] mb-2">
                    2022 - Nationwide Expansion
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Coverage extended to 15 states & 500+ verified providers.
                  </p>
                </div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-[#2C8C91] rounded-full border-4 border-white shadow-lg">
                  <GlobeAltIcon className="w-6 h-6 text-white" />
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2023 & Beyond */}
              <div
                id="timeline-2023"
                className={`timeline-item flex items-center transition-all duration-1000 ease-out delay-600 ${
                  visibleItems.has("timeline-2023")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <div className="w-1/2 pr-8"></div>
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-[#2B2B2A] rounded-full border-4 border-white shadow-lg">
                  <SparklesIcon className="w-6 h-6 text-white" />
                </div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-2xl font-bold text-[#2B2B2A] mb-2">
                    2023 & Beyond
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Innovating with AI triage & telemedicine for millions more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Dedicated Team Section */}
      <div className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2B2B2A] mb-4">
              Our Dedicated Team
            </h2>
            <div className="w-16 h-1 bg-[#2C8C91] mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">
              Meet the professionals who make DeviceX exceptional
            </p>
          </div>

          {/* Team Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Sarah Johnson */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Sarah Johnson"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B2B2A] mb-1">
                  Sarah Johnson
                </h3>
                <p className="text-[#C42323] font-semibold mb-3">CEO</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  With 15 years of experience in pediatric care, Dr. Johnson
                  brings warmth and expertise to our youngest patients.
                </p>
              </div>
            </div>

            {/* Michael Chen */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Michael Chen"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B2B2A] mb-1">
                  Michael Chen
                </h3>
                <p className="text-[#C42323] font-semibold mb-3">Developer</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Specializing in preventive cardiology, Dr. Chen helps patients
                  maintain heart health through comprehensive care.
                </p>
              </div>
            </div>

            {/* Priya Desai */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="/images/dr-dhruv.jpg"
                  alt="Dhruv Madan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#2B2B2A] mb-1">
                  Flutter Developer
                </h3>
                <p className="text-[#C42323] font-semibold mb-3">Team Head</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leading our nursing team with compassion and dedication,
                  ensuring every patient receives exceptional care.
                </p>
              </div>
            </div>
          </div>

          {/* View All Team Members Button */}
          <div className="text-center">
            <button className="bg-[#2C8C91] hover:bg-[#345268] text-white px-8 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105">
              View All Team Members
            </button>
          </div>
        </div>
      </div>

      {/* Our Guiding Principles Section */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2B2B2A] mb-4">
              Our Guiding Principles
            </h2>
            <p className="text-gray-600 text-lg">
              The foundation of everything we do at DeviceX
            </p>
          </div>

          {/* Principles Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Our Mission */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#2C8C91] to-[#345268] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300"></div>
              <h3 className="text-2xl font-bold text-[#2B2B2A] mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To deliver patient-centric healthcare with empathy and
                excellence, making advanced medical care accessible to all
                communities we serve.
              </p>
            </div>

            {/* Our Vision */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C42323] to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <EyeIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B2B2A] mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted healthcare partner across regions,
                setting benchmarks in medical innovation and patient-centered
                care.
              </p>
            </div>

            {/* Our Promise */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-[#345268] to-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300">
                <HandRaisedIcon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-[#2B2B2A] mb-4">
                Our Promise
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Every patient receives personalized attention, ethical
                treatment, and the highest standard of medical expertise.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div id="impact-section" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#2B2B2A] mb-4">
              Our Impact
            </h2>
            <p className="text-gray-600 text-lg">
              Numbers that reflect our commitment to healthcare excellence
            </p>
          </div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCounter
              end={2000}
              suffix="+"
              label="Patients Treated"
              isVisible={impactVisible}
            />
            <AnimatedCounter
              end={500}
              suffix="+"
              label="Specialist Doctors"
              isVisible={impactVisible}
            />
            <AnimatedCounter
              end={3}
              suffix=""
              label="Years of Service"
              isVisible={impactVisible}
            />
            <AnimatedCounter
              end={5}
              suffix=""
              label="Awards & Recognitions"
              isVisible={impactVisible}
            />
          </div>
        </div>
      </div>

      {/* Giving Back to Our Community Section */}
      <div className="py-20 px-6 bg-gradient-to-br from-slate-50 to-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-bold text-[#2B2B2A] mb-6">
                  Giving Back to Our Community
                </h2>

                <div className="space-y-6 text-gray-700 leading-relaxed text-base mb-8">
                  <p>
                    At DeviceX, we believe that quality healthcare is a right,
                    not a privilege. Our community outreach efforts are designed
                    to bridge healthcare gaps and create lasting impact in
                    underserved populations.
                  </p>

                  <p>
                    Through our various outreach programs, we haveve provided
                    free medical care to over 50,000 individuals who otherwise
                    would not have access to specialized treatment.
                  </p>
                </div>
              </div>

              {/* Community Programs */}
              <div className="space-y-8">
                {/* Mobile Health Units */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-[#2C8C91]">
                  <div className="w-10 h-10 bg-[#2C8C91] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <DevicePhoneMobileIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2B2B2A] mb-2">
                      Mobile Health Units
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Fully equipped vans bringing healthcare to remote villages
                      and urban slums.
                    </p>
                  </div>
                </div>

                {/* Health Education Programs */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border-l-4 border-[#C42323]">
                  <div className="w-10 h-10 bg-[#C42323] rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                    <AcademicCapIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2B2B2A] mb-2">
                      Health Education Programs
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Workshops on preventive care, nutrition, and hygiene in
                      schools and communities.
                    </p>
                  </div>
                </div>

                {/* Pro Bono Surgeries */}
               
              </div>
            </div>

            {/* Right Column - Images */}
            <div className="space-y-4">
              {/* Top Image - Community Health */}
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Community health outreach"
                  className="w-full h-80 object-cover"
                />
              </div>

              {/* Bottom Row - Two smaller images */}
              <div className="grid grid-cols-2 gap-4">
                {/* Doctor with Patient */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Doctor consultation"
                    className="w-full h-48 object-cover"
                  />
                </div>

                {/* Medical Team */}
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                    alt="Medical team collaboration"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-20 px-6 bg-[#5BACA1]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Partner with Us for Better Health
          </h2>
          <p className="text-xl text-white opacity-90 mb-8 leading-relaxed">
            Whether you are seeking care, looking to collaborate, or wanting to
            <br />
            join our team, we would love to hear from you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#5BACA1] hover:bg-gray-100 px-8 py-3 rounded-md font-medium transition-all duration-300">
              Book an Appointment
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#5BACA1] px-8 py-3 rounded-md font-medium transition-all duration-300">
              Contact Us
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-[#5BACA1] px-8 py-3 rounded-md font-medium transition-all duration-300">
              Careers at Devdoot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
