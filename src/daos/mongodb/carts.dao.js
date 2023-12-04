import { CartModel } from '../../daos/mongodb/models/carts.model.js';


export default class CartDao {
    static async getAll() {
        return CartModel.find();
    }

    static async getById(cartId) {
        return CartModel.findById(cartId).populate('products.product');
    }

    static async create(cart) {
        const newCart = new CartModel(cart);
        await newCart.save();
        return newCart;
    }

    static async update(cartId, updatedCart) {
        const result = await CartModel.findByIdAndUpdate(cartId, updatedCart, { new: true });
        return result;
    }

    static async delete(cartId) {
        const result = await CartModel.findByIdAndDelete(cartId);
        return result;
    }
}

