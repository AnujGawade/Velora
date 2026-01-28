import React from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';

const AddressCard = ({
  addressInfo,
  handleEditAddress,
  handleDeleteAddress,
}) => {
  return (
    <Card>
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex gap-2">
        <p
          className="text-blue-600 cursor-pointer"
          onClick={() => handleEditAddress(addressInfo)}
        >
          Edit
        </p>
        <p
          className="text-red-700 cursor-pointer"
          onClick={() => handleDeleteAddress(addressInfo)}
        >
          Delete
        </p>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
