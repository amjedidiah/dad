import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country } from "react-phone-number-input";
import { RootState, StateStatus } from "@/redux/store";

type LocationState = {
  countryCode?: Country;
  status: StateStatus;
};

const initialState = {
  countryCode: undefined,
  status: "idle",
} as LocationState;

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadLocation.fulfilled, (state, action) => {
        state.status = "idle";
        state.countryCode = action.payload;
      })
      .addCase(loadLocation.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const loadLocation = createAsyncThunk("location/loadLocation", () =>
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then(({ country_code }) => country_code)
);

export const selectCountryCode = (state: RootState) =>
  state.location.countryCode;

export default locationSlice.reducer;
