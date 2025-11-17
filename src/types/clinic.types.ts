export interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
  specialties: string[];
}

export interface ClinicsResponse {
  success: boolean;
  clinics: Clinic[];
}