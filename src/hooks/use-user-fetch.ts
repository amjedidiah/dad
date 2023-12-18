import { validateCookie } from "@/lib/auth.lib";
import { magicPublishable as magic } from "@/lib/magic.lib";
import { userFetch } from "@/redux/slices/user.slice";
import { useCallback, useEffect } from "react";

export default function useUserFetch(store: any) {
  const handleUserFetch = useCallback(async () => {
    if (!magic) return;
    magic.preload();

    const isLoggedIn = await validateCookie();
    if (isLoggedIn) store.dispatch(userFetch());
  }, [store]);

  useEffect(() => {
    handleUserFetch();
  }, [handleUserFetch]);
}
