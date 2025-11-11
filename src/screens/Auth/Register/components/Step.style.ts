import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../../../theme';

export const stepStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  description: {
    color: colors.textSecondary,
  },
  form: {
    marginBottom: spacing.xl,
  },
  fieldSpacing: {
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  buttonHalf: {
    flex: 1,
  },
  buttonSpacing: {
    marginLeft: spacing.sm,
  },
  skipButton: {
    marginTop: spacing.md,
  },
  errorText: {
    color: colors.error,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  cardSpacing: {
    marginBottom: spacing.lg,
  },
  reviewSectionTitle: {
    marginBottom: spacing.sm,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  reviewRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  reviewLabel: {
    color: colors.textSecondary,
  },
  reviewValue: {
    color: colors.textPrimary,
    fontWeight: '600',
    flexShrink: 1,
    textAlign: 'right',
  },
  profileImageWrapper: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profileImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  profileImagePlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.backgroundSecondary,
  },
  profileImagePlaceholderText: {
    color: colors.textSecondary,
  },
});

