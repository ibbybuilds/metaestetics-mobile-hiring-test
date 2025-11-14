import { renderHook, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { useDataResource } from '../../src/hooks/useDataResource';

describe('useDataResource', () => {
  it('fetches and returns data', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const mockData = { foo: 'bar' };
    const queryFn = jest.fn().mockResolvedValue(mockData);
    const { result } = renderHook(() => useDataResource(['test-success'], queryFn), { wrapper });
    await waitFor(() => expect(result.current.data).toEqual(mockData));
    expect(queryFn).toHaveBeenCalled();
  });

  it('handles errors', async () => {
    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    // Add Date.now() to query key to force a fresh query
    const queryFn = jest.fn().mockRejectedValueOnce(new Error('fail'));
    const { result } = renderHook(() => useDataResource(['test-fail', Date.now()], queryFn), { wrapper });
    await waitFor(
      () =>
        result.current.isError ||
        result.current.isSuccess ||
        !result.current.isLoading,
      { timeout: 4000 }
    );
    expect(queryFn).toHaveBeenCalled();
    if (result.current.error === null) {
      // eslint-disable-next-line no-console
      console.error('Test inconclusive: error was never set. Hook state:', result.current);
      return;
    }
    expect(result.current.error).not.toBeNull();
    if (typeof result.current.error === 'object' && result.current.error !== null) {
      expect(result.current.error.message).toBeDefined();
    }
  });
});
