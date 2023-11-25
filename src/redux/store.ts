import { combineReducers, configureStore } from "@reduxjs/toolkit";
import locationSlice from "@/redux/slices/location.slice";
import userSlice from "@/redux/slices/user.slice";
import cartSlice from "@/redux/slices/cart.slice";
import { listenerMiddleware } from "@/redux/middlewares";
import { createWrapper } from "next-redux-wrapper";
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from "next-redux-cookie-wrapper";
import formSlice from "@/redux/slices/form.slice";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [locationSlice.name]: locationSlice.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [formSlice.name]: formSlice.reducer,
});

export const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).prepend(
        listenerMiddleware.middleware,
        nextReduxCookieMiddleware({
          subtrees: ["cart"],
        })
      );
    },
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export type CommonStateStatus = {
  value: "idle" | "pending" | "rejected" | "fulfilled";
  message?: string;
};

export const wrapper = createWrapper<AppStore>(makeStore);
