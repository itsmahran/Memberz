import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isUserSignedIn: false,
    name: "",
    email: "",
  },
  reducers: {
    setIsUserSignedIn(state, {payload}) {
      state.isUserSignedIn = payload.isUserSignedIn;
    },
  },
});

export const { setIsUserSignedIn } = authSlice.actions;
export default authSlice.reducer;
