export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  countryCode: string;
  countryIso?: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile extends Omit<User, 'id' | 'createdAt' | 'updatedAt'> {}
