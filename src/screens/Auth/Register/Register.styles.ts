import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: spacing.xl, // Remove flex: 1
  },
  stepIndicator: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  formContainer: {
    flex: 1,
    gap: spacing.sm,
  },
  button: {
    width: '48%',
    alignSelf: 'center',
    marginTop: spacing.lg,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stepTitle: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.textPrimary,
  },
  title: {
    textAlign: 'center',
    color: colors.textPrimary,
  },
  description: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    color: colors.textSecondary,
  },
  reviewContent: {
    flexGrow: 1,
    paddingBottom: spacing.md,
  },
  reviewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
    paddingVertical: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reviewLabel: {
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  profilePhotoContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  profilePhoto: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

