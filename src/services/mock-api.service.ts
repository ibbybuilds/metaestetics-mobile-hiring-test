import {
  User,
  LoginCredentials,
  RegisterData,
  Slot,
  Booking,
  CreateBookingData,
} from "@types";
import { MOCK_USERS } from "@utils/constants";
import { storageService } from "./storage.service";

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Generate mock UUID
const generateId = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const mockApiService = {
  async login(credentials: LoginCredentials) {
    await delay(1000);

    // First check hardcoded mock users
    const mockUser = MOCK_USERS.find(
      (u) =>
        u.email === credentials.email && u.password === credentials.password
    );

    if (mockUser) {
      // Return user from mock data
      const user: User = {
        id: generateId(),
        email: mockUser.email,
        firstName: mockUser.firstName,
        lastName: mockUser.lastName,
        phoneNumber: "1234567890",
        countryCode: "+1",
        dateOfBirth: "1990-01-01",
        gender: "male",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return {
        success: true,
        user,
        token: "mock-token-" + generateId(),
      };
    }

    // Then check registered users from storage
    const registeredUser = await storageService.findRegisteredUser(
      credentials.email,
      credentials.password
    );

    if (registeredUser) {
      return {
        success: true,
        user: registeredUser,
        token: "mock-token-" + generateId(),
      };
    }

    // No user found
    throw new Error("Invalid email or password");
  },

  async register(data: RegisterData) {
    await delay(1500);

    // Check if email exists in hardcoded mock users
    if (MOCK_USERS.some((u) => u.email === data.email)) {
      throw new Error("Email already exists");
    }

    // Check if email exists in registered users
    const emailExists = await storageService.checkEmailExists(data.email);
    if (emailExists) {
      throw new Error("Email already exists");
    }

    // Create new user
    const user: User = {
      id: generateId(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      phoneNumber: data.phoneNumber,
      countryCode: data.countryCode,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      profileImage: data.profileImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Store user credentials and data for future logins
    await storageService.saveRegisteredUser(data.email, data.password, user);

    return {
      success: true,
      user,
      token: "mock-token-" + generateId(),
    };
  },

  async updateProfile(userId: string, updates: Partial<User>) {
    await delay(800);

    // Get current user from storage
    const currentUser = await storageService.getUser();
    if (!currentUser || currentUser.id !== userId) {
      throw new Error("User not found");
    }

    // Merge updates with current user data
    const updatedUser: User = {
      ...currentUser,
      ...updates,
      id: userId,
      updatedAt: new Date().toISOString(),
    };

    // Update stored user data
    await storageService.saveUser(updatedUser);

    // Also update in registered users if exists
    const registeredUsers = await storageService.getRegisteredUsers();
    const userIndex = registeredUsers.findIndex((u) => u.user.id === userId);
    if (userIndex >= 0) {
      registeredUsers[userIndex].user = updatedUser;
      await storageService.saveRegisteredUser(
        registeredUsers[userIndex].email,
        registeredUsers[userIndex].password,
        updatedUser
      );
    }

    return {
      success: true,
      user: updatedUser,
    };
  },

  async logout() {
    await delay(500);
    return { success: true };
  },

  async getClinics() {
    await delay(1000); // Simulate slow API

    const clinics = Array.from({ length: 100 }, (_, i) => ({
      id: `clinic-${i}`,
      name: `Clinic ${i + 1}`,
      address: `${i + 1} Main Street, City`,
      rating: Math.random() * 5,
      specialties: ["Dermatology", "Aesthetics"],
    }));

    return {
      success: true,
      clinics,
    };
  },

  async searchClinics(query: string) {
    await delay(800); // Simulate API delay

    const allClinics = Array.from({ length: 100 }, (_, i) => ({
      id: `clinic-${i}`,
      name: `Clinic ${i + 1}`,
      address: `${i + 1} Main Street, City`,
      rating: Math.random() * 5,
      specialties: ["Dermatology", "Aesthetics"],
    }));

    const filtered = allClinics.filter(
      (clinic) =>
        clinic.name.toLowerCase().includes(query.toLowerCase()) ||
        clinic.address.toLowerCase().includes(query.toLowerCase())
    );

    return {
      success: true,
      clinics: filtered,
    };
  },

  async getSlots(clinicId: string, date: string) {
    await delay(500);

    // Generate slots for 9 AM to 5 PM
    const slots: Slot[] = [];
    const startHour = 9;
    const endHour = 17;

    // Get existing bookings to mark slots as booked
    const allBookings = await storageService.getBookings();
    const clinicBookings = allBookings.filter(
      (b) => b.clinicId === clinicId && b.status !== "cancelled"
    );

    for (let i = startHour; i <= endHour; i++) {
      const startTime = `${date}T${i.toString().padStart(2, "0")}:00:00`;
      const endTime = `${date}T${(i + 1).toString().padStart(2, "0")}:00:00`;

      // Check if slot is booked
      const isBooked = clinicBookings.some(
        (b) => b.slot.startTime === startTime
      );

      // Check if slot is in the past
      const slotDate = new Date(startTime);
      const now = new Date();

      // Only add slot if it's in the future
      if (slotDate > now) {
        slots.push({
          id: `slot-${clinicId}-${date}-${i}`,
          clinicId,
          startTime,
          endTime,
          isBooked,
        });
      }
    }

    return {
      success: true,
      slots,
    };
  },

  async createBooking(data: CreateBookingData) {
    await delay(1000);

    const currentUser = await storageService.getUser();
    if (!currentUser) throw new Error("User not authenticated");

    // Get all bookings
    const bookings = await storageService.getBookings();

    // Verify slot availability again (race condition simulation)
    const parts = data.slotId.split("-");
    if (parts.length < 4) throw new Error("Invalid slot ID");

    const idParts = data.slotId.split("-");
    const hour = parseInt(idParts[idParts.length - 1]);
    const dateStr = idParts
      .slice(idParts.length - 4, idParts.length - 1)
      .join("-");

    const startTime = `${dateStr}T${hour.toString().padStart(2, "0")}:00:00`;
    const endTime = `${dateStr}T${(hour + 1)
      .toString()
      .padStart(2, "0")}:00:00`;

    const slot: Slot = {
      id: data.slotId,
      clinicId: data.clinicId,
      startTime,
      endTime,
      isBooked: true,
    };

    // Check if already booked
    if (
      bookings.some((b) => b.slotId === data.slotId && b.status !== "cancelled")
    ) {
      throw new Error("Slot already booked");
    }

    const newBooking: Booking = {
      id: generateId(),
      userId: currentUser.id,
      slotId: data.slotId,
      clinicId: data.clinicId,
      status: "confirmed",
      note: data.note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      slot,
      clinicName: `Clinic ${parseInt(data.clinicId.split("-")[1]) + 1}`,
      clinicAddress: `${
        parseInt(data.clinicId.split("-")[1]) + 1
      } Main Street, City`,
    };

    bookings.push(newBooking);
    await storageService.saveBookings(bookings);

    return {
      success: true,
      booking: newBooking,
    };
  },

  async cancelBooking(bookingId: string) {
    await delay(800);
    const currentUser = await storageService.getUser();
    if (!currentUser) throw new Error("User not authenticated");

    const bookings = await storageService.getBookings();
    const bookingIndex = bookings.findIndex(
      (b) => b.id === bookingId && b.userId === currentUser.id
    );

    if (bookingIndex === -1) {
      throw new Error("Booking not found");
    }

    // Instead of deleting, we mark as cancelled to keep history
    bookings[bookingIndex].status = "cancelled";
    bookings[bookingIndex].updatedAt = new Date().toISOString();

    // Also free up the slot if we want to allow re-booking immediately
    // In this mock implementation, the slot.isBooked is derived from bookings list
    // so changing status to 'cancelled' is enough because getSlots filters by status !== 'cancelled'

    await storageService.saveBookings(bookings);

    return {
      success: true,
      bookingId,
    };
  },

  async getUserBookings() {
    await delay(800);
    const currentUser = await storageService.getUser();
    if (!currentUser) throw new Error("User not authenticated");

    const allBookings = await storageService.getBookings();
    const userBookings = allBookings.filter((b) => b.userId === currentUser.id);

    return {
      success: true,
      bookings: userBookings,
    };
  },
};
