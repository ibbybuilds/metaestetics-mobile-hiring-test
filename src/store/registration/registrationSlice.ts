import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RegisterData } from "@types";
import { storageService } from "@services";

export interface RegistrationState {
  draft: Partial<RegisterData>;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: RegistrationState = {
  draft: {},
  status: "idle",
  error: null,
};

export const loadRegistrationDraft = createAsyncThunk(
  "registration/loadDraft",
  async () => {
    const draft = await storageService.getRegistrationDraft();
    return draft;
  }
);

export const updateRegistrationDraft = createAsyncThunk(
  "registration/updateDraft",
  async (partial: Partial<RegisterData>, { rejectWithValue }) => {
    try {
      const existing = await storageService.getRegistrationDraft();
      const merged = { ...existing, ...partial };
      await storageService.saveRegistrationDraft(merged);
      return merged;
    } catch (error: any) {
      return rejectWithValue(
        error.message ?? "Failed to update registration data"
      );
    }
  }
);

export const clearRegistrationDraft = createAsyncThunk(
  "registration/clearDraft",
  async () => {
    await storageService.clearRegistrationDraft();
    return {};
  }
);

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadRegistrationDraft.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadRegistrationDraft.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.draft = action.payload ?? {};
        state.error = null;
      })
      .addCase(loadRegistrationDraft.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unable to load saved data";
      })
      .addCase(updateRegistrationDraft.fulfilled, (state, action) => {
        state.draft = action.payload ?? {};
        state.error = null;
      })
      .addCase(updateRegistrationDraft.rejected, (state, action) => {
        state.error =
          (action.payload as string) ??
          action.error.message ??
          "Unable to save draft";
      })
      .addCase(clearRegistrationDraft.fulfilled, (state) => {
        state.draft = {};
        state.status = "idle";
        state.error = null;
      });
  },
});

export default registrationSlice.reducer;
