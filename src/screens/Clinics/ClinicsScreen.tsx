import React, { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import { mockApiService } from '@services';
import { colors, spacing } from '@theme';
import { useDataFetcher } from '@hooks/useDataFetcher';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ClinicsResponse, Clinic } from '@types';

const ITEM_HEIGHT = 120;

const ClinicItem = React.memo(({ clinic }: { clinic: Clinic }) => (
  <Card style={styles.clinicCard}>
    <Typography variant="h4" style={styles.clinicTitle}>
      {clinic.name}
    </Typography>
    <Typography variant="body2" style={styles.clinicText}>
      {clinic.address}
    </Typography>
    <Typography variant="body2" style={styles.clinicText}>
      Rating: {clinic.rating.toFixed(1)}
    </Typography>
    <Typography variant="caption" style={styles.specialties}>
      {clinic.specialties.join(', ')}
    </Typography>
  </Card>
));
ClinicItem.displayName = 'ClinicItem';

export const ClinicsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebouncedValue(searchQuery, 400);

  const { data, loading, error, refetch } = useDataFetcher<ClinicsResponse, [string]>(
    (query) =>
      query.trim()
        ? mockApiService.searchClinics(query)
        : mockApiService.getClinics(),
    {
      cacheKey: 'clinics',
      initialParams: [''],
      initialData: undefined,
    }
  );

  const clinics = useMemo(() => data?.clinics ?? [], [data]);

  const initialSearchRef = useRef(true);

  useEffect(() => {
    if (initialSearchRef.current) {
      initialSearchRef.current = false;
      return;
    }
    refetch([debouncedSearch]);
  }, [debouncedSearch, refetch]);

  const renderClinic = useCallback(({ item }: { item: Clinic }) => {
    return <ClinicItem clinic={item} />;
  }, []);

  const getItemLayout = useCallback((_, index: number) => {
    return {
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    };
  }, []);

  if (loading && clinics.length === 0) {
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
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
      <FlatList
        data={clinics}
        renderItem={renderClinic}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => refetch([debouncedSearch])} />
        }
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          !loading ? (
            <Typography variant="body2" style={styles.emptyText}>
              No clinics found.
            </Typography>
          ) : null
        }
        getItemLayout={getItemLayout}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
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
  clinicTitle: {
    marginBottom: spacing.xs,
  },
  clinicText: {
    color: colors.textSecondary,
  },
  specialties: {
    color: colors.textTertiary,
    marginTop: spacing.xs,
  },
  listContent: {
    paddingBottom: spacing.lg,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: spacing.lg,
    color: colors.textSecondary,
  },
  errorText: {
    marginBottom: spacing.sm,
    color: colors.error,
    textAlign: 'center',
  },
});
