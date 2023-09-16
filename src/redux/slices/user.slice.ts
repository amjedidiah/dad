import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, CommonStateStatus, RootState } from "@/redux/store";

export type UserData = {
  id: string;
  name: string;
  email: string;
  phone_number?: string;
  imageUrl?: string;
};

export type UserState = {
  activeUser?: UserData;
  status: CommonStateStatus;
};

const initialState: UserState = {
  activeUser: undefined,
  status: "idle",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(state, action: PayloadAction<UserState["activeUser"]>) {
      state.activeUser = action.payload;
    },
    userUnset(state) {
      state.activeUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userFetchById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        userFetchById.fulfilled,
        (state, action: PayloadAction<UserState["activeUser"]>) => {
          state.status = "idle";
          if (action.payload) state.activeUser = action.payload;
        }
      )
      .addCase(userFetchById.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const userFetchById = createAsyncThunk<
  UserState["activeUser"],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/fetchById", (userId, thunkApi) =>
  fetch(`/api/user/${userId}`)
    .then((res) => res.json())
    .then(({ data }) => {
      if (!data || thunkApi.getState().user.activeUser) return;

      const { created_at, updated_at, ...user } = data;
      return user;
    })
);

export const { userSet, userUnset } = userSlice.actions;

export const selectActiveUser = ({ user: { activeUser } }: RootState) =>
  activeUser;

const selectUserName = createSelector(
  [selectActiveUser],
  (activeUser) => activeUser?.name
);
const selectUserEmail = createSelector(
  [selectActiveUser],
  (activeUser) => activeUser?.email
);
const selectUserPhoneNumber = createSelector(
  [selectActiveUser],
  (activeUser) => activeUser?.phone_number
);

export const selectUserContactDetails = createSelector(
  [selectUserName, selectUserEmail, selectUserPhoneNumber],
  (name, email, phone_number) => ({ name, email, phone_number })
);

export default userSlice.reducer;
