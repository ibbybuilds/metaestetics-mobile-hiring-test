import React, { useMemo } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { CountryCode } from 'react-native-country-picker-modal';
import { Typography } from '../Typography';
import { callingCodeToCountryCode } from '@utils/formatters';
import { styles } from './PhoneInput.styles';

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode: (code: string) => void;
  countryCode: string;
  error?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChangeText,
  onChangeCountryCode,
  countryCode,
  error,
}) => {
  // Convert calling code (e.g., '+92') to country code (e.g., 'PK')
  const defaultCountryCode = useMemo((): CountryCode => {
    if (countryCode) {
      return callingCodeToCountryCode(countryCode) as CountryCode;
    }
    return 'US' as CountryCode;
  }, [countryCode]);

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        defaultCode={defaultCountryCode}
        value={value}
        onChangeText={onChangeText}
        onChangeCountry={(country) => {
          if (country && country.callingCode) {
            onChangeCountryCode(`+${country.callingCode[0]}`);
          }
        }}
        countryPickerProps={{ renderFlagButton: false }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};
