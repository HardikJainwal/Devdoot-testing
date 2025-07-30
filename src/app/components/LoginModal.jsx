'use client';
import { useState, useRef, useEffect } from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setOtp(['', '', '', '']);
      setIsOtpSent(false);
      setIsAgreed(false);
      setIsLoading(false);
    }
  }, [isOpen]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email || !isAgreed) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsOtpSent(true);
      setIsLoading(false);
      // Focus first OTP input
      otpRefs[0].current?.focus();
    }, 1000);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 4) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log('OTP Verified:', otpValue);
      setIsLoading(false);
      onClose();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-3xl md:max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row min-h-[400px] sm:min-h-[500px]">
          {/* Left Side - Form */}
          <div className="flex-1 p-4 sm:p-6 md:p-8">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src="/images/Logo.png"
                alt="Logo Placeholder"
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C8C91] font-['Poppins'] whitespace-nowrap">
                Welcome Back to<span className="text-[#C42323]"> Devdoot</span>
              </h2>
            </div>
            
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Access emergency medical help, doctor consults, medicine delivery & more.
            </p>

            {!isOtpSent ? (
              <form onSubmit={handleSendOtp}>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!email || !isAgreed || isLoading}
                  className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 text-sm sm:text-base"
                >
                  {isLoading ? 'Sending...' : 'Send OTP'}
                </button>

                <div className="flex items-start mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 mr-2"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Enter OTP sent to {email}
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 mb-4">
                    Please enter the 4-digit OTP sent to your email
                  </p>
                  <div className="flex space-x-2 sm:space-x-3 justify-center">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={otpRefs[index]}
                        type="text"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        maxLength="1"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={otp.join('').length !== 4 || isLoading}
                  className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed mb-4 text-sm sm:text-base"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-red-600 py-2 rounded-lg font-medium hover:bg-red-50 text-sm sm:text-base"
                >
                  Back to Email
                </button>
              </form>
            )}
          </div>

          {/* Right Side - Marketing */}
          <div className="flex-1 bg-teal-600 text-white p-4 sm:p-6 md:p-8 flex flex-col relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-xl sm:text-2xl"
            >
              ×
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-12 sm:mt-16">
              Your Health, Our Priority
            </h3>
            <p className="text-teal-100 mb-6 sm:mb-8 text-sm sm:text-lg">
              Experience seamless healthcare services with India's leading on-demand medical platform.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">Secure & Confidential</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">24x7 Customer Support</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                <span className="text-sm sm:text-base">Verified Doctors</span>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-3 3a1 1 0 100 2h.01a1 1 0 100-2H10zm-4 1a1 1 0 011-1h.01a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm sm:text-base">Fast Emergency Response</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;