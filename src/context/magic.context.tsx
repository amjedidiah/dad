import {
  UserData,
  userCrupdate,
  userFetchById,
  userUnset,
} from "@/redux/slices/user.slice";
import store from "@/redux/store";
import { Magic } from "magic-sdk";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { ModalContext } from "./modal/modal.context";
import { ModalTitles } from "./modal/types";

const MagicContext = createContext<{
  magicClient?: Magic;
  magicLogin: (userData: UserData) => Promise<string | undefined>;
  magicLogout: (openModal?: boolean) => Promise<void>;
}>({
  magicLogin: async () => undefined,
  magicLogout: async () => undefined,
});

const performLogin = async (magic: Magic, onMount: boolean, email?: string) => {
  const isLoggedIn = await magic.user.isLoggedIn();

  if (isLoggedIn && onMount) {
    const { issuer } = await magic.user.getInfo();
    if (!issuer) throw "An error occurred. Please reload the page";

    store.dispatch(userFetchById(issuer));
  } else if (!isLoggedIn && !onMount) {
    if (!email) throw "Email is required to login.";

    const token = await magic.auth.loginWithMagicLink({
      email,
      showUI: false,
    });
    if (!token) throw "Error logging in. Please try again.";
  }
};

const performUserCrupdate = async (magic: Magic, data?: UserData) => {
  const { issuer, email } = await magic.user.getInfo();
  if (!issuer || !email) throw "An error occurred. Please reload the page";

  await store.dispatch(userCrupdate({ ...data, email, id: issuer as string }));
};

export const MagicProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toggleModal } = useContext(ModalContext);
  const magic = useMemo(() => {
    if (typeof window === "undefined") return;
    return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string);
  }, []);

  const magicLogin = useCallback(
    async (data?: UserData, onMount = false) => {
      try {
        if (!magic) throw "An error occurred. Please reload the page";

        await performLogin(magic, onMount, data?.email);
        if (!onMount) await performUserCrupdate(magic, data);

        return;
      } catch (error) {
        console.error(error);
        return (error.message || "An error occurred.") as string;
      }
    },
    [magic]
  );

  const magicLogout = useCallback(
    async (openModal = false) => {
      if (!magic) return;

      const isLoggedIn = await magic.user.isLoggedIn();
      if (!isLoggedIn) return;

      await magic.user.logout();
      await store.dispatch(userUnset());

      if (openModal) toggleModal(ModalTitles.login);
    },
    [magic, toggleModal]
  );

  useEffect(() => {
    if (!magic) return;

    magic.preload();
    magicLogin(undefined, true);
  }, [magic, magicLogin]);

  return (
    <MagicContext.Provider
      value={{
        magicClient: magic,
        magicLogin,
        magicLogout,
      }}
    >
      {children}
    </MagicContext.Provider>
  );
};

export const useMagic = () => useContext(MagicContext);
