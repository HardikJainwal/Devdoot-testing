'use client';
import { useState, useRef, useEffect } from 'react';

const LoginModal = ({ isOpen, onClose, onSwitchToSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setIsLoading(false);
      setError('');
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

  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://devdoot-backend.onrender.com/v1/api/user/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            fcmToken: '',
          }),
        }
      );

      const data = await response.json();
      

      if (response.ok && data.success) {
        localStorage.setItem('authToken', data.data.token);
        localStorage.setItem('userData', JSON.stringify(data.data.user));

       
        onClose();
        window.location.reload();
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSwitchToSignup = () => {
    if (onSwitchToSignup) {
      onSwitchToSignup();
    } else {
    }
  };

  if (!isOpen) {
    return null;
  }

 

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4 sm:p-6">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-lg sm:max-w-3xl md:max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col md:flex-row min-h-[400px] sm:min-h-[500px]">
          <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white">
            <div className="flex justify-center mb-4 sm:mb-6">
              <img
                src="/images/Logo.png"
                alt="Devdoot Logo"
                className="h-10 sm:h-12 w-auto"
              />
            </div>
            <div className="mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#2C8C91] font-['Poppins'] whitespace-nowrap">
                Welcome Back to
                <span className="text-[#C42323]"> Devdoot</span>
              </h2>
            </div>

            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">
              Access emergency medical help, doctor consults, medicine delivery &
              more.
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            {/* Password Login Form */}
            <form onSubmit={handlePasswordLogin}>
              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900"
                  required
                />
              </div>

              <div className="mb-4 sm:mb-6">
                <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm sm:text-base bg-white text-gray-900"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={!email || !password || isLoading}
                className="w-full bg-red-600 text-white py-2 sm:py-3 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm sm:text-base transition-colors"
              >
                {isLoading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <div className="text-center text-sm text-gray-600 mt-4">
              Don&apos;t have an account?{' '}
              <button
                onClick={handleSwitchToSignup}
                className="text-red-600 hover:underline font-medium"
              >
                Sign up here
              </button>
            </div>
          </div>

          {/* Right Side - Marketing */}
          <div className="flex-1 bg-[#2C8C91] text-white p-4 sm:p-6 md:p-8 flex flex-col relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white hover:text-gray-200 text-xl sm:text-2xl transition-colors"
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