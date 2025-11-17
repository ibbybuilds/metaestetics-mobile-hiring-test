import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { View, FlatList, StyleSheet, ListRenderItem, FlatListProps } from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import { colors, spacing } from '../../theme';
import { useClinicData } from '../../hooks/useClinicData';

interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
}

const ITEM_HEIGHT = 116;
const DEBOUNCE_DELAY = 250;

export const ClinicsScreen: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  const {
    data: clinics,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useClinicData();

  const handleSearchChange = useCallback(
    (text: string) => {
      setSearchInput(text);
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }

      searchTimeout.current = setTimeout(() => {
        setSearchQuery(text);
      }, DEBOUNCE_DELAY);
    },
    []
  );

  const filteredClinics = useMemo(() => {
    const activeQuery = searchQuery.trim().toLowerCase();

    if (!activeQuery) {
      return clinics ?? [];
    }

    return (clinics ?? []).filter((clinic) => {
      return (
        clinic.name.toLowerCase().includes(activeQuery) ||
        clinic.address.toLowerCase().includes(activeQuery)
      );
    });
  }, [clinics, searchQuery]);

  const keyExtractor = useCallback((item: Clinic) => item.id, []);

  const renderClinic: ListRenderItem<Clinic> = useCallback(({ item }) => {
    return (
      <Card style={styles.clinicCard}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="body2">{item.address}</Typography>
        <Typography variant="body2">
          Rating: {item.rating.toFixed(1)}
        </Typography>
      </Card>
    );
  }, []);

  const itemLayout = useCallback<
    NonNullable<FlatListProps<Clinic>['getItemLayout']>
  >((_data: ArrayLike<Clinic> | null | undefined, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  }), []);

  const listEmptyComponent = useMemo(() => {
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.emptyState}>
        <Typography variant="h4" style={styles.emptyTitle}>
          No clinics found
        </Typography>
        <Typography variant="body2" style={styles.emptySubtitle}>
          Try adjusting your search to find what you&apos;re looking for.
        </Typography>
      </View>
    );
  }, [isLoading]);

  const refreshing = isFetching && !isLoading;

  React.useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  if (isLoading && !(clinics?.length)) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search clinics..."
        value={searchInput}
        onChangeText={handleSearchChange}
        style={styles.searchInput}
      />

      {error ? (
        <View style={styles.errorContainer}>
          <Typography variant="body2" style={styles.errorText}>
            {error}
          </Typography>
        </View>
      ) : null}

      <FlatList
        data={filteredClinics}
        renderItem={renderClinic}
        keyExtractor={keyExtractor}
        ListEmptyComponent={listEmptyComponent}
        contentContainerStyle={
          filteredClinics.length === 0 ? styles.emptyListContent : undefined
        }
        keyboardShouldPersistTaps="handled"
        initialNumToRender={12}
        maxToRenderPerBatch={12}
        windowSize={5}
        removeClippedSubviews
        updateCellsBatchingPeriod={50}
        getItemLayout={itemLayout}
        onEndReachedThreshold={0.2}
        refreshing={refreshing}
        onRefresh={() => {
          void refetch();
        }}
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
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  emptyTitle: {
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    maxWidth: 280,
  },
  emptyListContent: {
    flexGrow: 1,
  },
  errorContainer: {
    padding: spacing.sm,
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  errorText: {
    color: colors.error,
  },
});

