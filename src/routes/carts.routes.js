import express from 'express';
import * as cartControllers from '../controllers/carts.controllers.js';

const router = express.Router();

router.delete('/:cid/products/:pid', cartControllers.removeProductFromCart);
router.put('/:cid', cartControllers.updateCart);
router.put('/:cid/products/:pid', cartControllers.updateCartItem);
router.delete('/:cid', cartControllers.emptyCart);
router.get('/:cid', cartControllers.getCartById);

export default router;




