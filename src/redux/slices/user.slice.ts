import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, CommonStateStatus, RootState } from "@/redux/store";

export type UserData = {
  id?: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  isSubscribed?: boolean;
};

export type UserState = {
  activeUser?: UserData;
  status: CommonStateStatus;
};

const initialState: UserState = {
  activeUser: undefined,
  status: { value: "idle" },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userActionPending(state) {
      state.status = { value: "pending" };
    },
    userSet(state, action: PayloadAction<UserState["activeUser"]>) {
      state.status = { value: "idle" };
      if (action.payload) state.activeUser = action.payload;
    },
    userUnset(state) {
      state.activeUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userFetchById.pending, userSlice.caseReducers.userActionPending)
      .addCase(userFetchById.fulfilled, userSlice.caseReducers.userSet)
      .addCase(userFetchById.rejected, (state, action) => {
        state.status = { value: "rejected", message: action.error.message };
      })
      .addCase(userCrupdate.pending, userSlice.caseReducers.userActionPending)
      .addCase(userCrupdate.fulfilled, userSlice.caseReducers.userSet)
      .addCase(userCrupdate.rejected, (state, action) => {
        state.status = { value: "rejected", message: action.error.message };
      })
      .addCase(userSubscribe.pending, userSlice.caseReducers.userActionPending)
      .addCase(userSubscribe.fulfilled, userSlice.caseReducers.userSet)
      .addCase(userSubscribe.rejected, (state, action) => {
        state.status = { value: "rejected", message: action.error.message };
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
  fetch(`/api/users/${userId}`)
    .then((res) => res.json())
    .then(({ data, error, message }) => {
      if (thunkApi.getState().user.activeUser) return;
      if (error) throw message;

      const {
        created_at,
        updated_at,
        phone_number,
        image_url,
        is_subscribed,
        ...user
      } = data;
      return {
        ...user,
        phoneNumber: phone_number,
        imageUrl: image_url,
        isSubscribed: is_subscribed,
      };
    })
    .catch((error) => {
      throw error;
    })
);

export const userCrupdate = createAsyncThunk<
  UserState["activeUser"],
  UserData,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/crupdate", (user, thunkApi) =>
  fetch("/api/users/crupdate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...thunkApi.getState().user.activeUser, ...user }),
  })
    .then((res) => res.json())
    .then(({ data, message, error }) => {
      if (error) throw message;

      const {
        created_at,
        updated_at,
        phone_number,
        image_url,
        is_subscribed,
        ...user
      } = data;
      return {
        ...user,
        phoneNumber: phone_number,
        imageUrl: image_url,
        isSubscribed: is_subscribed,
      };
    })
    .catch((error) => {
      throw error;
    })
);

export const userSubscribe = createAsyncThunk<
  UserState["activeUser"],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/subscribe", (email, thunkApi) =>
  fetch("/api/users/subscribe", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
    .then((res) => res.json())
    .then(({ data, message, error }) => {
      if (error) throw message;

      const {
        created_at,
        updated_at,
        phone_number,
        image_url,
        is_subscribed,
        ...user
      } = data;

      return {
        ...user,
        phoneNumber: phone_number,
        imageUrl: image_url,
        isSubscribed: is_subscribed,
      };
    })
    .catch((error) => {
      throw error;
    })
);

export const { userSet, userUnset } = userSlice.actions;

export const selectActiveUser = ({ user: { activeUser } }: RootState) =>
  activeUser;

export const selectUserStatus = ({ user: { status } }: RootState) => status;

export const selectUserIsSubscribed = createSelector(
  [selectActiveUser],
  (activeUser) => Boolean(activeUser?.isSubscribed)
);

export default userSlice.reducer;
