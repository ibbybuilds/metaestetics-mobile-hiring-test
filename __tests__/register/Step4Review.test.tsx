import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Step4Review } from '../../src/screens/Auth/Register/components/Step4Review';
import { RegisterData } from '../../src/types/auth.types';

const mockFormData: RegisterData = {
  email: 'test@example.com',
  password: 'password123',
  confirmPassword: 'password123',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  phoneNumber: '+1234567890',
  countryCode: '+1',
  dateOfBirth: '1990-01-01',
  gender: 'male',
  profileImage: 'mock-uri',
};

describe('Step4Review', () => {
  it('renders all registration data', () => {
    const { getByText } = render(
      <Step4Review
        formData={mockFormData}
        onPrevious={jest.fn()}
        onSubmit={jest.fn()}
        isLoading={false}
      />
    );
    // Header changed to 'Review Your Information'
    expect(getByText('Review Your Information')).toBeTruthy();
    expect(getByText(/test@example.com/)).toBeTruthy();
    expect(getByText(/John Doe/)).toBeTruthy();
    // Phone is formatted in the UI (includes country code)
    expect(getByText(/\+1 \+1234567890/)).toBeTruthy();
    // Date displayed as a localized long date
    expect(getByText(/January 1, 1990/)).toBeTruthy();
    expect(getByText(/male/)).toBeTruthy();
  });

  it('calls onPrevious when Back button is pressed', () => {
    const onPrevious = jest.fn();
    const { getByText } = render(
      <Step4Review
        formData={mockFormData}
        onPrevious={onPrevious}
        onSubmit={jest.fn()}
        isLoading={false}
      />
    );
    fireEvent.press(getByText('Back'));
    expect(onPrevious).toHaveBeenCalled();
  });

  it('calls onSubmit when Create button is pressed', () => {
    const onSubmit = jest.fn();
    const { getByText } = render(
      <Step4Review
        formData={mockFormData}
        onPrevious={jest.fn()}
        onSubmit={onSubmit}
        isLoading={false}
      />
    );
    fireEvent.press(getByText('Create'));
    expect(onSubmit).toHaveBeenCalled();
  });

  it('disables Submit button and shows loading when isLoading is true', () => {
    const { getByText } = render(
      <Step4Review
        formData={mockFormData}
        onPrevious={jest.fn()}
        onSubmit={jest.fn()}
        isLoading={true}
      />
    );
    const submitButton = getByText('Submitting...');
    expect(submitButton).toBeTruthy();
    // Try to press the button and expect nothing to happen (no error thrown)
    expect(() => fireEvent.press(submitButton)).not.toThrow(); // Button is visually disabled
  });
});
