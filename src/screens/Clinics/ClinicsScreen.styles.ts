import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.sm,
  },
  searchInput: {
    marginHorizontal: spacing.md,
  },
  searchIconLeft: {
    marginLeft: spacing.md,
    color: colors.gray[500],
  },
  searchIconRight: {
    marginRight: spacing.md,
    color: colors.primary,
    backgroundColor: 'transparent',
  },
  content: {
    paddingVertical: spacing.sm,
  },
  searchDescription: {
    marginHorizontal: spacing.md,
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
