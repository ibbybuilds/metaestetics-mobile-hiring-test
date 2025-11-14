import { User } from './user.types';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  countryIso?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  profileImage?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  token: string;
}

export interface RegisterResponse {
  success: boolean;
  user: User;
  token: string;
}
