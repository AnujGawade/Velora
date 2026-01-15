const express = require('express');
const {
  addToCart,
  getCartItems,
  updateCartItem,
  deleteCartItem,
  fetchCartItems,
  updateCartItemQty,
} = require('../../controllers/shop/cart-controller');

const router = express.Router();

router.get('/:userId', fetchCartItems); // read all
router.post('/', addToCart);
router.put('/', updateCartItemQty);
router.delete('/:userId/:productId', deleteCartItem);

module.exports = router;
