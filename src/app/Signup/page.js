'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from 'next/image';
import { X, Smartphone } from "lucide-react";

export default function SignupModal() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
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
    console.log("Sign in attempted with:", { email, otp: otp.join("") });
  };

  const handleSocialLogin = (provider) => {
    console.log(`${provider} login attempted`);
  };

  const closeModal = () => {
    router.back();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex overflow-hidden relative">
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Left illustration */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 items-center justify-center p-8">
          <div className="relative">
            <Image src="/images/loginimg.png" alt="Login" width={500} height={500} />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="max-w-sm mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Sign In</h2>
            
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
              </div>

              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  OTP
                </label>
                <div className="flex space-x-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      data-index={index}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg font-semibold rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      maxLength={1}
                    />
                  ))}
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-red-500 hover:text-red-600 transition-colors font-medium"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Sign In Button */}
              <button
                onClick={handleSignIn}
                className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
            </div>

            {/* Divider */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">OR Sign In with</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Login Options */}
            <div className="flex justify-center space-x-4">
              {/* Phone */}
              <button
                onClick={() => handleSocialLogin('phone')}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                title="Sign in with Phone"
              >
                <Smartphone size={20} className="text-gray-600" />
              </button>

              {/* Google */}
              <button
                onClick={() => handleSocialLogin('google')}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                title="Sign in with Google"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </button>

              {/* Email alternative */}
              <button
                onClick={() => handleSocialLogin('email')}
                className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                title="Sign in with Email"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center mt-8">
              <span className="text-gray-600">Don&apos;t have an account? </span>
              <button
                onClick={() => console.log('Sign up clicked')}
                className="text-red-500 hover:text-red-600 font-semibold transition-colors"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}