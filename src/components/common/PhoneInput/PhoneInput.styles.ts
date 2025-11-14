import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  phoneContainer: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  textInput: {
    fontSize: 16,
    color: colors.textPrimary,
    height: 40,
  },
  codeText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
    fontSize: 12,
  },
  countryPickerButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: spacing.sm,
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    marginRight: spacing.sm,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },
  flagButton: {
    backgroundColor: 'transparent',
    width: 20,
    height: 15,
    marginRight: spacing.xs,
  },
});

