import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common/form";
import { addressFormControls } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "@/store/shop/address-slice";
import AddressCard from "./addressCard";
import { toast } from "sonner";

const initialState = {
  address: "",
  city: "",
  phone: "",
  pincode: "",
  notes: "",
};

const AccountAddress = () => {
  const [formData, setFormData] = useState(initialState);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);

  /* -------------------- FORM VALIDATION -------------------- */
  const isFormValid = () =>
    Object.values(formData).every((value) => String(value).trim() !== "");

  /* -------------------- ADD / EDIT ADDRESS -------------------- */
  const handleManageAddress = (e) => {
    e.preventDefault();

    // 🚫 Max address check
    if (!currentEditedId && addressList.length >= 3) {
      toast.error("You can add a maximum of 3 addresses.");
      return;
    }

    if (currentEditedId) {
      dispatch(
        editAddress({
          userId: user?.id,
          addressId: currentEditedId,
          formData,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id));
          setCurrentEditedId(null);
          setFormData(initialState);
          toast.success("Address updated successfully");
        }
      });
    } else {
      dispatch(
        addNewAddress({
          ...formData,
          userId: user?.id,
        }),
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchAddress(user?.id));
          setFormData(initialState);
          toast.success("Address added successfully");
        }
      });
    }
  };

  /* -------------------- EDIT -------------------- */
  const handleEditAddress = (address) => {
    setCurrentEditedId(address._id);
    setFormData({
      address: address.address || "",
      city: address.city || "",
      phone: address.phone || "",
      pincode: address.pincode || "",
      notes: address.notes || "",
    });
  };

  /* -------------------- DELETE -------------------- */
  const handleDeleteAddress = (addressId) => {
    dispatch(
      deleteAddress({
        userId: user?.id,
        addressId: addressId?._id,
      }),
    ).then((res) => {
      if (res?.payload?.success) {
        dispatch(fetchAddress(user?.id));
        toast.success("Address deleted Successfully");
      }
    });
  };

  /* -------------------- FETCH -------------------- */
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAddress(user.id));
    }
  }, [dispatch, user?.id]);

  /* -------------------- UI -------------------- */
  return (
    <Card>
      {/* Address Cards */}
      <div className="mb-5 grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {addressList.map((address) => (
          <AddressCard
            addressInfo={address}
            handleEditAddress={handleEditAddress}
            handleDeleteAddress={handleDeleteAddress}
          />
        ))}
      </div>

      {/* Form */}
      <CardHeader>
        <CardTitle>
          {currentEditedId ? "Edit Address" : "Add New Address"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditedId ? "Update Address" : "Add Address"}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default AccountAddress;