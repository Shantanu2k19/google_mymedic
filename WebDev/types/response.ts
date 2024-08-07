import { User_info } from "@/types/user"
import { Prescription } from "@/types/medicine";
import { ExtraInfoProps } from "@/types/medicine";

export interface ErrorResponse {
    error: string;
}

export interface Response {
    code: number;
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

export interface FetchVerifyList {
    success: boolean,
    data?: string,
    message?: string
}

export interface VerifyListData {
    prescriptions: Prescription[];
    extra_info: ExtraInfoProps;
    image_url: string,
    upload_date: string;
    file_name: string;
    verification: number;
    verification_date: string;
    verification_comment: string;
}