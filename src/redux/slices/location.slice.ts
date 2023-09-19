import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Country } from "react-phone-number-input";
import { RootState, CommonStateStatus } from "@/redux/store";

type LocationState = {
  countryCode?: Country;
  status: CommonStateStatus;
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
      .addCase(fetchLocationData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchLocationData.fulfilled,
        (state, action: PayloadAction<LocationState["countryCode"]>) => {
          state.status = "idle";
          state.countryCode = action.payload;
        }
      )
      .addCase(fetchLocationData.rejected, (state) => {
        state.status = "failed";
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