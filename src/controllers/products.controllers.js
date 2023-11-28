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

export const getAll = async (req, res, next) => {
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


