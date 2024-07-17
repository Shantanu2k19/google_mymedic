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
}

export interface ExtraInfoProps {
  extraInfo: { [key: string]: string | number };
}