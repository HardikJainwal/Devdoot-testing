'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faLinkedinIn,
  faApple,
  faGooglePlay
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  const router = useRouter();

  const footerSections = [
    {
      title: 'SERVICES',
      links: [
        { name: 'Doctor Consultation', href: '/services/doctor-consultation' },
        { name: 'Lab Tests', href: '/services/lab-tests' },
        { name: 'Medicine Delivery', href: '/services/medicine-delivery' },
        { name: 'Home Care', href: '/services/home-care' },
      ]
    },
    {
      title: 'COMPANY',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' }
      ]
    },
    {
      title: 'LEGAL',
      links: [
        { name: 'Terms & Conditions', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Refund & Cancellation Policy', href: '/refund-cancellation' },
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: faFacebookF, 
      href: 'https://www.facebook.com/devdootyta/',
      label: 'Facebook'
    },
    { 
      icon: faInstagram, 
      href: 'https://www.instagram.com/devdootems/',
      label: 'Instagram'
    },
    { 
      icon: faTwitter, 
      href: 'https://x.com/Devdootems',
      label: 'Twitter'
    },
    { 
      icon: faLinkedinIn, 
      href: 'https://www.linkedin.com/company/devdoot',
      label: 'LinkedIn'
    },
  ];

  return (
    <footer className="bg-slate-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5   gap-14 mb-8">
          {/* Logo and Text Section */}
          <div className="space-y-4">
            <img src="/images/Logo.png" alt="Devdoot Logo" className="h-16 w-auto" />
            <p className="text-gray-300 text-sm">
             At Devdoot, we’re transforming emergency medical care in India. Our mission is to deliver swift, dependable, and accessible assistance to those in critical need. Every step we take ensures rapid response and compassionate support, saving lives when it matters most.
            </p>
          </div>
          {footerSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {/* Get the Devdoot App Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Get the Devdoot App
            </h3>
            <p className="text-gray-500 text-sm">
              Download our mobile app for faster bookings, medicine orders, health records and more.
            </p>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com/in/app/devdoot-your-trusted-ally/id6745329522"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                aria-label="Download on the App Store"
              >
                <FontAwesomeIcon icon={faApple} className="w-6 h-6 mr-2" />
                <span className="text-sm font-semibold">App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.app.Devdoot&hl=en_IN"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-2 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                aria-label="Get it on Google Play"
              >
                <FontAwesomeIcon icon={faGooglePlay} className="w-6 h-6 mr-2" />
                <span className="text-sm font-semibold">Google Play</span>
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © 2023 Devdoot. All rights reserved.
            </div>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-slate-700 hover:bg-slate-600 rounded-full flex items-center justify-center transition-colors duration-200 group"
                  aria-label={social.label}
                >
                  <FontAwesomeIcon 
                    icon={social.icon} 
                    className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors duration-200"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}