import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import accountImage from '../../assets/account-hero-image.png';
import AccountAddress from '@/components/shopping/address';
import UserCartItemsContent from '@/components/shopping/cart-content-wrapper';
import { Button } from '@/components/ui/button';
import { createNewOrder } from '@/store/shop/order-slice';
import { toast } from 'sonner';

const ShopCheckout = () => {
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.shopCart);
  const { approvalURL, isLoading } = useSelector((state) => state.shopOrder);
  const { user } = useSelector((state) => state.auth);

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  /* ---------------- TOTAL CART AMOUNT ---------------- */
  const totalCartAmount =
    cartItems?.items?.reduce((sum, item) => {
      const price = item?.salePrice > 0 ? item.salePrice : item.price;
      return sum + price * item.quantity;
    }, 0) || 0;

  /* ---------------- PAYPAL REDIRECT ---------------- */
  useEffect(() => {
    if (approvalURL) {
      window.location.href = approvalURL;
    }
  }, [approvalURL]);

  /* ---------------- INITIATE PAYMENT ---------------- */
  const handleInitiatePayment = () => {
    if (!currentSelectedAddress) {
      toast.error('Please select a delivery address');
      return;
    }

    if (!cartItems?.items?.length) {
      toast.error('Your Cart is empty! Please add Products to Proceed!');
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((item) => ({
        productId: item.productId,
        title: item.title,
        image: item.image,
        price: item.salePrice > 0 ? item.salePrice : item.price,
        quantity: item.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress._id,
        address: currentSelectedAddress.address,
        city: currentSelectedAddress.city,
        pincode: currentSelectedAddress.pincode,
        phone: currentSelectedAddress.phone,
        notes: currentSelectedAddress.notes,
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
    };

    setIsPaymentStart(true);

    dispatch(createNewOrder(orderData)).finally(() => {
      setIsPaymentStart(false);
    });
  };

  /* ---------------- RENDER ---------------- */
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
        {/* Address */}
        <AccountAddress setCurrentSelectedAddress={setCurrentSelectedAddress} />

        {/* Cart */}
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 ? (
            cartItems.items.map((item) => (
              <UserCartItemsContent key={item.productId} cartItems={item} />
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}

          {/* Total */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹{totalCartAmount}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <Button
            disabled={isPaymentStart || isLoading}
            onClick={handleInitiatePayment}
            className="mt-4 w-full"
          >
            {isPaymentStart ? 'Processing Payment...' : 'Checkout with PayPal'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShopCheckout;
