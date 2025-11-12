import React, { useRef, useEffect, useState } from 'react';
import { View } from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { getAllCountries, CountryCode, FlagType } from 'react-native-country-picker-modal';
import { Typography } from '../Typography';
import { styles } from './PhoneInput.styles';

export interface PhoneInputProps {
  label?: string;
  value?: string;
  defaultCountryCode?: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode: (code: string) => void;
  error?: string;
}

let callingCodeCache: { [key: string]: CountryCode } | null = null;

const getISOFromCallingCode = async (callingCode: string): Promise<CountryCode> => {
  if (!callingCodeCache) {
    const countries = await getAllCountries(FlagType.EMOJI);
    callingCodeCache = {};

    countries.forEach(country => {
      if (country.callingCode) {
        const code = `+${country.callingCode[0]}`;
        if (!callingCodeCache![code]) {
          callingCodeCache![code] = country.cca2;
        }
      }
    });
  }

  return callingCodeCache[callingCode] || 'US';
};

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  value,
  defaultCountryCode = '+1',
  onChangeText,
  onChangeCountryCode,
  error,
}) => {
  const phoneInput = useRef<PhoneInput>(null);
  const [isoCode, setIsoCode] = useState<CountryCode>('US');

  useEffect(() => {
    getISOFromCallingCode(defaultCountryCode).then(setIsoCode);
  }, [defaultCountryCode]);

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        ref={phoneInput}
        key={isoCode}
        defaultCode={isoCode}
        layout="second"
        value={value}
        onChangeText={(text: string) => {
          const digitsOnly = text.replace(/\D/g, '');
          onChangeText(digitsOnly);
        }}
        onChangeCountry={(country: any) => {
          if (country?.callingCode?.[0]) {
            const newCode = `+${country.callingCode[0]}`;
            onChangeCountryCode(newCode);
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

