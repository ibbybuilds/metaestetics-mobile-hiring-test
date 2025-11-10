import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Typography, Input, LoadingSpinner } from '@components/common';
import { mockApiService } from '@services';
import { colors, spacing } from '@theme';

// This is intentionally slow and inefficient - candidates need to optimize it
export const ClinicsScreen: React.FC = () => {
  const [clinics, setClinics] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClinics();
  }, []);

  // Intentionally inefficient - fetches all clinics every time
  const loadClinics = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockClinics = Array.from({ length: 100 }, (_, i) => ({
      id: `clinic-${i}`,
      name: `Clinic ${i + 1}`,
      address: `${i + 1} Main Street`,
      rating: Math.random() * 5,
    }));
    setClinics(mockClinics);
    setLoading(false);
  };

  // Intentionally inefficient - filters on every keystroke without debouncing
  const filteredClinics = clinics.filter(clinic =>
    clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    clinic.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderClinic = ({ item }: { item: any }) => {
    // Intentionally inefficient - creates new component on every render
    return (
      <Card style={styles.clinicCard}>
        <Typography variant="h4">{item.name}</Typography>
        <Typography variant="body2">{item.address}</Typography>
        <Typography variant="body2">Rating: {item.rating.toFixed(1)}</Typography>
      </Card>
    );
  };

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
        keyExtractor={(item) => item.id}
        // Intentionally missing performance optimizations
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

