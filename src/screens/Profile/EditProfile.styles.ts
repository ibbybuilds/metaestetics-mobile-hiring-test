import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
    padding: spacing.xl,
  },
  form: {
    flex: 1,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  buttonHalf: {
    flex: 1,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
