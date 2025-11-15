import { createSlice } from "@reduxjs/toolkit";
import { getConvert } from "./currencyConvertActionThunk";

const initialState = {
  currency: [],
  isLoading: false,
  amountState: {},
  toCurrency: {},
  bothWayMoney: {
    moneyA: "",
    moneyB: "",
  },
  result: 0,
  error: null,
};
const currencySlice = createSlice({
  name: "currencyConvert",
  initialState,
  reducers: {
    getAmountAction: (state, action) => {
      const amount = state.currency.find(
        (item) => item.currency_code === action.payload
      );
      console.log("Selected:", action.payload);
      state.amountState = amount || {};
      state.bothWayMoney.moneyA = amount || "";
    },
    getToCurrencyAction: (state, action) => {
      const currency = state.currency.find(
        (item) => item.currency_code === action.payload
      );
      console.log("Selected:", action.payload);
      state.toCurrency = currency || {};
      state.bothWayMoney.moneyB = currency || "";
    },
    getCurrentResultAction: (state, action) => {
      state.result = action.payload;
    },
    reverseTheWayToChange: (state, action) => {
      const tempAmount = state.amountState;
      state.amountState = state.toCurrency;
      state.toCurrency = tempAmount;

      // let A = state.bothWayMoney.moneyB;
      // let B = state.bothWayMoney.moneyA;
      // state.bothWayMoney = { moneyA: A, moneyB: B };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConvert.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConvert.fulfilled, (state, action) => {
        state.currency = action.payload;
        state.isLoading = false;
      })
      .addCase(getConvert.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

// Export reducer
export default currencySlice.reducer;

// Export actions
export const {
  getAmountAction,
  getToCurrencyAction,
  getCurrentResultAction,
  reverseTheWayToChange,
} = currencySlice.actions;
