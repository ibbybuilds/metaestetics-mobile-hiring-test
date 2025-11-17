import React from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Typography } from '../Typography';
import { styles } from './PhoneInput.styles';

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode?: (code: string) => void; // Make optional
  countryCode: string;
  error?: string;
  countryCodeEditable?: boolean; // Add prop to control country code editability
  onBlur?: (event?: unknown) => void; // Accept unknown instead of any
}

// Minimal mapping for common country codes. Extend as needed.
const callingCodeToIso: Record<string, PhoneInput['props']['defaultCode']> = {
  '+1': 'US',
  '+91': 'IN',
  '+44': 'GB',
  '+61': 'AU',
  '+81': 'JP',
  '+49': 'DE',
  '+33': 'FR',
  '+39': 'IT',
  '+86': 'CN',
  // Add more as needed
};

export const PhoneInputComponent = React.forwardRef<PhoneInput, PhoneInputProps>(
  ({
    label,
    value,
    onChangeText,
    onChangeCountryCode,
    countryCode,
    error,
    countryCodeEditable = true,
    onBlur,
  }, ref) => {
    // Keep countryCode prop for future use; avoid unused variable lint by referencing it in a no-op
    void countryCode;
    return (
      <View style={styles.container}>
        {label && (
          <Typography variant="body2" style={styles.label}>
            {label}
          </Typography>
        )}
        <View style={styles.phoneContainer}>
          <PhoneInput
            ref={ref}
            value={value}
            layout='second'
            defaultCode={callingCodeToIso[countryCode]}
            onChangeText={onChangeText}
            onChangeCountry={countryCodeEditable && onChangeCountryCode ? (country: { callingCode: string[] }) => {
              if (country && country.callingCode && country.callingCode.length > 0) {
                onChangeCountryCode(`+${country.callingCode[0]}`);
              } else {
                onChangeCountryCode && onChangeCountryCode('');
              }
            } : undefined}
            containerStyle={styles.phoneContainer}
            textContainerStyle={styles.textContainer}
            textInputStyle={styles.textInput}
            codeTextStyle={styles.codeText}
            disableArrowIcon={!countryCodeEditable}
            // Ensure the inner TextInput is accessible in tests
            textInputProps={{
              accessibilityLabel: label || 'Phone Number',
              placeholder: 'Phone Number',
              onBlur, // Forward onBlur to inner TextInput
            }}
          />
        </View>
        {error && (
          <Typography variant="caption" style={styles.errorText}>
            {error}
          </Typography>
        )}
      </View>
    );
  }
);

PhoneInputComponent.displayName = 'PhoneInputComponent';

