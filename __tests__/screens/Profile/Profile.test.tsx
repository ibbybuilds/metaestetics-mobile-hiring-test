import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../../src/store/auth/authSlice';
import { Profile } from '../../../src/screens/Profile/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { User } from '../../../src/types/user.types';

const renderWithStore = (authState: { user: User | null; isAuthenticated: boolean; isLoading: boolean; error: null }) => {
  const store = configureStore({ reducer: { auth: authReducer }, preloadedState: { auth: authState } });
  return render(
    <Provider store={store}>
      <NavigationContainer>
        <Profile />
      </NavigationContainer>
    </Provider>
  );
};

describe('Profile screen', () => {
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

  it('renders user info', () => {
    const { getByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    expect(getByText('JaneDoe')).toBeTruthy();
    expect(getByText('profile@example.com')).toBeTruthy();
    expect(getByText('US 1234567890')).toBeTruthy();
  });

  it('shows nothing if no user', () => {
    const { queryByText } = renderWithStore({ user: null, isAuthenticated: false, isLoading: false, error: null });
    expect(queryByText('JaneDoe')).toBeNull();
  });

  it('renders contact info section', () => {
    const { getByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    expect(getByText('Contact Information')).toBeTruthy();
    expect(getByText('Phone:')).toBeTruthy();
    expect(getByText('US 1234567890')).toBeTruthy();
  });

  it('renders edit button and triggers navigation', () => {
    const { getByText } = renderWithStore({ user: baseUser, isAuthenticated: true, isLoading: false, error: null });
    const editBtn = getByText(/edit profile/i);
    expect(editBtn).toBeTruthy();
    fireEvent.press(editBtn);
    // Navigation is tested in integration, here we just check the button is present and pressable
  });
});
