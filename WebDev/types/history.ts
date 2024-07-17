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
}
