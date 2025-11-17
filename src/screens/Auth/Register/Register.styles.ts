import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  stepIndicator: {
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  indicator: {
    flexDirection: 'row',
    gap: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  step: {
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[100],
    width: 30,
    outlineColor: colors.gray[100],
    outlineWidth: 1,
  },
  completedStep: {
    backgroundColor: colors.primary,
    outlineColor: colors.primary,
  },
  currentStep: {
    outlineColor: colors.primary,
  },
  editStep: {
    opacity: 0.5,
  },
});
