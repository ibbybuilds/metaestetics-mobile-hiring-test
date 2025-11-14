import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  containerError: {
    marginBottom: spacing.xs,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.textPrimary,
    flex: 1,
    fontSize: 16,
    height: 44,
    paddingHorizontal: spacing.md,
  },
  inputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  inputDisabled: {
    backgroundColor: colors.gray[100],
    color: colors.textSecondary,
  },
  inputError: {
    borderColor: colors.error,
  },
  inputFocused: {
    borderColor: colors.borderFocus,
  },
  inputMultiline: {
    height: 'auto',
    minHeight: 100,
    paddingTop: spacing.sm,
    textAlignVertical: 'top',
  },
  inputWithLeftIcon: {
    paddingLeft: 40,
  },
  inputWithRightIcon: {
    paddingRight: 40,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  leftIcon: {
    left: spacing.sm,
    position: 'absolute',
    zIndex: 1,
  },
  passwordToggle: {
    color: colors.primary,
    fontSize: 12,
  },
  rightIcon: {
    position: 'absolute',
    right: spacing.sm,
    zIndex: 1,
  },
});

