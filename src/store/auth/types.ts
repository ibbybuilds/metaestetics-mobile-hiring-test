import { User } from '@types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  isUpdatingProfile: boolean;
  profileError: string | null;
}
