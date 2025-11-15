import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  arrow: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  container: {
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: spacing.xs,
  },
  label: {
    color: colors.textPrimary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    paddingBottom: spacing.lg,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  option: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    padding: spacing.md,
  },
  optionSelected: {
    backgroundColor: colors.gray[50],
  },
  optionText: {
    color: colors.textPrimary,
  },
  optionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  placeholder: {
    color: colors.textTertiary,
  },
  selectButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 44,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
  },
  selectButtonError: {
    borderColor: colors.error,
  },
  selectText: {
    color: colors.textPrimary,
    flex: 1,
  },
});

