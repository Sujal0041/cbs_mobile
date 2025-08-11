import axios from 'axios';

const API_URL = 'https://your-api.com/api'; // Change this to your actual API

export const loginUser = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, {
            username,
            password,
        });

        return response.data; // token, userId, etc.
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.message || 'Login failed');
        } else {
            throw new Error('Network error');
        }
    }
};
