import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  orderList: [],
  orderDetails: null,
};

export const getAllOrders = createAsyncThunk(
  '/order/getAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/admin/orders',
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch orders');
    }
  },
);

export const getOrderDetails = createAsyncThunk(
  '/order/getOrderDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/admin/orders/details/${id}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  },
);

const adminOrderSlice = createSlice({
  name: 'adminOrderSlice',
  initialState,
  reducers: {
    resetOrderDetails(state) {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // =========================
      // GET ALL ORDERS
      // =========================
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload?.data || [];
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
      })

      // =========================
      // GET ORDER DETAILS
      // =========================
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload?.data || null;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { resetOrderDetails } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
