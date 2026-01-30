import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductSlice from './admin/products-slice';
import ShopProductSlice from './shop/products-slice';
import ShopCartSlice from './shop/cart-slice';
import shopAddressSlice from './shop/address-slice';
import shopOrderSlice from './shop/order-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: ShopProductSlice,
    shopCart: ShopCartSlice,
    shopAddress: shopAddressSlice,
    shopOrder: shopOrderSlice,
  },
});

export default store;
