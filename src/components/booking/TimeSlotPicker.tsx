import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Slot } from "@types";
import { colors } from "@theme/colors";
import { formatTime } from "@utils/formatters";

interface TimeSlotPickerProps {
  slots: Slot[];
  selectedSlotId?: string;
  onSlotSelect: (slotId: string) => void;
  loading?: boolean;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  slots,
  selectedSlotId,
  onSlotSelect,
  loading = false,
}) => {
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (slots.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No available slots for this date.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Slot }) => {
    const isSelected = item.id === selectedSlotId;
    const isBooked = item.isBooked;

    // Format time using helper
    const time = formatTime(item.startTime);

    return (
      <TouchableOpacity
        style={[
          styles.slot,
          isSelected && styles.selectedSlot,
          isBooked && styles.bookedSlot,
        ]}
        onPress={() => !isBooked && onSlotSelect(item.id)}
        disabled={isBooked}
      >
        <Text
          style={[
            styles.slotText,
            isSelected && styles.selectedSlotText,
            isBooked && styles.bookedSlotText,
          ]}
        >
          {time}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Available Times</Text>
      <FlatList
        data={slots}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        columnWrapperStyle={styles.row}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 12,
  },
  loadingContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
  row: {
    justifyContent: "space-between",
  },
  slot: {
    width: "30%",
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    alignItems: "center",
    marginBottom: 12,
  },
  selectedSlot: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  bookedSlot: {
    backgroundColor: colors.gray[100],
    borderColor: colors.gray[200],
    opacity: 0.6,
  },
  slotText: {
    color: colors.textPrimary,
    fontWeight: "500",
  },
  selectedSlotText: {
    color: colors.white,
  },
  bookedSlotText: {
    color: colors.textTertiary,
    textDecorationLine: "line-through",
  },
});
