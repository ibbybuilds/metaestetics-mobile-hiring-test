import { useState, useEffect, useCallback } from 'react';

// In-memory cache to store fetched data.
// The key is the string representation of the fetch function, and the value is the fetched data.
const cache = new Map<string, any>();

/**
 * Options for the useDataFetching hook.
 * @property {any} initialData - Initial data to be used before fetching.
 * @property {boolean} skip - If true, the fetch function will not be called.
 * @property {any[]} dependencies - Dependencies that trigger a refetch.
 * @property {boolean} useCache - If true, the hook will use the in-memory cache.
 */
interface UseDataFetchingOptions {
  initialData?: any;
  skip?: boolean;
  dependencies?: any[];
  useCache?: boolean;
}

/**
 * A generic custom hook for fetching data, handling loading, error states, and caching.
 *
 * @param {() => Promise<T>} fetchFunction - An asynchronous function that fetches the data.
 * @param {UseDataFetchingOptions} [options] - Configuration options for the hook.
 * @returns {{data: T | undefined, isLoading: boolean, error: string | null, refetch: () => void}}
 *          An object containing the fetched data, loading state, error message, and a refetch function.
 */
const useClinicData = <T>(
  fetchFunction: () => Promise<T>,
  options?: UseDataFetchingOptions
) => {
  const { initialData, skip = false, dependencies = [], useCache = true } = options || {};
  // Generate a unique cache key based on the fetch function's string representation.
  const cacheKey = fetchFunction.toString();

  const [data, setData] = useState<T | undefined>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches data from the API, with optional caching.
   * If caching is enabled and data is found in the cache, it's returned immediately.
   * Otherwise, data is fetched, stored in cache (if enabled), and then returned.
   */
  const fetchData = useCallback(async () => {
    if (skip) {
      return;
    }

    // Check cache first if caching is enabled
    if (useCache && cache.has(cacheKey)) {
      setData(cache.get(cacheKey));
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchFunction();
      setData(result);
      // Store result in cache if caching is enabled
      if (useCache) {
        cache.set(cacheKey, result);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction, skip, useCache, cacheKey, ...dependencies]); // eslint-disable-line react-hooks/exhaustive-deps

  // Effect to trigger data fetching when dependencies change or on mount.
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  /**
   * Forces a refetch of the data, bypassing the cache.
   * Clears the existing cache entry for this fetch function before refetching.
   */
  const refetch = useCallback(() => {
    if (useCache) {
      cache.delete(cacheKey); // Invalidate cache for this key
    }
    fetchData();
  }, [fetchData, cacheKey, useCache]);

  return { data, isLoading, error, refetch };
};

export default useClinicData;
