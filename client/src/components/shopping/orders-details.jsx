import React from 'react';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { DialogContent } from '../ui/dialog';

const ShopOrdersDetails = () => {
  <DialogContent className="sm:max-w-[600px]">
    <div className="grid gap-6">
      <div className="grid gap-2">
        <div className="flex mt-6 items-center justify-between">
          <p className="font-medium">Order ID</p>
          <Label>123456</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Date</p>
          <Label>29/01/2026</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Status</p>
          <Label>Shipped</Label>
        </div>
        <div className="flex mt-2 items-center justify-between">
          <p className="font-medium">Order Price</p>
          <Label>In Process</Label>
        </div>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Order Details</div>
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span>Product One</span>
              <span>$100</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <div className="font-medium">Shipping Information</div>
          <div className="grid gap-0.5 text-muted-foreground">
            <span>John </span>
            <span>Address </span>
            <span>City </span>
            <span>Pincode </span>
            <span>Phone </span>
          </div>
        </div>
      </div>
    </div>
  </DialogContent>;
};

export default ShopOrdersDetails;
