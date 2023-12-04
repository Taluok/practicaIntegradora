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

import ProductService from '../services/product.service.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export const getAllWithPagination = async (req, res, next) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        // Construir la consulta MongoDB según los parámetros proporcionados
        const filter = query ? { category: query } : {};
        const options = {
            limit: parseInt(limit),
            skip: (page - 1) * limit,
            sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined,
        };

        // Llama a la función correspondiente en ProductService para obtener los productos
        const products = await ProductService.getAllWithPagination(filter, options);

        // Calcular información de paginación
        const totalProducts = await ProductService.getCount(filter);
        const totalPages = Math.ceil(totalProducts / limit);
        const hasPrevPage = page > 1;
        const hasNextPage = page < totalPages;

        // Construir el objeto de respuesta
        const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? page + 1 : null,
            page: parseInt(page),
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}` : null,
            nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}` : null,
        };

        // Enviar la respuesta
        res.status(200).json(response);
    } catch (error) {
        // Manejar errores
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        // Obtener datos del producto desde el cuerpo de la solicitud
        const { name, price, category } = req.body;

        // Validar que se proporcionen todos los campos necesarios
        if (!name || !price || !category) {
            throw new Error('Name, price, and category are required fields');
        }

        // Crear el producto utilizando el servicio ProductService
        const newProduct = await ProductService.createProduct({ name, price, category });

        // Enviar respuesta exitosa
        res.status(201).json({ status: 'success', message: 'Product created successfully', product: newProduct });
    } catch (error) {
        // Manejar errores
        next(error);
    }
};

export const removeProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Lógica para eliminar un producto por ID utilizando ProductService
        await ProductService.removeProduct(productId);

        // Enviar la respuesta con un mensaje de éxito
        res.status(200).json({ status: 'success', message: 'Product removed successfully' });
    } catch (error) {
        // Manejar errores
        next(error);
    }
};


export const getProductById = async (req, res, next) => {
    try {
        const productId = req.params.id;

        // Lógica para obtener un producto por ID utilizando ProductService
        const product = await ProductService.getProductById(productId);

        if (!product) {
            // Si no se encuentra el producto, devolver una respuesta 404
            res.status(404).json({ status: 'error', message: 'Product not found' });
            return;
        }

        // Enviar la respuesta con el producto encontrado
        res.status(200).json({ status: 'success', product });
    } catch (error) {
        // Manejar errores
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const updatedData = req.body;

        // Lógica para actualizar un producto por ID utilizando ProductService
        const updatedProduct = await ProductService.updateProduct(productId, updatedData);

        // Enviar la respuesta con el producto actualizado
        res.status(200).json({ status: 'success', message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        // Manejar errores
        next(error);
    }
};



