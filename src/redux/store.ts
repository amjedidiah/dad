import { combineReducers, configureStore } from "@reduxjs/toolkit";
import locationReducer from "@/redux/slices/location.slice";
import userReducer from "@/redux/slices/user.slice";
import cartReducer from "@/redux/slices/cart.slice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { listenerMiddleware } from "@/redux/middlewares";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

const rootReducer = combineReducers({
  user: userReducer,
  location: locationReducer,
  cart: cartReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }).prepend(listenerMiddleware.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type CommonStateStatus = {
  value: "idle" | "pending" | "rejected" | "fulfilled";
  message?: string;
};

export const persistor = persistStore(store);

export default store;
