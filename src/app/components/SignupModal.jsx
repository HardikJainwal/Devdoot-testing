'use client';
import { useState, useRef, useEffect } from 'react';

const SignupModal = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef();

  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  // Reset modal state when closed
  useEffect(() => {
    if (!isOpen) {
      setFullName('');
      setEmail('');
      setMobile('');
      setAge('');
      setGender('');
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

  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !mobile || !age || !gender || !isAgreed) return;
    
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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6">
      <div ref={modalRef} className="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-lg sm:max-w-3xl md:max-w-4xl h-auto max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row min-h-[400px] sm:min-h-[500px]">
          {/* Left Side - Form */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white dark:bg-gray-900">
            
            <div className="mb-4 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C8C91] dark:text-teal-400 font-['Poppins'] whitespace-nowrap">
                Sign Up to<span className="text-[#C42323] dark:text-red-400"> Devdoot</span>
              </h2>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-4 text-sm sm:text-base">
              Create an account to access emergency medical help, doctor consults, medicine delivery & more.
            </p>

            {!isOtpSent ? (
              <div>
                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm sm:text-base">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm sm:text-base">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    required
                  />
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm sm:text-base">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-l-lg text-sm sm:text-base">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent text-sm sm:text-base bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                      required
                    />
                  </div>
                </div>

                

                <div className="mb-4 sm:mb-2">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm sm:text-base">
                    Gender
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-200">
                      <input
                        type="radio"
                        value="male"
                        checked={gender === 'male'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-red-500 dark:focus:ring-red-400"
                      />
                      Male
                    </label>
                    <label className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-200">
                      <input
                        type="radio"
                        value="female"
                        checked={gender === 'female'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-red-500 dark:focus:ring-red-400"
                      />
                      Female
                    </label>
                    <label className="flex items-center text-sm sm:text-base text-gray-700 dark:text-gray-200">
                      <input
                        type="radio"
                        value="other"
                        checked={gender === 'other'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-red-500 dark:focus:ring-red-400"
                      />
                      Other
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={!fullName || !email || !mobile || !age || !gender || !isAgreed || isLoading}
                  className="w-full bg-red-600 dark:bg-red-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed mb-4 text-sm sm:text-base transition-colors"
                >
                  {isLoading ? 'Sending...' : 'Get OTP'}
                </button>

                <div className="flex items-start mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 mr-2 h-4 w-4 text-red-600 dark:text-red-500 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-red-500 dark:focus:ring-red-400"
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700 dark:text-gray-200 font-medium mb-2 text-sm sm:text-base">
                    Enter OTP sent to {email}
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
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
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        maxLength="1"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length !== 4 || isLoading}
                  className="w-full bg-red-600 dark:bg-red-500 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700 dark:hover:bg-red-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed mb-4 text-sm sm:text-base transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={() => setIsOtpSent(false)}
                  className="w-full text-red-600 dark:text-red-400 py-2 rounded-lg font-medium hover:bg-red-50 dark:hover:bg-gray-800 text-sm sm:text-base transition-colors"
                >
                  Back to Form
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Marketing */}
          <div className="flex-1 bg-teal-600 dark:bg-teal-700 text-white p-4 sm:p-6 md:p-8 flex flex-col relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 dark:hover:text-gray-300 text-xl sm:text-2xl transition-colors"
            >
              ×
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-12 sm:mt-16">
              Your Health, Our Priority
            </h3>
            <p className="text-teal-100 dark:text-teal-200 mb-6 sm:mb-8 text-sm sm:text-lg">
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

export default SignupModal;