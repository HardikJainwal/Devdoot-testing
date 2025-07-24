"use client";

import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Left: Logo */}
      <div className="flex items-center space-x-2">
        <nav>
          <Image
  src="/images/Logo.png"
  alt="Logo"
  width={180} 
  height={90} 
  priority
/>

        </nav>
      </div>

      {/* Center: Navigation Links */}
      <ul className="hidden md:flex space-x-8 text-sm font-medium text-gray-700 font-['Poppins']">
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

      {/* Right: Buttons */}
      <div className="flex items-center space-x-4 text-sm font-['Poppins']">
        <span className=" text-pink-500 font-semibold hidden md:block">
          Be Our Partner!
        </span>
        <Link href="/Signup">
          <span className="text-gray-700 hover:underline">Sign Up</span>
        </Link>
        <Link href="/Login">
          <button className="bg-teal-100 text-teal-800 px-4 py-1 rounded hover:bg-teal-200 transition">
            Log in
          </button>
        </Link>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        body {
          padding-top: 80px; /* Add padding to account for fixed navbar */
        }
      `}</style>
    </nav>
  );
};

export default Navbar;