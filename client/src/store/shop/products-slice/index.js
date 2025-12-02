import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
};

export const fetchAllFilteredProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async ({ filterParams, sortParams }) => {
    const query = new URLSearchParams({
      ...filterParams,
      sortBy: sortParams,
    });

    const result = await axios.get(`http://localhost:4000/api/shop/products?${query}`);
    return result?.data;
  }
);

const ShopProductSlice = createSlice({
  name: 'shoppingProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = true;
        state.productList = [];
      });
  },
});

export default ShopProductSlice.reducer;
