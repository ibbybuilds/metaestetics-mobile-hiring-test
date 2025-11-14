import authReducer, { setUser, clearError } from '../../../src/store/auth/authSlice';
import { loginThunk, registerThunk, logoutThunk, checkAuthThunk } from '../../../src/store/auth/authThunks';
import { User } from '../../../src/types/user.types';
import { AuthState } from '../../../src/store/auth/types';
import configureMockStore from 'redux-mock-store';
import type { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { mockApiService, storageService } from '../../../src/services/index';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const thunk = require('redux-thunk');
console.log('typeof thunk:', typeof thunk);
console.log('typeof thunk.default:', typeof thunk.default);
console.log('thunk keys:', Object.keys(thunk));
const middlewares = [thunk.thunk];
const mockStore = configureMockStore<State, ThunkDispatch<State, void, AnyAction>>(middlewares);

jest.mock('../../../src/services/index', () => ({
  mockApiService: {
    login: jest.fn(),
    register: jest.fn(),
    logout: jest.fn(),
  },
  storageService: {
    saveToken: jest.fn(),
    saveUser: jest.fn(),
    removeToken: jest.fn(),
    removeUser: jest.fn(),
    getToken: jest.fn(),
    getUser: jest.fn(),
  },
}));

type State = { auth: AuthState };

describe('authSlice', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };

  it('should handle setUser', () => {
    const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' } as User;
    const state = authReducer(initialState, setUser(user));
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle clearError', () => {
    const stateWithError = { ...initialState, error: 'Some error' };
    const state = authReducer(stateWithError, clearError());
    expect(state.error).toBeNull();
  });
});

describe('authThunks', () => {
  let store: ReturnType<typeof mockStore>;
  const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' } as User;
  beforeEach(() => {
    store = mockStore({ auth: { user: null, isAuthenticated: false, isLoading: false, error: null } });
    jest.clearAllMocks();
  });

  it('loginThunk success', async () => {
    (mockApiService.login as jest.Mock).mockResolvedValueOnce({ user, token: 'token', success: true });
    await store.dispatch(loginThunk({ email: 'a@b.com', password: 'pass' }));
    const actions = store.getActions();
    expect(actions[0].type).toBe(loginThunk.pending.type);
    expect(actions[1].type).toBe(loginThunk.fulfilled.type);
    expect(actions[1].payload.user).toEqual(user);
    expect(storageService.saveToken).toHaveBeenCalledWith('token');
    expect(storageService.saveUser).toHaveBeenCalledWith(user);
  });

  it('loginThunk failure', async () => {
    (mockApiService.login as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    await store.dispatch(loginThunk({ email: 'a@b.com', password: 'bad' }));
    const actions = store.getActions();
    expect(actions[0].type).toBe(loginThunk.pending.type);
    expect(actions[1].type).toBe(loginThunk.rejected.type);
    expect(actions[1].payload).toBe('fail');
  });

  it('registerThunk success', async () => {
    (mockApiService.register as jest.Mock).mockResolvedValueOnce({ user, token: 'token', success: true });
    const registerData = { email: 'a@b.com', password: 'pass', confirmPassword: 'pass', firstName: 'A', lastName: 'B', phone: '123', phoneNumber: '123', countryCode: '+1', dateOfBirth: '2000-01-01', gender: 'male' as const };
    await store.dispatch(registerThunk(registerData));
    const actions = store.getActions();
    expect(actions[0].type).toBe(registerThunk.pending.type);
    expect(actions[1].type).toBe(registerThunk.fulfilled.type);
    expect(actions[1].payload.user).toEqual(user);
    expect(storageService.saveToken).toHaveBeenCalledWith('token');
    expect(storageService.saveUser).toHaveBeenCalledWith(user);
  });

  it('registerThunk failure', async () => {
    (mockApiService.register as jest.Mock).mockRejectedValueOnce(new Error('fail'));
    const registerData = { email: 'a@b.com', password: 'pass', confirmPassword: 'pass', firstName: 'A', lastName: 'B', phone: '123', phoneNumber: '123', countryCode: '+1', dateOfBirth: '2000-01-01', gender: 'male' as const };
    await store.dispatch(registerThunk(registerData));
    const actions = store.getActions();
    expect(actions[0].type).toBe(registerThunk.pending.type);
    expect(actions[1].type).toBe(registerThunk.rejected.type);
    expect(actions[1].payload).toBe('fail');
  });

  it('logoutThunk success', async () => {
    (mockApiService.logout as jest.Mock).mockResolvedValueOnce({ success: true });
    await store.dispatch(logoutThunk());
    const actions = store.getActions();
    expect(actions[0].type).toBe(logoutThunk.pending.type);
    expect(actions[1].type).toBe(logoutThunk.fulfilled.type);
    expect(storageService.removeToken).toHaveBeenCalled();
    expect(storageService.removeUser).toHaveBeenCalled();
  });

  it('checkAuthThunk returns user if token exists', async () => {
    (storageService.getToken as jest.Mock).mockResolvedValueOnce('token');
    (storageService.getUser as jest.Mock).mockResolvedValueOnce(user);
    await store.dispatch(checkAuthThunk());
    const actions = store.getActions();
    expect(actions[0].type).toBe(checkAuthThunk.pending.type);
    expect(actions[1].type).toBe(checkAuthThunk.fulfilled.type);
    expect(actions[1].payload).toEqual(user);
  });

  it('checkAuthThunk returns null if no token', async () => {
    (storageService.getToken as jest.Mock).mockResolvedValueOnce(null);
    await store.dispatch(checkAuthThunk());
    const actions = store.getActions();
    expect(actions[0].type).toBe(checkAuthThunk.pending.type);
    expect(actions[1].type).toBe(checkAuthThunk.fulfilled.type);
    expect(actions[1].payload).toBeNull();
  });
});

describe('authSlice reducers and extraReducers', () => {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
  };
  const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B' } as User;

  it('handles loginThunk.pending', () => {
    const state = authReducer(initialState, { type: loginThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('handles loginThunk.fulfilled', () => {
    const state = authReducer(initialState, { type: loginThunk.fulfilled.type, payload: { user } });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
  });
  it('handles loginThunk.rejected', () => {
    const state = authReducer(initialState, { type: loginThunk.rejected.type, payload: 'fail' });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('fail');
  });
  it('handles registerThunk.pending', () => {
    const state = authReducer(initialState, { type: registerThunk.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });
  it('handles registerThunk.fulfilled', () => {
    const state = authReducer(initialState, { type: registerThunk.fulfilled.type, payload: { user } });
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.error).toBeNull();
  });
  it('handles registerThunk.rejected', () => {
    const state = authReducer(initialState, { type: registerThunk.rejected.type, payload: 'fail' });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('fail');
  });
  it('handles logoutThunk.fulfilled', () => {
    const loggedInState = { ...initialState, user, isAuthenticated: true };
    const state = authReducer(loggedInState, { type: logoutThunk.fulfilled.type });
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBeNull();
  });
  it('handles checkAuthThunk.fulfilled with user', () => {
    const state = authReducer(initialState, { type: checkAuthThunk.fulfilled.type, payload: user });
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });
  it('handles checkAuthThunk.fulfilled with null', () => {
    const state = authReducer(initialState, { type: checkAuthThunk.fulfilled.type, payload: null });
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
