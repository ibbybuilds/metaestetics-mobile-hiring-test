import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
  },
});

