// controllers/cart.controller.js
import express from 'express';
import CartService from '../services/cart.services.js';

const router = express.Router();

// Ruta para obtener el carrito de un usuario por ID
router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const cart = await CartService.getCartByUserId(userId);
        if (!cart) {
            res.status(404).json({ msg: 'Cart not found' });
        } else {
            res.status(200).json(cart);
        }
    } catch (error) {
        next(error.message);
    }
});

// Ruta para agregar un producto al carrito de un usuario
router.post('/:userId/add', async (req, res, next) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    try {
        const updatedCart = await CartService.addToCart(userId, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error.message);
    }
});

// Ruta para eliminar un producto del carrito de un usuario
router.post('/:userId/remove', async (req, res, next) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
    try {
        const updatedCart = await CartService.removeFromCart(userId, productId);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error.message);
    }
});

// Ruta para vaciar el carrito de un usuario
router.post('/:userId/clear', async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const clearedCart = await CartService.clearCart(userId);
        res.status(200).json(clearedCart);
    } catch (error) {
        next(error.message);
    }
});

export default router;
