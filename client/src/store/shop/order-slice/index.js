import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
};

/* ---------------- CREATE ORDER ---------------- */

export const createNewOrder = createAsyncThunk(
  '/order/createNewOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/shop/order',
        orderData,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  },
);

/* ---------------- SLICE ---------------- */

const shopOrderSlice = createSlice({
  name: 'shopOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      });
  },
});

export const { resetOrderState } = shopOrderSlice.actions;
export default shopOrderSlice.reducer;
