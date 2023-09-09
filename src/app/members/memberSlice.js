import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    activeComponent: "list",
  },
  reducers: {
    changeActiveComponent(state, { payload }) {
      state.activeComponent = payload;
    },
  },
});

export const { changeActiveComponent } = memberSlice.actions;
export default memberSlice.reducer;
