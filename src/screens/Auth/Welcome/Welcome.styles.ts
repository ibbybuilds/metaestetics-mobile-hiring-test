import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme/index';

export const styles = StyleSheet.create({
  button: {
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    gap: spacing.md,
    width: '100%',
  },
  container: {
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  logo: {
    color: colors.primary,
  },
  logoContainer: {
    marginBottom: spacing.xxl,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});

