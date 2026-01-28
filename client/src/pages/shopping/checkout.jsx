import React from 'react';
import { useSelector } from 'react-redux';

import accountImage from '../../assets/account-hero-image.png';
import AccountAddress from '@/components/shopping/address';
import UserCartItemsContent from '@/components/shopping/cart-content-wrapper';
import { Button } from '@/components/ui/button';

const ShopCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems?.items?.reduce((sum, item) => {
          const price = item?.salePrice > 0 ? item.salePrice : item?.price;

          return sum + price * item.quantity;
        }, 0)
      : 0;

  return (
    <div className="flex flex-col">
      {/* Banner */}
      <div className="relative h-[300px] md:h-[420px] w-full overflow-hidden">
        <img
          src={accountImage}
          alt="Account banner"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <AccountAddress />

        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0
            ? cartItems?.items?.map((item) => (
                <UserCartItemsContent cartItems={item} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">{totalCartAmount}</span>
            </div>
          </div>
          <div>
            <Button className="mt-4 w-full">Checkout with Paypal</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
