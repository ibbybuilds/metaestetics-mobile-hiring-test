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
  const phoneInputRef = React.useRef<PhoneInput>(null);

  React.useEffect(() => {
    const instance = phoneInputRef.current as any;
    if (!instance) {
      return;
    }

    const normalizedCode = (countryCode || '+1').replace(/^\+/, '');

    if (normalizedCode && instance.setState) {
      instance.setState((prevState: any) => ({
        ...prevState,
        code: normalizedCode,
      }));
    }
  }, [countryCode]);

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        ref={phoneInputRef}
        defaultCode="US"
        value={value}
        onChangeText={onChangeText}
        onChangeCountry={(country) => {
          const callingCode = country?.callingCode?.[0];
          if (callingCode) {
            onChangeCountryCode(`+${callingCode}`);
          }
        }}
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

