import { createListenerMiddleware } from "@reduxjs/toolkit";
import { fetchExchangeRate } from "@/redux/slices/location.slice";
export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  type: "location/fetchIPDetails/fulfilled",
  effect: ({ payload }: any, listenerApi) => {
    if (payload)
      listenerApi.dispatch(fetchExchangeRate(payload.currency) as any);
  },
});
