import React from 'react';
import { TouchableOpacity, ActivityIndicator, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Typography } from '../Typography';
import { styles } from './Button.styles';

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
  style?: StyleProp<ViewStyle>;
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
    ...styles[`${variant}Text`],
    ...styles[`${size}Text`],
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          size={size === 'small' ? 'small' : 'small'}
          color={variant === 'primary' ? '#FFFFFF' : '#6B4CE6'}
        />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Typography variant="body1" style={textStyle}>
            {title}
          </Typography>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};
