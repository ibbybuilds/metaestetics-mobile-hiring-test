import React, { useState, useMemo, useCallback } from "react";
import { View, FlatList, StyleSheet, ListRenderItem } from "react-native";
import {
  Card,
  Typography,
  Input,
  LoadingSpinner,
  Button,
} from "@components/common";
import { Clinic, MainStackParamList } from "@types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { useDebounce } from "@hooks/useDebounce";
import { useClinicData } from "@hooks/useClinicData";
import { colors, spacing } from "@theme";

// Memoized clinic item component to prevent unnecessary re-renders
const ClinicItem = React.memo<{
  clinic: Clinic;
  onBookPress: (id: string) => void;
}>(({ clinic, onBookPress }) => {
  return (
    <Card style={styles.clinicCard}>
      <Typography variant="h4">{clinic.name}</Typography>
      <Typography variant="body2">{clinic.address}</Typography>
      <Typography variant="body2">
        Rating: {clinic.rating.toFixed(1)}
      </Typography>
      {clinic.specialties && clinic.specialties.length > 0 && (
        <Typography variant="caption" style={styles.specialties}>
          {clinic.specialties.join(", ")}
        </Typography>
      )}
      <Button
        title="Book Appointment"
        onPress={() => onBookPress(clinic.id)}
        style={styles.bookButton}
        size="small"
      />
    </Card>
  );
});

ClinicItem.displayName = "ClinicItem";

// Empty component for when no results are found
const EmptyComponent = () => (
  <View style={styles.emptyContainer}>
    <Typography variant="body1" style={styles.emptyText}>
      No clinics found
    </Typography>
  </View>
);

export const ClinicsScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  // Use the reusable data fetching hook
  const { data: clinics, loading, error } = useClinicData();

  // Debounce search query to prevent filtering on every keystroke
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Memoize filtered clinics - only recalculate when clinics or debounced query changes
  const filteredClinics = useMemo(() => {
    if (!clinics) {
      return [];
    }

    if (!debouncedSearchQuery.trim()) {
      return clinics;
    }

    const queryLower = debouncedSearchQuery.toLowerCase();
    return clinics.filter(
      (clinic) =>
        clinic.name.toLowerCase().includes(queryLower) ||
        clinic.address.toLowerCase().includes(queryLower) ||
        (clinic.specialties &&
          clinic.specialties.some((specialty) =>
            specialty.toLowerCase().includes(queryLower)
          ))
    );
  }, [clinics, debouncedSearchQuery]);
  console.log("filteredClinics", filteredClinics);

  // Memoize renderItem callback
  const renderItem: ListRenderItem<Clinic> = useCallback(
    ({ item }) => (
      <ClinicItem
        clinic={item}
        onBookPress={(id) => navigation.navigate("Booking", { clinicId: id })}
      />
    ),
    [navigation]
  );

  // Memoize keyExtractor callback
  const keyExtractor = useCallback((item: Clinic) => item.id, []);

  // Memoize search change handler
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  if (loading && !clinics) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Search clinics..."
        value={searchQuery}
        onChangeText={handleSearchChange}
        style={styles.searchInput}
      />
      {error && (
        <Typography variant="caption" style={styles.errorText}>
          {error}
        </Typography>
      )}
      <Button
        title="My Appointments"
        onPress={() => navigation.navigate("MyAppointments")}
        style={styles.myAppointmentsButton}
        variant="outline"
      />
      <FlatList
        data={filteredClinics}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ListEmptyComponent={EmptyComponent}
        // Performance optimizations
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews={true}
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
    marginBottom: spacing.sm,
  },
  myAppointmentsButton: {
    marginBottom: spacing.md,
  },

  clinicCard: {
    marginBottom: spacing.sm,
  },
  specialties: {
    marginTop: spacing.xs,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  bookButton: {
    marginTop: spacing.sm,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.xl,
  },
  emptyText: {
    color: colors.textSecondary,
  },
  errorText: {
    color: colors.error,
    marginBottom: spacing.sm,
  },
});
