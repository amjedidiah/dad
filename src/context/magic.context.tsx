import {
  UserData,
  selectUserStatus,
  userCrupdate,
  userFetchById,
  userUnset,
} from "@/redux/slices/user.slice";
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
import { useAppDispatch, useAppSelector } from "@/hooks/types";

const MagicContext = createContext<{
  magicClient?: Magic;
  magicLogin: (userData: UserData) => Promise<string | null>;
  magicLogout: (modalTitle?: ModalTitles) => Promise<void>;
}>({
  magicLogin: async () => null,
  magicLogout: async () => undefined,
});

export const MagicProvider: FC<PropsWithChildren> = ({ children }) => {
  const { toggleModal } = useContext(ModalContext);
  const magic = useMemo(() => {
    if (typeof window === "undefined") return;
    return new Magic(process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY as string);
  }, []);
  const dispatch = useAppDispatch();
  const userStatus = useAppSelector(selectUserStatus);

  const checkLoggedIn = async (magic: Magic) => {
    const isLoggedIn = await magic.user.isLoggedIn();
    if (isLoggedIn) {
      const { issuer } = await magic.user.getInfo();
      return { issuer, isLoggedIn };
    }
    return null;
  };

  const getUserInfo = useCallback(
    (issuer: string) => dispatch(userFetchById(issuer)),
    [dispatch]
  );

  const loginWithEmail = async (magic: Magic, email: string) => {
    const token = await magic.auth.loginWithMagicLink({
      email,
      showUI: false,
    });
    if (!token) throw "Error logging in. Please try again.";
  };

  const performLogin = useCallback(
    async (magic: Magic, onMount: boolean, email?: string) => {
      const res = await checkLoggedIn(magic);
      if (res?.issuer) await getUserInfo(res.issuer);
      else if (!res?.isLoggedIn && !onMount) {
        if (!email) throw "Email is required to login.";
        await loginWithEmail(magic, email);
      }
    },
    [getUserInfo]
  );

  const performUserCrupdate = useCallback(
    async (magic: Magic, data?: UserData) => {
      const { issuer, email } = await magic.user.getInfo();
      if (!issuer || !email) throw "An error occurred. Please reload the page";

      await dispatch(userCrupdate({ ...data, email, id: issuer as string }));

      const { value, message } = userStatus;
      if (value === "rejected") throw message;
    },
    [dispatch, userStatus]
  );

  const magicLogin = useCallback(
    async (data?: UserData, onMount = false) => {
      try {
        if (!magic) throw "An error occurred. Please reload the page";

        await performLogin(magic, onMount, data?.email);
        if (!onMount) await performUserCrupdate(magic, data);

        const { issuer } = await magic.user.getInfo();
        return issuer;
      } catch (error) {
        throw error.message || error || "An error occurred.";
      }
    },
    [magic, performLogin, performUserCrupdate]
  );

  const magicLogout = useCallback(
    async (modalTite?: ModalTitles) => {
      if (!magic) return;

      const isLoggedIn = await magic.user.isLoggedIn();
      if (!isLoggedIn) return;

      await magic.user.logout();
      await dispatch(userUnset());

      if (modalTite) toggleModal(ModalTitles.login, modalTite);
    },
    [dispatch, magic, toggleModal]
  );

  useEffect(() => {
    if (!magic) return;

    magic.preload();
    performLogin(magic, true);
  }, [magic, magicLogin, performLogin]);

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
