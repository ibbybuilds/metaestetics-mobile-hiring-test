import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Step1EmailPassword } from '../../src/screens/Auth/Register/components/Step1EmailPassword';

const mockOnDataChange = jest.fn();
const mockOnNext = jest.fn();

describe('Step1EmailPassword', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all input fields and button', () => {
    const { getByLabelText, getByText } = render(
      <Step1EmailPassword formData={{}} onDataChange={mockOnDataChange} onNext={mockOnNext} />
    );
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByLabelText('Confirm Password')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('shows validation errors for empty fields', async () => {
    const { getByText } = render(
      <Step1EmailPassword formData={{}} onDataChange={mockOnDataChange} onNext={mockOnNext} />
    );
    fireEvent.press(getByText('Next'));
    await waitFor(() => {
      expect(getByText('Email is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
      expect(getByText('Confirm password is required')).toBeTruthy();
    });
  });

  it('shows error for invalid email and password mismatch', async () => {
    const { getByLabelText, getByText } = render(
      <Step1EmailPassword formData={{}} onDataChange={mockOnDataChange} onNext={mockOnNext} />
    );
    fireEvent.changeText(getByLabelText('Email'), 'invalid');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.changeText(getByLabelText('Confirm Password'), 'differentPassword');
    fireEvent.press(getByText('Next'));
    await waitFor(() => {
      expect(getByText('Invalid email address')).toBeTruthy();
      expect(getByText('Passwords must match')).toBeTruthy();
    });
  });

  it('calls onDataChange and onNext on valid submit', async () => {
    const { getByLabelText, getByText } = render(
      <Step1EmailPassword formData={{}} onDataChange={mockOnDataChange} onNext={mockOnNext} />
    );
    fireEvent.changeText(getByLabelText('Email'), 'test@example.com');
    fireEvent.changeText(getByLabelText('Password'), 'password123');
    fireEvent.changeText(getByLabelText('Confirm Password'), 'password123');
    fireEvent.press(getByText('Next'));
    await waitFor(() => {
      expect(mockOnDataChange).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('has accessibility labels and hints', () => {
    const { getByLabelText } = render(
      <Step1EmailPassword formData={{}} onDataChange={mockOnDataChange} onNext={mockOnNext} />
    );
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Password')).toBeTruthy();
    expect(getByLabelText('Confirm Password')).toBeTruthy();
  });
});
