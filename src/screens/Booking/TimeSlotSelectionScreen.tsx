import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { MainStackParamList } from "@types";
import {
  fetchSlots,
  createBooking,
  resetBookingStatus,
  clearSlots,
  cancelBooking,
  fetchUserBookings,
} from "@store/booking/bookingSlice";
import { TimeSlotPicker } from "@components/booking/TimeSlotPicker";
import { colors } from "@theme/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { formatTime } from "@utils/formatters";

type TimeSlotSelectionScreenRouteProp = RouteProp<
  MainStackParamList,
  "TimeSlotSelection"
>;
type TimeSlotSelectionScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "TimeSlotSelection"
>;

export const TimeSlotSelectionScreen = () => {
  const route = useRoute<TimeSlotSelectionScreenRouteProp>();
  const navigation = useNavigation<TimeSlotSelectionScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { clinicId, selectedDate, note } = route.params;

  const { slots, loading, error, bookingSuccess, userBookings } = useSelector(
    (state: RootState) => state.booking
  );

  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(fetchSlots({ clinicId, date: selectedDate }));
    dispatch(fetchUserBookings());
    return () => {
      dispatch(clearSlots());
    };
  }, [dispatch, clinicId, selectedDate]);

  useEffect(() => {
    if (bookingSuccess) {
      Alert.alert("Success", "Appointment booked successfully!", [
        {
          text: "OK",
          onPress: () => {
            dispatch(resetBookingStatus());
            // Pop back to the root screen (Clinics) while preserving the navigation stack
            navigation.pop(2);
          },
        },
      ]);
    }
  }, [bookingSuccess, dispatch, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert("Error", error, [
        { text: "OK", onPress: () => dispatch(resetBookingStatus()) },
      ]);
    }
  }, [error, dispatch]);

  const handleSlotSelect = (slotId: string) => {
    setSelectedSlotId(slotId);

    // Find the selected slot details
    const selectedSlot = slots.find((s) => s.id === slotId);
    if (!selectedSlot) return;

    // Check for conflicting booking
    const conflictingBooking = userBookings.find(
      (booking) =>
        booking.status !== "cancelled" &&
        booking.slot.startTime === selectedSlot.startTime
    );

    if (conflictingBooking) {
      Alert.alert(
        "Conflicting Appointment",
        `You already have an appointment at ${formatTime(
          selectedSlot.startTime
        )} with ${conflictingBooking.clinicName}. Do you want to replace it?`,
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => setSelectedSlotId(undefined),
          },
          {
            text: "Replace",
            style: "destructive",
            onPress: async () => {
              await dispatch(cancelBooking(conflictingBooking.id));
              dispatch(
                createBooking({
                  clinicId,
                  slotId,
                  note: note || "Replaced previous appointment",
                })
              );
            },
          },
        ]
      );
      return;
    }

    Alert.alert("Confirm Booking", "Do you want to book this slot?", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => setSelectedSlotId(undefined),
      },
      {
        text: "Confirm",
        onPress: () => {
          dispatch(
            createBooking({
              clinicId,
              slotId,
              note: note || "No additional notes",
            })
          );
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Select Time Slot</Text>
      <Text style={styles.dateText}>
        Date: {new Date(selectedDate).toLocaleDateString()}
      </Text>
      {note && (
        <View style={styles.noteDisplay}>
          <Text style={styles.noteLabel}>Your Note:</Text>
          <Text style={styles.noteText}>{note}</Text>
        </View>
      )}

      <TimeSlotPicker
        slots={slots}
        selectedSlotId={selectedSlotId}
        onSlotSelect={handleSlotSelect}
        loading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
  noteDisplay: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  noteLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: 4,
  },
  noteText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
