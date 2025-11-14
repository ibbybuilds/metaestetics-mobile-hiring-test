import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@components/common';

interface EmptyListProps {
  searchQuery: string;
}

export const EmptyList: React.FC<EmptyListProps> = ({ searchQuery }) => {
  const message = searchQuery
    ? `No results found for "${searchQuery}".`
    : 'No clinics available at the moment.';

  return (
    <View style={styles.emptyList}>
      <Typography variant="body1">{message}</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    padding: 20,
    alignItems: 'center',
  },
});
