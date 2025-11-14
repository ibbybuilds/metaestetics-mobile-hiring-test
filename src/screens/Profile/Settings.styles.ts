import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    padding: spacing.xl,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
});

