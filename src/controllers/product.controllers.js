import * as service from '../services/product.services.js';

// Middleware de manejo de errores
export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Error interno del servidor' });
};

// Obtengo todos los productos
export const getAll = async (req, res, next) => {
    try {
        const response = await service.getAll();
        res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Obtengo un producto por ID
export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await service.getById(id);
        if (!response) res.status(404).json({ msg: '¡Producto no encontrado!' });
        else res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

// Crea un nuevo producto
export const create = async (req, res, next) => {
    try {
        // Valida req.body usando Joi si es necesario

        const newProd = await service.create(req.body);
        if (!newProd) res.status(500).json({ error: 'Error al crear el producto' });
        else res.status(201).json(newProd); // 201 Creado para una creación exitosa
    } catch (error) {
        next(error);
    }
};

// Actualiza un producto por ID
export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodUpd = await service.update(id, req.body);
        if (!prodUpd) res.status(404).json({ msg: 'Error al actualizar el producto' });
        else res.status(200).json(prodUpd);
    } catch (error) {
        next(error);
    }
};

// Elimina un producto por ID
export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const prodDel = await service.remove(id);
        if (!prodDel) res.status(404).json({ msg: 'Error al eliminar el producto' });
        else res.status(200).json({ msg: `Producto con ID: ${id} eliminado` });
    } catch (error) {
        next(error);
    }
};