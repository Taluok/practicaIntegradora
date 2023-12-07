import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
    async create() {
        try {
            return await CartModel.create({
                products: [],
            });
        } catch (error) {
            console.log(error);
            throw new Error("Error al crear el carrito");
        }
    }

    async getAll() {
        try {
            return await CartModel.find({});
        } catch (error) {
            console.log(error);
            throw new Error("'error al obtener todos los carts'");
        }
    }

    async getById(id) {
        try {
            return await CartModel.findById(id).populate("products.product");
        } catch (error) {
            console.log(error);
            throw new Error("error al obtener todos los carts por ID");
        }
    }

    async delete(id) {
        try {
            return await CartModel.findByIdAndDelete(id);
        } catch (error) {
            console.log(error);
            throw new Error("error al eliminar el carrito con ID");
        }
    }

    async addProdToCart(cart, prodId) {
        try {
            cart.products.push({ product: prodId });
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            throw new Error("Error al añadir el prodcuto al carrito: " + error.message);
        }
    }

    async removeProdToCart(cart, prod) {
        try {
            cart.products = cart.products.filter(
                (p) => p.product._id.toString() !== prod.product._id.toString()
            );
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            throw new Error("Error al mover el producto al carrito");
        }
    }

    async update(id, obj) {
        try {
            const response = await CartModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.log(error);
            throw new Error("Error al actualizar el carrito");
        }
    }

    async updateProdQuantityToCart(cart, prod, quantity) {
        try {
            prod.quantity = quantity;
            await cart.save();
            return prod;
        } catch (error) {
            console.log(error);
            throw new Error("ha ocurrido un error al intentar actualizar la cantidad de un producto en el carrito");
        }
    }

    async clearCart(cart) {
        try {
            cart.products = [];
            await cart.save();
            return cart;
        } catch (error) {
            console.log(error);
            throw new Error("Error al vaciar el carrito");
        }
    }
}
