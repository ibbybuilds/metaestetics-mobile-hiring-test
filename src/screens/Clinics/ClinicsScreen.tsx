import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import useClinicData from '../../hooks/useClinicData';
import useDebounce from '../../hooks/useDebounce';
import { mockApiService } from '@services/mock-api.service';
import { colors } from '@theme/colors';
import { spacing } from '@theme/spacing';

/**
 * ClinicsScreen component displays a list of clinics, with search and performance optimizations.
 */
export const ClinicsScreen: React.FC = () => {
  // Fetch clinic data using the custom useClinicData hook (TASK 4)
  const { data: clinics, isLoading, error } = useClinicData(mockApiService.getClinics);
  
  // State for the search input query
  const [searchQuery, setSearchQuery] = useState('');
  
  // Debounce the search query to prevent excessive filtering on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  /**
   * Memoized list of clinics filtered by the debounced search query.
   * This prevents re-filtering the entire list on every render unless clinics or the debounced query changes.
   */
  const filteredClinics = useMemo(() => {
    if (!clinics || !clinics.clinics) return [];
    return clinics.clinics.filter((clinic: { name: string; address: string; }) =>
      clinic.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      clinic.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
  }, [clinics, debouncedSearchQuery]);

  /**
   * Memoized render function for each clinic item in the FlatList.
   * useCallback prevents this function from being recreated on every render of ClinicsScreen,
   * which helps FlatList optimize re-renders of individual items.
   */
  const renderClinic = useCallback(({ item }: { item: any }) => {
    return (
      <Card style={styles.clinicCard}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="body2">{item.address}</Typography>
        <Typography variant="body2">Rating: {item.rating.toFixed(1)}</Typography>
      </Card>
    );
  }, []);

  /**
   * Optimization for FlatList: provides item layout information without needing to measure.
   * This significantly improves scrolling performance for large lists with fixed-height items.
   * Assumes a fixed item height of 120.
   */
  const getItemLayout = useCallback(
    (data: any, index: number) => ({
      length: 120, // Estimated item height
      offset: 120 * index,
      index,
    }),
    []
  );

  // Display a loading spinner while data is being fetched
  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // Display an error message if data fetching fails
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Typography variant="h3" style={styles.errorText}>Error: {error}</Typography>
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
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout} // FlatList optimization
        windowSize={10} // FlatList optimization
        initialNumToRender={7} // FlatList optimization
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
    padding: spacing.md,
  },
  errorText: {
    color: colors.error,
    textAlign: 'center',
  },
});

