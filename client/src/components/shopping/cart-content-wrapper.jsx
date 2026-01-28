import React from 'react';
import { Button } from '../ui/button';
import { Minus, Plus, Trash } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartItem, updateCartItem } from '@/store/shop/cart-slice';
import { toast } from 'sonner';

const UserCartItemsContent = ({ cartItems }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCartItemDelete = async (item) => {
    try {
      await dispatch(
        deleteCartItem({
          userId: user?.id,
          productId: item?.productId,
        }),
      ).unwrap();

      toast.success('Item removed from cart');
    } catch (error) {
      console.log(error);
      toast.error('Failed to remove item');
    }
  };

  const handleUpdateQuantity = async (item, actionType) => {
    // ❗ Prevent quantity < 1
    if (actionType === 'minus' && item.quantity === 1) return;

    const updatedQuantity =
      actionType === 'plus' ? item.quantity + 1 : item.quantity - 1;

    try {
      await dispatch(
        updateCartItem({
          userId: user?.id,
          productId: item?.productId,
          quantity: updatedQuantity,
        }),
      ).unwrap();

      toast.success('Cart item updated');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update cart');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <img
        className="w-20 h-20 rounded object-cover"
        src={cartItems?.image}
        alt={cartItems?.title}
      />

      <div className="flex-1">
        <h3 className="font-extrabold">{cartItems?.title}</h3>

        <div className="flex items-center gap-2 mt-1">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItems, 'minus')}
            disabled={cartItems?.quantity === 1}
          >
            <Minus className="w-4 h-4" />
          </Button>

          <span className="font-semibold">{cartItems?.quantity}</span>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleUpdateQuantity(cartItems, 'plus')}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-end">
        <p className="font-semibold">
          $
          {(
            (cartItems?.salePrice > 0
              ? cartItems?.salePrice
              : cartItems?.price) * cartItems.quantity
          ).toFixed(2)}
        </p>

        <Trash
          onClick={() => handleCartItemDelete(cartItems)}
          className="cursor-pointer mt-1 text-red-500 hover:text-red-600"
          size={20}
        />
      </div>
    </div>
  );
};

export default UserCartItemsContent;
