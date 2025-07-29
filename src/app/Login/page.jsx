'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import { X, Smartphone } from "lucide-react";

export default function SignupModal() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const router = useRouter();

  const handleOtpChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSignIn = () => {
    console.log("Sign in attempted with:", { firstName, lastName, email, countryCode, phone, otp: otp.join("") });
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login attempted`);
  };

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex overflow-hidden relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-8">
          <Image src="/images/loginimg.png" alt="Login" width={500} height={500} />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
          <div className="max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Sign Up</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Phone with Country Code */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <div className="flex">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+61">🇦🇺 +61</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Show Verify Button if email has value */}
              {email && (
                <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
                  Verify Email
                </button>
              )}

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">OTP</label>
                <div className="flex space-x-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      data-index={index}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSignIn}
                className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
