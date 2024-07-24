"use server"
import axios from 'axios';
import { SERVER_URL } from "@/constants"
import { FetchUserHistory } from "@/types/response"

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchHistory = async (usrEmail: string): Promise<FetchUserHistory> => {
  console.log("fetchHistory with usrEmail:",usrEmail)

  try {
    const options = {
      method: 'GET',
      url: '/get_history',
      headers: {
        'X-USEREMAIL': usrEmail,
        'X-APIKEY': process.env.API_KEY,
      },
      withCredentials: true, 
    };

    const response = await apiClient.request(options);

    if(response.status === 200){
      return { success: true, data:response.data.ret };
    }

    if(response.status === 203){
      return { success: true,  message: "Unable to fetch history!", data:"" };
    }

    console.log(response);
    return { success: false, message: "Unable to fetch history!" };
  } catch (error: any) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
    } else if (error.request) {
      console.error('Error message:', error.message);
    }
    return { success: false, message: "Unable to fetch history!" };
  }
};
