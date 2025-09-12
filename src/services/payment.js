import { authUtils } from '../lib/api/auth';
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL

export const createOrderAPI = async (data) => {
    try {
        const url = `${API_BASE_URL}/payment/create-order`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authUtils.getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 201) {
            return {}
        }

        const result = await response.json();
        console.log(result);
        return result;

    } catch (err) {
        console.error('Error in createOrderAPI:', err);
        return {};
    }
};

export const verifyPaymentAPI = async (data) => {
    try {
        const url = `${API_BASE_URL}/payment/verify-payment`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authUtils.getAuthHeaders(),
            },
            body: JSON.stringify(data),
        });

        if (response.status !== 201) {
            throw new Error('Something went wrong!!');
        }

        const result = await response.json();
        console.log(result);
        return result;

    } catch (err) {
        console.error('Error in createOrderAPI:', err);
        return {"message": "Booking queued , will try in minutes"};
    }
};

