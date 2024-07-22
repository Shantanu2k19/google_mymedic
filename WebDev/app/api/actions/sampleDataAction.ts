"use server"
import axios from 'axios';
import { SERVER_URL } from "@/constants"
import { PrescriptionsData } from "@/types/medicine";
import { ErrorResponse } from "@/types/response"

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchSampleData = async  (): Promise<PrescriptionsData | ErrorResponse> => {
    console.log("fetching sample histoy data")

    if (process.env.API_KEY == null) 
    { 
      return { error: "API key not found" };
    }

    try{
        const options = {
            method: 'GET',
            url: '/sampleData',
            headers: {
              'X-username': 'demo_user',
              'X-APIKEY': process.env.API_KEY,
            },
            withCredentials: true, 
          };
      
          const response = await apiClient.request(options);
          
          const samp_data: PrescriptionsData = {
            prescriptions: response.data.ret.data.medData,
            extra_info: response.data.ret.data.extraInfo,
            image_url: response.data.ret.file_url,
            upload_date: response.data.ret.upload_date,
            verification: response.data.ret.verification,
            verification_doc_name: response.data.ret.verification_doc_name,
            verification_date: response.data.ret.verification_date,
            verification_comment: response.data.ret.verification_comment,
        };

        return samp_data;

    }catch (error: any) {
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        } else if (error.request) {
          console.error('Error request data:', error.request);
        } 
        console.error('Error message:', error.message);
        return { error: "API failed!!" };
    }
}