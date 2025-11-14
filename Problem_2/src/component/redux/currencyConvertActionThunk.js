import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getConvert = createAsyncThunk(
  "currencyConvert/getProduct",
  async (payload, { rejectWithValue }) => {
    {
      try {
        const result = await axios.get(
          "https://6916f6b3a7a34288a27f0bcc.mockapi.io/data",
          {
            headers: {
              "Cache-Control": "no-cache",
              Pragma: "no-cache",
              Expires: "0",
            },
          }
        );
        console.log(result.data[0]);
        return result.data;
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  }
);
