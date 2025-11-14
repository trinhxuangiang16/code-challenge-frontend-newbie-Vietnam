import { createSlice } from "@reduxjs/toolkit";
import { getConvert } from "./currencyConvertActionThunk";

const initialState = {
  currency: [],
  isLoading: false,
};

export const { reducer: currencySlice, actions: currencyConvertAction } =
  createSlice({
    name: "currencyConvert",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
      builder
        .addCase(getConvert.pending, (state, { payload }) => {
          state.isLoading = true;
        })

        .addCase(getConvert.fulfilled, (state, { payload }) => {
          state.products = payload;
          state.isLoading = false;
        })

        .addCase(getConvert.rejected, (state, { payload }) => {
          state.isLoading = false;
        });
    },
  });
