import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHistory = async (username: string) => {
  try {
    const options = {
      method: 'GET',
      url: '/get_history',
      headers: {
        'X-username': username,
        'X-APIKEY': 'api_key',
      },
      withCredentials: true, 
    };

    const response = await apiClient.request(options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
};
