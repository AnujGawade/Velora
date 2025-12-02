import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  '/products/addnewProduct',
  async (formData) => {
    const result = await axios.post(
      'http://localhost:4000/api/admin/products/',
      formData,
      {
        headers: {
          'Content-type': 'application/json',
        },
      }
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  '/products/editProduct',
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:4000/api/admin/products/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return result?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  '/products/fetchAllProducts',
  async () => {
    const result = await axios.get('http://localhost:4000/api/admin/products/');
    return result?.data;
  }
);

export const deleteProduct = createAsyncThunk(
  '/products/deleteProduct',
  async (id) => {
    const result = await axios.delete(
      `http://localhost:4000/api/admin/products/${id}`
    );
    return result?.data;
  }
);

const adminProductSlice = createSlice({
  name: 'adminProducts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action?.payload?.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = true;
        state.productList = [];
      });
  },
});

export default adminProductSlice.reducer;
