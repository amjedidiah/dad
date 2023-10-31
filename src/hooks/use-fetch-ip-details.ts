import { fetchIPDetails } from "@/redux/slices/location.slice";
import { useAppDispatch } from "@/redux/util";
import { useEffect } from "react";

export default function useFetchIPDetails() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchIPDetails());
  }, [dispatch]);
}
