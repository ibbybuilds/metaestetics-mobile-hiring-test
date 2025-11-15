import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Step3ProfilePhoto } from '../../src/screens/Auth/Register/components/Step3ProfilePhoto';
import { ImagePickerComponent } from '@components/common/ImagePickerComponent';

describe('Step3ProfilePhoto', () => {
  const mockOnDataChange = jest.fn();
  const mockOnNext = jest.fn();
  const mockOnPrevious = jest.fn();

  const setup = (formData = {}) =>
    render(
      <Step3ProfilePhoto
        formData={formData}
        onDataChange={mockOnDataChange}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders image picker and navigation buttons', () => {
    const { getByText } = setup();
    expect(getByText('Add a Profile Photo')).toBeTruthy();
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('disables Next button if no image is selected', () => {
    const { getByRole } = setup();
    const nextButton = getByRole('button', { name: 'Next' });
    expect(nextButton.props.accessibilityState.disabled).toBe(true);
  });

  it('enables Next button when image is selected', () => {
    const { getByRole, rerender } = setup({ profileImage: 'mock-uri' });
    const nextButton = getByRole('button', { name: 'Next' });
    expect(nextButton.props.accessibilityState.disabled).toBe(false);
  });

  it('calls onPrevious when Back is pressed', () => {
    const { getByText } = setup();
    fireEvent.press(getByText('Back'));
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('calls onNext when Next is pressed and image is selected', () => {
    const { getByText } = setup({ profileImage: 'mock-uri' });
    fireEvent.press(getByText('Next'));
    expect(mockOnNext).toHaveBeenCalled();
  });

  it('calls onDataChange when an image is selected', () => {
    const { UNSAFE_getByType } = setup();
    // Simulate image selection
    UNSAFE_getByType(ImagePickerComponent).props.onImageSelected('mock-uri');
    expect(mockOnDataChange).toHaveBeenCalledWith({ profileImage: 'mock-uri' });
  });
});
