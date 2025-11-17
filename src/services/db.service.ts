import { mockApiService } from './mock-api.service';
import { User } from '@types';

/**
 * Firebase-like service abstraction
 * Clean, simple API that mimics Firestore collections
 */
export const db = {
  // Collections (like Firestore)
  clinics: {
    // Get all clinics
    getAll: () => mockApiService.getClinics(),
    
    // Search clinics
    search: (query: string) => mockApiService.searchClinics(query),
  },

  users: {
    // Get current user (from storage like Firebase Auth)
    getCurrent: async () => {
      const { storageService } = await import('./storage.service');
      const user = await storageService.getUser();
      return { success: true, user };
    },

    // Update profile
    updateProfile: (userId: string, updates: Partial<User>) => 
      mockApiService.updateProfile(userId, updates),
  },

  // Easy to extend for new collections
  // notifications: {
  //   getAll: () => mockApiService.getNotifications(),
  // },
  
  // settings: {
  //   get: () => mockApiService.getSettings(),
  // },
};