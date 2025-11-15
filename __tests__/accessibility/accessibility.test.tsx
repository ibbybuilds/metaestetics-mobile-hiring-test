import React from 'react';
import { render } from '@testing-library/react-native';
import { Button } from '../../src/components/common/Button/Button';
import { Input } from '../../src/components/common/Input/Input';
import { ImagePickerComponent } from '../../src/components/common/ImagePickerComponent/ImagePickerComponent';
import { SelectInput } from '../../src/components/common/SelectInput/SelectInput';
import { DatePicker } from '../../src/components/common/DatePicker/DatePicker';
import { PhoneInputComponent } from '../../src/components/common/PhoneInput/PhoneInput';

// --- Base accessibility tests ---
describe('Accessibility', () => {
  it('Button has accessibilityLabel and accessibilityRole', () => {
    const { getByLabelText } = render(
      <Button title="Save" onPress={() => {}} accessibilityLabel="Save Button" accessibilityRole="button" />
    );
    const button = getByLabelText('Save Button');
    expect(button).toBeTruthy();
    expect(button.props.accessibilityRole).toBe('button');
  });

  it('Input has accessibilityLabel and accessibilityHint', () => {
    const { getByLabelText } = render(
      <Input accessibilityLabel="Email Input" accessibilityHint="Enter your email" value={''} onChangeText={function (): void {
            throw new Error('Function not implemented.');
        } } />
    );
    const input = getByLabelText('Email Input');
    expect(input).toBeTruthy();
    // accessibilityHint cannot be directly queried, but prop should exist
    expect(input.props.accessibilityHint).toBe('Enter your email');
  });
});

// --- Extended accessibility coverage for custom interactive components ---
describe('Accessibility (Custom Components)', () => {
  it('ImagePickerComponent has correct accessibility props', () => {
    const { getByLabelText } = render(
      <ImagePickerComponent
        onImageSelected={() => {}}
        currentImage={undefined}
        size={100}
        onRemove={() => {}}
      />
    );
    expect(getByLabelText(/add photo|profile photo/i)).toBeTruthy();
    // Remove button only rendered if currentImage, so skip hint check
  });

  it('SelectInput button is accessible', () => {
    const { getByRole } = render(
      <SelectInput
        label="Choose option"
        value=""
        options={[{ label: 'A', value: 'a' }]}
        onChange={() => {}}
      />
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('DatePicker is accessible as button', () => {
    const { getByRole } = render(
      <DatePicker
        label="Date of Birth"
        value={null}
        onChange={() => {}}
        error={undefined}
        placeholder="YYYY-MM-DD"
        editable={true}
      />
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('PhoneInputComponent input is accessible', () => {
    const { getByLabelText } = render(
      <PhoneInputComponent
        label="Phone"
        value=""
        onChangeText={() => {}}
        countryCode="+1"
      />
    );
    expect(getByLabelText(/phone/i)).toBeTruthy();
  });
});

// Documented: LoadingSpinner is not interactive, Card is only interactive if onPress is provided.
