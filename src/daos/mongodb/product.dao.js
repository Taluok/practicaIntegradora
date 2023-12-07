import { ProductModel } from "./models/product.model.js";

export default class ProductDaoMongoDB {
    // Obtener todos los productos con paginación
    async getAll(page = 1, limit = 10) {
        try {
            const response = await ProductModel.paginate({}, { page, limit });
            return response;
        } catch (error) {
            console.error("Error al obtener todos los productos:", error);
        }
    }

    // Obtener un producto por su ID
    async getById(id) {
        try {
            const response = await ProductModel.findById(id);
            return response;
        } catch (error) {
            console.error("Error al obtener el producto por ID:", error);
        }
    }

    // Crear un nuevo producto
    async create(obj) {
        try {
            const response = await ProductModel.create(obj);
            return response;
        } catch (error) {
            console.error("Error al crear un nuevo producto:", error);
        }
    }

    // Actualizar un producto por su ID
    async update(id, obj) {
        try {
            const response = await ProductModel.findByIdAndUpdate(id, obj, {
                new: true,
            });
            return response;
        } catch (error) {
            console.error("Error al actualizar el producto por ID:", error);
        }
    }

    // Eliminar un producto por su ID
    async delete(id) {
        try {
            const response = await ProductModel.findByIdAndDelete(id);
            return response;
        } catch (error) {
            console.error("Error al eliminar el producto por ID:", error);
        }
    }
}
