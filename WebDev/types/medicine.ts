export type Prescription = {
  name: string;
  use: string;
  dosage: string;
  sideeffects: string;
  working: string;
}

export type PrescriptionsData = {
  prescriptions: Prescription[];
}