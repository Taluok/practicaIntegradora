/** 
 * Rutas para gestionar productos
 * @module routes/products
 * @requires express
 * @requires controllers/products.controllers
 */

import express from 'express';
import * as productControllers from '../controllers/product.controller.js';

const router = express.Router();

router.get('/', productControllers.getAllProducts);
router.get('/:id', productControllers.getProductById);
router.post('/', productControllers.createProduct);
router.put('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.deleteProduct);

export default router;



