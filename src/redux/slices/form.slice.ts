import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { FieldValues } from "react-hook-form";
import { selectActiveUser } from "./user.slice";

const initialState = {} as FieldValues;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formUpdate: (state, action: PayloadAction<FieldValues>) => ({
      ...state,
      ...action.payload,
    }),
    formClear: () => initialState,
  },
});

export const { formUpdate, formClear } = formSlice.actions;

const selectFormData = (state: RootState) => state.form;

export const selectCombinedFormData = () =>
  createSelector(
    [selectActiveUser, selectFormData],
    (activeUser, formData) => ({ ...activeUser, ...formData })
  );

export default formSlice;
