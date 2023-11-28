import CartService from '../services/cart.service.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;

        // Llama a la función correspondiente en CartService para eliminar el producto del carrito
        const updatedCart = await CartService.removeProductFromCart(cid, pid);

        // Enviar la respuesta
        res.status(200).json(updatedCart);
    } catch (error) {
        // Manejar errores
        next(error);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { cid } = req.params;

        // Llama a la función correspondiente en CartService para actualizar el carrito con nuevos productos
        const updatedCart = await CartService.updateCart(cid, req.body.products);

        // Enviar la respuesta
        res.status(200).json(updatedCart);
    } catch (error) {
        // Manejar errores
        next(error);
    }
};

export const updateCartItem = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;

        // Llama a la función correspondiente en CartService para actualizar la cantidad de un producto en el carrito
        const updatedCart = await CartService.updateCartItem(cid, pid, req.body.quantity);

        // Enviar la respuesta
        res.status(200).json(updatedCart);
    } catch (error) {
        // Manejar errores
        next(error);
    }
};

export const emptyCart = async (req, res, next) => {
    try {
        const { cid } = req.params;

        // Llama a la función correspondiente en CartService para vaciar el carrito
        await CartService.emptyCart(cid);

        // Enviar la respuesta
        res.status(200).json({ msg: `Cart with ID: ${cid} emptied` });
    } catch (error) {
        // Manejar errores
        next(error);
    }
};
