import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@theme';

export interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  fullScreen?: boolean;
  testID?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  color = colors.primary,
  fullScreen = false,
  testID,
}) => {
  if (fullScreen) {
    return (
      <View style={styles.fullScreen} testID={testID}>
        <ActivityIndicator size={size} color={color} />
      </View>
    );
  }

  return <ActivityIndicator size={size} color={color} testID={testID} />;
};

const styles = StyleSheet.create({
  fullScreen: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
});

