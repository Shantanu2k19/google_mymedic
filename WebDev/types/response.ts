import { User_info } from "@/types/user"
import { PrescriptionsData } from "@/types/medicine";

export interface ErrorResponse {
    error: string;
}

export interface FetchUserInfoResponse {
    success: boolean;
    data?: User_info;
    message?: string;
}

export interface FetchUserHistory{
    success: boolean;
    data?: string;
    message?: string;
}

export interface connectWithDocRes{
    success: boolean, 
    name?: string,
}
