import ProductDaoMongoDB from '../daos/mongodb/product.dao.js';

class ProductService {
    constructor() {
        this.productDao = new ProductDaoMongoDB();
    }

    async getAll(limit) {
        try {
            let products = await this.productDao.getAll();

            if (limit) {
                products = products.slice(0, limit);
            }

            return products;
        } catch (error) {
            console.error('Error getting products:', error.message);
            throw error;
        }
    }

    async getById(id) {
        try {
            const product = await this.productDao.getById(id);
            return product;
        } catch (error) {
            console.error(`Error getting product with ID ${id}:`, error.message);
            throw error;
        }
    }

    async create(productData) {
        try {
            const newProduct = await this.productDao.create(productData);
            return newProduct;
        } catch (error) {
            console.error('Error creating product:', error.message);
            throw error;
        }
    }

    async update(id, productData) {
        try {
            const updatedProduct = await this.productDao.update(id, productData);
            return updatedProduct;
        } catch (error) {
            console.error(`Error updating product with ID ${id}:`, error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedProduct = await this.productDao.delete(id);
            return deletedProduct;
        } catch (error) {
            console.error(`Error deleting product with ID ${id}:`, error.message);
            throw error;
        }
    }
}

export default new ProductService();
