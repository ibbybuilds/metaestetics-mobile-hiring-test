import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputWrapper: {
    flex: 1,
  },
  imageWrapper: {
    flex: 1,
  },
  formFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  formButton: {
    flex: 1,
  },
  profileImageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.sm,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  review: {
    flex: 1,
  },
  reviewSection: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: spacing.md,
  },
  subtle: {
    color: colors.textSecondary,
  },
  sectionItem: {
    marginBottom: spacing.sm,
  }
});
