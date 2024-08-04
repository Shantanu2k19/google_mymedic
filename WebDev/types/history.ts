import { PrescriptionsData, Prescription,ExtraInfoProps } from "@/types/medicine";

export type history = {
    id: number;
    image: string;
    desc: string;
  };
  
export interface MedData {
  prescriptions: Prescription[];
  extra_info: ExtraInfoProps;
}

export interface DataFromLLM {
  medData: MedData;
}

export interface ApiResponse {
  data_from_llm: DataFromLLM;
  img_url: string;
  upload_date: string;
  verification: number;
  verification_doc_name: string;
  verification_date: string;
  verification_comment: string;
}

export interface ApiResponseVerifyList {
  data_from_llm: DataFromLLM;
  img_url: string;
  upload_date: string;
  file_name: string;
}
