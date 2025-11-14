import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  TextStyle,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Typography } from '../Typography';
import { styles } from './Input.styles';

type InputBlurEvent =
  | NativeSyntheticEvent<TextInputFocusEventData>
  | React.FocusEvent<any>;

export interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: (event?: InputBlurEvent) => void;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  editable?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: StyleProp<TextStyle>;
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
    style,
  ] as StyleProp<TextStyle>;

  const containerStyle = [
    styles.container,
    error && styles.containerError,
  ];

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
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event as InputBlurEvent);
          }}
          onFocus={() => setIsFocused(true)}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
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
