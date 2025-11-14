import React from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Typography } from '../Typography';
import { styles } from './PhoneInput.styles';
import { DEFAULT_COUNTRY_ISO } from '@utils/constants';

type CountryIsoCode = import('react-native-phone-number-input/node_modules/react-native-country-picker-modal/lib/types').CountryCode;

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode: (code: string) => void;
  countryCode: string;
  countryIso?: string;
  onChangeCountryIso?: (iso: string) => void;
  error?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChangeText,
  onChangeCountryCode,
  countryCode,
  countryIso,
  onChangeCountryIso,
  error,
}) => {
  const defaultIso: CountryIsoCode = (countryIso ?? DEFAULT_COUNTRY_ISO) as CountryIsoCode;

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        key={`phone-input-${defaultIso}-${countryCode}`}
        defaultCode={defaultIso}
        value={value}
        onChangeText={onChangeText}
        onChangeCountry={(country) => {
          const callingCode = country?.callingCode?.[0];
          if (callingCode) {
            onChangeCountryCode(`+${callingCode}`);
          }
          if (country?.cca2) {
            onChangeCountryIso?.(country.cca2);
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
