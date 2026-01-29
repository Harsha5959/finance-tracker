import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import transactionReducer from "./transactionSlice";
import filterReducer from "./filterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    transaction: transactionReducer,
    filter: filterReducer
  }
});
