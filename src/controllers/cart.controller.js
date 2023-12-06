import { CartManager } from '../managers/cart.manager.js';

const cartManager = new CartManager();

export const getAllCarts = async (req, res, next) => {
    try {
        const carts = await cartManager.getAll();
        res.json(carts);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const productDeleted = await cartManager.deleteProduct(cid, pid);
        res.json(productDeleted);
    } catch (error) {
        next(error);
    }
};

export const createCart = async (req, res, next) => {
    try {
        const newCart = await cartManager.createCart(req.body);
        res.json(newCart || { msg: 'No se puede crear el carrito' });
    } catch (error) {
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;
        const updatedCart = await cartManager.saveProductToCart(cid, req.body);

        if (updatedCart) {
            res.status(200).json(updatedCart);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

export const updateCartItem = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const updatedCart = await cartManager.updCartItemAmount(cid, pid, req.body);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};



