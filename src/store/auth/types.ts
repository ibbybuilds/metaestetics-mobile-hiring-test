import { User, RegisterDataDraft } from '@types';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signupDraft: RegisterDataDraft | null;
}
