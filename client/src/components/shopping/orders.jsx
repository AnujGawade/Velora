import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Dialog } from '../ui/dialog';
import ShopOrdersDetails from './orders-details';

const ShopOrders = () => {
  const [openDetailsDailog, setOpenDetailsDailog] = useState(false);

  return (
    <Card>
      <CardHeader>Order History</CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Order Date</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead>Order Price</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>123456</TableCell>
              <TableCell>28/01/26</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>$230</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDailog}
                  onOpenChange={setOpenDetailsDailog}
                >
                  <Button
                    onClick={() => setOpenDetailsDailog(true)}
                    className="cursor-pointer"
                  >
                    View Details
                  </Button>
                  <ShopOrdersDetails />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShopOrders;
