import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  headers: {
    'Content-Type': 'application/json',
    'APIKEY': 'api_key',
  },
});

export const fetchHistory = (username:string) => {
    console.log('username',username)
  return apiClient.get('/get_history', {
    headers: {
      'username': username,
    },
  });
};