import express from 'express';
import * as cartControllers from '../controllers/carts.controllers.js';

const router = express.Router();

router.delete('/:cid/products/:pid', cartControllers.removeFromCart);
router.put('/:cid', cartControllers.updateCart);
router.put('/:cid/products/:pid', cartControllers.updateCartItemQuantity);
router.delete('/:cid', cartControllers.clearCart);
router.get('/:cid', cartControllers.getCartById);

export default router;

