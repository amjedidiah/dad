import { fetchIPDetails } from "@/redux/slices/location.slice";
import { useEffect } from "react";

export default function useFetchIPDetails(store: any) {
  useEffect(() => {
    store.dispatch(fetchIPDetails());
  }, [store]);
}
