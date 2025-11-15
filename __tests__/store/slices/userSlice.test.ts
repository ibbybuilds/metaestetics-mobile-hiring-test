import userReducer, { setUser, clearError } from '../../../src/store/auth/authSlice';
import { AuthState } from '../../../src/store/auth/types';
import { User } from '../../../src/types/user.types';

describe('userSlice', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('should return the initial state', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user: User = {
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
    };
    const nextState = userReducer(initialState, setUser(user));
    expect(nextState.user).toEqual(user);
    expect(nextState.isAuthenticated).toBe(true);
  });

  it('should handle clearError', () => {
    const state: AuthState = { ...initialState, error: 'Some error' };
    const nextState = userReducer(state, clearError());
    expect(nextState.error).toBeNull();
  });
});
