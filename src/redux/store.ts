import { configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/redux/slices/location.slice";

const store = configureStore({
  reducer: {
    location: locationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export type StateStatus = "idle" | "loading" | "failed";

export default store;
