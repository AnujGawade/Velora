import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import {
  getAllOrders,
  getOrderDetails,
  resetOrderDetails,
} from '@/store/shop/order-slice';
import ShopOrdersDetails from './orders-details';
import { DialogTitle } from '@radix-ui/react-dialog';

function ShopOrders() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orderList, orderDetails } = useSelector((state) => state.shopOrder);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  useEffect(() => {
    if (user?.id) {
      dispatch(getAllOrders({ userId: user.id }));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (orderDetails) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOpenDetailsDialog(true);
    }
  }, [orderDetails]);

  const handleViewDetails = (orderId) => {
    setSelectedOrderId(orderId);
    dispatch(getOrderDetails({ id: orderId }));
  };

  const handleCloseDialog = () => {
    setOpenDetailsDialog(false);
    setSelectedOrderId(null);
    dispatch(resetOrderDetails());
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody>
            {orderList?.length > 0 &&
              orderList.map((orderItem) => (
                <TableRow key={orderItem._id}>
                  <TableCell>{orderItem._id}</TableCell>
                  <TableCell>{orderItem.orderDate?.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        orderItem.orderStatus === 'confirmed'
                          ? 'bg-green-500'
                          : orderItem.orderStatus === 'rejected'
                            ? 'bg-red-600'
                            : 'bg-black'
                      }`}
                    >
                      {orderItem.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${orderItem.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewDetails(orderItem._id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* SINGLE DIALOG */}
        <Dialog open={openDetailsDialog} onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>

            <ShopOrdersDetails orderDetails={orderDetails} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

export default ShopOrders;
