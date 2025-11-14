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
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  textInput: {
    fontSize: 16,
    color: colors.textPrimary,
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
  flagButton: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

