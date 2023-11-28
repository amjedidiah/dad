import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/redux/store";
import { hydrate } from "@/redux/util";

export type UserData = {
  id?: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  isSubscribed?: boolean;
};

const initialState = {} as UserData;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSet(state, action: PayloadAction<UserData>) {
      if (action.payload) {
        return { ...state, ...action.payload };
      }
    },
    userUnset() {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userFetch.fulfilled, userSlice.caseReducers.userSet)
      .addCase(userUpdate.fulfilled, userSlice.caseReducers.userSet)
      .addCase(userSubscribe.fulfilled, userSlice.caseReducers.userSet)
      .addCase(userLogout.fulfilled, userSlice.caseReducers.userUnset)
      .addCase(hydrate, (state, action) => ({
        ...state,
        ...action.payload.user,
      }));
  },
});

const getUserData = (data: any) => {
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
  } as UserData;
};

export const userFetch = createAsyncThunk<UserData, undefined>(
  "user/fetch",
  () =>
    fetch("/api/users/get")
      .then((res) => res.json())
      .then(({ data }) => getUserData(data))
      .catch((error) => {
        throw error;
      })
);

export const userUpdate = createAsyncThunk<
  UserData,
  UserData,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/update", (userData) =>
  fetch("/api/users/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((res) => res.json())
    .then(({ data }) => getUserData(data))
    .catch((error) => {
      throw error;
    })
);

export const userSubscribe = createAsyncThunk<
  UserData,
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/subscribe", () =>
  fetch("/api/users/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then(({ data }) => getUserData(data))
    .catch((error) => {
      throw error;
    })
);

export const userLogout = createAsyncThunk("user/logout", async () =>
  fetch("/api/auth/logout")
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    })
);

export const userLogin = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>("user/login", async (token) =>
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      throw error;
    })
);

export const selectActiveUser = ({ user }: RootState) => user;

export const selectUserIsSubscribed = createSelector(
  [selectActiveUser],
  (activeUser) => Boolean(activeUser?.isSubscribed)
);

export default userSlice;
