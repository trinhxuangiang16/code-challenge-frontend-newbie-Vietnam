import { createRoot } from "react-dom/client";

import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { currencySlice } from "./component/redux/currencySlice.js";
import { Provider } from "react-redux";

const reduxStore = configureStore({
  reducer: {
    currencySlice: currencySlice,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
