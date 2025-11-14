import React from "react";
import { View } from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Typography } from "../Typography";
import { styles } from "./PhoneInput.styles";

export interface PhoneInputProps {
  label?: string;
  value: string;
  onChangeText: (phone: string) => void;
  onChangeCountryCode: (code: string) => void;
  onChangeCountryCallingCode: (code: string) => void;
  countryCode: string;
  error?: string;
}

export const PhoneInputComponent: React.FC<PhoneInputProps> = ({
  label,
  value,
  onChangeText,
  onChangeCountryCode,
  onChangeCountryCallingCode,
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
        defaultCode={(countryCode as any) || "US"}
        value={value}
        onChangeCountry={(country) => {
          onChangeCountryCode(country?.cca2 || "");
          onChangeCountryCallingCode(country?.callingCode[0] || "");
        }}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        containerStyle={styles.phoneContainer}
        textContainerStyle={styles.textContainer}
        textInputStyle={styles.textInput}
        codeTextStyle={styles.codeText}
        flagButtonStyle={styles.flagButton}
        countryPickerProps={{
          withFlag: true,
          withFilter: true,
          withAlphaFilter: true,
          withCallingCode: true,
        }}
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};
