import { CartModel } from "../models/cart.model.js";

export class CartManager {

    async getAll(page = 1, limit = 10) {
        try {
            return await CartModel.find().skip((page - 1) * limit).limit(limit);
        } catch (error) {
            console.error('Error al obtener carritos', error);
            return null;
        }
    }

    async createCart(cartData) {
        try {
            const newCart = await cartManager.createCart(cartData);
            res.status(201).json({ message: 'Carrito creado exitosamente', cart: newCart });
        } catch (error) {
            next(error);
        }
    }

    async getCartById(id) {
        try {
            return await CartModel.findById(id);
        } catch (error) {
            console.error('Error al obtener carrito por ID', error);
            return null;
        }
    }

    async deleteCart(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error al eliminar carrito', error);
            return null;
        }
    }

    async getCartIdInJson(id) {
        try {
            const carts = await this.getAll();
            const cartId = carts.findIndex((c) => c.id === parseInt(id));
            return cartId >= 0 ? cartId : null;
        } catch (error) {
            console.error('Error al obtener ID de carrito en formato JSON', error);
            return null;
        }
    }

    async saveProductToCart(cartId, arrProducts) {
        try {
            let cart = await CartModel.findById(cartId);

            if (arrProducts.products) {
                arrProducts.products.forEach(async (idProduct) => {
                    cart.products.push(idProduct);
                });
            }

            await cart.save();
            cart = await CartModel.findById(cartId).populate("products");
            return cart;
        } catch (error) {
            console.error('Error al guardar productos en el carrito', error);
            return null;
        }
    }

    async deleteProductFromCart(cartId, productId) {
        try {
            let cart = await CartModel.findById(cartId);
            const index = cart.products.findIndex(product => product._id.toString() === productId);

            if (index !== -1) {
                cart.products.splice(index, 1);
                await cart.save();
                return true;
            }

            return false;
        } catch (error) {
            console.error('Error al eliminar producto del carrito', error);
            return false;
        }
    }

    async updCartProductsAmount(cartId, productId, body) {
        try {
            const cart = await CartModel.findById(cartId);
            const quantity = body.quantity || 1;

            for (let i = 0; i < quantity; i++) {
                cart.products.push(productId);
            }

            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al actualizar la cantidad de productos en el carrito', error);
            return null;
        }
    }
}
