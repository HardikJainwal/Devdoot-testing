import { authUtils } from "./auth";

const API_BASE_URL = 'https://devdoot-backend.onrender.com/v1/api';


const getHeaders = () => ({
  'Content-Type': 'application/json',
  ...authUtils.getAuthHeaders()
});


export const fetchCoaches = async (page = 1, limit = 12) => {
  try {
    console.log(`Fetching coaches: page=${page}, limit=${limit}`);

    const response = await fetch(`${API_BASE_URL}/coach/search?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

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


export const fetchCoachById = async (coachId) => {
  try {
    console.log(`Fetching coach profile: id=${coachId}`);

    const response = await fetch(`${API_BASE_URL}/coach?id=${coachId}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error fetching coach profile:', error);
    return {
      success: false,
      message: error.message,
      data: null
    };
  }
};


export const fetchCoachesBySpecialization = async (specialization, page = 1, limit = 12) => {
  try {
    console.log(`Fetching coaches by specialization: specialization=${specialization}, page=${page}, limit=${limit}`);

    const response = await fetch(`${API_BASE_URL}/coach/search?specialization=${specialization}&page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error('Error fetching coaches by specialization:', error);
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
