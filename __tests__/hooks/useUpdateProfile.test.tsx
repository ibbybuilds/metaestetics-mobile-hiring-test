import React from 'react';
import { renderHook, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUpdateProfile } from '@hooks/useUpdateProfile';
import { mockApiService } from '@services/mock-api.service';
import { storageService } from '@services/storage.service';

jest.mock('@services/mock-api.service');
jest.mock('@services/storage.service');

const createWrapper = () => {
  const queryClient = new QueryClient();
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Wrapper;
};

describe('useUpdateProfile', () => {
  const user = {
    id: '1',
    email: 'test@example.com',
    firstName: 'Jane',
    lastName: 'Doe',
    phoneNumber: '1234567890',
    countryCode: 'US',
    dateOfBirth: '1990-01-01',
    gender: 'female' as const,
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  };

  it('calls mockApiService and storageService and returns updated user', async () => {
    (mockApiService.updateProfile as jest.Mock).mockResolvedValueOnce({ success: true });
    (storageService.saveUser as jest.Mock).mockResolvedValueOnce(user);
    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });
    await act(async () => {
      await result.current.mutateAsync(user);
    });
    expect(mockApiService.updateProfile).toHaveBeenCalledWith(user.id, user);
    expect(storageService.saveUser).toHaveBeenCalledWith(user);
  });

  it('optimistically updates and rolls back on error', async () => {
    (mockApiService.updateProfile as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    (storageService.saveUser as jest.Mock).mockResolvedValueOnce(user);
    const { result } = renderHook(() => useUpdateProfile(), { wrapper: createWrapper() });
    await expect(result.current.mutateAsync(user)).rejects.toThrow('fail');
  });
});
