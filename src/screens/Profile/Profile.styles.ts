import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme/index';

export const styles = StyleSheet.create({
  avatarPlaceholder: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 60,
    height: 120,
    justifyContent: 'center',
    marginBottom: spacing.md,
    width: 120,
  },
  avatarText: {
    color: colors.white,
  },
  button: {
    marginBottom: spacing.sm,
  },
  buttonContainer: {
    gap: spacing.md,
  },
  cardTitle: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  container: {
    backgroundColor: colors.backgroundSecondary,
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  email: {
    color: colors.textSecondary,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  infoCard: {
    marginBottom: spacing.lg,
  },
  infoLabel: {
    color: colors.textSecondary,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  infoValue: {
    color: colors.textPrimary,
    fontWeight: '500',
  },
  name: {
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  profileImage: {
    borderRadius: 60,
    height: 120,
    marginBottom: spacing.md,
    width: 120,
  },
});

