import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: "", isAdmin: false, email: "" };

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    authenticate: (state, action) => (state = action.payload)
  }
});

export const { authenticate } = adminSlice.actions;

export default adminSlice.reducer;
