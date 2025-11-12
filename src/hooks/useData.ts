import { useState, useEffect, useCallback, useRef } from 'react';

export interface UseDataOptions {
  cacheKey?: string;
  cacheTime?: number;
  enabled?: boolean;
}

export interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();

export function useData<T>(
  fetchFn: () => Promise<T>,
  options: UseDataOptions = {}
): UseDataResult<T> {
  const {
    cacheKey,
    cacheTime = 5 * 60 * 1000,
    enabled = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isMountedRef = useRef(true);
  const fetchingRef = useRef(false);

  const fetchData = useCallback(async () => {
    if (fetchingRef.current) {
      return;
    }

    if (cacheKey) {
      const cached = cache.get(cacheKey) as CacheEntry<T> | undefined;
      if (cached) {
        const age = Date.now() - cached.timestamp;
        if (age < cacheTime) {
          setData(cached.data);
          setLoading(false);
          setError(null);
          return;
        } else {
          cache.delete(cacheKey);
        }
      }
    }

    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();

      if (isMountedRef.current) {
        setData(result);
        setError(null);

        if (cacheKey) {
          cache.set(cacheKey, {
            data: result,
            timestamp: Date.now(),
          });
        }
      }
    } catch (err) {
      if (isMountedRef.current) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMessage);
        setData(null);
      }
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
      fetchingRef.current = false;
    }
  }, [fetchFn, cacheKey, cacheTime]);

  const refetch = useCallback(async () => {
    if (cacheKey) {
      cache.delete(cacheKey);
    }
    await fetchData();
  }, [fetchData, cacheKey]);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, fetchData]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
