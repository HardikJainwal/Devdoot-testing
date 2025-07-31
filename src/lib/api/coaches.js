// lib/api/coaches.js
const API_BASE_URL = 'https://devdoot-backend.onrender.com/v1/api';

// Token for authentication
const DUMMY_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY4MGYwZjM4ZjdjY2UwOTgyN2IxODE0NSIsInVzZXJUeXBlIjoicGF0aWVudCIsImVtYWlsIjoibWFkYWFuZGhydXY1NEBnbWFpbC5jb20ifSwiaXNWZXJpZmllZCI6dHJ1ZSwiaWF0IjoxNzUzOTQ0OTg3LCJleHAiOjE3NTQyMDQxODd9.7QfzGpYXEcdITZkndHatifccptag_wmISAkJR5ZiOj0';

export const fetchCoaches = async (page = 1, limit = 12) => {
  try {
    console.log(`Fetching coaches: page=${page}, limit=${limit}`);
    
    const response = await fetch(`${API_BASE_URL}/coach/search?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': DUMMY_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData = await response.json();
    
    // Return the API response as-is, your frontend will handle the transformation
    return apiData;
    
  } catch (error) {
    console.error('Error fetching coaches:', error);
    return {
      success: false,
      message: error.message,
      data: {
        data: [],
        total_results: 0
      }
    };
  }
};

// New function to fetch individual coach profile by ID
export const fetchCoachById = async (coachId) => {
  try {
    console.log(`Fetching coach profile: id=${coachId}`);
    
    const response = await fetch(`${API_BASE_URL}/coach?id=${coachId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': DUMMY_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const apiData = await response.json();
    
    return apiData;
    
  } catch (error) {
    console.error('Error fetching coach profile:', error);
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
};