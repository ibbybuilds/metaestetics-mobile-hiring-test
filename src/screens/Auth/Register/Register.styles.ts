import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    marginTop: spacing.xl,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  stepIndicator: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  stepContainer: {
    flex: 1,
  },
  stepTitle: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  stepSubtitle: {
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  form: {
    flex: 1,
  },
  stepButton: {
    marginTop: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  buttonHalf: {
    flex: 1,
  },
  reviewContainer: {
    flex: 1,
  },
  reviewSection: {
    marginBottom: spacing.xl,
  },
  reviewItem: {
    marginBottom: spacing.md,
  },
  reviewLabel: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  reviewValue: {
    color: colors.textPrimary,
  },
  reviewImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: spacing.sm,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});
