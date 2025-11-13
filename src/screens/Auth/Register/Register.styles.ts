import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between'
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
  },
  stepIndicator: {
    marginBottom: spacing.lg,
    alignItems: 'center',
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
});

