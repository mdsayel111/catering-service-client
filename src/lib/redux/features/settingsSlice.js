import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  settings: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setColor: (state, action) => {
      state.settings.colors = action.payload;
    },
  },
});

export const { setColor } = settingsSlice.actions;
export default settingsSlice.reducer;
