const express = require('express');
const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
} = require('../../controllers/shop/cart-controller');

const router = express.Router();

router.get('/:userId', getCartItems); // read all
router.post('/', addToCart);
router.put('/', updateCartItem);
router.post('/:userId/:productId', deleteCartItem);

module.exports = router;
