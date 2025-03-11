import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface booleanState {
  reset: boolean;
}

const initialState: booleanState = {
  reset: false,
};

const userCompanyReset = createSlice({
  name: "selectedCmpIds",
  initialState,
  reducers: {
    setResetToggle(state, action: PayloadAction<boolean>) {
      state.reset = action.payload;
    },
  },
});

// Export the action creator
export const { setResetToggle } = userCompanyReset.actions;

// Selector to get the array of strings from the stat

export default userCompanyReset.reducer;
