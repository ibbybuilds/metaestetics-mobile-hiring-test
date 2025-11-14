import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { Typography } from '../Typography';
import { styles } from './PhoneInput.styles';
import { getAllCountries, FlagType, CountryCode, Country } from 'react-native-country-picker-modal';

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
  const [defaultCountryCode, setDefaultCountryCode] = useState<CountryCode | null>(null);
  const allCountries = useRef<Country[]>([]);

  useEffect(() => {
    const loadCountries = async () => {
      if (allCountries.current.length === 0) {
        allCountries.current = await getAllCountries(FlagType.EMOJI);
      }

      const numericCode = countryCode?.replace('+', '');
      const country = allCountries.current.find((c) => c.callingCode.includes(numericCode));

      setDefaultCountryCode((country?.cca2 as CountryCode) || 'US');
    };

    if (countryCode) {
      loadCountries();
    } else {
      setDefaultCountryCode('US');
    }
  }, [countryCode]);

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}

      {defaultCountryCode && (
        <PhoneInput
          defaultCode={defaultCountryCode}
          value={value}
          onChangeText={onChangeText}
          onChangeCountry={(country) => {
            if (country?.callingCode?.length) {
              onChangeCountryCode(`+${country.callingCode[0]}`);
            }
          }}
          countryPickerProps={{ renderFlagButton: false }}
          containerStyle={styles.phoneContainer}
          textContainerStyle={styles.textContainer}
          textInputStyle={styles.textInput}
          codeTextStyle={styles.codeText}
        />
      )}

      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

