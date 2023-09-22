import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country } from "react-phone-number-input";
import { RootState, CommonStateStatus } from "@/redux/store";

type LocationState = {
  countryCode?: Country;
  status: CommonStateStatus;
};

const initialState = {
  countryCode: undefined,
  status: { value: "idle" },
} as LocationState;

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocationData.pending, (state) => {
        state.status = { value: "pending" };
      })
      .addCase(
        fetchLocationData.fulfilled,
        (state, action: PayloadAction<LocationState["countryCode"]>) => {
          state.status = { value: "idle" };
          state.countryCode = action.payload;
        }
      )
      .addCase(fetchLocationData.rejected, (state, action) => {
        state.status = { value: "rejected", message: action.error.message };
      });
  },
});

export const fetchLocationData = createAsyncThunk(
  "location/fetchLocationData",
  () =>
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then(({ country_code }) => country_code)
);

export const selectCountryCode = (state: RootState) =>
  state.location.countryCode;

export default locationSlice.reducer;
