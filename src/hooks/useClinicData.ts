import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { mockApiService } from '../services';

type TimeoutId = ReturnType<typeof setTimeout>;

interface CacheEntry<T> {
  data?: T;
  timestamp: number;
  timeoutId?: TimeoutId;
  promise?: Promise<T>;
}

const dataCache = new Map<string, CacheEntry<unknown>>();
const DEFAULT_STALE_TIME = 60 * 1000; // 1 minute
const DEFAULT_CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export interface UseDataFetcherOptions<T> {
  cacheKey: string;
  fetcher: () => Promise<T>;
  enabled?: boolean;
  autoFetch?: boolean;
  staleTime?: number;
  cacheTime?: number;
}

export interface UseDataFetcherResult<T> {
  data: T | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: string | null;
  refetch: () => Promise<T | undefined>;
  invalidate: () => void;
}

const setCacheEntry = <T,>(
  key: string,
  data: T,
  cacheTime: number
) => {
  const existing = dataCache.get(key) as CacheEntry<T> | undefined;
  if (existing?.timeoutId) {
    clearTimeout(existing.timeoutId);
  }

  const timeoutId = setTimeout(() => {
    dataCache.delete(key);
  }, cacheTime);

  dataCache.set(key, {
    data,
    timestamp: Date.now(),
    timeoutId,
  });
};

export const useDataFetcher = <T,>(
  options: UseDataFetcherOptions<T>
): UseDataFetcherResult<T> => {
  const {
    cacheKey,
    fetcher,
    enabled = true,
    autoFetch = true,
    staleTime = DEFAULT_STALE_TIME,
    cacheTime = DEFAULT_CACHE_TIME,
  } = options;

  const cachedEntry = useMemo(() => {
    const entry = dataCache.get(cacheKey) as CacheEntry<T> | undefined;
    return entry ?? null;
  }, [cacheKey]);

  const [data, setData] = useState<T | undefined>(() => cachedEntry?.data);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(
    autoFetch && enabled && !cachedEntry
  );
  const [isFetching, setIsFetching] = useState(false);

  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const executeFetch = useCallback(
    async (force = false): Promise<T | undefined> => {
      if (!enabled) {
        return data;
      }

      const entry = dataCache.get(cacheKey) as CacheEntry<T> | undefined;
      const now = Date.now();

      if (!force && entry) {
        const age = now - entry.timestamp;
        const isFresh = age <= staleTime;
        if (isFresh && entry.data !== undefined) {
          setData(entry.data);
          setError(null);
          setIsLoading(false);
          setIsFetching(false);
          return entry.data;
        }

        if (entry.promise) {
          setIsFetching(true);
          try {
            const result = await entry.promise;
            if (mountedRef.current) {
              setData(result);
              setError(null);
              setIsLoading(false);
              setIsFetching(false);
            }
            return result;
          } catch (promiseError: any) {
            if (mountedRef.current) {
              setError(promiseError?.message ?? 'Something went wrong');
              setIsLoading(false);
              setIsFetching(false);
            }
            return undefined;
          }
        }

        // Use cached data while fetching a fresh copy
        if (entry.data !== undefined) {
          setData(entry.data);
        }
      }

      setIsFetching(true);
      if (!entry?.data) {
        setIsLoading(true);
      }

      const fetchPromise = fetcher()
        .then((result) => {
          if (mountedRef.current) {
            setCacheEntry(cacheKey, result, cacheTime);
            setData(result);
            setError(null);
          }
          return result;
        })
        .catch((fetchError: any) => {
          if (mountedRef.current) {
            setError(fetchError?.message ?? 'Something went wrong');
          }
          // Remove failed entry
          dataCache.delete(cacheKey);
          throw fetchError;
        })
        .finally(() => {
          if (mountedRef.current) {
            setIsLoading(false);
            setIsFetching(false);
          }
        });

      const previousData = entry?.data ?? data;
      const cachePayload: CacheEntry<T> = {
        data: previousData,
        timestamp: now,
        promise: fetchPromise,
        timeoutId: entry?.timeoutId,
      };

      dataCache.set(cacheKey, cachePayload);

      try {
        const result = await fetchPromise;
        return result;
      } catch {
        return undefined;
      }
    },
    [cacheKey, cacheTime, data, enabled, fetcher, staleTime]
  );

  useEffect(() => {
    if (!autoFetch || !enabled) {
      return;
    }

    const entry = dataCache.get(cacheKey) as CacheEntry<T> | undefined;
    const now = Date.now();

    if (entry && now - entry.timestamp <= staleTime) {
      setData(entry.data);
      setIsLoading(false);
      return;
    }

    executeFetch();
  }, [autoFetch, cacheKey, enabled, executeFetch, staleTime]);

  const refetch = useCallback(() => executeFetch(true), [executeFetch]);

  const invalidate = useCallback(() => {
    const entry = dataCache.get(cacheKey) as CacheEntry<T> | undefined;
    if (entry?.timeoutId) {
      clearTimeout(entry.timeoutId);
    }
    dataCache.delete(cacheKey);
  }, [cacheKey]);

  return {
    data,
    isLoading,
    isFetching,
    error,
    refetch,
    invalidate,
  };
};

export const useClinicData = () =>
  useDataFetcher({
    cacheKey: 'clinics',
    fetcher: async () => {
      const response = await mockApiService.getClinics();
      if (!response.success) {
        throw new Error('Failed to load clinics');
      }
      return response.clinics;
    },
  });

