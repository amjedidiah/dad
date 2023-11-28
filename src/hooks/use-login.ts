import { magicPublishable as magic } from "@/lib/magic.lib";
import { userLogin } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/util";

export default function useLogin() {
  const dispatch = useAppDispatch();

  const handleLogin = async (email: string) => {
    if (!magic) return;

    try {
      // Login with magic
      const token = await magic.auth.loginWithMagicLink({
        email,
        showUI: false,
      });
      if (!token) throw "Error verifying email...";

      // Login to set cookie
      await dispatch(userLogin(token)).then(({ error }: any) => {
        if (error) throw "Error verifying email...";
      });
    } catch (error) {
      await magic.user.logout();
      throw error.message || error || "An error occurred.";
    }
  };

  return handleLogin;
}
