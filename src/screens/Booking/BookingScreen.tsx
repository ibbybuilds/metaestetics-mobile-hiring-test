import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ScrollView } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { MainStackParamList } from "@types";
import { AppDispatch, RootState } from "@store";
import {
  fetchSlots,
  createBooking,
  resetBookingStatus,
  clearSlots,
  cancelBooking,
  fetchUserBookings,
} from "@store/booking/bookingSlice";
import { Calendar } from "@components/booking/Calendar";
import { TimeSlotPicker } from "@components/booking/TimeSlotPicker";
import { colors } from "@theme/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getLocalDateString, formatTime } from "@utils/formatters";

type BookingScreenRouteProp = RouteProp<MainStackParamList, "Booking">;
type BookingScreenNavigationProp = NativeStackNavigationProp<
  MainStackParamList,
  "Booking"
>;

export const BookingScreen = () => {
  const route = useRoute<BookingScreenRouteProp>();
  const navigation = useNavigation<BookingScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();
  const { clinicId } = route.params;

  const { slots, loading, error, bookingSuccess, userBookings } = useSelector(
    (state: RootState) => state.booking
  );

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(fetchSlots({ clinicId, date: selectedDate }));
    // Fetch user bookings to check for conflicts
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
            navigation.goBack();
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

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlotId(undefined);
  };

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
              // Cancel old booking then create new one
              await dispatch(cancelBooking(conflictingBooking.id));
              dispatch(
                createBooking({
                  clinicId,
                  slotId,
                  note: "Replaced previous appointment",
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
              note: "Booked via app",
            })
          );
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Select Date & Time</Text>

      <Calendar selectedDate={selectedDate} onDateSelect={handleDateSelect} />

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
    marginBottom: 20,
  },
});
