import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

// slice for cart
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // for adding item to the cart
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
  },
});

// action function
export const { addToCart } = cartSlice.actions;
// reducer
export default cartSlice.reducer;
