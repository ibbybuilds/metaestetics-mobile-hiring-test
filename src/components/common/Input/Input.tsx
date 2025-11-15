import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, ViewStyle, TextStyle, KeyboardTypeOptions } from 'react-native';
import { Typography } from '../Typography';
import { styles } from './Input.styles';

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (event?: any) => void; // Changed onBlur to accept (event?: any) => void
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  inputStyle?: TextStyle; // Add inputStyle for TextInput
  accessibilityLabel?: string; // Added for accessibility
  accessibilityHint?: string; // Added for accessibility
  backgroundColor?: string; // Optional background color for input container
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  onBlur,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  editable = true,
  multiline = false,
  numberOfLines = 1,
  leftIcon,
  rightIcon,
  style,
  inputStyle: inputStyleProp,
  accessibilityLabel, // Added for accessibility
  accessibilityHint, // Added for accessibility
  backgroundColor, // New prop
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputStyle = [
    styles.input,
    leftIcon && styles.inputWithLeftIcon,
    rightIcon && styles.inputWithRightIcon,
    isFocused && styles.inputFocused,
    error && styles.inputError,
    !editable && styles.inputDisabled,
    multiline && styles.inputMultiline,
    inputStyleProp,
    backgroundColor ? { backgroundColor: backgroundColor } : undefined, // Ensure this is last for override
  ].filter((v): v is TextStyle => Boolean(v)); // Ensure only TextStyle objects

  const containerStyle = [
    styles.container,
    error && styles.containerError,
    style,
    backgroundColor ? { backgroundColor } : undefined,
  ].filter((v): v is ViewStyle => Boolean(v)); // Ensure only ViewStyle objects

  return (
    <View style={containerStyle}>
      {label && (
        <Typography variant="body2" style={styles.label}>
          {label}
        </Typography>
      )}
      <View style={styles.inputContainer}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onBlur={event => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          accessibilityLabel={accessibilityLabel || label} // Forward accessibilityLabel
          accessibilityHint={accessibilityHint} // Forward accessibilityHint
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.rightIcon}
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            <Typography variant="body2" style={styles.passwordToggle}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Typography>
          </TouchableOpacity>
        )}
        {rightIcon && !secureTextEntry && (
          <View style={styles.rightIcon}>{rightIcon}</View>
        )}
      </View>
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
    </View>
  );
};

