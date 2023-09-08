import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./app/members/memberSlice";

export const store = configureStore({
  reducer: {
    members: memberReducer,
    // ...
  },
});
