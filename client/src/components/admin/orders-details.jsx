import React, { useState } from 'react';
import { DialogContent } from '../ui/dialog';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import CommonForm from '../common/form';

const initialFormData = {
  status: '',
};

const AdminOrderDetails = () => {
  const [formData, setFormData] = useState(initialFormData);

  const handleUpdateStatus = (event) => {
    event.preventDefault();
  };

  return (
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

        <div>
          <CommonForm
            formControls={[
              {
                label: 'Order Status',
                name: 'status',
                componentType: 'select',
                options: [
                  { id: 'pending', label: 'Pending' },
                  { id: 'inProcess', label: 'In Process' },
                  { id: 'inShipping', label: 'In Shipping' },
                  { id: 'rejected', label: 'Rejected' },
                  { id: 'delivered', label: 'Delivered' },
                ],
              },
            ]}
            formData={formData}
            setFormData={setFormData}
            buttonText={'Update Order Status'}
            onSubmit={handleUpdateStatus}
          />
        </div>
      </div>
    </DialogContent>
  );
};

export default AdminOrderDetails;
