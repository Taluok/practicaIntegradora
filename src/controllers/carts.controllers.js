import CartService from '../services/cart.service.js';

export const getCarts = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const carts = await CartService.getCarts(limit);
        res.status(200).json(carts);
    } catch (error) {
        next(error.message);
    }
};

export const getCartByUserId = async (req, res, next) => {
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
};

export const addToCart = async (req, res, next) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;
    try {
        const updatedCart = await CartService.addToCart(userId, productId, quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error.message);
    }
};

export const removeFromCart = async (req, res, next) => {
    const userId = req.params.userId;
    const productId = req.body.productId;
    try {
        const updatedCart = await CartService.removeFromCart(userId, productId);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error.message);
    }
};

export const clearCart = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const clearedCart = await CartService.clearCart(userId);
        res.status(200).json(clearedCart);
    } catch (error) {
        next(error.message);
    }
};
