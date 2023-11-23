import express from 'express';
import fs from 'fs';

const router = express.Router();
const products = [];
const path = './src/data/products.json';


const listProduct = await fs.promises.readFile(path,"utf-8");
const listProductParse = JSON.parse(listProduct);
products.push(...listProductParse);


router.get('/', (req, res) => { 
    res.render('home', {products});
});

router.get('/realTimeProducts',(req, res) => { 
    res.render('realTimeProducts');
});

export default router;