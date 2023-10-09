import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { userCrupdate, userFetchById } from "@/redux/slices/user.slice";
import { cartLoad } from "@/redux/slices/cart.slice";
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(userFetchById.fulfilled, userCrupdate.fulfilled),
  effect: async ({ payload }: any, listenerApi) => {
    if (!payload) return;
    listenerApi.dispatch(cartLoad() as any);
  },
});
