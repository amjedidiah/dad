import {
  PayloadAction,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { UserState, userCrupdate, userFetchById } from "./slices/user.slice";
import { cartLoad } from "./slices/cart.slice";
import store from "./store";
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(userFetchById.fulfilled, userCrupdate.fulfilled),
  effect: async (
    { payload }: PayloadAction<UserState["activeUser"]>,
    listenerApi
  ) => {
    if (!payload) return;
    store.dispatch(cartLoad());
  },
});
