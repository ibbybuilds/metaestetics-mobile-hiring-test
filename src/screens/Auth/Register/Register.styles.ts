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
  stepIndicator: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  title: {
    paddingBottom: spacing.md,
    color: colors.primaryDark,
    fontWeight: "900",
    fontSize: 64,
    lineHeight: 56,
  },
  subtitle: {
    marginBottom: spacing.xl,
    color: colors.textSecondary,
  },
  form: {
    gap: spacing.xs,
  },
  nextButton: {
    marginBottom: 'auto',
    alignSelf: 'flex-end',
    marginLeft: 'auto',
  },
  backButton: {
    marginBottom: 'auto',
    alignSelf: 'flex-start',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
});