import fs from 'fs/promises';

export default class ProductDaoFS {
    static async getAll(path) {
        try {
            if (await fs.access(path).then(() => true).catch(() => false)) {
                const products = await fs.readFile(path, 'utf-8');
                return JSON.parse(products);
            } else {
                return [];
            }
        } catch (error) {
            throw new Error(`Error reading products file: ${error.message}`);
        }
    }

    static async create(path, obj) {
        try {
            if (!obj || typeof obj !== 'object') {
                throw new Error('Invalid input. Expected an object.');
            }

            const product = {
                id: await this.#getMaxId(path),
                ...obj,
            };

            const productsFile = await this.getAll(path);
            productsFile.push(product);
            await fs.writeFile(path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    static async update(path, obj, id) {
        try {
            const productsFile = await this.getAll(path);
            const index = productsFile.findIndex((prod) => prod.id === id);
            if (index === -1) {
                throw new Error(`Id ${id} not found`);
            } else {
                productsFile[index] = { ...obj, id };
                await fs.writeFile(path, JSON.stringify(productsFile));
            }
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    static async delete(path, id) {
        try {
            const productsFile = await this.getAll(path);
            const newArray = productsFile.filter((prod) => prod.id !== id);
            if (newArray.length < productsFile.length) {
                await fs.writeFile(path, JSON.stringify(newArray));
            } else {
                throw new Error(`Product with ID: ${id} not found`);
            }
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    static async #getMaxId(path) {
        const products = await this.getAll(path);
        return products.reduce((maxId, prod) => (prod.id > maxId ? prod.id : maxId), 0) + 1;
    }
}

