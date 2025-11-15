import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  
  // Variants
  ghost: {
    backgroundColor: colors.transparent,
  },
  outline: {
    backgroundColor: colors.transparent,
    borderColor: colors.primary,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  
  // Sizes
  smallSize: {
    minHeight: 32,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  mediumSize: {
    minHeight: 44,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  largeSize: {
    minHeight: 52,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  
  // Text styles
  primaryText: {
    color: colors.white,
    fontWeight: '600',
  },
  secondaryText: {
    color: colors.white,
    fontWeight: '600',
  },
  outlineText: {
    color: colors.primary,
    fontWeight: '600',
  },
  ghostText: {
    color: colors.primary,
    fontWeight: '600',
  },
  
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  // Base text style to ensure centered alignment in buttons
  textBase: {
    textAlign: 'center',
  },
  
  // States
  disabled: {
    opacity: 0.5,
  },
  
  fullWidth: {
    width: '100%',
  },
});

