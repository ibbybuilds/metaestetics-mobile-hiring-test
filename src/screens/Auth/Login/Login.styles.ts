import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    justifyContent: 'center',
    marginTop: spacing.xxxl,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  form: {
    width: '100%',
    gap: spacing.md,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
  },
  button: {
    marginBottom: spacing.lg,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  signUpText: {
    color: colors.textSecondary,
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: '600',
  },
});

