import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Text,
  RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store";
import { fetchUserBookings } from "@store/booking/bookingSlice";
import { Booking } from "@types";
import { colors, spacing } from "@theme";
import { Card, Typography, LoadingSpinner } from "@components/common";
import { formatDate, formatTime } from "@utils/formatters";

type FilterType = "upcoming" | "past" | "all";

export const MyAppointmentsScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userBookings, loading } = useSelector(
    (state: RootState) => state.booking
  );
  const [filter, setFilter] = useState<FilterType>("upcoming");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  const onRefresh = async () => {
    setRefreshing(true);
    await dispatch(fetchUserBookings());
    setRefreshing(false);
  };

  const filteredBookings = userBookings
    .filter((booking) => {
      const bookingTime = new Date(booking.slot.startTime).getTime();
      const now = new Date().getTime();

      if (filter === "upcoming") {
        return bookingTime > now && booking.status !== "cancelled";
      } else if (filter === "past") {
        return bookingTime <= now || booking.status === "cancelled";
      }
      return true;
    })
    .sort((a, b) => {
      // Sort upcoming ascending, past descending
      const timeA = new Date(a.slot.startTime).getTime();
      const timeB = new Date(b.slot.startTime).getTime();
      return filter === "past" ? timeB - timeA : timeA - timeB;
    });

  const renderItem = ({ item }: { item: Booking }) => (
    <Card style={styles.card}>
      <View style={styles.cardHeader}>
        <Typography variant="h4" style={styles.clinicName}>
          {item.clinicName || "Clinic"}
        </Typography>
        <View
          style={[
            styles.statusBadge,
            item.status === "cancelled"
              ? styles.statusCancelled
              : styles.statusConfirmed,
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{formatDate(item.slot.startTime)}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Time:</Text>
          <Text style={styles.value}>
            {formatTime(item.slot.startTime)} - {formatTime(item.slot.endTime)}
          </Text>
        </View>
        {item.note && (
          <View style={styles.noteContainer}>
            <Text style={styles.label}>Note:</Text>
            <Text style={styles.noteText}>{item.note}</Text>
          </View>
        )}
      </View>
    </Card>
  );

  const FilterTab = ({ type, label }: { type: FilterType; label: string }) => (
    <TouchableOpacity
      style={[styles.tab, filter === type && styles.activeTab]}
      onPress={() => setFilter(type)}
    >
      <Text style={[styles.tabText, filter === type && styles.activeTabText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  if (loading && !refreshing && userBookings.length === 0) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <FilterTab type="upcoming" label="Upcoming" />
        <FilterTab type="past" label="Past" />
        <FilterTab type="all" label="All" />
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  tabsContainer: {
    flexDirection: "row",
    padding: spacing.md,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  activeTabText: {
    color: colors.white,
  },
  listContent: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  clinicName: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusConfirmed: {
    backgroundColor: colors.success + "20", // 20% opacity
  },
  statusCancelled: {
    backgroundColor: colors.error + "20",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.textPrimary,
    textTransform: "capitalize",
  },
  detailsContainer: {
    marginTop: spacing.xs,
  },
  detailRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: 60,
    color: colors.textSecondary,
    fontWeight: "500",
  },
  value: {
    color: colors.textPrimary,
    flex: 1,
  },
  noteContainer: {
    marginTop: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  noteText: {
    color: colors.textSecondary,
    fontStyle: "italic",
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyText: {
    color: colors.textSecondary,
    fontSize: 16,
  },
});
