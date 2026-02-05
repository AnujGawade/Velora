import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  approvalURL: null,
  isLoading: false,
  orderId: null,
  orderList: [],
  orderDetails: null,
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

export const capturePayment = createAsyncThunk(
  '/order/capturePayment',
  async ({ paymentId, payerId, orderId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/shop/order/capture',
        { paymentId, payerId, orderId },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  },
);

export const getAllOrders = createAsyncThunk(
  '/order/getAllOrders',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/shop/order/${userId}`,
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create order');
    }
  },
);

export const getOrderDetails = createAsyncThunk(
  '/order/getOrderDetails',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/shop/order/details/${id}`,
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
  reducers: {
    resetOrderDetails: (state) => {
      state.orderDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNewOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.approvalURL = action.payload.approvalURL;
        state.orderId = action.payload.orderId;
        sessionStorage.setItem(
          'currentOrderId',
          JSON.stringify(action.payload.orderId),
        );
      })
      .addCase(createNewOrder.rejected, (state) => {
        state.isLoading = false;
        state.approvalURL = null;
        state.orderId = null;
      })
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderList = action.payload.data;
      })
      .addCase(getAllOrders.rejected, (state) => {
        state.isLoading = false;
        state.orderList = [];
      })
      .addCase(getOrderDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderDetails = action.payload.data;
      })
      .addCase(getOrderDetails.rejected, (state) => {
        state.isLoading = state.isLoading = false;
        state.orderDetails = null;
      });
  },
});

export const { resetOrderDetails } = shopOrderSlice.actions;
export default shopOrderSlice.reducer;
