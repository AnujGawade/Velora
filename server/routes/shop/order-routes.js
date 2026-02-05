const express = require('express');
const {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
} = require('../../controllers/shop/order-controller');

const router = express.Router();
router.post('/', createOrder);
router.post('/capture', capturePayment);
router.get('/:userId', getAllOrdersByUser);
router.get('/details/:id', getOrderDetails);

module.exports = router;
