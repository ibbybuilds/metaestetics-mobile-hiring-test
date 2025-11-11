import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  header: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  removePhotoButton: {
    marginTop: spacing.sm,
  },
  form: {
    flex: 1,
  },
  fieldSpacing: {
    marginBottom: spacing.md,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.xl,
  },
  buttonHalf: {
    flex: 1,
  },
  buttonSpacing: {
    marginLeft: spacing.sm,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
    marginTop: spacing.lg,
  },
});

