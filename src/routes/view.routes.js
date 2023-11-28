import express from 'express';
import productService from '../services/product.service.js';
import cartService from '../services/cart.service.js';

const router = express.Router();

// Vista para visualizar todos los productos con paginación
router.get('/products', async (req, res) => {
    try {
        const { limit = 10, page = 1 } = req.query;
        const products = await productService.getAllWithPagination({}, { limit, page });

        // Renderizar la vista de productos con paginación
        res.render('products', { products });
    } catch (error) {
        console.error('Error fetching products:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

// Vista para visualizar un carrito específico
router.get('/carts/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await cartService.getById(cartId);

        if (!cart) {
            return res.status(404).send('Cart not found');
        }

        // Renderizar la vista del carrito con sus productos
        res.render('cart', { cart });
    } catch (error) {
        console.error('Error fetching cart:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

export default router;

