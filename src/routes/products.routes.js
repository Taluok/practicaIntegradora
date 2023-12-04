/** 
 * Rutas para gestionar productos
 * @module routes/products
 * @requires express
 * @requires controllers/products.controllers
 */

import express from 'express';
import * as productControllers from '../controllers/products.controllers.js';

const router = express.Router();

router.get('/', productControllers.getAllWithPagination);
router.post('/', productControllers.createProduct);
router.get('/:id', productControllers.getProductById);
router.put('/:id', productControllers.updateProduct);
router.delete('/:id', productControllers.removeProduct);

export default router;



