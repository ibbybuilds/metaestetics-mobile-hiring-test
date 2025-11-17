import React, { useMemo } from "react";
import { View } from "react-native";
import PhoneInput, {
  Country,
  CountryCode,
} from "@linhnguyen96114/react-native-phone-input";
import { Typography } from "../Typography";
import { styles } from "./PhoneInput.styles";
import { DEFAULT_COUNTRY_ISO } from "@utils/constants";

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
  const defaultCode = useMemo<CountryCode>(
    () => (countryIso ?? DEFAULT_COUNTRY_ISO) as CountryCode,
    [countryIso]
  );

  const defaultCallingCode = useMemo(() => {
    const digits = countryCode.replace(/\D/g, "");
    return digits.length > 0 ? digits : undefined;
  }, [countryCode]);

  const handleCountryChange = (country: Country) => {
    const callingCode = country.callingCode?.[0];
    if (callingCode) {
      onChangeCountryCode(`+${callingCode}`);
    }
    onChangeCountryIso?.(country.cca2);
  };

  const handleTextChange = (text: string) => {
    onChangeText(text.replace(/\D/g, ""));
  };

  const containerStyle = useMemo(
    () =>
      error
        ? [styles.phoneContainer, styles.errorPhoneInput]
        : styles.phoneContainer,
    [error]
  );

  return (
    <View style={styles.container}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <PhoneInput
        defaultCode={defaultCode}
        defaultCallingCode={defaultCallingCode}
        value={value}
        onChangeText={handleTextChange}
        onChangeCountry={handleCountryChange}
        containerStyle={containerStyle}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
        flagSize={22}
        autoFocus={false}
        showCountryCode
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};
