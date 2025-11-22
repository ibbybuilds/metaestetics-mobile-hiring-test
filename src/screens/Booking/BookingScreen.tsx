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
} from "@store/booking/bookingSlice";
import { Calendar } from "@components/booking/Calendar";
import { TimeSlotPicker } from "@components/booking/TimeSlotPicker";
import { colors } from "@theme/colors";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { getLocalDateString } from "@utils/formatters";

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

  const { slots, loading, error, bookingSuccess } = useSelector(
    (state: RootState) => state.booking
  );

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    dispatch(fetchSlots({ clinicId, date: selectedDate }));
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
    Alert.alert("Confirm Booking", "Do you want to book this slot?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: () => {
          dispatch(createBooking({ clinicId, slotId }));
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
