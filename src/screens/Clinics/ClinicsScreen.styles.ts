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
  searchLoader: {
    marginRight: spacing.lg,
  },
  content: {
    paddingVertical: spacing.md,
  },
});
