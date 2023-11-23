import CartDAO from '../dao/carts.dao.js';

class CartService {
    async getCartByUserId(userId) {
        try {
            const cart = await CartDAO.getCartByUserId(userId);
            return cart;
        } catch (error) {
            console.error(`Error getting cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }

    async addToCart(userId, productId, quantity) {
        try {
            const updatedCart = await CartDAO.addToCart(userId, productId, quantity);
            return updatedCart;
        } catch (error) {
            console.error(`Error adding product to cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }

    async removeFromCart(userId, productId) {
        try {
            const updatedCart = await CartDAO.removeFromCart(userId, productId);
            return updatedCart;
        } catch (error) {
            console.error(`Error removing product from cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }

    async clearCart(userId) {
        try {
            const clearedCart = await CartDAO.clearCart(userId);
            return clearedCart;
        } catch (error) {
            console.error(`Error clearing cart for user with ID ${userId}:`, error.message);
            throw error;
        }
    }
}

export default new CartService();
