import { useState, useEffect, useCallback, useRef } from 'react';

// Module-level cache to share data across component instances
const cache = new Map<string, { data: any; timestamp: number }>();

export interface UseDataFetchOptions<T> {
  enabled?: boolean;
  cacheKey?: string;
  dependencies?: any[];
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseDataFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useDataFetch<T>(
  fetchFn: () => Promise<T>,
  options: UseDataFetchOptions<T> = {}
): UseDataFetchResult<T> {
  const {
    enabled = true,
    cacheKey,
    dependencies = [],
    onSuccess,
    onError,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Track if we're currently fetching to prevent concurrent requests
  const isFetchingRef = useRef<boolean>(false);
  // Track if component has mounted to prevent stale updates
  const isMountedRef = useRef<boolean>(true);
  // Store callbacks in refs to avoid recreating fetchData
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);
  const fetchFnRef = useRef(fetchFn);

  // Update refs when callbacks change
  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
    fetchFnRef.current = fetchFn;
  }, [onSuccess, onError, fetchFn]);

  // Generate cache key if not provided
  const effectiveCacheKey = cacheKey || `useDataFetch-${fetchFn.toString()}`;

  const fetchData = useCallback(
    async (skipCache = false) => {
      // Prevent concurrent fetches
      if (isFetchingRef.current) {
        return;
      }

      // Check cache first (unless skipCache is true)
      if (!skipCache && cache.has(effectiveCacheKey)) {
        const cached = cache.get(effectiveCacheKey)!;
        if (isMountedRef.current) {
          setData(cached.data);
          setLoading(false);
          setError(null);
        }
        return;
      }

      isFetchingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const result = await fetchFnRef.current();

        // Only update state if component is still mounted
        if (isMountedRef.current) {
          setData(result);
          setLoading(false);
          setError(null);

          // Store in cache
          cache.set(effectiveCacheKey, {
            data: result,
            timestamp: Date.now(),
          });

          // Call success callback
          if (onSuccessRef.current) {
            onSuccessRef.current(result);
          }
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          const errorMessage = err?.message || 'Failed to fetch data';
          setError(errorMessage);
          setLoading(false);

          // Call error callback
          if (onErrorRef.current) {
            onErrorRef.current(
              err instanceof Error ? err : new Error(errorMessage)
            );
          }
        }
      } finally {
        isFetchingRef.current = false;
      }
    },
    [effectiveCacheKey]
  );

  // Refetch function (always skips cache)
  const refetch = useCallback(async () => {
    // Clear cache for this key before refetching
    if (cacheKey) {
      cache.delete(effectiveCacheKey);
    }
    await fetchData(true);
  }, [fetchData, cacheKey, effectiveCacheKey]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    isMountedRef.current = true;

    if (enabled) {
      fetchData();
    }

    // Cleanup on unmount
    return () => {
      isMountedRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, effectiveCacheKey, fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
