import ProductService from '../services/product.service.js';

export const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};

export const getAll = async (req, res, next) => {
    try {
        const { limit } = req.query;
        const products = await ProductService.getAll(limit);
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await ProductService.getById(id);

        if (!product) {
            res.status(404).json({ msg: 'Product not found' });
        } else {
            res.status(200).json(product);
        }
    } catch (error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProduct = await ProductService.create(req.body);

        if (!newProduct) {
            res.status(500).json({ error: 'Error creating the product' });
        } else {
            res.status(201).json(newProduct);
        }
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = await ProductService.update(id, req.body);

        if (!updatedProduct) {
            res.status(404).json({ msg: 'Error updating the product' });
        } else {
            res.status(200).json(updatedProduct);
        }
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        const deletedProduct = await ProductService.delete(id);

        if (!deletedProduct) {
            res.status(404).json({ msg: 'Error deleting the product' });
        } else {
            res.status(200).json({ msg: `Product with ID: ${id} deleted` });
        }
    } catch (error) {
        next(error);
    }
};