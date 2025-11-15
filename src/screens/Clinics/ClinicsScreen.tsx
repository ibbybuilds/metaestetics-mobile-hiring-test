import React, { useState, useCallback, useRef, useMemo } from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, FlatListProps } from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import { Text } from 'react-native';
import { colors, spacing } from '../../theme';
import useDebouncedValue from '@hooks/useDebouncedValue';
import { useClinicData } from '@hooks/useClinicData';

// Add at the top of the file, after imports

declare global {
  // eslint-disable-next-line no-var
  var gmlogs: Array<{ event: string; time: number; timestamp: number }> | undefined;
}

// Clinic type for explicit typing
interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
}

export const ClinicsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const flatListRef = useRef<FlatList<Clinic>>(null);
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);

  // Use the custom clinic data hook (which uses React Query under the hood)
  const { data: clinics = [], isLoading, error } = useClinicData();

  // Memoized filtered clinics for performance
  const filteredClinics = useMemo(
    () =>
      clinics.filter(
        (clinic) =>
          clinic.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
          clinic.address.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      ),
    [clinics, debouncedSearchQuery]
  );

  // Memoized renderClinic for performance and accessibility
  const renderClinic: ListRenderItem<Clinic> = useCallback(
    ({ item }) => (
      <View
        accessible
        accessibilityLabel={`Clinic: ${item.name}, Address: ${item.address}, Rating: ${item.rating.toFixed(1)}`}
        accessibilityRole="summary"
      >
        <Card style={styles.clinicCard}>
          <Typography variant="h4">{item.name}</Typography>
          <Typography variant="body2">{item.address}</Typography>
          <Text style={styles.ratingText}>{`Rating: ${item.rating.toFixed(1)}`}</Text>
        </Card>
      </View>
    ),
    []
  );

  // For fixed height optimization (if all cards are same height)
  const getItemLayout: FlatListProps<Clinic>["getItemLayout"] = useCallback(
    (_data: ArrayLike<Clinic> | null | undefined, index: number) => ({ length: 100, offset: 100 * index, index }),
    []
  );

  // --- Performance Metrics Logging for FlatList (Expo Go compatible) ---
  const flatListRenderStart = useRef<number | null>(null);

  const getNow = () => {
    if (typeof performance !== 'undefined' && performance.now) {
      return performance.now();
    }
    return Date.now();
  };

  const onFlatListLayout = useCallback(() => {
    flatListRenderStart.current = getNow();
  }, []);

  const onFlatListContentSizeChange = useCallback(() => {
    if (flatListRenderStart.current !== null) {
      const renderTime = getNow() - flatListRenderStart.current;
      if (typeof global !== 'undefined' && global.gmlogs) {
        global.gmlogs.push({
          event: 'ClinicsFlatListRender',
          time: renderTime,
          timestamp: Date.now(),
        });
      } else {
        // Fallback: log to console for manual metrics
        console.log('[Performance] Clinics FlatList render time (ms):', renderTime);
      }
      flatListRenderStart.current = null;
    }
  }, []);

  if (isLoading) return <LoadingSpinner fullScreen />;
  if (error) return <Text>Failed to load clinics.</Text>;

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search clinics..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        accessibilityLabel="Search clinics"
      />
      <FlatList
        ref={flatListRef}
        data={filteredClinics}
        keyExtractor={(item) => item.id}
        renderItem={renderClinic}
        getItemLayout={getItemLayout}
        onLayout={onFlatListLayout}
        onContentSizeChange={onFlatListContentSizeChange}
        contentContainerStyle={styles.listContent}
        accessibilityLabel="Clinics list"
        accessibilityRole="list"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  clinicCard: {
    marginBottom: spacing.sm,
    margin: spacing.md,
    elevation: 2,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  container: {
    backgroundColor: colors.background,
    flex: 1,
    padding: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  ratingText: {
    color: colors.primary,
    fontWeight: 'bold',
    marginTop: spacing.xs,
  },
  searchInput: {
    margin: spacing.md,
    marginBottom: spacing.sm,
  },
});

