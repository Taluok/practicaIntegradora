import CartDao from '../daos/mongodb/carts.dao.js';
import ProductService from '../services/product.service.js';

class CartService {
    async getCarts(limit) {
        try {
            const carts = await CartDao.getCarts();

            if (limit) {
                return carts.slice(0, Number(limit));
            } else {
                return carts;
            }
        } catch (error) {
            console.error('Error getting carts:', error.message);
            throw error;
        }
    }

    async getCartByUserId(userId) {
        try {
            const cart = await CartDao.getCartByUserId(userId).populate('products.product');
            return cart;
        } catch (error) {
            console.error(`Error getting cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }

    async addToCart(userId, productId, quantity) {
        try {
            // Verificar si el producto existe
            const product = await ProductService.getById(productId);

            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            // Añadir el producto al carrito
            const updatedCart = await CartDao.addToCart(userId, productId, quantity);
            return updatedCart;
        } catch (error) {
            console.error(`Error adding product to cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }

    async removeFromCart(userId, productId) {
        try {
            // Verificar si el producto existe
            const product = await ProductService.getById(productId);

            if (!product) {
                throw new Error(`Product with ID ${productId} not found`);
            }

            // Eliminar el producto del carrito
            const updatedCart = await CartDao.removeFromCart(userId, productId);
            return updatedCart;
        } catch (error) {
            console.error(`Error removing product from cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }

    async clearCart(userId) {
        try {
            const clearedCart = await CartDao.clearCart(userId);
            return clearedCart;
        } catch (error) {
            console.error(`Error clearing cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }
}

export default new CartService();

