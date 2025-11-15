import * as validation from '../src/utils/validation';

describe('Validation Schemas', () => {
  it('should validate a valid email', () => {
    const schema = validation.registerStep1EmailPasswordSchema;
    const valid = { email: 'test@example.com', password: 'Password123!', confirmPassword: 'Password123!' };
    return expect(schema.isValid(valid)).resolves.toBe(true);
  });

  it('should invalidate an invalid email', () => {
    const schema = validation.registerStep1EmailPasswordSchema;
    const invalid = { email: 'not-an-email', password: 'Password123!', confirmPassword: 'Password123!' };
    return expect(schema.isValid(invalid)).resolves.toBe(false);
  });

  it('should invalidate mismatched passwords', () => {
    const schema = validation.registerStep1EmailPasswordSchema;
    const invalid = { email: 'test@example.com', password: 'Password123!', confirmPassword: 'Password456!' };
    return expect(schema.isValid(invalid)).resolves.toBe(false);
  });

  it('should validate a valid login', () => {
    const schema = validation.loginValidationSchema;
    const valid = { email: 'test@example.com', password: 'Password123!' };
    return expect(schema.isValid(valid)).resolves.toBe(true);
  });

  it('should invalidate an invalid login (missing email)', () => {
    const schema = validation.loginValidationSchema;
    const invalid = { email: '', password: 'Password123!' };
    return expect(schema.isValid(invalid)).resolves.toBe(false);
  });

  it('should validate a valid step 2 registration', () => {
    const schema = validation.registerStep2ValidationSchema;
    const valid = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890',
      dateOfBirth: '2000-01-01',
      gender: 'male',
    };
    return expect(schema.isValid(valid)).resolves.toBe(true);
  });

  it('should invalidate an invalid phone number in step 2', () => {
    const schema = validation.registerStep2ValidationSchema;
    const invalid = {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '123',
      dateOfBirth: '2000-01-01',
      gender: 'male',
    };
    return expect(schema.isValid(invalid)).resolves.toBe(false);
  });

  it('should validate a valid edit profile', () => {
    const schema = validation.editProfileValidationSchema;
    const valid = {
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '9876543210',
      dateOfBirth: '1990-12-31',
      gender: 'female',
    };
    return expect(schema.isValid(valid)).resolves.toBe(true);
  });

  it('should invalidate an invalid edit profile (missing gender)', () => {
    const schema = validation.editProfileValidationSchema;
    const invalid = {
      firstName: 'Jane',
      lastName: 'Smith',
      phoneNumber: '9876543210',
      dateOfBirth: '1990-12-31',
      gender: '',
    };
    return expect(schema.isValid(invalid)).resolves.toBe(false);
  });
});
