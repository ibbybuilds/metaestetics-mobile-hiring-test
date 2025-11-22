export type BookingStatus = "confirmed" | "cancelled" | "completed";

export interface Slot {
  id: string;
  clinicId: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  isBooked: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  slotId: string;
  clinicId: string;
  status: BookingStatus;
  note?: string;
  createdAt: string;
  updatedAt: string;
  slot: Slot; // Include slot details for easier display
  clinicName?: string; // Optional for display
  clinicAddress?: string; // Optional for display
}

export interface CreateBookingData {
  clinicId: string;
  slotId: string;
  note?: string;
}
