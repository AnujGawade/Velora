const express = require('express');

const {
  handleImageUpload,
  addProduct,
  editProduct,
  deleteProduct,
  fetchAllProducts,
} = require('../../controllers/admin/product-controller');

const { upload } = require('../../helpers/cloudinary');

const router = express.Router();

// Upload product image
router.post('/upload-image', upload.single('my_file'), handleImageUpload);

// CRUD routes
router.post('/', addProduct); // create
router.get('/', fetchAllProducts); // read all
router.put('/:id', editProduct); // update (or router.put)
router.delete('/:id', deleteProduct); // delete

module.exports = router;
