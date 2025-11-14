import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import { colors, spacing } from '@theme';
import { useDebounce } from '../../hooks/useDebounce';
import { useClinicData } from '../../hooks/useClinicData';

interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
}

const ClinicCard = React.memo(({ item }: { item: Clinic }) => (
  <Card style={styles.clinicCard}>
    <Typography variant="h4">{item.name}</Typography>
    <Typography variant="body2">{item.address}</Typography>
    <Typography variant="body2">Rating: {item.rating.toFixed(1)}</Typography>
  </Card>
));

ClinicCard.displayName = 'ClinicCard';

export const ClinicsScreen: React.FC = () => {
  const { data: clinics, loading } = useClinicData();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Memoized filtered results — only recalculate when clinics or debounced query changes
  const filteredClinics = useMemo(() => {
    if (!debouncedSearchQuery.trim()) return clinics;

    const query = debouncedSearchQuery.toLowerCase();
    return clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(query) ||
      clinic.address.toLowerCase().includes(query)
    );
  }, [clinics, debouncedSearchQuery]);

  // Memoized render callback to prevent re-creation
  const renderClinic = useCallback(
    ({ item }: { item: Clinic }) => <ClinicCard item={item} />,
    []
  );

  const keyExtractor = useCallback((item: Clinic) => item.id, []);

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
        removeClippedSubviews
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={10}
        scrollEnabled
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

