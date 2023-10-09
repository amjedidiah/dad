import { createAction } from "@reduxjs/toolkit";
import { RootState } from "@/redux/store";
import { HYDRATE } from "next-redux-wrapper";

export const hydrate = createAction<RootState>(HYDRATE);
