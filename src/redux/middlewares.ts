import {
  PayloadAction,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import { LoginPayload, login, logout } from "@/redux/slices/auth.slice";
import { userFetchById, userSet, userUnset } from "@/redux/slices/user.slice";

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(login),
  effect: async (
    { payload: { activeUser, userId } }: PayloadAction<LoginPayload>,
    listenerApi
  ) => {
    if (activeUser) listenerApi.dispatch(userSet(activeUser));
    else listenerApi.dispatch(userFetchById(userId) as any);
  },
});

listenerMiddleware.startListening({
  matcher: isAnyOf(logout),
  effect: async (_action, listenerApi) => {
    listenerApi.dispatch(userUnset());
  },
});
