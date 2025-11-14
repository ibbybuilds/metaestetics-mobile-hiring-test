import { useState, useEffect, useCallback, useRef } from 'react';

interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
}

interface UseClinicDataReturn {
  data: Clinic[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  isStale: boolean;
}

const CACHE_KEY = 'clinics_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes cache duration

let cachedData: Clinic[] | null = null;
let cacheTimestamp = 0;

// Custom hook for fetching and caching clinic data.
export const useClinicData = (): UseClinicDataReturn => {
  const [data, setData] = useState<Clinic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isStale, setIsStale] = useState(false);
  const isMounted = useRef(true);

  const fetchClinics = useCallback(async () => {
    if (!isMounted.current) return;

    // Check if cache is still valid
    if (cachedData && Date.now() - cacheTimestamp < CACHE_DURATION) {
      setData(cachedData);
      setIsStale(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call with 1 second delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockClinics = Array.from({ length: 100 }, (_, i) => ({
        id: `clinic-${i}`,
        name: `Clinic ${i + 1}`,
        address: `${i + 1} Main Street`,
        rating: Math.random() * 5,
      }));

      if (!isMounted.current) return;

      setData(mockClinics);
      cachedData = mockClinics;
      cacheTimestamp = Date.now();
      setIsStale(false);
    } catch (err) {
      if (!isMounted.current) return;
      setError(err instanceof Error ? err.message : 'Failed to load clinics');
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    fetchClinics();

    return () => {
      isMounted.current = false;
    };
  }, [fetchClinics]);

  const refetch = useCallback(async () => {
    cachedData = null; // Invalidate cache
    cacheTimestamp = 0;
    setIsStale(false);
    await fetchClinics();
  }, [fetchClinics]);

  return { data, loading, error, refetch, isStale };
};

