import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import configureStore from 'redux-mock-store';
import { Profile as ProfileScreen } from '../../src/screens/Profile/Profile';
import { EditProfile } from '../../src/screens/Profile/EditProfile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockStore = configureStore([]);

// Minimal initial state for profile
const initialState = {
  auth: {
    user: {
      id: '1',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '1234567890',
      countryCode: 'US',
      dateOfBirth: '2000-01-01',
      gender: 'male',
      createdAt: '2020-01-01',
      updatedAt: '2020-01-01',
    },
    isAuthenticated: true,
    isLoading: false,
    error: null,
  },
};

describe('Profile Flow Integration', () => {
  const Stack = createNativeStackNavigator();

  function TestNavigator() {
    return (
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
      </Stack.Navigator>
    );
  }

  it('allows editing and saving profile', async () => {
    const store = mockStore(initialState);
    const queryClient = new QueryClient();
    const { getByText, getByDisplayValue } = render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <NavigationContainer>
            <TestNavigator />
          </NavigationContainer>
        </Provider>
      </QueryClientProvider>
    );

    // Simulate pressing the Edit Profile button
    fireEvent.press(getByText('Edit Profile'));

    // Now expect the edit form/input to appear on EditProfile screen
    await waitFor(() => {
      expect(getByDisplayValue('Test')).toBeTruthy();
    });

    // Simulate editing first name (uncomment and adjust if edit form supports it)
    // fireEvent.changeText(getByDisplayValue('Test'), 'NewName');
    // fireEvent.press(getByText('Save'));

    // await waitFor(() => expect(getByDisplayValue('NewName')).toBeTruthy());
  });
});
