import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    activeComponent: "list",
  },
  reducers: {
    changePaymentActiveComponent(state, { payload }) {
      state.activeComponent = payload;
    },
  },
});

export const { changePaymentActiveComponent } = paymentSlice.actions;
export default paymentSlice.reducer;
