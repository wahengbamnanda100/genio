// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import posMenuReducer from "./slices/posMenuSlice";
import menuMasterReducer from "./slices/menuMasterSlice";
import menuItemReducer from "./slices/menuItems.slice";
import userCompanyReducer from "./slices/admin/user/userCompanySelect";
import userCompanyResetReducer from "./slices/admin/user/companyrestSlice";

const store = configureStore({
  reducer: {
    posMenuTable: posMenuReducer,
    menuMaster: menuMasterReducer,
    menuItem: menuItemReducer,
    userCompanySelect: userCompanyReducer,
    userCompanyReset: userCompanyResetReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
