import { User, LoginCredentials, RegisterData } from '@types';
import { MOCK_USERS } from '@utils/constants';

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

    const mockUser = MOCK_USERS.find(
      u => u.email === credentials.email && u.password === credentials.password
    );

    if (!mockUser) {
      throw new Error('Invalid email or password');
    }

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
  },

  async register(data: RegisterData) {
    await delay(1500);

    // Check if email already exists
    if (MOCK_USERS.some(u => u.email === data.email)) {
      throw new Error('Email already exists');
    }

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

    return {
      success: true,
      user,
      token: 'mock-token-' + generateId(),
    };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    await delay(800);

    return {
      success: true,
      user: {
        ...updates,
        id: userId,
        updatedAt: new Date().toISOString(),
      } as User,
    };
  },

  async logout() {
    await delay(500);
    return { success: true };
  },

  async getClinics() {
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

  async searchClinics(query: string) {
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

