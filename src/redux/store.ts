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
import { isDev } from "@/utils/constants";
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
    devTools: isDev,
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ["persist/PERSIST"],
        },
      }).prepend(
        listenerMiddleware.middleware,
        nextReduxCookieMiddleware({
          subtrees: [locationSlice.name, cartSlice.name],
        })
      );
    },
  })
);

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore);
