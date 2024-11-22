import { createSlice } from "@reduxjs/toolkit";

type MenuMaster = {
  categoryImgUrl: string;
  menuImgUrl: string;
  categoryId: string;
};

const removeLeadingDots = (url: string): string => {
  if (!url) return "";
  return url.replace(/^\.\.\//, "");
};

const initialState: MenuMaster = {
  categoryImgUrl: "",
  menuImgUrl: "",
  categoryId: "",
};

const menuMasterSlice = createSlice({
  name: "menuMaster",
  initialState,
  reducers: {
    setCategoryImgUrl: (state, action) => {
      state.categoryImgUrl = removeLeadingDots(action.payload);
    },
    setMenuItemsImgUrl: (state, action) => {
      state.menuImgUrl = removeLeadingDots(action.payload);
    },
    setCategoryItem: (state, action) => {
      state.categoryId = action.payload;
    },
  },
});

export const { setCategoryImgUrl, setMenuItemsImgUrl, setCategoryItem } =
  menuMasterSlice.actions;
export default menuMasterSlice.reducer;
