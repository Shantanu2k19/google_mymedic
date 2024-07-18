export type Prescription = {
  name: string;
  use: string;
  dosage: string;
  sideeffects: string;
  working: string;
}

export type PrescriptionsData = {
  prescriptions: Prescription[];
  extra_info: ExtraInfoProps;
  image_url: string,
  upload_date: string;
  verification: number;
  verification_doc_name: string;
  verification_date: string;
  verification_comment: string;
}

export interface ExtraInfoProps {
  extraInfo: { [key: string]: string | number };
}