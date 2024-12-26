import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateItemQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const item = state.cart.find((item) => item._id === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta); // Prevent quantity < 1
      }
    },
    addItem: (state, action) => {
      const item = action.payload;
      // Check if item is already in the cart
      const book = state.cart.find((cartItem) => cartItem._id === item._id);
      if (book) {
        book.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    removeItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
  },
});

// Export the actions
export const { updateItemQuantity, addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
