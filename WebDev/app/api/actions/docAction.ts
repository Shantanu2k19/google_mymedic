"use server"
import axios from 'axios';
import { SERVER_URL } from "@/constants"
import { Doc_info } from "@/types/user"
import { ErrorResponse } from "@/types/response"
import { FetchVerifyList } from "@/types/response"

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchDocInfo = async(email:string): Promise<Doc_info | ErrorResponse> => {
    console.log("fetching doc info for :", email)

    if (process.env.API_KEY == null) 
    { 
      return { error: "API key not found" };
    }

    try{
        const options = {
            method: 'GET',
            url: '/doc_info',
            headers: {
              'X-USEREMAIL': email,
              'X-APIKEY': process.env.API_KEY,
            },
            withCredentials: true, 
          };
      
          const response = await apiClient.request(options);

          if(response.status != 200){
            console.log(response.data)
            return { error: "API failed!!" };
          }

          console.log("success");
          
          const samp_data: Doc_info = {
            name: response.data.ret.name,
            qualification: response.data.ret.qualifaction,
          };
          console.log("samp:",samp_data)
        return samp_data;

    }catch (error: any) {
        if (error.response) {
            console.error('Error response data:', error.response.data.error);
        }
        return { error: "API failed!!" };
    }
};


export const fetchVerificationList = async (usrEmail: string): Promise<FetchVerifyList> => {
  console.log("verify list for :",usrEmail)

  try {
    const options = {
      method: 'GET',
      url: '/get_verify_list',
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
    
    return { success: false, message: "Unable to fetch history!" };
  } catch (error: any) {
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    return { success: false, message: "Unable to fetch history!" };
  }
};
