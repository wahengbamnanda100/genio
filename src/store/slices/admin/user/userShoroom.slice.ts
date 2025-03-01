import { ShowroomListType } from "@/components/user/user.type";
import { SHOWROOM_MOCK_DATA } from "@/constants/user.constant";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define the showroom data type

// Define the state interface
interface ShowroomState {
  data: ShowroomListType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state with types
const initialState: ShowroomState = {
  data: [],
  status: "idle",
  error: null,
};

// Async thunk with TypeScript
export const fetchShowroomData = createAsyncThunk<
  ShowroomListType[], // Return type
  string, // Argument type
  { rejectValue: ShowroomListType[] } // Reject value type
>("showroom/fetchData", async (id: string, { rejectWithValue }) => {
  try {
    // Simulate async operation with mock data
    await new Promise((resolve) => setTimeout(resolve, 500)); // Fake delay

    // Return mock data
    if (!SHOWROOM_MOCK_DATA || !Array.isArray(SHOWROOM_MOCK_DATA)) {
      return [];
    }

    return SHOWROOM_MOCK_DATA;
  } catch (error) {
    return rejectWithValue([]);
  }
});

// Create the slice with TypeScript
const showroomSlice = createSlice({
  name: "showroom",
  initialState,
  reducers: {
    resetShowroomData: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
    // Optional: Add action to toggle selected state
    toggleShowroomSelected: (state, action: PayloadAction<number>) => {
      const showroom = state.data.find((item) => item.id === action.payload);
      if (showroom) {
        showroom.selected = !showroom.selected;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShowroomData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchShowroomData.fulfilled,
        (state, action: PayloadAction<ShowroomListType[]>) => {
          state.status = "succeeded";
          state.data = action.payload;
        },
      )
      .addCase(fetchShowroomData.rejected, (state, action) => {
        state.status = "failed";
        state.data = action.payload || [];
        state.error = action.error.message || "Failed to fetch showroom data";
      });
  },
});

// Export typed actions and reducer
export const { resetShowroomData, toggleShowroomSelected } =
  showroomSlice.actions;
export default showroomSlice.reducer;

// Export types for use in components
export type { ShowroomState };
