import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Input, LoadingSpinner } from '@components/common';
import { styles } from './ClinicsScreen.styles';
import { ClinicData } from '@types';
import { colors } from '@theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ClinicItem } from './components/ClinicItem';
import { EmptyList } from './components/EmptyList';
import { useClinicData } from '@hooks/useClinicData';

export const ClinicsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const flatListRef = useRef<FlatList<ClinicData>>(null);

  // Initial load
  const { clinics, loading, error, refetch } = useClinicData();

  // Memoized search
  const filteredClinics = useMemo(() => {
    if (!clinics) return [];

    const q = debouncedSearch.toLowerCase();
    if (!q) return clinics;

    return clinics?.filter(
      (clinic) => clinic.name.toLowerCase().includes(q) || clinic.address.toLowerCase().includes(q)
    );
  }, [clinics, debouncedSearch]);

  useEffect(() => {
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [filteredClinics]);

  const handleSearchChange = (text: string) => {
    setSearchQuery(text);
    setIsSearching(true);
  };

  useEffect(() => {
    setIsSearching(false);
  }, [debouncedSearch]);

  // Memoized render
  const renderClinic = useCallback(
    ({ item }: { item: ClinicData }) => <ClinicItem data={item} />,
    []
  );

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      {clinics && clinics.length > 0 && (
        <Input
          placeholder="Search clinics..."
          value={searchQuery}
          onChangeText={handleSearchChange}
          style={styles.searchInput}
          rightIcon={
            isSearching && (
              <ActivityIndicator
                size="small"
                color={colors.gray[500]}
                style={styles.searchLoader}
              />
            )
          }
        />
      )}
      <FlatList
        ref={flatListRef}
        style={styles.content}
        data={filteredClinics}
        renderItem={renderClinic}
        keyExtractor={(item) => item.id}
        initialNumToRender={12}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: 100,
          offset: 100 * index,
          index,
        })}
        ListEmptyComponent={<EmptyList searchQuery={searchQuery} />}
        refreshing={loading}
        onRefresh={refetch}
      />
    </View>
  );
};
