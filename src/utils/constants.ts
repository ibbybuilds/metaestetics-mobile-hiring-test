export const STORAGE_KEYS = {
  AUTH_TOKEN: '@metaestetics/auth_token',
  USER_DATA: '@metaestetics/user_data',
  REGISTERED_USERS: '@metaestetics/registered_users', // Store registered users
  REGISTER_FORM_DATA: '@metaestetics/register_form_data', // Store in-progress registration form data
};

export const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

export const MOCK_USERS = [
  {
    email: 'test@test.com',
    password: 'test123',
    firstName: 'John',
    lastName: 'Doe',
  },
];

