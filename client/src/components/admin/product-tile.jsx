// import React from 'react';
// import { Card, CardContent, CardFooter } from '../ui/card';
// import { Button } from '../ui/button';

// const AdminProductTile = ({
//   product,
//   setCurrentEditedId,
//   setOpenForm,
//   setFormData,
//   handleDelete,
// }) => {
//   return (
//     <Card className="w-full max-w-sm mx-auto overflow-hidden p-0">
//       <CardContent>
//         {/* remove extra wrapper divs, not needed */}
//         <img
//           src={product?.image}
//           alt={product?.title}
//           className="w-full h-[200px] object-cover" // no rounded here
//         />
//         <p className="text-md font-bold mb-2">{product?.title}</p>
//         <div className="flex justify-between items-center mb-2">
//           <span
//             className={`${
//               product?.salePrice > 0 ? 'line-through' : ''
//             } text-lg font-semibold text-primary`}
//           >
//             ${product?.price}
//           </span>
//           {product?.salePrice > 0 ? (
//             <span className="text-lg font-bold">${product?.salePrice}</span>
//           ) : null}
//         </div>
//       </CardContent>
//       <CardFooter className="flex justify-between items-center mb-2">
//         <Button
//           onClick={() => {
//             setOpenForm(true);
//             setCurrentEditedId(product?._id);
//             setFormData(product);
//           }}
//         >
//           Edit
//         </Button>
//         <Button onClick={() => handleDelete(product?._id)}>delete</Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default AdminProductTile;

import React from 'react';
import { Button } from '../ui/button';

const AdminProductTile = ({
  product,
  setCurrentEditedId,
  setOpenForm,
  setFormData,
  handleDelete,
}) => {
  return (
    <div className="w-[220px] bg-white rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer min-h-[350px]">
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[300px] object-cover"
        />

        {/* Rating Badge */}
        {/* <div className="absolute bottom-2 left-2 bg-white px-3 py-[2px] rounded-md shadow flex items-center gap-3 text-sm font-medium">
          <span className="flex items-center gap-1">{product.rating} ⭐</span>
          <span>|</span>
          <span>{product.reviews} reviews</span>
        </div> */}
      </div>

      {/* Product Info */}
      <div className="px-2 py-2">
        <p className="font-semibold text-md">{product?.title}</p>
        {/* <p className="text-gray-600 mb-1 text-sm">{product?.description}</p> */}

        {/* Prices */}
        <div className="flex items-center gap-2 mb-2">
          {product?.salePrice > 0 && (
            <span className="font-bold text-lg text-gray-900'">
              Rs. {product?.salePrice}
            </span>
          )}

          <span
            className={`${
              product.salePrice > 0
                ? 'line-through text-gray-500 text-sm'
                : 'font-bold text-lg text-gray-900'
            } `}
          >
            Rs. {product.price}
          </span>

          {/* {product.discount && (
            <span className="text-red-500 text-sm font-semibold">
              ({product.discount}% OFF)
            </span>
          )} */}
        </div>

        <div className="flex items-center justify-end mt-auto gap-2">
          <p
            className="cursor-pointer text-blue-600"
            onClick={() => {
              setOpenForm(true);
              setCurrentEditedId(product?._id);
              setFormData(product);
            }}
          >
            Edit
          </p>
          <p
            className="cursor-pointer text-red-500"
            onClick={() => handleDelete(product?._id)}
          >
            Delete
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTile;
