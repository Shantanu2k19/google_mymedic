import { User_info } from "@/types/user"

export interface ErrorResponse {
    error: string;
}

export interface FetchUserInfoResponse {
    success: boolean;
    data?: User_info;
    message?: string;
  }