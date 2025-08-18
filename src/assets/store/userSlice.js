// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const { updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
