import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react-native';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../src/store/auth/authSlice';
import { Profile } from '../../src/screens/Profile/Profile';
import { NavigationContainer } from '@react-navigation/native';


describe('Profile screen with preloaded Redux state', () => {
  it('renders user info from preloaded state', () => {
    const preloadedState = {
      auth: {
        user: {
          id: '1',
          email: 'persisted@example.com',
          firstName: 'Persisted',
          lastName: 'User',
          phoneNumber: '1234567890',
          countryCode: 'US',
          dateOfBirth: '2000-01-01',
          gender: 'male' as const,
          createdAt: '2020-01-01',
          updatedAt: '2020-01-01',
        },
        isAuthenticated: true,
        isLoading: false,
        error: null,
      },
    };
    const testStore = configureStore({ reducer: { auth: authReducer }, preloadedState });
    const { getByText } = render(
      <Provider store={testStore}>
        <NavigationContainer>
          <Profile />
        </NavigationContainer>
      </Provider>
    );
    expect(getByText(/persisted@example.com/i)).toBeTruthy();
    expect(getByText(/PersistedUser/i)).toBeTruthy();
  });
});
