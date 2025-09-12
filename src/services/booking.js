import { authUtils } from '../lib/api/auth';

export const fetchAppointmentSlots = async (
    coachId,
    startDate,
    endDate,
    timeZone = "Asia/Calcutta"
) => {
    try {
        const API_BASE_URL = "https://devdoot-backend.onrender.com/v1/api";

        const url = `${API_BASE_URL}/booking/appointment-slot?coachId=${coachId}&startDate=${startDate}&endDate=${endDate}&timeZone=${encodeURIComponent(
timeZone
)}`;

        const response = await fetch(url, {
            method: "GET",
            headers: authUtils.getAuthHeaders(), 
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const apiData = await response.json();
        return apiData;
    } catch (error) {
        console.error("Error fetching appointment slots:", error);
        return {
            success: false,
            message: error.message,
            data: [],
        };
    }
};


