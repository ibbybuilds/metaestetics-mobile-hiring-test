import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { View, FlatList, StyleSheet, ListRenderItemInfo } from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import { colors, spacing } from '@theme';
import { useData } from '@hooks';

interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
}

const ClinicCard = React.memo<{ item: Clinic }>(({ item }) => (
  <Card style={styles.clinicCard}>
    <Typography variant="h4">{item.name}</Typography>
    <Typography variant="body2">{item.address}</Typography>
    <Typography variant="body2">Rating: {item.rating.toFixed(1)}</Typography>
  </Card>
));

const fetchClinics = async (): Promise<Clinic[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return Array.from({ length: 100 }, (_, i) => ({
    id: `clinic-${i}`,
    name: `Clinic ${i + 1}`,
    address: `${i + 1} Main Street`,
    rating: Math.random() * 5,
  }));
};

export const ClinicsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const { data: clinics, loading, error } = useData<Clinic[]>(
    fetchClinics,
    {
      cacheKey: 'clinics-list',
      cacheTime: 5 * 60 * 1000,
    }
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  const filteredClinics = useMemo(() => {
    if (!clinics) return [];
    if (!debouncedQuery) return clinics;

    const lowerQuery = debouncedQuery.toLowerCase();
    return clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(lowerQuery) ||
      clinic.address.toLowerCase().includes(lowerQuery)
    );
  }, [clinics, debouncedQuery]);

  const renderClinic = useCallback(({ item }: ListRenderItemInfo<Clinic>) => {
    return <ClinicCard item={item} />;
  }, []);

  const keyExtractor = useCallback((item: Clinic) => item.id, []);

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Typography variant="body1" style={{ color: 'red', textAlign: 'center' }}>
          Error: {error}
        </Typography>
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
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews={true}
        initialNumToRender={10}
        updateCellsBatchingPeriod={50}
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
