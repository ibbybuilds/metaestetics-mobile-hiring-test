import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@types';
import { AuthState } from './types';
import { loginThunk, registerThunk, logoutThunk, checkAuthThunk, saveRegistrationForm, loadRegistrationForm, clearRegistrationForm } from './authThunks';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  // new defaults
  registrationForm: null,
  registrationStep: 1,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
      state.registrationForm = null;
      state.registrationStep = 1;
    });

    // Logout
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    });

    // Check auth
    builder.addCase(checkAuthThunk.fulfilled, (state, action) => {
      if (action.payload) {
        state.user = action.payload;
        state.isAuthenticated = true;
      }
    });

    // Save/load/clear registration form
    builder.addCase(saveRegistrationForm.fulfilled, (state, action) => {
      state.registrationForm = action.payload.formData;
      state.registrationStep = action.payload.currentStep;
    });

    builder.addCase(loadRegistrationForm.fulfilled, (state, action) => {
      state.registrationForm = action.payload.formData;
      state.registrationStep = action.payload.currentStep;
    });

    builder.addCase(clearRegistrationForm.fulfilled, (state) => {
      state.registrationForm = null;
      state.registrationStep = 1;
    });
  },
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;

