import { configureStore } from "@reduxjs/toolkit";
// renamed as reducer
// import cartSlice from "../features/cartSlice";
import cartReducer from "../features/cartSlice";
// renamed as reducer
// import productSlice from "../features/productSlice";
import productReducer from "../features/productSlice";

// main redux store
// configureStore enables us to combine reducers and configure redux dev tools(for checking our state)
export const store = configureStore({
  // all the available reducers
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
