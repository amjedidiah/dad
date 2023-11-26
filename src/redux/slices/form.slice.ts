import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { FieldValues } from "react-hook-form";

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

export const selectFormData = (state: RootState) => state.form;

export default formSlice;
