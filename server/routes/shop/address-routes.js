const express = require('express');
const {
  addAddress,
  fetchAddress,
  deleteAddress,
  editAddress,
} = require('../../controllers/shop/address-controller');

const router = express.Router();

router.post('/', addAddress);
router.get('/:userId', fetchAddress);
router.delete('/:userId/:addressId', deleteAddress);
router.put('/:userId/:addressId', editAddress);

module.exports = router;
