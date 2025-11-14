import { useFetch } from './useFetch';
import { ClinicData } from '@types';
import { mockApiService } from '@services';

export const useClinicData = () => {
  const { data, loading, error, refetch } = useFetch<
    { success: boolean; clinics: ClinicData[] },
    ClinicData[]
  >(mockApiService.getClinics, [], (response) => response.clinics, {
    cacheKey: 'clinics',
    cacheExpiry: 5 * 60 * 1000,
  });
  return { clinics: data, loading, error, refetch };
};
