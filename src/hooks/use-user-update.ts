import { UserData, userUpdate } from "@/redux/slices/user.slice";
import { useAppDispatch } from "@/redux/util";

export default function useUserUpdate() {
  const dispatch = useAppDispatch();

  const handleUserUpdate = (data: UserData) =>
    dispatch(userUpdate(data)).then(({ error }: any) => {
      if (error) throw error;
    });

  return handleUserUpdate;
}
