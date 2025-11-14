import { StyleSheet } from 'react-native';
import { colors } from '@theme';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  touchable: {
    width: '100%',
  },
  icon: {
    fontSize: 20,
  },
  input: {
    backgroundColor: colors.white,
    color: colors.black,
    pointerEvents: "none",
  },
});

