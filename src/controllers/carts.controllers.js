import CartService from '../services/cart.service.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await CartService.removeProductFromCart(cid, pid);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const updatedCart = await CartService.updateCart(cid, req.body.products);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
};

export const updateCartItem = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await CartService.updateCartItem(cid, pid, req.body.quantity);
        res.status(200).json(updatedCart);
    } catch (error) {
        next(error);
    }
};

export const emptyCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        await CartService.emptyCart(cid);
        res.status(200).json({ msg: `Cart with ID: ${cid} emptied` });
    } catch (error) {
        next(error);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const cart = await CartService.getCartById(cid);
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
};

