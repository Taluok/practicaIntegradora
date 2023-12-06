import express from 'express';
import * as cartControllers from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/', cartControllers.getAllCarts);
router.delete('/:cid/products/:pid', cartControllers.deleteProduct);
router.post('/', cartControllers.createCart);
router.put('/:cid', cartControllers.updateCart);
router.put('/:cid/products/:pid', cartControllers.updateCartItem);

export default router;




