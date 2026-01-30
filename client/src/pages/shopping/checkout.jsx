import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import accountImage from '../../assets/account-hero-image.png';
import AccountAddress from '@/components/shopping/address';
import UserCartItemsContent from '@/components/shopping/cart-content-wrapper';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/shop/order-slice';

const ShopCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const dispatch = useDispatch();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems?.items?.reduce((sum, item) => {
          const price = item?.salePrice > 0 ? item.salePrice : item?.price;

          return sum + price * item.quantity;
        }, 0)
      : 0;

  const handleInitiatePayment = () => {
    const orderData = {
      userId: user?.id,
      cartItems: cartItems?.items?.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: '',
      payerId: '',
    };

    dispatch(createNewOrder(orderData)).then((data) => {
      console.log(data);
    });
  };

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
        <AccountAddress setCurrentSelectedAddress={setCurrentSelectedAddress} />

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
            <Button onClick={handleInitiatePayment} className="mt-4 w-full">
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
