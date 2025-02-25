import { createSlice } from "@reduxjs/toolkit";

type MenuItems = {
  menu: string;
};

const initialState: MenuItems = {
  menu: "admin",
};

const menuItemSlice = createSlice({
  name: "menuItem",
  initialState,
  reducers: {
    setMenuItem: (state, action) => {
      state.menu = action.payload;
    },
  },
});

export const { setMenuItem } = menuItemSlice.actions;
export default menuItemSlice.reducer;
