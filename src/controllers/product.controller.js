/**
 * Obtener productos con paginación, búsqueda y ordenamiento
 * @function
 * @async
 * @memberof module:controllers/products.controllers
 * @param {Object} req - Objeto de solicitud de Express
 * @param {Object} res - Objeto de respuesta de Express
 * @param {Object} next - Función para pasar el control al siguiente middleware
 * @returns {Object} - Respuesta con productos paginados y detalles de paginación
 */

import ProductManager from '../managers/product.manager.js';

const productManager = new ProductManager();

export const getAllProducts = async (req, res, next) => {
    try {
        const { page, limit, sort, query } = req.query;
        const products = await productManager.getAll(page, limit, sort, query);

        let sortOptions = '';
        if (limit) sortOptions += `&limit=${limit}`;
        if (sort) sortOptions += `&sort=${sort}`;

        products.prevLink = products.hasPrevPage ? `/api/products?page=${products.prevPage}${sortOptions}` : null;
        products.nextLink = products.hasNextPage ? `/api/products?page=${products.nextPage}${sortOptions}` : null;

        return res.json(products);
    } catch (error) {
        return next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productManager.getById(id);

        if (!product) {
            return res.json({ msg: "Producto no encontrado" });
        }

        return res.json(product);
    } catch (error) {
        return next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = await productManager.create(req.body);

        if (!newProduct) {
            return res.json({ msg: "Error al crear el producto" });
        }

        return res.json(newProduct);
    } catch (error) {
        return next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productUpdt = await productManager.update(id, req.body);

        if (!productUpdt) {
            return res.json({ msg: "Producto no encontrado" });
        }

        return res.json(productUpdt);
    } catch (error) {
        return next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productDel = await productManager.delete(id);

        if (!productDel) {
            return res.json({ msg: "Producto no encontrado" });
        }

        return res.json(productDel);
    } catch (error) {
        return next(error);
    }
};




