import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StringsState {
  values: string[] | null;
}

const initialState: StringsState = {
  values: null,
};

const userCompanySelection = createSlice({
  name: "selectedCmpIds",
  initialState,
  reducers: {
    setSelectCompanyIDs(state, action: PayloadAction<string[]>) {
      state.values = action.payload;
    },
  },
});

// Export the action creator
export const { setSelectCompanyIDs } = userCompanySelection.actions;

// Selector to get the array of strings from the stat

export default userCompanySelection.reducer;
