import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: spacing.md,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    color: colors.white,
  },
  name: {
    marginBottom: spacing.xs,
    color: colors.textPrimary,
  },
  email: {
    color: colors.textSecondary,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  cardTitle: {
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoLabel: {
    color: colors.textSecondary,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  },
  buttonIcon: {
    marginLeft: spacing.sm,
  },
});
