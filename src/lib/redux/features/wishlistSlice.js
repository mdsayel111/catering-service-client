import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlistItems: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const id = action.payload;
      const itemExists = state.wishlistItems.find((item) => item === id);
      if (!itemExists) {
        state.wishlistItems.push(id);
      }
    },
    removeFromWishlist: (state, action) => {
      const index = state.wishlistItems.findIndex(
        (item) => item === action.payload
      );
      if (index > -1) {
        state.wishlistItems.splice(index, 1);
      }
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
