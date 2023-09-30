import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, CommonStateStatus, RootState } from "@/redux/store";

export type UserData = {
  id?: string;
  name?: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
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
        state.status = { value: "loading" };
      })
      .addCase(
        userFetchById.fulfilled,
        (state, action: PayloadAction<UserState["activeUser"]>) => {
          state.status = { value: "idle" };
          if (action.payload) state.activeUser = action.payload;
        }
      )
      .addCase(userFetchById.rejected, (state, action) => {
        state.status = { value: "failed", message: action.error.message };
      })
      .addCase(userCrupdate.pending, (state) => {
        state.status = { value: "loading" };
      })
      .addCase(
        userCrupdate.fulfilled,
        (state, action: PayloadAction<UserState["activeUser"]>) => {
          state.status = { value: "idle" };
          if (action.payload) state.activeUser = action.payload;
        }
      )
      .addCase(userCrupdate.rejected, (state, action) => {
        state.status = { value: "failed", message: action.error.message };
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

      const { created_at, updated_at, ...user } = data;
      return user;
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

      const { created_at, updated_at, ...user } = data;
      return user;
    })
    .catch((error) => {
      throw error;
    })
);

export const { userSet, userUnset } = userSlice.actions;

export const selectActiveUser = ({ user: { activeUser } }: RootState) =>
  activeUser;

export const selectUserStatus = ({ user: { status } }: RootState) => status;

export default userSlice.reducer;
