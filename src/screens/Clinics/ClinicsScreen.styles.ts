import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
  },
  searchInput: {
    marginHorizontal: spacing.md,
  },
  searchIcon: {
    marginLeft: spacing.md,
    color: colors.gray[500],
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
