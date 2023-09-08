import { createSlice } from "@reduxjs/toolkit";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    name: "Mahran",
    total_outstanding: 2300,
  },
  reducers: {},
});

export default memberSlice.reducer;
