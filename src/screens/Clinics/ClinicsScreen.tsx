import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem } from 'react-native';
import { Input, LoadingSpinner } from '@components/common';
import { mockApiService } from '@services';
import { colors, spacing } from '@theme';
import { Clinic } from '@types';
import { useDebounce } from '../../hooks/useDebounce';
import { ClinicItem } from './components';

export const ClinicsScreen: React.FC = () => {
  const [allClinics, setAllClinics] = useState<Clinic[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Debounce search query for optimal filtering performance
  const debouncedSearchQuery = useDebounce(searchQuery, 150);

  // Load initial clinics data
  useEffect(() => {
    loadClinics();
  }, []);

  const loadClinics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await mockApiService.getClinics();
      
      if (response.success) {
        setAllClinics(response.clinics);
      } else {
        setError('Failed to load clinics');
      }
    } catch (err) {
      setError('Failed to load clinics');
      console.error('Error loading clinics:', err);
    } finally {
      setLoading(false);
    }
  };

  // Memoized filtered clinics - instant local filtering
  const filteredClinics = useMemo(() => {
    if (debouncedSearchQuery.trim() === '') {
      return allClinics;
    }
    
    const query = debouncedSearchQuery.toLowerCase();
    return allClinics.filter(clinic =>
      clinic.name.toLowerCase().includes(query) ||
      clinic.address.toLowerCase().includes(query) ||
      clinic.specialties.some(specialty => 
        specialty.toLowerCase().includes(query)
      )
    );
  }, [allClinics, debouncedSearchQuery]);

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

  if (loading) {
    return <LoadingSpinner fullScreen />;
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
});

