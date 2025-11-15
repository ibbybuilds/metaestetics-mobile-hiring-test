import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterData } from '../../types';
import { mockApiService, storageService } from '@services/index';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await mockApiService.login(credentials);
      await storageService.saveToken(response.token);
      await storageService.saveUser(response.user);
      return response;
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
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
    } catch (error: unknown) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return rejectWithValue(errorMessage);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout',
  async () => {
    await mockApiService.logout();
    await storageService.removeToken();
    await storageService.removeUser();
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

