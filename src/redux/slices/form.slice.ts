import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { FieldValues } from "react-hook-form";

type FormState = {
  [key: string]: FieldValues;
};

const initialState = {} as FormState;

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    formUpdate: {
      reducer: (
        state,
        {
          payload: { formId, values },
        }: PayloadAction<FieldValues & { formId: string }>
      ) => ({
        ...state,
        [formId]: { ...state[formId], ...values },
      }),
      prepare: (formId: string, values: FieldValues) => {
        return { payload: { values, formId } };
      },
    },
    formClear: (state, action: PayloadAction<string>) => {
      delete state[action.payload];
    },
  },
});

export const { formUpdate, formClear } = formSlice.actions;

export const selectFormData = (formId: string) => (state: RootState) =>
  state.form[formId];

export default formSlice;
