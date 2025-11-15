import { mockApiService } from '../../src/services/mock-api.service';
import { storageService } from '../../src/services/storage.service';
import { MOCK_USERS } from '../../src/utils/constants';

jest.mock('../../src/services/storage.service');

const mockStorage = storageService as jest.Mocked<typeof storageService>;

describe('mockApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('logs in with a mock user', async () => {
    const user = MOCK_USERS[0];
    const result = await mockApiService.login({ email: user.email, password: user.password });
    expect(result.success).toBe(true);
    expect(result.user.email).toBe(user.email);
    expect(result.token).toContain('mock-token-');
  });

  it('logs in with a registered user from storage', async () => {
    mockStorage.findRegisteredUser.mockResolvedValueOnce({
      id: '2',
      email: 'test2@example.com',
      firstName: 'Test',
      lastName: 'User',
      phoneNumber: '123',
      countryCode: '+1',
      dateOfBirth: '2000-01-01',
      gender: 'male',
      createdAt: '',
      updatedAt: '',
    });
    const result = await mockApiService.login({ email: 'test2@example.com', password: 'pass' });
    expect(result.success).toBe(true);
    expect(result.user.email).toBe('test2@example.com');
  });

  it('fails login with invalid credentials', async () => {
    mockStorage.findRegisteredUser.mockResolvedValueOnce(null);
    await expect(
      mockApiService.login({ email: 'wrong@example.com', password: 'wrong' })
    ).rejects.toThrow('Invalid email or password');
  });

  it('registers a new user', async () => {
    mockStorage.checkEmailExists.mockResolvedValueOnce(false);
    mockStorage.saveRegisteredUser.mockResolvedValueOnce();
    const data = {
      email: 'new@example.com',
      password: 'pass',
      confirmPassword: 'pass',
      firstName: 'New',
      lastName: 'User',
      phone: '123',
      phoneNumber: '123',
      countryCode: '+1',
      dateOfBirth: '2000-01-01',
      gender: 'male' as const,
      profileImage: undefined,
    };
    const result = await mockApiService.register(data);
    expect(result.success).toBe(true);
    expect(result.user.email).toBe('new@example.com');
    expect(mockStorage.saveRegisteredUser).toHaveBeenCalled();
  });

  it('fails to register if email exists in mock users', async () => {
    const data = {
      email: MOCK_USERS[0].email,
      password: 'pass',
      confirmPassword: 'pass',
      firstName: MOCK_USERS[0].firstName,
      lastName: MOCK_USERS[0].lastName,
      phone: '123',
      phoneNumber: '123',
      countryCode: '+1',
      dateOfBirth: '2000-01-01',
      gender: 'male' as const,
      profileImage: undefined,
    };
    await expect(
      mockApiService.register(data)
    ).rejects.toThrow('Email already exists');
  });

  it('fails to register if email exists in storage', async () => {
    mockStorage.checkEmailExists.mockResolvedValueOnce(true);
    const data = {
      email: 'exists@example.com',
      password: 'pass',
      confirmPassword: 'pass',
      firstName: 'E',
      lastName: 'Xists',
      phone: '123',
      phoneNumber: '123',
      countryCode: '+1',
      dateOfBirth: '2000-01-01',
      gender: 'male' as const,
      profileImage: undefined,
    };
    await expect(
      mockApiService.register(data)
    ).rejects.toThrow('Email already exists');
  });

  it('updates a user profile', async () => {
    mockStorage.getUser.mockResolvedValueOnce({
      id: '1',
      email: 'a@b.com',
      firstName: 'A',
      lastName: 'B',
      phoneNumber: '123',
      countryCode: '+1',
      dateOfBirth: '2000-01-01',
      gender: 'male',
      createdAt: '',
      updatedAt: '',
    });
    mockStorage.saveUser.mockResolvedValueOnce();
    mockStorage.getRegisteredUsers.mockResolvedValueOnce([
      {
        email: 'a@b.com',
        password: 'pass',
        user: {
          id: '1',
          email: 'a@b.com',
          firstName: 'A',
          lastName: 'B',
          phoneNumber: '123',
          countryCode: '+1',
          dateOfBirth: '2000-01-01',
          gender: 'male',
          createdAt: '',
          updatedAt: '',
        },
      },
    ]);
    mockStorage.saveRegisteredUser.mockResolvedValueOnce();
    const result = await mockApiService.updateProfile('1', { firstName: 'Updated' });
    expect(result.success).toBe(true);
    expect(result.user.firstName).toBe('Updated');
  });

  it('fails to update if user not found', async () => {
    mockStorage.getUser.mockResolvedValueOnce(null);
    await expect(mockApiService.updateProfile('nope', { firstName: 'X' })).rejects.toThrow('User not found');
  });

  it('logs out', async () => {
    const result = await mockApiService.logout();
    expect(result.success).toBe(true);
  });

  it('gets clinics', async () => {
    const result = await mockApiService.getClinics();
    expect(result.success).toBe(true);
    expect(Array.isArray(result.clinics)).toBe(true);
    expect(result.clinics.length).toBe(100);
  });

  it('searches clinics', async () => {
    const result = await mockApiService.searchClinics('Clinic 1');
    expect(result.success).toBe(true);
    expect(result.clinics.some(c => c.name.includes('Clinic 1'))).toBe(true);
  });
});
