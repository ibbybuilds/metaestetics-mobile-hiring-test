import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
  },
  label: {
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    color: colors.textSecondary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  actions: {
    marginTop: spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    flex: 1,
    marginHorizontal: 6,
  },
  loading: {
    marginTop: spacing.md,
  },

  /* new styles */
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  profileImage: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginRight: spacing.md,
    backgroundColor: colors.surface,
  },
  imagePlaceholder: {
    width: 84,
    height: 84,
    borderRadius: 42,
    marginRight: spacing.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changePhotoBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.surface,
  },

  pickerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: 20,
  },
  pickerCard: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: spacing.lg,
  },
  pickerTitle: {
    marginBottom: spacing.sm,
  },
  option: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
});

