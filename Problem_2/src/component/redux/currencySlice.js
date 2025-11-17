import { createSlice } from "@reduxjs/toolkit";
import { getConvert } from "./currencyConvertActionThunk";

const initialState = {
  currency: [],
  isLoading: { action: false, button: false, isTypeA: false, isTypeB: false },
  amountState: {},
  toCurrency: {},
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
    },
    getToCurrencyAction: (state, action) => {
      const currency = state.currency.find(
        (item) => item.currency_code === action.payload
      );
      console.log("Selected:", action.payload);
      state.toCurrency = currency || {};
    },
    getCurrentResultAction: (state, action) => {
      state.result = action.payload;
    },
    reverseTheWayToChange: (state, action) => {
      const tempAmount = state.amountState;
      state.amountState = state.toCurrency;
      state.toCurrency = tempAmount;
    },
    setIsLoadingAction: (state, action) => {
      state.isLoading.button = action.payload;
    },
    hasErrorAction: (state, action) => {
      state.error = action.payload;
    },
    setTypeCurency: (state, action) => {
      if (action.payload == "typeA") {
        state.isLoading.isTypeA = true;
      } 
      if(action.payload === "typeB") {
        state.isLoading.isTypeB = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConvert.pending, (state) => {
        state.isLoading.action = true;
      })
      .addCase(getConvert.fulfilled, (state, action) => {
        state.currency = action.payload;
        state.isLoading.action = false;
      })
      .addCase(getConvert.rejected, (state, action) => {
        state.isLoading.action = false;
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
  setIsLoadingAction,
  hasErrorAction,
  setTypeCurency,
} = currencySlice.actions;
