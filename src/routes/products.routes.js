import express from 'express';
import * as productControllers from '../controllers/products.controllers.js';

const router = express.Router();

router.get('/', productControllers.getAll);
router.post('/', productControllers.create);
router.get('/:id', productControllers.getById);
router.put('/:id', productControllers.update);
router.delete('/:id', productControllers.remove);

export default router;
