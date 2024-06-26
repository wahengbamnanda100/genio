// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";

import posMenuReducer from "./slices/posMenuSlice";

const store = configureStore({
	reducer: {
		posMenuTable: posMenuReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
