'use client';
import { useState, useRef, useEffect } from 'react';

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('');
  const [userType, setUserType] = useState('patient');
  const [coachType, setCoachType] = useState('senior care');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userToken, setUserToken] = useState('');
  const modalRef = useRef();

  const otpRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  console.log("SignupModal rendered - isOpen:", isOpen, "onSwitchToLogin:", typeof onSwitchToLogin);

  useEffect(() => {
    if (!isOpen) {
      setFullName('');
      setEmail('');
      setMobile('');
      setWhatsappNumber('');
      setPassword('');
      setConfirmPassword('');
      setGender('');
      setUserType('patient');
      setCoachType('senior care');
      setOtp(['', '', '', '', '', '']);
      setIsOtpSent(false);
      setIsAgreed(false);
      setIsLoading(false);
      setError('');
      setUserToken('');
    }
  }, [isOpen]);

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

  const validateForm = () => {
    if (!fullName || !email || !mobile || !whatsappNumber || !password || !gender) {
      setError('Please fill in all required fields');
      return false;
    }

    const nameParts = fullName.trim().split(' ');
    if (!nameParts[0]) {
      setError('Please enter a valid full name');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      setError('Password must be at least 8 characters long and include letters and numbers');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number');
      return false;
    }

    if (!mobileRegex.test(whatsappNumber)) {
      setError('Please enter a valid 10-digit WhatsApp number');
      return false;
    }

    if (!['male', 'female', 'other'].includes(gender)) {
      setError('Please select a valid gender');
      return false;
    }

    if (!['patient', 'care-giver'].includes(userType)) {
      setError('Please select a valid user type');
      return false;
    }

    if (!['senior care', 'general care'].includes(coachType)) {
      setError('Please select a valid coach type');
      return false;
    }

    if (!isAgreed) {
      setError('Please agree to the Terms of Service and Privacy Policy');
      return false;
    }

    return true;
  };

  const handleGetOtp = async (e) => {
    e.preventDefault();
    if (!validateForm() || !isAgreed) return;

    setIsLoading(true);
    setError('');

    try {
      const nameParts = fullName.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'N/A';

      const mobileNumber = `9${mobile.padStart(10, '0').slice(1)}`;
      const whatsappNumberValue = `9${whatsappNumber.padStart(10, '0').slice(1)}`;

      const signupData = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        mobile: `+91${mobileNumber}`,
        whatsappNumber: `+91${whatsappNumberValue}`,
        userType: userType,
        coachType: coachType,
        gender: gender,
        fcmToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY3ZDlhYTg3NzRiZGY3Mzk0MWJkMWU2YSIsInVzZXJUeXBlIjoiY2FyZS1naXZlciIsImVtYWlsIjoia3Jpc2huYXk4MTIzNDVAZ21haWwuY29tIn0sImlzVmVyaWZpZWQiOnRydWUsImlhdCI6MTc0OTEyMjYwOSwiZXhwIjoxNzQ5MzgxODA5fQ.VL_wIR5x-yisfVhuoiyzSg8oLp9pSjvtGV06cQV-ZL4",
      };

      console.log('Signup payload:', signupData);

      const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();
      console.log('Server response:', data);

      if (response.ok && data.success) {
        setUserToken(data.data.token);
        setIsOtpSent(true);
        setTimeout(() => {
          otpRefs[0].current?.focus();
        }, 100);
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter the 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Token being sent:', userToken);
      console.log('Email being sent:', email);
      console.log('OTP being sent:', otpValue);

      const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': userToken, 
        },
        body: JSON.stringify({
          email: email,
          emailOtp: otpValue,
        }),
      });

      console.log('Response status:', response.status);

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.log('Non-JSON response:', textResponse);
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();
      console.log('OTP verification response:', data);

      if (response.ok && data.success) {
        localStorage.setItem('authToken', userToken);
        localStorage.setItem('userData', JSON.stringify(data.data?.user || { email }));
        console.log('Signup and verification successful');
        onClose();
        window.location.reload();
      } else {
        setError(data.message || 'OTP verification failed. Please try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      if (error.message.includes('non-JSON response')) {
        setError('Server error. Please try again later.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToLogin = () => {
    console.log('Switch to login modal clicked');
    if (onSwitchToLogin) {
      onSwitchToLogin();
    } else {
      console.error('onSwitchToLogin function not provided');
    }
  };

  if (!isOpen) {
    console.log("SignupModal: Not rendering because isOpen is false");
    return null;
  }

  console.log("SignupModal: Rendering modal");

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 sm:p-6">
      <div ref={modalRef} className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-3xl md:max-w-4xl h-auto max-h-[90vh] overflow-y-auto">
        <div className="flex flex-col md:flex-row min-h-[400px] sm:min-h-[500px]">
          {/* Left Side - Form */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white">
            <div className="mb-4 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C8C91] font-['Poppins'] whitespace-nowrap">
                Sign Up to<span className="text-[#C42323]"> Devdoot</span>
              </h2>
            </div>

            <p className="text-gray-600 mb-6 sm:mb-4 text-sm sm:text-base">
              Create an account to access emergency medical help, doctor consults, medicine delivery & more.
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            {!isOtpSent ? (
              <div>
                {/* All your existing form fields remain the same */}
                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500"
                    required
                  />
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Mobile Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-200 text-gray-700 rounded-l-lg text-sm sm:text-base">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    WhatsApp Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-200 text-gray-700 rounded-l-lg text-sm sm:text-base">
                      +91
                    </span>
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="Enter your WhatsApp number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Password *
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500"
                    required
                    minLength="8"
                  />
                </div>

                <div className="mb-4 sm:mb-4">
                  <label className="block text-gray-700  font-medium mb-2 text-sm sm:text-base">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500  focus:border-transparent text-sm sm:text-base bg-white text-gray-900 placeholder-gray-500 "
                    required
                    minLength="8"
                  />
                </div>

                <div className="mb-4 sm:mb-2">
                  <label className="block text-gray-700  font-medium mb-2 text-sm sm:text-base">
                    Gender *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="male"
                        checked={gender === 'male'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      Male
                    </label>
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="female"
                        checked={gender === 'female'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      Female
                    </label>
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="other"
                        checked={gender === 'other'}
                        onChange={(e) => setGender(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      Other
                    </label>
                  </div>
                </div>

                <div className="mb-4 sm:mb-2">
                  <label className="block text-gray-700  font-medium mb-2 text-sm sm:text-base">
                    User Type *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="patient"
                        checked={userType === 'patient'}
                        onChange={(e) => setUserType(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      Patient
                    </label>
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="care-giver"
                        checked={userType === 'care-giver'}
                        onChange={(e) => setUserType(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600 bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      Care-Giver
                    </label>
                  </div>
                </div>

                <div className="mb-4 sm:mb-2">
                  <label className="block text-gray-700  font-medium mb-2 text-sm sm:text-base">
                    Coach Type *
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="senior care"
                        checked={coachType === 'senior care'}
                        onChange={(e) => setCoachType(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      Senior Care
                    </label>
                    <label className="flex items-center text-sm sm:text-base text-gray-700 ">
                      <input
                        type="radio"
                        value="general care"
                        checked={coachType === 'general care'}
                        onChange={(e) => setCoachType(e.target.value)}
                        className="mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  focus:ring-red-500 "
                      />
                      General Care
                    </label>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGetOtp}
                  disabled={!fullName || !email || !mobile || !whatsappNumber || !password || !gender || !userType || !coachType || !isAgreed || isLoading}
                  className="w-full bg-red-600  text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700  disabled:bg-gray-400  disabled:cursor-not-allowed mb-4 text-sm sm:text-base transition-colors"
                >
                  {isLoading ? 'Creating Account...' : 'Get OTP'}
                </button>

                <div className="flex items-start mb-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="mt-1 mr-2 h-4 w-4 text-red-600  bg-white  border-gray-300  rounded focus:ring-red-500 "
                  />
                  <label htmlFor="terms" className="text-xs sm:text-sm text-gray-600 ">
                    I agree to the{' '}
                    <a href="#" className="text-blue-600  hover:underline">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>
            ) : (
              <div>
                <div className="mb-4 sm:mb-6">
                  <label className="block text-gray-700  font-medium mb-2 text-sm sm:text-base">
                    Enter OTP sent to {email}
                  </label>
                  <p className="text-xs sm:text-sm text-gray-500  mb-4">
                    Please enter the 6-digit OTP sent to your email
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
                        className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg sm:text-xl font-bold border-2 border-gray-300  rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500  focus:border-transparent bg-white  text-gray-900 "
                        maxLength="1"
                      />
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={otp.join('').length !== 6 || isLoading}
                  className="w-full bg-red-600  text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700  disabled:bg-gray-400  disabled:cursor-not-allowed mb-4 text-sm sm:text-base transition-colors"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOtpSent(false);
                    setError('');
                    setOtp(['', '', '', '', '', '']);
                  }}
                  className="w-full text-red-600  py-2 rounded-lg font-medium hover:bg-red-50  text-sm sm:text-base transition-colors"
                >
                  Back to Form
                </button>
              </div>
            )}
          </div>

          {/* Right Side - Marketing */}
          <div className="flex-1 bg-[#2C8C91] text-white p-4 sm:p-6 md:p-8 flex flex-col relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200  text-xl sm:text-2xl transition-colors"
            >
              ×
            </button>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 mt-12 sm:mt-16">
              Your Health, Our Priority
            </h3>
            <p className="text-teal-100  mb-6 sm:mb-8 text-sm sm:text-lg">
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