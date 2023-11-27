import express from 'express';
import * as cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/:userId', cartController.getCartByUserId);
router.post('/:userId/add', cartController.addToCart);
router.post('/:userId/remove', cartController.removeFromCart);
router.post('/:userId/clear', cartController.clearCart);

export default router;
