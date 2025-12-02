import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { LoginFormControls } from '../../config';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { login } from '../../store/auth-slice';

const initialstate = {
  email: '',
  password: '',
};

const AuthLogin = () => {
  const [formData, setFormData] = useState(initialstate);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    dispatch(login(formData)).then((data) => {
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
          Welcome Back! Login to Velora
        </h1>
        <p className="mt-2">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={LoginFormControls}
        buttonText={'Sign In'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AuthLogin;
