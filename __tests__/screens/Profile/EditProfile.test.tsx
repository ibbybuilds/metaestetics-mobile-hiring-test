import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../src/store/auth/authSlice';
import { EditProfile } from '../../../src/screens/Profile/EditProfile';
import { NavigationContainer } from '@react-navigation/native';
import { mockApiService } from '../../../src/services/mock-api.service';
import { storageService } from '../../../src/services/storage.service';
import { AuthState } from '../../../src/store/auth/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Place this before EditProfile import for proper mocking
let mockGoBack: jest.Mock;
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  mockGoBack = jest.fn();
  return {
    ...actualNav,
    useNavigation: () => ({ goBack: mockGoBack }),
  };
});

jest.mock('../../../src/services/mock-api.service');
jest.mock('../../../src/services/storage.service');
jest.mock('react-native/Libraries/Alert/Alert', () => ({ alert: jest.fn() }));

const baseUser = {
  id: '1',
  email: 'profile@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  phoneNumber: '1234567890',
  countryCode: 'US',
  dateOfBirth: '1990-01-01',
  gender: 'female' as const,
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
};

const renderWithStore = (authState: AuthState) => {
  const store = configureStore({ reducer: { auth: authReducer }, preloadedState: { auth: authState } });
  const queryClient = new QueryClient();
  return {
    ...render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <EditProfile />
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    ),
    store,
  };
};

describe('EditProfile screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading spinner if no user', () => {
    const { getByTestId } = renderWithStore({ user: null, isAuthenticated: false, isLoading: false, error: null });
    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('submits profile update successfully', async () => {
    (mockApiService.updateProfile as jest.Mock).mockResolvedValueOnce({ success: true });
    (storageService.saveUser as jest.Mock).mockResolvedValueOnce(expect.any(Object));
    const { getByLabelText, getByText, store } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const nameInput = getByLabelText('First Name');
    fireEvent.changeText(nameInput, 'Janet');
    const saveBtn = getByText(/save/i);
    fireEvent.press(saveBtn);
    await waitFor(() => {
      const state = store.getState().auth;
      expect(state.user?.firstName).toBe('Janet');
      expect(mockApiService.updateProfile).toHaveBeenCalled();
      expect(storageService.saveUser).toHaveBeenCalled();
    });
  });

  it('shows error if updateProfile fails', async () => {
    (mockApiService.updateProfile as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    (storageService.saveUser as jest.Mock).mockResolvedValueOnce(expect.any(Object));
    const { getByLabelText, getByText, findByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const nameInput = getByLabelText('First Name');
    fireEvent.changeText(nameInput, 'Janet');
    const saveBtn = getByText(/save/i);
    fireEvent.press(saveBtn);
    expect(await findByText('fail')).toBeTruthy();
  });

  it('shows fallback error message if updateProfile throws a non-Error', async () => {
    (mockApiService.updateProfile as jest.Mock).mockRejectedValueOnce('some string error');
    (storageService.saveUser as jest.Mock).mockResolvedValueOnce(expect.any(Object));
    const { getByLabelText, getByText, findByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const nameInput = getByLabelText('First Name');
    fireEvent.changeText(nameInput, 'Janet');
    const saveBtn = getByText(/save/i);
    fireEvent.press(saveBtn);
    // STRINGS.profile.error is 'Failed to update profile'
    expect(await findByText('Failed to update profile')).toBeTruthy();
  });

  it('shows validation error if required fields are empty', async () => {
    const { getByLabelText, getByText, findByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const nameInput = getByLabelText('First Name');
    fireEvent.changeText(nameInput, ''); // Clear the first name
    const saveBtn = getByText(/save/i);
    fireEvent.press(saveBtn);
    // Expect a validation error message (adjust the text as per your actual error message)
    expect(await findByText(/first name is required/i)).toBeTruthy();
  });

  it('calls navigation.goBack when Cancel is pressed', () => {
    const { getByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const cancelBtn = getByText(/cancel/i);
    fireEvent.press(cancelBtn);
    expect(mockGoBack).toHaveBeenCalled();
  });

  it('renders Save button and it is enabled when form is valid', () => {
    const { getByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const saveBtn = getByText(/save/i);
    expect(saveBtn).toBeTruthy();
    expect(saveBtn.props.accessibilityState?.disabled).not.toBe(true);
  });
});
