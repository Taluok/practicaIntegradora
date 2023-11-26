import { Router } from "express";
import ProductManager from "../services/product.service.js";
import { getIO } from "../server.js";

const router = Router();
const manager = new ProductManager('../daos/filesystem/data/products.json');

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        let products = await manager.getProducts();
        if (limit) {
            let newProducts = products.slice(0, limit);
            products = newProducts;
        }
        res.send({ status: "success", payload: products });
    } catch (error) {
        res.status(500).json({ error: `Se producjo un error en el servidor: ${error}` });
    }
});

router.post('/', async (req, res) => {
    try {
        let productToAdd = req.body;
        if (!('status' in productToAdd)) {
            productToAdd.status = true;
        }
        let status = await manager.addProduct(productToAdd);
        const io = getIO();
        io.emit('newProduct', status.product);
        res.status(status.code).json({ status: status.status })
    } catch (error) {
        res.status(500).json({ error: `Se producjo un error en el servidor: ${error}` });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;
    const product = await manager.getProductById(pid);
    if (product) {
        res.send({ status: "success", payload: product });
    } else {
        res.status(404).json({ 'error': 'No se pudo encontrar el producto' });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    let productToUpdate = req.body;
    let status = await manager.updateProduct(pid, productToUpdate);
    res.status(status.code).json({ status: status.status });
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    const status = await manager.deleteProductById(pid);
    const io = getIO();
    io.emit('deleteProduct', pid);
    res.status(status.code).json({ status: status.status });
});

export default router;