import React, { useState, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, TouchableOpacity } from 'react-native';
import { Input, LoadingSpinner, Typography } from '@components/common';
import { colors, spacing } from '@theme';
import { Clinic } from '@types';
import { useClinicData } from '../../hooks/useClinicData';
import { ClinicItem } from './components';

export const ClinicsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch and search clinics with automatic debouncing and caching
  const { data: clinics, loading, error, refetch } = useClinicData(searchQuery);

  // Safe data fallback
  const filteredClinics = clinics || [];

  // Memoized render item callback
  const renderClinic: ListRenderItem<Clinic> = useCallback(({ item }) => {
    return <ClinicItem clinic={item} />;
  }, []);

  // Memoized key extractor
  const keyExtractor = useCallback((item: Clinic) => item.id, []);

  // Memoized get item layout for better scrolling performance
  const getItemLayout = useCallback((_: any, index: number) => ({
    length: 120, // Approximate height of each clinic card
    offset: 120 * index,
    index,
  }), []);

  if (loading && !clinics) {
    return <LoadingSpinner fullScreen />;
  }

  if (error && !clinics) {
    return (
      <View style={styles.errorContainer}>
        <Typography variant="h3">Error Loading Clinics</Typography>
        <Typography variant="body2" style={styles.errorText}>
          {error}
        </Typography>
        <TouchableOpacity onPress={refetch}>
          <Typography variant="body2" style={styles.retryText}>
            Tap to retry
          </Typography>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search clinics..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
      />
      
      <FlatList
        data={filteredClinics}
        renderItem={renderClinic}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        // Pull to refresh
        refreshing={loading}
        onRefresh={refetch}
        // Performance optimizations
        removeClippedSubviews={true}
        maxToRenderPerBatch={15}
        updateCellsBatchingPeriod={50}
        initialNumToRender={15}
        windowSize={5}
        // Better scrolling performance
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
        // Optimize memory usage
        disableVirtualization={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  searchInput: {
    marginBottom: spacing.md,
  },
  clinicCard: {
    marginBottom: spacing.sm,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  errorText: {
    textAlign: 'center',
    marginTop: spacing.sm,
    color: colors.error || '#FF6B6B',
  },
  retryText: {
    textAlign: 'center',
    marginTop: spacing.md,
    color: colors.primary || '#007AFF',
    textDecorationLine: 'underline',
  },
});

