import { useState, useEffect, useCallback } from 'react';

interface UseFetchResult<Data> {
  data: Data | null;
  loading: boolean;
  error: unknown;
  refetch: () => void;
}
interface UseFetchOptions {
  cacheKey?: string;
  cacheExpiry?: number;
}
interface CacheEntry<Data> {
  data: Data;
  timestamp: number;
}

// In-memory cache
const cache = new Map<string, CacheEntry<unknown>>();

export function useFetch<APIResponse, Data = APIResponse>(
  apiFunction: (...args: any[]) => Promise<APIResponse>,
  params?: any,
  extractData?: (response: APIResponse) => Data,
  options?: UseFetchOptions
): UseFetchResult<Data> {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  const cacheKey = options?.cacheKey || apiFunction.name + JSON.stringify(params);
  const cacheExpiry = options?.cacheExpiry ?? 5 * 60 * 1000; // default 5 minutes

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiFunction(params);
      const result = extractData ? extractData(response) : (response as unknown as Data);

      setData(result);
      cache.set(cacheKey, { data: result, timestamp: Date.now() });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params, extractData, cacheKey]);

  // Runs on mount
  useEffect(() => {
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey) as CacheEntry<Data> | undefined;
      if (cached && Date.now() - cached.timestamp < cacheExpiry) {
        setData(cached.data);
        setLoading(false);
      } else {
        refetch();
      }
    } else {
      refetch();
    }
  }, []);

  return { data, loading, error, refetch };
}
