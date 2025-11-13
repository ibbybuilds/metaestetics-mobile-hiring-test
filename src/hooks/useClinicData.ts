import { useData } from './useData';
import { db } from '@services';
import { Clinic } from '@types';

/**
 * Hook for fetching and searching clinics data
 * Handles loading states, errors, caching, and debounced search
 * 
 * @param searchQuery - Optional search query for filtering clinics
 * @returns Object with clinics data, loading state, error state, and refetch function
 */
export const useClinicData = (searchQuery?: string) => {
  return useData<Clinic[]>(
    (query) => query?.trim() ? db.clinics.search(query) : db.clinics.getAll(),
    {
      cacheKey: 'clinics',
      searchQuery: searchQuery || '',
      searchDebounceMs: 150,
      refetchOnMount: true,
    }
  );
};