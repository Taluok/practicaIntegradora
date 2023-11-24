let cartsDatabase = [];

export class CartDao {
    static getAll() {
        return cartsDatabase;
    }

    static getById(cartId) {
        return cartsDatabase.find(cart => cart.id === cartId);
    }

    static create(cart) {
        cartsDatabase.push(cart);
        return cart;
    }

    static update(cartId, updatedCart) {
        const index = cartsDatabase.findIndex(cart => cart.id === cartId);
        if (index !== -1) {
            cartsDatabase[index] = updatedCart;
            return updatedCart;
        }
        return null; 
    }

    static delete(cartId) {
        const index = cartsDatabase.findIndex(cart => cart.id === cartId);
        if (index !== -1) {
            const deletedCart = cartsDatabase.splice(index, 1);
            return deletedCart[0];
        }
        return null; 
    };
}

export default CartDao;
