import { useQuery, UseQueryOptions, QueryKey } from '@tanstack/react-query';

/**
 * Generic data fetching hook using React Query.
 * @param queryKey Unique key for the query (array recommended for params)
 * @param queryFn Async function to fetch data
 * @param options Optional React Query options (staleTime, cacheTime, etc.)
 */
export function useDataResource<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options?: UseQueryOptions<T>
) {
  return useQuery<T>({
    queryKey,
    queryFn,
    ...options,
  });
}
