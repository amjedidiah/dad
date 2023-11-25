import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import { Country } from "react-phone-number-input";
import { RootState } from "@/redux/store";
import { hydrate } from "@/redux/util";
import ipData from "@/lib/responses/ip-data.json";
import ratesData from "@/lib/responses/rates-data.json";

type IPData = typeof ipData;
type RatesData = typeof ratesData;

export type LocationState = {
  countryCode: Country;
  currency: string;
  language: string;
  exchangeRate: number;
};

const initialState = {
  countryCode: "US",
  currency: "USD",
  language: "en-US",
  exchangeRate: 1,
} as LocationState;

const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchExchangeRate.fulfilled,
        (
          state,
          action: PayloadAction<LocationState["exchangeRate"] | undefined>
        ) => {
          if (action.payload)
            return {
              ...state,
              exchangeRate: action.payload,
            };
        }
      )
      .addCase(
        fetchIPDetails.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<
            | Pick<LocationState, "countryCode" | "currency" | "language">
            | undefined
          >
        ) => {
          if (payload)
            return {
              ...state,
              ...payload,
            };
        }
      )
      .addCase(fetchIPDetails.rejected, (state) => {
        return {
          ...state,
          ...initialState,
        };
      })
      .addCase(hydrate, (state, action) => ({
        ...state,
        ...action.payload.location,
      }));
  },
});

export const fetchExchangeRate = createAsyncThunk<
  LocationState["exchangeRate"] | undefined,
  string,
  { state: RootState }
>("location/fetchExchangeRate", (currency) =>
  fetch(
    `https://v6.exchangerate-api.com/v6/${process.env.NEXT_PUBLIC_EXCHANGE_RATE_API_KEY}/latest/USD`
  )
    .then((res) => res.json())
    .then(
      ({ conversion_rates }: RatesData) =>
        conversion_rates &&
        conversion_rates[currency as keyof typeof conversion_rates]
    )
    .catch((error) => {
      console.error(error);
      throw error;
    })
);

export const fetchIPDetails = createAsyncThunk<
  Pick<LocationState, "countryCode" | "currency" | "language"> | undefined,
  undefined,
  { state: RootState }
>("location/fetchIPDetails", async (_, thunkApi) =>
  fetch("https://ipapi.co/json/")
    .then((res) => res.json())
    .then(({ currency, country_code, languages }: IPData) => {
      const { countryCode } = thunkApi.getState().location;
      if (country_code === countryCode) return;

      const [defaultLanguage] = languages.split(",");
      return {
        currency,
        countryCode: country_code as Country,
        language: defaultLanguage,
      };
    })
    .catch((error) => {
      console.error(error);
      throw error;
    })
);

export const selectLocationState = (state: RootState) => state.location;

export const selectCountryCode = createSelector(
  [selectLocationState],
  (location) => location.countryCode
);

export const selectLocationPrice =
  (price = 0) =>
  ({ location: { language, currency, exchangeRate } }: RootState) =>
    new Intl.NumberFormat(language, {
      style: "currency",
      currency,
    }).format(price * exchangeRate);

export default locationSlice;
