import { useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';

function ShopOrderDetails({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>{orderDetails?._id}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>{orderDetails?.orderDate?.split('T')[0]}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Price</p>
          <Label>${orderDetails?.totalAmount}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Method</p>
          <Label>{orderDetails?.paymentMethod}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Payment Status</p>
          <Label>{orderDetails?.paymentStatus}</Label>
        </div>

        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Badge
            className={`py-1 px-3 ${
              orderDetails?.orderStatus === 'confirmed'
                ? 'bg-green-500'
                : orderDetails?.orderStatus === 'rejected'
                  ? 'bg-red-600'
                  : 'bg-black'
            }`}
          >
            {orderDetails?.orderStatus}
          </Badge>
        </div>
      </div>

      <Separator />

      <div>
        <p className="font-medium mb-2">Order Items</p>
        {orderDetails?.cartItems?.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <span>{item.title}</span>
            <span>x{item.quantity}</span>
            <span>${item.price}</span>
          </div>
        ))}
      </div>

      <Separator />

      <div>
        <p className="font-medium mb-2">Shipping Info</p>
        <div className="text-muted-foreground">
          <div>{user?.userName}</div>
          <div>{orderDetails?.addressInfo?.address}</div>
          <div>{orderDetails?.addressInfo?.city}</div>
          <div>{orderDetails?.addressInfo?.pincode}</div>
          <div>{orderDetails?.addressInfo?.phone}</div>
          <div>{orderDetails?.addressInfo?.notes}</div>
        </div>
      </div>
    </div>
  );
}

export default ShopOrderDetails;
