import { useState, useEffect, useCallback, useRef } from 'react';
import { mockApiService, storageService } from '@services';
import { useDebounce } from './useDebounce';

interface DataState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseDataOptions {
  // Caching
  cacheKey?: string;
  cacheTTL?: number; // milliseconds
  
  // Search/filtering
  searchQuery?: string;
  searchDebounceMs?: number;
  
  // Behavior
  enabled?: boolean;
  refetchOnMount?: boolean;
  
  // Dependencies
  deps?: unknown[];
}

// Cache management (simple in-memory cache)
const cache = new Map<string, { data: any; timestamp: number }>();

/**
 * Generic data fetching hook with caching, debouncing, and error handling
 * Accepts any async function and manages loading states automatically
 * 
 * @param fetcher - Function that returns data (with optional search query)
 * @param options - Configuration options for caching, debouncing, etc.
 * @returns Object with data, loading state, error state, and utility functions
 * 
 * @example
 * // Fetch clinics
 * const { data: clinics, loading, error, refetch } = useData(
 *   (query) => query ? mockApiService.searchClinics(query) : mockApiService.getClinics()
 * );
 * 
 * // Fetch user profile
 * const { data: user } = useData(() => storageService.getUser().then(user => ({ success: true, user })));
 * 
 * // Fetch any data with search
 * const { data } = useData(
 *   (query) => mockApiService.searchData(query),
 *   { searchQuery: 'dental' }
 * );
 */
export const useData = <T = any>(
  fetcher: (searchQuery?: string) => Promise<{ success: boolean; [key: string]: any }>,
  options: UseDataOptions = {}
): DataState<T> & {
  refetch: () => Promise<void>;
  updateData: (newData: T) => void;
  clearCache: () => void;
} => {
  const {
    cacheKey = 'default',
    cacheTTL = 5 * 60 * 1000, // 5 minutes default
    searchQuery = '',
    searchDebounceMs = 300,
    enabled = true,
    refetchOnMount = true,
    deps = [],
  } = options;

  const [state, setState] = useState<DataState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const debouncedSearchQuery = useDebounce(searchQuery, searchDebounceMs);
  
  // Track if component is mounted
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Cache management
  const getCachedData = useCallback((key: string): T | null => {
    const cached = cache.get(key);
    if (!cached) return null;
    
    const isExpired = Date.now() - cached.timestamp > cacheTTL;
    if (isExpired) {
      cache.delete(key);
      return null;
    }
    
    return cached.data;
  }, [cacheTTL]);

  const setCachedData = useCallback((key: string, data: T) => {
    cache.set(key, { data, timestamp: Date.now() });
  }, []);


  const fetchData = useCallback(async (query?: string): Promise<void> => {
    if (!enabled || !isMountedRef.current) return;

    const effectiveCacheKey = query ? `${cacheKey}-search-${query}` : cacheKey;
    
    // Check cache first
    const cachedData = getCachedData(effectiveCacheKey);
    if (cachedData) {
      setState(prev => ({ ...prev, data: cachedData, error: null }));
      return;
    }
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      // Call the provided fetcher function with optional search query
      const response = await fetcher(query);

      if (!isMountedRef.current) return;

      if (response.success) {
        // Extract data from response (flexible for different API formats)
        const dataKey = Object.keys(response).find(key => key !== 'success');
        const data = dataKey ? response[dataKey] : response;
        
        setState({
          data,
          loading: false,
          error: null,
        });

        // Cache the result
        setCachedData(effectiveCacheKey, data);
      } else {
        throw new Error('API request failed');
      }
    } catch (error) {
      if (!isMountedRef.current) return;
      
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, [fetcher, enabled, cacheKey, getCachedData, setCachedData]);

  // Refetch function
  const refetch = useCallback(async () => {
    // Clear cache to force fresh data
    const effectiveKey = debouncedSearchQuery ? `${cacheKey}-search-${debouncedSearchQuery}` : cacheKey;
    cache.delete(effectiveKey);
    await fetchData(debouncedSearchQuery);
  }, [fetchData, debouncedSearchQuery, cacheKey]);

  // Update data function (for optimistic updates)
  const updateData = useCallback((newData: T) => {
    setState(prev => ({ ...prev, data: newData }));
    
    // Update cache as well
    const effectiveKey = debouncedSearchQuery ? `${cacheKey}-search-${debouncedSearchQuery}` : cacheKey;
    setCachedData(effectiveKey, newData);
  }, [cacheKey, debouncedSearchQuery, setCachedData]);

  // Clear cache function
  const clearCache = useCallback(() => {
    cache.delete(cacheKey);
    // Also clear search caches
    Array.from(cache.keys())
      .filter(key => key.startsWith(`${cacheKey}-search-`))
      .forEach(key => cache.delete(key));
  }, [cacheKey]);

  // Effect for initial fetch and dependency changes
  useEffect(() => {
    if (refetchOnMount) {
      fetchData(debouncedSearchQuery);
    }
  }, [refetchOnMount, debouncedSearchQuery, ...deps]);

  return {
    ...state,
    refetch,
    updateData,
    clearCache,
  };
};

// Export the main hook
export default useData;