import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.xxl,
  },
  logo: {
    color: colors.primary,
  },
  textContainer: {
    marginBottom: spacing.xxxl,
    alignItems: 'center',
  },
  title: {
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  },
});
