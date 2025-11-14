import { useCallback, useEffect, useRef, useState } from 'react';

type Fetcher<TData, TParams extends unknown[]> = (...params: TParams) => Promise<TData>;

interface UseDataFetcherOptions<TData, TParams extends unknown[]> {
  initialParams?: TParams;
  cacheKey?: string;
  enabled?: boolean;
  initialData?: TData;
}

export const useDataFetcher = <TData, TParams extends unknown[] = []>(
  fetcher: Fetcher<TData, TParams>,
  options?: UseDataFetcherOptions<TData, TParams>
) => {
  const cacheRef = useRef<Record<string, TData>>({});
  const [data, setData] = useState<TData | undefined>(options?.initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buildCacheKey = (params: TParams) => {
    if (!options?.cacheKey) {
      return undefined;
    }
    return `${options.cacheKey}:${JSON.stringify(params ?? [])}`;
  };

  const fetchData = useCallback(
    async (params?: TParams): Promise<TData> => {
      const resolvedParams =
        params ?? options?.initialParams ?? ([] as unknown as TParams);
      const cacheKey = buildCacheKey(resolvedParams);

      if (cacheKey && cacheRef.current[cacheKey]) {
        setData(cacheRef.current[cacheKey]);
        return cacheRef.current[cacheKey];
      }

      setLoading(true);
      try {
        const response = await fetcher(...resolvedParams);

        if (cacheKey) {
          cacheRef.current[cacheKey] = response;
        }

        setData(response);
        setError(null);
        return response;
      } catch (err: any) {
        const message = err?.message ?? 'Something went wrong';
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetcher, options?.cacheKey, options?.initialParams]
  );

  useEffect(() => {
    if (options?.enabled === false) {
      return;
    }

    if (options?.initialParams) {
      fetchData(options.initialParams);
    } else {
      fetchData();
    }
  }, [fetchData, options?.enabled]);

  const refetch = useCallback(
    (params?: TParams) => {
      return fetchData(params);
    },
    [fetchData]
  );

  const clearCache = useCallback(() => {
    cacheRef.current = {};
  }, []);

  return {
    data,
    loading,
    error,
    refetch,
    clearCache,
  };
};
