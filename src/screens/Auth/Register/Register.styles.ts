import { StyleSheet } from 'react-native';
import { colors, spacing } from '@theme/index';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  scrollContent: {
    flexGrow: 1,
  },
  stepIndicator: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  stepText: {
    color: colors.textSecondary,
    fontWeight: '500',
  },
  subContainer:{ flex: 1 }
});

