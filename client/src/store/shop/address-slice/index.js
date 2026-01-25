import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  isLoading: false,
  addressList: [],
};

/* ------------------ THUNKS ------------------ */

export const addNewAddress = createAsyncThunk(
  '/addresses/addNewAddress',
  async (formData) => {
    const response = await axios.post(
      'http://localhost:4000/api/shop/address',
      formData,
    );
    return response.data;
  },
);

export const fetchAddress = createAsyncThunk(
  '/addresses/fetchAddress',
  async (userId) => {
    const response = await axios.get(
      `http://localhost:4000/api/shop/address/${userId}`,
    );
    return response.data;
  },
);

export const editAddress = createAsyncThunk(
  '/addresses/editAddress',
  async ({ userId, addressId, formData }) => {
    const response = await axios.put(
      `http://localhost:4000/api/shop/address/${userId}/${addressId}`,
      formData,
    );
    return response.data;
  },
);

export const deleteAddress = createAsyncThunk(
  '/addresses/deleteAddress',
  async ({ userId, addressId }) => {
    const response = await axios.delete(
      `http://localhost:4000/api/shop/address/${userId}/${addressId}`,
    );
    return response.data;
  },
);

/* ------------------ SLICE ------------------ */

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      /* -------- ADD ADDRESS -------- */
      .addCase(addNewAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(addNewAddress.rejected, (state) => {
        state.isLoading = false;
      })

      /* -------- FETCH ADDRESS -------- */
      .addCase(fetchAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.isLoading = false;
        state.addressList = [];
      });

    /* -------- EDIT ADDRESS -------- */
    //   .addCase(editAddress.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(editAddress.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.addressList = action.payload.data;
    //   })
    //   .addCase(editAddress.rejected, (state) => {
    //     state.isLoading = false;
    //   })

    /* -------- DELETE ADDRESS -------- */
    //   .addCase(deleteAddress.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteAddress.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.addressList = action.payload.data;
    //   })
    //   .addCase(deleteAddress.rejected, (state) => {
    //     state.isLoading = false;
    //   });
  },
});

export default addressSlice.reducer;
