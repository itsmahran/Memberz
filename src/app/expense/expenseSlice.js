import { createSlice } from "@reduxjs/toolkit";

const expenseSlice = createSlice({
  name: "expense",
  initialState: {
    activeComponent: "list",
  },
  reducers: {
    changeExpenseActiveComponent(state, { payload }) {
      state.activeComponent = payload;
    },
  },
});

export const { changeExpenseActiveComponent } = expenseSlice.actions;
export default expenseSlice.reducer;
