// TODO: MODIFY TO HOLD THE CURRENCY
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// initial state that's given
const initialState = {
  items: [],
  status: null,
};

// export const productsFetch = createAsyncThunk(
//   "products/productsFetch",
//   async() => {
//     const response = await
//   }
// );

// slice to be used
const productSlice = createSlice({
  // name of the slice
  name: "test",
  // initial state of the slice
  initialState,
  // reducers that can be used within the slice
  reducers: {},
});

const { actions, reducer } = productSlice;

// export individual action creator functions
// export const {...} = actions;

export default reducer;
