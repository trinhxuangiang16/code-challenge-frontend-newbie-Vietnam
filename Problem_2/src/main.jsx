import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import currencySlice from "./component/redux/currencySlice";

const reduxStore = configureStore({
  reducer: {
    currencyStore: currencySlice,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={reduxStore}>
    <App />
  </Provider>
);
