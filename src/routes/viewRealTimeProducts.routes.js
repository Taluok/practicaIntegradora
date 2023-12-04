import { Router } from "express";
import ProductService from "../services/product.service.js";

const router = Router();

router.get('/', async (req, res) => {
    const products = await ProductService.getAllWithPagination({}, {});
    res.render('realTimeProducts', { products });
});

export default router;