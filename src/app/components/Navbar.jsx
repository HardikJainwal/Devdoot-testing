"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Handshake, User, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = ({ onSignupClick, onLoginClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, isAuthenticated, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

 

  const handleSignupClick = () => {
    closeMenu();
    onSignupClick();
  };

  const handleLoginClick = () => {
    closeMenu();
    onLoginClick();
  };

  const handleLogout = () => {
    logout();
    closeProfile();
    closeMenu();
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" onClick={closeMenu} className="flex items-center space-x-2">
            <Image
              src="/images/Logo.png"
              alt="Logo"
              width={180}
              height={90}
              priority
            />
          </Link>
        </div>

        {/* Center: Navigation Links (Desktop) */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium text-gray-700 font-['Poppins']">
          <li className="relative group">
            <Link href="/" className="block py-2">
              Home
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group">
            <Link href="/Services" className="block py-2">
              Services
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group">
            <Link href="/Faq" className="block py-2">
              FAQs
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="relative group">
            <Link href="/About" className="block py-2">
              About
            </Link>
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>

        {/* Right: Buttons/Profile (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 text-sm font-['Poppins']">
          <Link href="/BeOurPartner">
            <span className="text-[#C42323] hover:text-white hover:bg-[#C42323] px-2 py-1 rounded-3xl text-lg font-medium transition-all duration-400 ease-in-out flex items-center space-x-1">
              <span>Be Our Partner</span>
              <Handshake size={20} />
            </span>
          </Link>
          
          {isAuthenticated ? (
  <Link
    href="/UserProfile"
    className="flex items-center space-x-2 bg-[#2C8C91] text-white px-3 py-2 rounded-full hover:bg-teal-700 transition"
  >
    <User size={20} />
    <span className="text-sm">{user?.name || 'Profile'}</span>
  </Link>
) : (

            /* Login/Signup Buttons */
            <>
              <button
                onClick={handleSignupClick}
                className="text-gray-700 text-lg"
              >
                Sign Up
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-[#2C8C91] text-lg text-white px-4 py-1 rounded-3xl hover:bg-teal-200 transition"
              >
                Log in
              </button>
            </>
          )}
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-200 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {/* Mobile Navigation Links */}
          <ul className="space-y-4 text-lg font-medium text-gray-700 font-['Poppins']">
            <li>
              <Link href="/" className="block py-2 hover:text-teal-600 transition-colors" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/Services" className="block py-2 hover:text-teal-600 transition-colors" onClick={closeMenu}>
                Services
              </Link>
            </li>
            <li>
              <Link href="/Faq" className="block py-2 hover:text-teal-600 transition-colors" onClick={closeMenu}>
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/About" className="block py-2 hover:text-teal-600 transition-colors" onClick={closeMenu}>
                About
              </Link>
            </li>
          </ul>

          {/* Mobile Buttons/Profile */}
          <div className="pt-4 border-t border-gray-200 space-y-3 font-['Poppins']">
            <Link href="/BeOurPartner" onClick={closeMenu}>
              <div className="text-[#C42323] hover:text-white text-lg font-semibold flex items-center space-x-1">
                <span>Be Our Partner</span>
                <Handshake size={20} />
              </div>
            </Link>
            
            {isAuthenticated ? (
  <div className="space-y-3">
    <Link
      href="/UserProfile"
      onClick={closeMenu}
      className="flex items-center space-x-2 text-gray-700 text-lg hover:text-teal-600 transition-colors"
    >
      <User size={20} />
      <span>{user?.name || 'Profile'}</span>
    </Link>
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
    >
      <LogOut size={16} />
      <span>Logout</span>
    </button>
  </div>
) : (

              /* Mobile Login/Signup */
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleSignupClick}
                  className="text-gray-700 text-lg hover:underline text-left"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleLoginClick}
                  className="bg-[#2C8C91] text-lg text-white px-4 py-2 rounded hover:bg-teal-200 transition w-full"
                >
                  Log in
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      
     

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        body {
          padding-top: 80px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;