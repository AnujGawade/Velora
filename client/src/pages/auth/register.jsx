import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { registerFormControls } from '../../config';
import { useDispatch } from 'react-redux';
import { register } from '../../store/auth-slice';
import { toast } from 'sonner';

const initialstate = {
  userName: '',
  email: '',
  password: '',
};

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialstate);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formData)).then((data) => {
      console.log(formData);
      if (data?.payload?.success) {
        toast(data?.payload?.message);
      } else {
        toast.error(data?.payload?.message);
      }
    });
  };
  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Connect to Velora
        </h1>
        <p className="mt-2">
          Already have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={'Create Account'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthRegister;
