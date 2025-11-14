import { User, LoginCredentials, RegisterData, ClinicsResponse } from '@types';
import { MOCK_USERS } from '@utils/constants';
import { storageService } from './storage.service';

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate mock UUID
const generateId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export const mockApiService = {
  async login(credentials: LoginCredentials) {
    await delay(1000);

    // First check hardcoded mock users
    const mockUser = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (mockUser) {
      // Return user from mock data
      const user: User = {
        id: generateId(),
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        phoneNumber: '1234567890',
        countryCode: '+1',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        user,
        token: 'mock-token-' + generateId(),
      };
    }

    // Then check registered users from storage
    const registeredUser = await storageService.findRegisteredUser(
      credentials.email,
      credentials.password
    );

    if (registeredUser) {
      return {
        success: true,
        user: registeredUser,
        token: 'mock-token-' + generateId(),
      };
    }

    // No user found
    throw new Error('Invalid email or password');
  },

  async register(data: RegisterData) {
    await delay(1500);

    // Check if email exists in hardcoded mock users
    if (MOCK_USERS.some(u => u.email === data.email)) {
      throw new Error('Email already exists');
    }

    // Check if email exists in registered users
    const emailExists = await storageService.checkEmailExists(data.email);
    if (emailExists) {
      throw new Error('Email already exists');
    }

    // Create new user
    const user: User = {
      id: generateId(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      countryCode: data.countryCode,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      profileImage: data.profileImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store user credentials and data for future logins
    await storageService.saveRegisteredUser(data.email, data.password, user);

    return {
      success: true,
      user,
      token: 'mock-token-' + generateId(),
    };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    await delay(800);

    // Get current user from storage
    const currentUser = await storageService.getUser();
    if (!currentUser || currentUser.id !== userId) {
      throw new Error('User not found');
    }

    // Merge updates with current user data
    const updatedUser: User = {
      ...currentUser,
      ...updates,
      id: userId,
      updatedAt: new Date().toISOString(),
    };

    // Update stored user data
    await storageService.saveUser(updatedUser);

    // Also update in registered users if exists
    const registeredUsers = await storageService.getRegisteredUsers();
    const userIndex = registeredUsers.findIndex(u => u.user.id === userId);
    if (userIndex >= 0) {
      registeredUsers[userIndex].user = updatedUser;
      await storageService.saveRegisteredUser(
        registeredUsers[userIndex].email,
        registeredUsers[userIndex].password,
        updatedUser
      );
    }

    return {
      success: true,
      user: updatedUser,
    };
  },

  async logout() {
    await delay(500);
    return { success: true };
  },

  async getClinics(): Promise<ClinicsResponse> {
    await delay(1000); // Simulate slow API

    const clinics = Array.from({ length: 100 }, (_, i) => ({
      id: `clinic-${i}`,
      name: `Clinic ${i + 1}`,
      address: `${i + 1} Main Street, City`,
      rating: Math.random() * 5,
      specialties: ['Dermatology', 'Aesthetics'],
    }));

    return {
      success: true,
      clinics,
    };
  },

  async searchClinics(query: string): Promise<ClinicsResponse> {
    await delay(800); // Simulate API delay

    const allClinics = Array.from({ length: 100 }, (_, i) => ({
      id: `clinic-${i}`,
      name: `Clinic ${i + 1}`,
      address: `${i + 1} Main Street, City`,
      rating: Math.random() * 5,
      specialties: ['Dermatology', 'Aesthetics'],
    }));

    const filtered = allClinics.filter(
      clinic =>
        clinic.name.toLowerCase().includes(query.toLowerCase()) ||
        clinic.address.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      clinics: filtered,
    };
  },
};
