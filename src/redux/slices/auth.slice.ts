import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { UserState } from "@/redux/slices/user.slice";

type AuthState = {
  isLoggedIn: boolean;
  userId: string;
  token: string;
};

export type LoginPayload = Pick<AuthState, "userId" | "token"> & {
  activeUser?: UserState["activeUser"];
};

const initialState: AuthState = {
  isLoggedIn: false,
  userId: "",
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer(
        state,
        { payload: { userId, token } }: PayloadAction<LoginPayload>
      ) {
        state.isLoggedIn = true;
        state.userId = userId;
        state.token = token;
      },
      prepare(
        userId: string,
        token: string,
        activeUser?: UserState["activeUser"]
      ) {
        return { payload: { userId, token, activeUser } };
      },
    },
    logout: () => initialState,
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = ({ auth }: RootState) => auth;

export const selectIsLoggedIn = createSelector(
  [selectAuth],
  ({ isLoggedIn }) => isLoggedIn
);

export const selectUserId = createSelector(
  [selectAuth],
  ({ userId }) => userId
);

export default authSlice.reducer;
