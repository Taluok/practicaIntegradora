import fs from "fs";

export default class ProductDaoFS {
    constructor(path) {
        this.path = path;
    }

    async #getMaxId() {
        const products = await this.getAll();
        return products.reduce((maxId, prod) => (prod.id > maxId ? prod.id : maxId), 0);
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const products = await fs.promises.readFile(this.path, "utf-8");
                const productsJSON = JSON.parse(products);
                return productsJSON;
            } else {
                return [];
            }
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const products = await this.getAll();
            const product = products.find((prod) => prod.id === Number(id));
            return product || false;
        } catch (error) {
            throw error;
        }
    }

    async create(obj) {
        try {
            if (!obj || typeof obj !== 'object') {
                throw new Error('Entrada no válida. Se esperaba un objeto.');
            }

            const product = {
                id: (await this.#getMaxId()) + 1,
                ...obj,
            };

            const productsFile = await this.getAll();
            productsFile.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
            return product;
        } catch (error) {
            throw error;
        }
    }

    async update(obj, id) {
        try {
            const productsFile = await this.getAll();
            const index = productsFile.findIndex((prod) => prod.id === id);
            if (index === -1) {
                throw new Error(`Id ${id} no encontrado`);
            } else {
                productsFile[index] = { ...obj, id };
            }
            await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const productsFile = await this.getAll();
            const newArray = productsFile.filter((prod) => prod.id !== id);
            if (newArray.length < productsFile.length) {
                await fs.promises.writeFile(this.path, JSON.stringify(newArray));
            } else {
                throw new Error(`Producto con ID: ${id} no encontrado`);
            }
        } catch (error) {
            throw error;
        }
    }
}
