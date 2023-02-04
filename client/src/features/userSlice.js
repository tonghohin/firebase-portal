import { createSlice } from "@reduxjs/toolkit";

const initialState = { uid: "", isAdmin: false, unit: "", email: "" };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuthenticate: (state, action) => (state = action.payload)
  }
});

export const { userAuthenticate } = userSlice.actions;

export default userSlice.reducer;
