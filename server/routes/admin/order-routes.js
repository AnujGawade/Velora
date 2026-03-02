const express = require('express');
const {
  getAllOrders,
  getOrderDetails,
  updateOrderStatus,
} = require('../../controllers/admin/orders-controller');

const router = express.Router();
router.get('/', getAllOrders);
router.get('/details/:id', getOrderDetails);
router.put('/status/:id', updateOrderStatus);

module.exports = router;
