import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    sortField: null,     // amount | date | category
    sortOrder: "asc"     // asc | desc
  },
  reducers: {
    sortByField: (state, action) => {
      const field = action.payload;

      // if same field → toggle order
      if (state.sortField === field) {
        state.sortOrder = state.sortOrder === "asc" ? "desc" : "asc";
      } else {
        state.sortField = field;
        state.sortOrder = "asc";
      }
    }
  }
});

export const { sortByField } = filterSlice.actions;
export default filterSlice.reducer;
