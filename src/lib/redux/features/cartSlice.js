import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  cartItems: [],
};

const isSamePackage = (a, b) => {
  if (a.type !== "package" || b.type !== "package") return false;
  const aIds = [...(a.ids || [])].sort().join("-");
  const bIds = [...(b.ids || [])].sort().join("-");
  console.log(aIds, bIds);
  return aIds === bIds;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const payload = action.payload;
      if (payload.type === "product") {
        console.log(state.cartItems)
        const item = state.cartItems.find(
          (item) => item.type === "product" && item.id === payload.id
        );

        if (item) {
          toast.error("ইতিমধ্যে খাবারটি কার্টে আছে");
        } else {
          state.cartItems.push({
            type: "product",
            id: payload.id,
            quantity: payload.quantity || 1,
          });
          toast.success("খাবার কার্টে যোগ করা হয়েছে");
        }
      }
      if (payload.type === "package") {
        const exists = state.cartItems.find((item) =>
          isSamePackage(item, payload)
        );

        if (exists) {
          toast.error("ইতিমধ্যে প্যাকেজটি কার্টে আছে");
        } else {
          state.cartItems.push({
            type: "package",
            quantity: 1,
            ids: payload.ids,
          });
          toast.success("প্যাকেজটি কার্টে যোগ করা হয়েছে");
        }

      }
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (item) item.quantity++;
    },

    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (item && item.quantity > 1) item.quantity--;
    },

    removeAllCartItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  removeAllCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;