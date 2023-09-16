import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./app/members/memberSlice";
import paymentReducer from "./app/payment/paymentSlice";
import expenseReducer from "./app/expense/expenseSlice";
import authReducer from "./app/auth/authSlice";
import appReducer from "./app/appSlice";

export const store = configureStore({
  reducer: {
    member: memberReducer,
    payment: paymentReducer,
    expense: expenseReducer,
    auth: authReducer,
    app: appReducer,
  },
});
