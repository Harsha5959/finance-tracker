import { createSlice } from "@reduxjs/toolkit";

const initialTransactions = JSON.parse(localStorage.getItem("transactions")) || [];

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transactions: initialTransactions
  },
  reducers: {
    addTransaction: (state, action) => {
      const newTrans = action.payload;
      state.transactions.push(newTrans);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },

    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    },

    updateTransaction: (state, action) => {
      const updated = action.payload;
      const index = state.transactions.findIndex(t => t.id === updated.id);
      if (index !== -1) state.transactions[index] = updated;
      localStorage.setItem("transactions", JSON.stringify(state.transactions));
    }
  }
});

export const { addTransaction, deleteTransaction, updateTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
