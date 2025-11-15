import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from '@screens/Auth/Login';

const mockStore = configureStore([thunk as any]);

describe('Login Screen', () => {
  it('renders and submits login form', async () => {
    const store = mockStore({ auth: { isLoading: false, error: null } });
    const { getByPlaceholderText, getByTestId } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>
    );
    fireEvent.changeText(getByPlaceholderText('Enter your email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Enter your password'), 'password123');
    fireEvent.press(getByTestId('login-button'));
    await waitFor(() => {
      const actions = store.getActions();
      expect(actions.some((a: any) => a.type.includes('auth/login'))).toBe(true);
    });
  });

  it('shows validation errors for empty fields', async () => {
    const store = mockStore({ auth: { isLoading: false, error: null } });
    const { getByTestId, findByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>
    );
    fireEvent.press(getByTestId('login-button'));
    expect(await findByText(/email is required/i)).toBeTruthy();
    expect(await findByText(/password is required/i)).toBeTruthy();
  });

  it('shows error for invalid credentials', async () => {
    const store = mockStore({ auth: { isLoading: false, error: 'Invalid email or password' } });
    const { getByText } = render(
      <Provider store={store}>
        <NavigationContainer>
          <Login />
        </NavigationContainer>
      </Provider>
    );
    expect(getByText(/invalid email or password/i)).toBeTruthy();
  });
});
