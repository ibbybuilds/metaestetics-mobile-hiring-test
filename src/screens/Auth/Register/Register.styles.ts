import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  stepIndicatorContainer: {
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  stepIndicator: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  stepTitle: {
    textAlign: 'left',
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  stepDescription: {
    textAlign: 'left',
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  progressBar: {
    width: 200,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    marginTop: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
});

