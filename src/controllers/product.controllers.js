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

import * as productService from "../services/product.services.js";

export const getAll = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, sort, query, category, exist } = req.query;

        const pageNumber = parseInt(page);
        const pageSize = parseInt(limit);

        const response = await productService.getAll(
            pageNumber,
            pageSize,
            query || '',
            sort || '',
            category || '',
            exist || ''
        );

        const prevPage = response.prevPage;
        const nextPage = response.nextPage;
        const prevLink = response.hasPrevPage ? `http://localhost:8088/api/products/?page=${prevPage}&limit=${pageSize}&query=${query}&sort=${sort}` : null;
        const nextLink = response.hasNextPage ? `http://localhost:8088/api/products/?page=${nextPage}&limit=${pageSize}&query=${query}&sort=${sort}` : null;
        const status = 'success';

        res.json({
            status,
            payload: response.docs,
            info: {
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: prevLink,
                nextLink: nextLink,
            }
        });
    } catch (error) {
        const status = 'error';
        next(error.message);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const response = await productService.getById(pid);
        if (!response) {
            res.status(404).json({ msg: "Producto no encontrado con ID!" });
        } else {
            res.status(200).json(response);
        }
    } catch (error) {
        next(error.message);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProd = await productService.create(req.body);
        if (!newProd) {
            res.status(404).json({ msg: "Error al crear el producto!" });
        } else {
            res.status(201).json(newProd);
        }
    } catch (error) {
        next(error.message);
    }
};

export const update = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const prodUpd = await productService.update(pid, req.body);
        if (!prodUpd) {
            res.status(404).json({ msg: "Error al actualizar el producto!" });
        } else {
            res.status(200).json(prodUpd);
        }
    } catch (error) {
        next(error.message);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const prodDel = await productService.remove(pid);
        if (!prodDel) {
            res.status(404).json({ msg: "Error al eliminar el producto!" });
        } else {
            res.status(204).json({ msg: `Producto con ID ${pid} eliminado` });
        }
    } catch (error) {
        next(error.message);
    }
};





