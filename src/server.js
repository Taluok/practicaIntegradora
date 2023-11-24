import express from 'express';
import {__dirname} from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import viewRouter from './routes/view.router.js';
import productsRouter from './routes/product.router.js';
import cartsRouter from './routes/carts.router.js';
import { ProductDaoFS } from '../src/daos/filesystem/product.dao.js';
const productDaoFs = new ProductDaoFS('./data/products.json');


const app = express();
app.use(express.static('data'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());

app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


app.use('/', viewRouter);

const PORT = 8088;
const httpServer = app.listen(PORT, ()=> console.log(`🚀 Server en el puerto ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket)=>{
    console.log('🟢 ¡New Connection', socket.id);
    socket.on('deleteProduct', async (data)=>{
        try {
            const {idProduct} = data;
            console.log('consola 1 app.js:', typeof idProduct);
            await productDaoFs.deleteProduct(idProduct);
            const products = await productDaoFs.getProducts();
            socketServer.emit('products', products);
        } catch (error) {
            socket.emit('deleteProductError', {errorMessage: error.message});
            console.error(error.message);
        }
    })
})

export default socketServer





