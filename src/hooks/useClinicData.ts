import { useDataFetch } from './useDataFetch';
import { mockApiService } from '@services';
import { Clinic } from '@types';

export const useClinicData = () => {
  const { data, loading, error, refetch } = useDataFetch<{
    success: boolean;
    clinics: Clinic[];
  }>(
    async () => {
      const response = await mockApiService.getClinics();
      return response;
    },
    {
      cacheKey: 'clinics',
    }
  );

  // Extract clinics from response
  const clinics = data?.clinics || null;

  return {
    data: clinics,
    loading,
    error,
    refetch,
  };
};
