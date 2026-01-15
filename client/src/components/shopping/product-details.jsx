import React, { useState } from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { StarIcon } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/shop/cart-slice';
import { toast } from 'sonner';

const ProductDetails = ({ open, setOpen, productDetails }) => {
  console.log(productDetails);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      setIsAdding(true);

      await dispatch(
        addToCart({
          userId: user.id,
          productId: productDetails._id,
          quantity: 1,
        })
      ).unwrap();

      toast.success('Product added to cart');
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        {/* Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Content */}
        <div>
          <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>

          <p className="text-muted-foreground text-xl mb-5 mt-4">
            {productDetails?.description}
          </p>

          {/* Price */}
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? 'line-through' : ''
              }`}
            >
              ${productDetails?.price}
            </p>

            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* Add to cart */}
          <div className="mt-5 mb-5">
            <Button
              onClick={handleAddToCart}
              className="w-full"
              disabled={isAdding}
            >
              {isAdding ? 'Adding...' : 'Add to Cart'}
            </Button>
          </div>

          <Separator />

          {/* Reviews */}
          <div className="max-h-[300px] overflow-auto mt-5">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            <div className="flex gap-4">
              <Avatar className="w-10 h-10 border">
                <AvatarFallback>AG</AvatarFallback>
              </Avatar>

              <div>
                <h3 className="font-bold">Anuj Gawade</h3>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 fill-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground">
                  This is an awesome product!
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetails;
