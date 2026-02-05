/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllOrders,
  getOrderDetails,
  resetOrderDetails,
} from '@/store/admin/order-slice';
import AdminOrderDetails from './orders-details';
import { DialogTitle } from '@radix-ui/react-dialog';

const AdminOrdersView = () => {
  const dispatch = useDispatch();
  const { orderList, orderDetails } = useSelector((state) => state.adminOrders);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  // Fetch all orders
  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  // Open dialog when order details arrive
  useEffect(() => {
    if (orderDetails) {
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
        <CardTitle>All Orders</CardTitle>
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
              orderList.map((order) => (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.orderDate?.split('T')[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={`py-1 px-3 ${
                        order.orderStatus === 'confirmed'
                          ? 'bg-green-500'
                          : order.orderStatus === 'rejected'
                            ? 'bg-red-600'
                            : 'bg-black'
                      }`}
                    >
                      {order.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${order.totalAmount}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleViewDetails(order._id)}>
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* ✅ SINGLE DIALOG */}
        <Dialog
          open={openDetailsDialog}
          onOpenChange={(open) => {
            if (!open) handleCloseDialog();
          }}
        >
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Order Details</DialogTitle>
            </DialogHeader>

            <AdminOrderDetails orderDetails={orderDetails} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default AdminOrdersView;
