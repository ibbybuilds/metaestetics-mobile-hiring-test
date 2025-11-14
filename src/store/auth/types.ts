import { User } from '@types';
import { RegisterData } from '@types/auth.types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  registrationForm?: Partial<RegisterData> | null;
  registrationStep?: number;
}

