import React, { useRef } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Typography } from '../Typography';
import { styles } from './PhoneInput.styles';

interface CountryCode {
  callingCode?: string[];
}

export interface PhoneInputProps {
  label?: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode: (code: string) => void;
  error?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  onChangeText,
  onChangeCountryCode,
  error,
}) => {
  const phoneInput = useRef<PhoneInput>(null);

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        ref={phoneInput}
        defaultCode="US"
        layout="second"
        onChangeText={(text: string) => {
          const digitsOnly = text.replace(/\D/g, '');
          onChangeText(digitsOnly);
        }}
        onChangeFormattedText={(_text: string, code?: CountryCode) => {
          if (code?.callingCode?.[0]) {
            onChangeCountryCode(`+${code.callingCode[0]}`);
          }
        }}
        withDarkTheme={false}
        withShadow={false}
        placeholder="Phone number"
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

