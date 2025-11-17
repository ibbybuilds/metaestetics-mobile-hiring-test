import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

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
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.white,
    overflow: 'hidden',
    paddingLeft: spacing.sm,
    paddingRight: spacing.sm,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 0,
    paddingLeft: spacing.sm,
  },
  textInput: {
    fontSize: 17,
    color: colors.textPrimary,
    letterSpacing: 0.15,
    paddingVertical: 0,
    height: 48,
    alignSelf: 'center',
  },
  codeText: {
    fontSize: 17,
    color: colors.textPrimary,
    fontWeight: '600',
    alignSelf: 'center',
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.xs,
    fontSize: 12,
  },
});

