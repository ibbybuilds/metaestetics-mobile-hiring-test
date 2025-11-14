/**
 * Button component for consistent, accessible, and testable buttons across the app.
 *
 * @param title - Button text
 * @param onPress - Callback for button press
 * @param variant - Visual style: 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param size - Button size: 'small' | 'medium' | 'large'
 * @param disabled - Disable the button
 * @param loading - Show loading spinner and disable button
 * @param fullWidth - Stretch button to container width
 * @param leftIcon - Optional icon on the left
 * @param rightIcon - Optional icon on the right
 * @param style - Custom style override
 * @param accessibilityLabel - A11y label for screen readers
 * @param accessibilityHint - A11y hint for screen readers
 * @param testID - Test identifier for testing-library
 */
import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle, AccessibilityRole } from 'react-native';
import { Typography } from '../Typography';
import { styles } from './Button.styles';
import { colors } from '@theme/colors';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  testID?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  style,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole,
  testID,
}) => {
  const buttonStyle = [
    styles.container,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textStyle: TextStyle = {
    ...styles.textBase,
    ...styles[`${variant}Text`],
    ...styles[`${size}Text`],
  };

  // Use theme color for spinner
  const spinnerColor = variant === 'primary' || variant === 'secondary' ? colors.white : colors.primary;

  // Accessibility: loading state
  const computedA11yLabel = loading
    ? accessibilityLabel || 'Loading...'
    : accessibilityLabel || title;

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      accessibilityLabel={computedA11yLabel}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityLiveRegion={loading ? 'polite' : undefined}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'small'}
          color={spinnerColor}
          accessibilityLabel="Loading..."
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Typography variant="body1" align="center" style={textStyle}>
            {title}
          </Typography>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

