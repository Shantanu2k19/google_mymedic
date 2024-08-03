"use server"
import axios from 'axios';
import { SERVER_URL } from "@/constants"
import { connectWithDocRes } from "@/types/response"

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const connectWithDoc = async (): Promise<connectWithDocRes> => {
    //TODO
    return new Promise<connectWithDocRes>((resolve) => {
        setTimeout(() => {
            resolve({ success: false });
        }, 2000);
    });
};
