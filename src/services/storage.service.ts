import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@utils/constants';
import { User } from '@types';

interface StoredUserCredentials {
  email: string;
  password: string;
  user: User;
}

export const storageService = {
  // Auth token
  async saveToken(token: string): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
  },

  async getToken(): Promise<string | null> {
    return await AsyncStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  async removeToken(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  },

  // User data
  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  },

  async getUser(): Promise<User | null> {
    const userData = await AsyncStorage.getItem(STORAGE_KEYS.USER_DATA);
    return userData ? JSON.parse(userData) : null;
  },

  async removeUser(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER_DATA);
  },

  // Registered users (for mock API persistence)
  async getRegisteredUsers(): Promise<StoredUserCredentials[]> {
    const data = await AsyncStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
    return data ? JSON.parse(data) : [];
  },

  async saveRegisteredUser(email: string, password: string, user: User): Promise<void> {
    const users = await this.getRegisteredUsers();
    // Check if user already exists and update, otherwise add
    const existingIndex = users.findIndex(u => u.email === email);
    const newUser: StoredUserCredentials = { email, password, user };
    
    if (existingIndex >= 0) {
      users[existingIndex] = newUser;
    } else {
      users.push(newUser);
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
  },

  async findRegisteredUser(email: string, password: string): Promise<User | null> {
    const users = await this.getRegisteredUsers();
    const found = users.find(u => u.email === email && u.password === password);
    return found ? found.user : null;
  },

  async checkEmailExists(email: string): Promise<boolean> {
    const users = await this.getRegisteredUsers();
    return users.some(u => u.email === email);
  },

  // Registration in-progress storage methods
  async saveRegistrationInProgress(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  },

  async getRegistrationInProgress(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  },

  async clearRegistrationInProgress(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  },

  // Clear all session data (but preserve registered users)
  async clearAll(): Promise<void> {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      // Note: We don't clear REGISTERED_USERS so users can log back in
    ]);
  },
};

