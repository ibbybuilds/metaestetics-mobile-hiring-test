import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Input, LoadingSpinner, Typography } from '@components/common';
import { styles } from './ClinicsScreen.styles';
import { ClinicData } from '@types';
import { colors } from '@theme';
import { useDebouncedValue } from '@hooks/useDebouncedValue';
import { ClinicItem } from './components/ClinicItem';
import { EmptyList } from './components/EmptyList';
import { useClinicData } from '@hooks/useClinicData';
import Ionicons from '@expo/vector-icons/Ionicons';

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
    if (text != searchQuery) {
      setSearchQuery(text);
      setIsSearching(true);
    }
  };

  useEffect(() => {
    setIsSearching(false);
  }, [debouncedSearch]);

  // Memoized render
  const renderClinic = useCallback(
    ({ item }: { item: ClinicData }) => <ClinicItem data={item} />,
    []
  );

  const refresh = () => {
    setSearchQuery('');
    refetch();
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (loading) {
    return <LoadingSpinner text="Loading clinics..." fullScreen />;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.container}>
        {clinics && clinics.length > 0 && (
          <Input
            placeholder="Search clinics..."
            value={searchQuery}
            onChangeText={handleSearchChange}
            style={styles.searchInput}
            leftIcon={
              isSearching ? (
                <ActivityIndicator size="small" style={styles.searchIconLeft} />
              ) : (
                <Ionicons name="search-outline" size={24} style={styles.searchIconLeft} />
              )
            }
            rightIcon={
              searchQuery && (
                <TouchableOpacity onPress={clearSearch} activeOpacity={1}>
                  <Ionicons name="close" size={24} style={styles.searchIconRight} />
                </TouchableOpacity>
              )
            }
          />
        )}
        {debouncedSearch && filteredClinics.length != 0 && (
          <View style={styles.searchDescription}>
            <Typography color={colors.textSecondary}>
              {filteredClinics.length} clinic{filteredClinics.length > 1 ? 's' : ''} found for "
              {debouncedSearch}"
            </Typography>
          </View>
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
          onRefresh={() => refresh()}
          contentContainerStyle={filteredClinics.length === 0 && styles.emptyListContainer}
        />
      </View>
    </KeyboardAvoidingView>
  );
};
