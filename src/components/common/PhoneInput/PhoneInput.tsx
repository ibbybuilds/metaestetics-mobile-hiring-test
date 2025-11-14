import React from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Typography } from '../Typography';
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
  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        defaultCode="US"
        layout="second"
        value={value}
        onChangeText={onChangeText}
        onChangeCountry={(country: { callingCode?: string[] }) => {
          if (country && country.callingCode && country.callingCode[0]) {
            onChangeCountryCode(`+${country.callingCode[0]}`);
          }
        }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
        countryPickerButtonStyle={styles.countryPickerButton}
        flagButtonStyle={styles.flagButton}
        placeholder="Enter phone number"
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

