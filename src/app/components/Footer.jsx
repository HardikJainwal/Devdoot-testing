// components/Footer.js
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faInstagram, 
  faTwitter, 
  faLinkedinIn 
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
        { name: 'Press', href: '/press' },
        { name: 'Blog', href: '/blog' },
      ]
    },
    {
      title: 'SUPPORT',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'Safety Center', href: '/safety' },
        { name: 'Community Guidelines', href: '/community-guidelines' },
        { name: 'Contact Us', href: '/contact' },
      ]
    },
    {
      title: 'LEGAL',
      links: [
        { name: 'Terms of Service', href: '/terms' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Cookie Policy', href: '/cookies' },
        { name: 'GDPR', href: '/gdpr' },
      ]
    }
  ];

  const socialLinks = [
    { 
      icon: faFacebookF, 
      href: 'https://facebook.com/devdoot',
      label: 'Facebook'
    },
    { 
      icon: faInstagram, 
      href: 'https://instagram.com/devdoot',
      label: 'Instagram'
    },
    { 
      icon: faTwitter, 
      href: 'https://twitter.com/devdoot',
      label: 'Twitter'
    },
    { 
      icon: faLinkedinIn, 
      href: 'https://linkedin.com/company/devdoot',
      label: 'LinkedIn'
    },
  ];

  return (
    <footer className="bg-slate-800 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
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
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
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