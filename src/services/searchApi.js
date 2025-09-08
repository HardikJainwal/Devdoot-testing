const API_BASE_URL = 'https://devdoot-backend.onrender.com/v1/api';
import { authUtils } from '../lib/api/auth';

export const searchAPI = async (data) => {
    // limit needs on backend , also complete ths ...
    console.log(data);
    const { specialization, limit, filter, page = 1 } = data;
    try {
        console.log(`Fetching coaches: page=${page}, limit=${limit}`);
        let url = `${API_BASE_URL}/coach/search?page=${page}`;
        if (limit){
            url += `&limit=${limit}`;
        }
        if (specialization) {
            url += `&specialization=${specialization}`;
        }

        console.log(url)
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                ...authUtils.getAuthHeaders()
            }
        });
        const result = await response.json();
        console.log(result)
        return result.data.data;
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
