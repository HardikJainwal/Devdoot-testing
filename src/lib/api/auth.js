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
  },

  // Auth API calls
  signup: async (userData) => {
    const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  },

  verifyOTP: async (otpData) => {
    const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData)
    });
    return response.json();
  },

  sendLoginOTP: async (phoneData) => {
    const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/send-login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(phoneData)
    });
    return response.json();
  },

  verifyLoginOTP: async (otpData) => {
    const response = await fetch('https://devdoot-backend.onrender.com/v1/api/user/verify-login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(otpData)
    });
    return response.json();
  }
};

// services/specialistService.js
export const specialistService = {
  submitSpecialistRequest: async (formData) => {
    const headers = authUtils.getAuthHeaders();
    
    const response = await fetch(API_ENDPOINTS.SPECIALIST_FINDER, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...formData,
        preferredDate: new Date(formData.preferredDate).toISOString()
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    return response.json();
  }
};