import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isAppLoading: true,
  },
  reducers: {
    setIsAppLoading(state, { payload }) {
      state.isAppLoading = payload;
    },
  },
});

export const { setIsAppLoading } = appSlice.actions;
export default appSlice.reducer;
