"use server"
import axios from 'axios';
import { SERVER_URL } from "@/constants"
import { PrescriptionsData } from "@/types/medicine";
import { ErrorResponse } from "@/types/response"
import type { NextApiRequest, NextApiResponse } from 'next';
import FormData from 'form-data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const form = new FormData();
    form.append('file', req.body.file, { filename: 'file' });

    const response = await axios.post(`${SERVER_URL}/upload/`, form, {
      headers: {
        ...form.getHeaders(),
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': req.headers['x-csrf-token'] as string,
        'X-APIKEY': 'api_key',
        'X-username': req.headers['x-username'] as string,
      },
      withCredentials: true,
    });

    res.status(response.status).json(response.data);
  } catch (error:any) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}



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