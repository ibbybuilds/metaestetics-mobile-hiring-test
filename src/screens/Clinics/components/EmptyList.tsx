import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@components/common';
import Ionicons from '@expo/vector-icons/Ionicons';
import { spacing } from '@theme';

interface EmptyListProps {
  searchQuery: string;
}

export const EmptyList: React.FC<EmptyListProps> = ({ searchQuery }) => {
  const message = searchQuery
    ? `No clinics found for "${searchQuery}".`
    : 'No clinics available at the moment.';

  return (
    <View style={styles.emptyList}>
      <Ionicons name="search-outline" size={32} style={styles.icon} />
      <Typography variant="body1">{message}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    padding: 20,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  icon: {
    marginBottom: spacing.sm,
  },
});
