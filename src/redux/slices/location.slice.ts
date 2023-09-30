import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Country } from "react-phone-number-input";
import { RootState, CommonStateStatus } from "@/redux/store";

type LocationState = {
  countryCode?: Country;
  currency?: string;
  rate: number;
  status: CommonStateStatus;
};

const initialState = {
  countryCode: undefined,
  currency: undefined,
  rate: 1,
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
        (
          state,
          action: PayloadAction<
            Pick<LocationState, "countryCode" | "currency" | "rate">
          >
        ) => {
          state.status = { value: "idle" };
          state.countryCode = action.payload.countryCode;
          state.currency = action.payload.currency;
          state.rate = action.payload.rate;
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
      .then(({ country_code, currency }) => ({
        countryCode: country_code,
        currency,
      }))
      .then(async (data) => {
        const res = await fetch(
          `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`
        ).then((res) => res.json());
        const conversionRate =
          !res.conversion_rates || !data.currency
            ? 1
            : res.conversion_rates[data.currency];

        return {
          ...data,
          rate: conversionRate,
        };
      })
);

export const selectLocationState = (state: RootState) => state.location;

export const selectCountryCode = createSelector(
  [selectLocationState],
  (location) => location.countryCode
);

export const selectLocationPrice =
  (price = 0) =>
  ({ location: { countryCode, currency, rate } }: RootState) =>
    countryCode && currency
      ? new Intl.NumberFormat(countryCode, {
          style: "currency",
          currency,
        }).format(price * rate)
      : new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(price * rate);

export default locationSlice.reducer;
