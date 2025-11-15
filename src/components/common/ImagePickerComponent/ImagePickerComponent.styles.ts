import { StyleSheet } from 'react-native';
import { colors } from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  imageContainer: {
    alignItems: 'center',
    backgroundColor: colors.gray[100],
    borderColor: colors.border,
    borderStyle: 'dashed',
    borderWidth: 2,
    justifyContent: 'center',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderLabel: {
    color: colors.textSecondary,
    fontSize: 10,
  },
  placeholderText: {
    fontSize: 32,
    marginBottom: 4,
  },
  removeButton: {
    position: 'absolute',
    right: -3,
    top: -8,
    backgroundColor: colors.white,
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  removeIcon: {
    color: colors.error,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 18,
  },
});

