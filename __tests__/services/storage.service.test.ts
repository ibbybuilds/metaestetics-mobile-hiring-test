import { storageService } from '../../src/services/storage.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
jest.mock('@react-native-async-storage/async-storage');
import { STORAGE_KEYS } from '../../src/utils/constants';

describe('storageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves, gets, and removes token', async () => {
    await storageService.saveToken('abc');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN, 'abc');
    await storageService.getToken();
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN);
    await storageService.removeToken();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.AUTH_TOKEN);
  });

  it('saves, gets, and removes user', async () => {
    const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B', phoneNumber: '123', countryCode: '+1', dateOfBirth: '2000-01-01', gender: 'male' as const, createdAt: '', updatedAt: '' };
    await storageService.saveUser(user);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(user));
    const result = await storageService.getUser();
    expect(result).toEqual(user);
    await storageService.removeUser();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEYS.USER_DATA);
  });

  it('gets, saves, and finds registered users', async () => {
    const user = { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B', phoneNumber: '123', countryCode: '+1', dateOfBirth: '2000-01-01', gender: 'male' as const, createdAt: '', updatedAt: '' };
    const creds = [{ email: 'a@b.com', password: 'pass', user: { id: '1', email: 'a@b.com', firstName: 'A', lastName: 'B', phoneNumber: '123', countryCode: '+1', dateOfBirth: '2000-01-01', gender: 'male' as const, createdAt: '', updatedAt: '' } }];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(creds));
    const users = await storageService.getRegisteredUsers();
    expect(users).toEqual(creds);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(creds));
    const found = await storageService.findRegisteredUser('a@b.com', 'pass');
    expect(found).toEqual(user);
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(creds));
    const exists = await storageService.checkEmailExists('a@b.com');
    expect(exists).toBe(true);
    await storageService.saveRegisteredUser('a@b.com', 'pass', user);
    expect(AsyncStorage.setItem).toHaveBeenCalled();
  });

  it('clears all', async () => {
    await storageService.clearAll();
    expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
      STORAGE_KEYS.AUTH_TOKEN,
      STORAGE_KEYS.USER_DATA,
      STORAGE_KEYS.REGISTERED_USERS,
    ]);
  });
});
