import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    username: "admin",
    password: "password",
  },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
});

export default authSlice.reducer;
