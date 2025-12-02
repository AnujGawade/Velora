import ProductImage from '@/components/admin/imageUpload';
import AdminProductTile from '@/components/admin/product-tile';
import CommonForm from '@/components/common/form';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { addProductFormElements } from '@/config';
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from '@/store/admin/products-slice';
import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const initialFormData = {
  image: null,
  title: '',
  description: '',
  category: '',
  brand: '',
  price: '',
  salePrice: '',
  totalStock: '',
};

const AdminProducts = () => {
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.adminProducts);
  const [currentEditedId, setCurrentEditedId] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    currentEditedId
      ? dispatch(editProduct({ id: currentEditedId, formData })).then(
          (data) => {
            console.log(data);
            if (data?.payload?.success) {
              dispatch(fetchAllProducts());
              setFormData(initialFormData);
              setOpenForm(false);
              setCurrentEditedId(null);
            }
          }
        )
      : dispatch(
          addNewProduct({
            ...formData,
            image: uploadedImageUrl,
          })
        ).then((data) => {
          console.log(data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts());
            setFormData(initialFormData);
            setImageFile(null);
            setOpenForm(false);
            toast('Product Created Successfully');
          }
        });
  };

  const handleDelete = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        dispatch(fetchAllProducts());
      }
    });
  };

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key] !== '')
      .every((item) => item);
  };

  return (
    <>
      <div className="w-full flex justify-end ">
        <Button
          onClick={() => setOpenForm(true)}
          className="mb-2 bg-[#11191F] cursor-pointer"
        >
          <Plus />
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
                setOpenForm={setOpenForm}
                setFormData={setFormData}
                handleDelete={handleDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openForm}
        onOpenChange={() => {
          setOpenForm(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId ? 'Edit Product' : 'Add New Product'}
            </SheetTitle>
            <hr />
          </SheetHeader>
          <div className="px-6">
            <ProductImage
              imageFile={imageFile}
              setImageFile={setImageFile}
              setUploadedImageUrl={setUploadedImageUrl}
              uploadedImageUrl={uploadedImageUrl}
              setImageLoadingState={setImageLoadingState}
              imageLoadingState={imageLoadingState}
              isEditMode={currentEditedId !== null}
            />
            <CommonForm
              formControls={addProductFormElements}
              setFormData={setFormData}
              formData={formData}
              buttonText={currentEditedId ? 'Update Product' : 'Add Product'}
              onSubmit={onSubmit}
              isBtnDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
