import * as cartService from '../services/cart.services.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await cartService.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await cartService.getById(id);
        if (!response) {
            res.status(404).json({ msg: "Carrito no encontrado!" });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newCart = await cartService.create();
        if (!newCart) {
            res.status(404).json({ msg: "Error al crear el carrito!" });
        } else {
            res.status(201).json(newCart);
        }
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartUpd = await cartService.update(id, req.body);
        if (!cartUpd) {
            res.status(404).json({ msg: "Error al actualizar el carrito!" });
        } else {
            res.status(200).json(cartUpd);
        }
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cartDel = await cartService.remove(id);
        if (!cartDel) {
            res.status(404).json({ msg: "Error al eliminar el carrito!" });
        } else {
            res.status(204).json({ msg: `Carrito con ID ${id} eliminado` });
        }
    } catch (error) {
        next(error.message);
    }
};

export const addProdToCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const newProdToUserCart = await cartService.addProdToCart(
            idCart,
            idProd,
        );
        if (!newProdToUserCart) {
            res.json({ msg: "Error al agregar producto al carrito" });
        } else {
            res.json(newProdToUserCart);
        }
    } catch (error) {
        next(error.message);
    }
};

export const removeProdToCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const delProdToUserCart = await cartService.removeProdToCart(
            idCart,
            idProd,
        );
        if (!delProdToUserCart) {
            res.json({ msg: "Error al quitar producto del carrito" });
        } else {
            res.json({ msg: `Producto ${idProd} eliminado del carrito` });
        }
    } catch (error) {
        next(error.message);
    }
};

export const updateProdQuantityToCart = async (req, res, next) => {
    try {
        const { idCart, idProd } = req.params;
        const { quantity } = req.body;
        const updateProdQuantity = await cartService.updateProdQuantityToCart(
            idCart,
            idProd,
            quantity
        );
        if (!updateProdQuantity) {
            res.json({ msg: "Error al actualizar la cantidad del producto en el carrito" });
        } else {
            res.json(updateProdQuantity);
        }
    } catch (error) {
        next(error.message);
    }
};

export const clearCart = async (req, res, next) => {
    try {
        const { idCart } = req.params;
        const clearCart = await cartService.clearCart(
            idCart,
        );
        if (!clearCart) {
            res.json({ msg: "Error al vaciar el carrito" });
        } else {
            res.json(clearCart);
        }
    } catch (error) {
        next(error.message);
    }
};






