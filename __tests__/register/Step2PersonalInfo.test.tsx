import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Step2PersonalInfo } from '../../src/screens/Auth/Register/components/Step2PersonalInfo';

describe('Step2PersonalInfo', () => {
  const mockOnDataChange = jest.fn();
  const mockOnNext = jest.fn();
  const mockOnPrevious = jest.fn();

  const setup = (formData = {}) =>
    render(
      <Step2PersonalInfo
        formData={formData}
        onDataChange={mockOnDataChange}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and buttons', () => {
    const { getByLabelText, getByText } = setup();
    expect(getByLabelText('First Name')).toBeTruthy();
    expect(getByLabelText('Last Name')).toBeTruthy();
    expect(getByLabelText('Phone Number')).toBeTruthy();
    expect(getByText('Date of Birth')).toBeTruthy();
    expect(getByText('Gender')).toBeTruthy();
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = setup();
    fireEvent.press(getByText('Next'));
    await waitFor(() => {
      expect(getByText('First name is required')).toBeTruthy();
      expect(getByText('Last name is required')).toBeTruthy();
      expect(getByText('Phone number is required')).toBeTruthy();
      expect(getByText('Date of birth is required')).toBeTruthy();
      expect(getByText('Gender is required')).toBeTruthy();
    });
  });

  it('shows error for invalid phone number', async () => {
    const { getByLabelText, getByText } = setup();
    fireEvent.changeText(getByLabelText('First Name'), 'John');
    fireEvent.changeText(getByLabelText('Last Name'), 'Doe');
    fireEvent.changeText(getByLabelText('Phone Number'), '123');
    fireEvent.press(getByText('Next'));
    await waitFor(() => {
      expect(getByText('Phone number must be 6 to 15 digits')).toBeTruthy();
    });
  });

  it('calls onDataChange and onNext on valid submit', async () => {
    // Provide valid initial values for dateOfBirth and gender
    const { getByLabelText, getByText } = setup({
      dateOfBirth: '2000-01-01',
      gender: 'male',
    });
    fireEvent.changeText(getByLabelText('First Name'), 'John');
    fireEvent.changeText(getByLabelText('Last Name'), 'Doe');
    fireEvent.changeText(getByLabelText('Phone Number'), '1234567890');
    fireEvent.press(getByText('Next'));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalled();
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('calls onPrevious when Back is pressed', () => {
    const { getByText } = setup();
    fireEvent.press(getByText('Back'));
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('has accessibility labels', () => {
    const { getByLabelText } = setup();
    expect(getByLabelText('First Name')).toBeTruthy();
    expect(getByLabelText('Last Name')).toBeTruthy();
    expect(getByLabelText('Phone Number')).toBeTruthy();
  });
});
