import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { mockApiService } from "@services/mock-api.service";
import { Slot, Booking, CreateBookingData } from "@types";

interface BookingState {
  slots: Slot[];
  userBookings: Booking[];
  loading: boolean;
  error: string | null;
  bookingSuccess: boolean;
}

const initialState: BookingState = {
  slots: [],
  userBookings: [],
  loading: false,
  error: null,
  bookingSuccess: false,
};

export const fetchSlots = createAsyncThunk(
  "booking/fetchSlots",
  async (
    { clinicId, date }: { clinicId: string; date: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await mockApiService.getSlots(clinicId, date);
      return response.slots;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async (data: CreateBookingData, { rejectWithValue }) => {
    try {
      const response = await mockApiService.createBooking(data);
      return response.booking;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserBookings = createAsyncThunk(
  "booking/fetchUserBookings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await mockApiService.getUserBookings();
      return response.bookings;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetBookingStatus: (state) => {
      state.bookingSuccess = false;
      state.error = null;
    },
    clearSlots: (state) => {
      state.slots = [];
    },
  },
  extraReducers: (builder) => {
    // Fetch Slots
    builder.addCase(fetchSlots.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchSlots.fulfilled,
      (state, action: PayloadAction<Slot[]>) => {
        state.loading = false;
        state.slots = action.payload;
      }
    );
    builder.addCase(fetchSlots.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create Booking
    builder.addCase(createBooking.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.bookingSuccess = false;
    });
    builder.addCase(
      createBooking.fulfilled,
      (state, action: PayloadAction<Booking>) => {
        state.loading = false;
        state.bookingSuccess = true;
        state.userBookings.push(action.payload);
        // Update slot status locally if it exists in current slots
        const slotIndex = state.slots.findIndex(
          (s) => s.id === action.payload.slotId
        );
        if (slotIndex >= 0) {
          state.slots[slotIndex].isBooked = true;
        }
      }
    );
    builder.addCase(createBooking.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.bookingSuccess = false;
    });

    // Fetch User Bookings
    builder.addCase(fetchUserBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      fetchUserBookings.fulfilled,
      (state, action: PayloadAction<Booking[]>) => {
        state.loading = false;
        state.userBookings = action.payload;
      }
    );
    builder.addCase(fetchUserBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetBookingStatus, clearSlots } = bookingSlice.actions;
export default bookingSlice.reducer;
