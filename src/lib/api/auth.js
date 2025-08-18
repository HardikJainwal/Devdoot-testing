export const authUtils = {
 
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('authToken');
    return !!token;
  },


  getToken: () => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('authToken');
  },

 
  getUser: () => {
    if (typeof window === 'undefined') return null;
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  
  setAuth: (token, userData) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userData', JSON.stringify(userData));
  },


  clearAuth: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  },

  
  getAuthHeaders: () => {
  const token = authUtils.getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'x-access-token': token }) 
  };
}
};

// API endpoints
export const API_ENDPOINTS = {
  SIGNUP: 'https://devdoot-backend.onrender.com/v1/api/user/signup',
  LOGIN: 'https://devdoot-backend.onrender.com/v1/api/user/login',
  VERIFY_OTP: 'https://devdoot-backend.onrender.com/v1/api/user/otp',
  SEND_LOGIN_OTP: 'https://devdoot-backend.onrender.com/v1/api/user/send-login-otp', // You may need to confirm this endpoint
  VERIFY_LOGIN_OTP: 'https://devdoot-backend.onrender.com/v1/api/user/verify-login-otp' // You may need to confirm this endpoint
};