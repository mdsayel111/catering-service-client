import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  user: {},
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // handle auth logic
      const token = action.payload;
      state.token = token;
    },
    setUser: (state, action) => {
      // handle auth logic
      const user = action.payload;
      state.user = user;
    },
    logout: (state) => {
      state.token = "";
      state.user = null;
    },
  },
});

export const { setToken, logout, setUser } = authSlice.actions;
export default authSlice.reducer;
