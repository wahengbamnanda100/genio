// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import posMenuReducer from "./slices/posMenuSlice";
import menuMasterReducer from "./slices/menuMasterSlice";

const store = configureStore({
  reducer: {
    posMenuTable: posMenuReducer,
    menuMaster: menuMasterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
