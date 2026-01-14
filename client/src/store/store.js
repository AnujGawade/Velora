import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import adminProductSlice from './admin/products-slice';
import ShopProductSlice from './shop/products-slice';
import ShopCartSlice from './shop/cart-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductSlice,
    shopProducts: ShopProductSlice,
    shopCart: ShopCartSlice,
  },
});

export default store;
