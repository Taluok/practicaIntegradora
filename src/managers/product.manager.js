import { ProductModel } from "../models/product.model.js";

export default class ProductManager {

    async getAll(page = 1, limit = 10, sortOrder = 'desc', query = null) {
        try {
            const queryObject = query ? JSON.parse(query) : {};

            const filter = {};
            for (const [key, value] of Object.entries(queryObject)) {
                if (key === 'category') {
                    filter.category = value;
                } else if (key === 'disponibility') {
                    filter.stock = value ? { $gt: 0 } : { $lt: 1 };
                }
            }

            const aggregationPipeline = [
                { $match: filter },
                { $sort: { price: sortOrder } },
            ];

            const options = {
                page: page,
                limit: limit,
            };

            return await ProductModel.aggregatePaginate(aggregationPipeline, options);
        } catch (error) {
            console.error('Error al obtener productos', error);
            return null;
        }
    }

    async getById(id) {
        try {
            return await ProductModel.findById(id);
        } catch (error) {
            console.error('Error al obtener producto por ID', error);
            return null;
        }
    }

    async create(productData) {
        try {
            return await ProductModel.create(productData);
        } catch (error) {
            console.error('Error al crear producto', error);
            return null;
        }
    }

    async update(id, productData) {
        try {
            return await ProductModel.findByIdAndUpdate(
                { _id: id },
                productData,
                { new: true }
            );
        } catch (error) {
            console.error('Error al actualizar producto', error);
            return null;
        }
    }

    async delete(id) {
        try {
            return await ProductModel.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error al eliminar producto', error);
            return null;
        }
    }
};
