import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthLogin from './pages/auth/login';
import AuthLayout from './components/auth/layout';
import AuthRegister from './pages/auth/register';
import AdminLayout from './components/admin/layout';
import AdminDashboard from './pages/admin/dashboard';
import AdminProducts from './pages/admin/products';
import AdminOrders from './pages/admin/orders';
import AdminFeatures from './pages/admin/features';
import ShopLayout from './components/shopping/layout';
import NotFound from './pages/not-found';
import ShopHome from './pages/shopping/home';
import ShopListing from './pages/shopping/listing';
import ShopCheckout from './pages/shopping/checkout';
import ShopAccount from './pages/shopping/account';
import UnauthPage from './pages/unauth-page';
import AuthProtected from './components/common/authProtected';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/auth-slice';
import { Skeleton } from './components/ui/skeleton';

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);



  if (isLoading) return <Skeleton className="h-[600px] w-full" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white ">
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthProtected isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </AuthProtected>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AuthProtected isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AuthProtected>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <AuthProtected isAuthenticated={isAuthenticated} user={user}>
              <ShopLayout />
            </AuthProtected>
          }
        >
          <Route path="home" element={<ShopHome />} />
          <Route path="listing" element={<ShopListing />} />
          <Route path="checkout" element={<ShopCheckout />} />
          <Route path="account" element={<ShopAccount />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnauthPage />} />
      </Routes>
    </div>
  );
};

export default App;
