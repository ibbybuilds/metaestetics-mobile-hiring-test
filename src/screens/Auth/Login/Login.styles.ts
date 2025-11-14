import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme/index';

export const styles = StyleSheet.create({
  button: {
    marginBottom: spacing.lg,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
  },
  forgotPasswordText: {
    color: colors.primary,
  },
  form: {
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.md,
  },
  signUpLink: {
    color: colors.primary,
    fontWeight: '600',
  },
  signUpText: {
    color: colors.textSecondary,
  },
  subtitle: {
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
});

