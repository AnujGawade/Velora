import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommonForm from '../common/form';
import { addressFormControls } from '@/config';

const initialState = {
  address: '',
  city: '',
  phone: '',
  pincode: '',
  notes: '',
};
const AccountAddress = () => {
  const [formData, setFormData] = useState(initialState);

  const handleManageAddress = (event) => {
    event.preventDefault();
  };

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== '')
      .every((item) => item);
  };

  return (
    <Card>
      <div>Address List</div>
      <CardHeader>
        <CardTitle>Add New Address</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={'Add'}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid}
        />
      </CardContent>
    </Card>
  );
};

export default AccountAddress;
