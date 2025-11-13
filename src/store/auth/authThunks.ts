import { createAsyncThunk } from '@reduxjs/toolkit';
import { LoginCredentials, RegisterData, RegisterDataDraft } from '@types';
import { mockApiService, storageService } from '@services';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await mockApiService.login(credentials);
      await storageService.saveToken(response.token);
      await storageService.saveUser(response.user);
      await storageService.removeSignupDraft();
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
      await storageService.removeSignupDraft();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const signupDraftThunk = createAsyncThunk(
  'auth/signupDraft',
  async (draft: RegisterDataDraft, { rejectWithValue }) => {
    try {
      await storageService.saveSignupDraft(draft);
      return draft;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkSignupDraftThunk = createAsyncThunk(
  'auth/checkSignupDraft',
  async (_, { rejectWithValue }) => {
    try {
      const draft = await storageService.getSignupDraft();
      return draft;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk('auth/logout', async () => {
  await mockApiService.logout();
  await storageService.clearAuth();
});

export const checkAuthThunk = createAsyncThunk('auth/checkAuth', async (_, { dispatch }) => {
  const token = await storageService.getToken();
  if (token) {
    const user = await storageService.getUser();
    return user;
  } else {
    dispatch(checkSignupDraftThunk());
  }
  return null;
});
