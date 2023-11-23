import { isValidObjectId } from 'mongoose';
import { ProductModel } from '../daos/mongodb/models/products.model.js';

export default class ProductDaoMongoDB {
    async getAll() {
        try {
            const response = await ProductModel.find({});
            return response;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            if (!isValidObjectId(id)) {
                throw new Error('ID no válido');
            }

            const response = await ProductModel.findById(id);
            if (!response) {
                throw new Error(`Producto con ID: ${id} no encontrado`);
            }

            return response;
        } catch (error) {
            throw error;
        }
    }

    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            throw error;
        }
    }

    async update(id, obj) {
        try {
            if (!isValidObjectId(id)) {
                throw new Error('ID no válido');
            }

            const product = await ProductModel.findById(id);
            if (!product) {
                throw new Error(`Producto con ID: ${id} no encontrado`);
            }

            // Realizar las actualizaciones necesarias en el objeto 'product'
            product.property = obj.property;

            const response = await product.save();
            return response;
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            if (!isValidObjectId(id)) {
                throw new Error('ID no válido');
            }

            const response = await ProductModel.findByIdAndDelete(id);
            if (!response) {
                throw new Error(`Producto con ID: ${id} no encontrado`);
            }

            return response;
        } catch (error) {
            throw error;
        }
    }
}
