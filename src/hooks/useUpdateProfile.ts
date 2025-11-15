import { useMutation, useQueryClient } from '@tanstack/react-query';
import { User } from '../types';
import { mockApiService } from '@services/mock-api.service';
import { storageService } from '@services/storage.service';

/**
 * Custom hook for updating user profile with optimistic updates and cache management.
 * Wraps mockApiService.updateProfile and storageService.saveUser.
 */
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedUser: User) => {
      await mockApiService.updateProfile(updatedUser.id, updatedUser);
      await storageService.saveUser(updatedUser);
      return updatedUser;
    },
    onMutate: async (newUser: User) => {
      await queryClient.cancelQueries({ queryKey: ['user'] });
      const previousUser = queryClient.getQueryData(['user']) as User | undefined;
      queryClient.setQueryData(['user'], newUser);
      return { previousUser };
    },
    onError: (err, newUser: User, context?: { previousUser?: User }) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}
