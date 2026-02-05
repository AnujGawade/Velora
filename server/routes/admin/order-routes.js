const express = require('express');
const {
  getAllOrders,
  getOrderDetails,
} = require('../../controllers/admin/orders-controller');

const router = express.Router();
router.get('/', getAllOrders);
router.get('/details/:id', getOrderDetails);

module.exports = router;
