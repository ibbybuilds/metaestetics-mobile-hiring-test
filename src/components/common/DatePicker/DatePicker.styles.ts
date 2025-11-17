import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {
    fontSize: 20,
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    minHeight: 48,
  },
  label: {
    color: colors.gray[700],
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '50%',
    
    paddingBottom: spacing.xl,
    paddingTop: spacing.md,
  },
  modalHeader: {
    alignItems: 'center',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
  },
  modalOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  picker: {
    height: 200,
    alignSelf:"center",
  },
  touchable: {
    width: '100%',
  },
});

