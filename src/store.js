import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./app/members/memberSlice";
import authReducer from "./app/auth/authSlice";
import appReducer from "./app/appSlice";

export const store = configureStore({
  reducer: {
    member: memberReducer,
    auth: authReducer,
    app: appReducer,
    // ...
  },
});
