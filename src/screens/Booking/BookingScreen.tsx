import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";

import { DateData } from "react-native-calendars";

import { MainStackParamList } from "@types";

import { Calendar } from "@components/booking/Calendar";

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
  const { clinicId } = route.params;

  const [selectedDate, setSelectedDate] = useState(getLocalDateString());
  const [bookingNote, setBookingNote] = useState<string>("");

  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate.substring(0, 7)
  );

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // When selecting a date, ensure visible month matches (though calendar usually handles this)
    setVisibleMonth(date.substring(0, 7));
  };

  const handleMonthChange = (date: DateData) => {
    // Update visible month state
    const monthString = date.dateString.substring(0, 7);
    setVisibleMonth(monthString);
  };

  const handleContinue = () => {
    navigation.navigate("TimeSlotSelection", {
      clinicId,
      selectedDate,
      note: bookingNote,
    });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Select Date & Add Note</Text>

      <Calendar
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        onMonthChange={handleMonthChange}
      />

      <View style={styles.noteContainer}>
        <Text style={styles.noteLabel}>Add a note (optional)</Text>
        <TextInput
          style={styles.noteInput}
          placeholder="e.g., First visit, follow-up appointment..."
          placeholderTextColor={colors.textTertiary}
          value={bookingNote}
          onChangeText={setBookingNote}
          multiline
          numberOfLines={3}
          maxLength={200}
        />
        <Text style={styles.characterCount}>{bookingNote.length}/200</Text>
      </View>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
        activeOpacity={0.7}
      >
        <Text style={styles.continueButtonText}>Continue to Select Time</Text>
      </TouchableOpacity>
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
  noteContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  noteInput: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: colors.textPrimary,
    minHeight: 80,
    textAlignVertical: "top",
  },
  characterCount: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "right",
    marginTop: 4,
  },
  continueButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  continueButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
