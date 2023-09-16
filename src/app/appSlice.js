import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isAppLoading: true,
    navState: {
      currentPageId: "home",
      activeMainComponent: null,
      redirectBackToPageId: null,
      redirectBackToPageComponent: null,
    },
  },
  reducers: {
    setIsAppLoading(state, { payload }) {
      state.isAppLoading = payload;
    },
    setNavState(state, action) {
      state.navState = { ...state.navState, ...action.payload };
    },
  },
});

export const { setIsAppLoading, setNavState } = appSlice.actions;
export default appSlice.reducer;
