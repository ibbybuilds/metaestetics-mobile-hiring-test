import { useDataResource } from './useDataResource';

// Example fetcher for clinics (replace with real API if needed)
const fetchClinics = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return Array.from({ length: 100 }, (_, i) => ({
    id: `clinic-${i}`,
    name: `Clinic ${i + 1}`,
    address: `${i + 1} Main Street`,
    rating: Math.random() * 5,
  }));
};

export const useClinicData = () => {
  return useDataResource(['clinics'], fetchClinics);
};

