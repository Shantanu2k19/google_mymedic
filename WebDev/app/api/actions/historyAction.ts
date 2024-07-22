"use server"
import axios from 'axios';
import { SERVER_URL } from "@/constants"

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHistory = async (username: string) => {
  console.log("fetchHistory with username:",username)
  try {
    const options = {
      method: 'GET',
      url: '/get_history',
      headers: {
        'X-username': username,
        'X-APIKEY': process.env.API_KEY,
      },
      withCredentials: true, 
    };

    const response = await apiClient.request(options);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      if(error.response.status === 405)
      {
        return null;
      }
    } else if (error.request) {
      console.error('Error request data:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
  }
};
