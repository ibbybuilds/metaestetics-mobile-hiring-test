import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterData } from '@types';
import { mockApiService, storageService } from '@services';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await mockApiService.login(credentials);
      await storageService.saveToken(response.token);
      await storageService.saveUser(response.user);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerThunk = createAsyncThunk(
  'auth/register',
  async (data: RegisterData, { rejectWithValue }) => {
    try {
      const response = await mockApiService.register(data);
      await storageService.saveToken(response.token);
      await storageService.saveUser(response.user);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    await mockApiService.logout();
    // fix: Remove only auth-related data so registered users persist
    await storageService.removeToken();
    await storageService.removeUser();
    // also clear persisted registration form on logout
    await storageService.clearRegistrationForm();
  }
);

export const checkAuthThunk = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const token = await storageService.getToken();
    if (token) {
      const user = await storageService.getUser();
      return user;
    }
    return null;
  }
);

export const saveRegistrationForm = createAsyncThunk(
  'auth/saveRegistrationForm',
  async (
    payload: { formData: Partial<RegisterData>; currentStep: number },
  ) => {
    const { formData, currentStep } = payload;
    await storageService.saveRegistrationForm(formData, currentStep);
    return { formData, currentStep };
  }
);

export const loadRegistrationForm = createAsyncThunk(
  'auth/loadRegistrationForm',
  async () => {
    return await storageService.loadRegistrationForm();
  }
);

export const clearRegistrationForm = createAsyncThunk(
  'auth/clearRegistrationForm',
  async () => {
    await storageService.clearRegistrationForm();
  }
);
