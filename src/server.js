import express from 'express';
import morgan from 'morgan';
import userRouter from './routes/users.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Configuración para servir archivos estáticos
app.use(express.static(join(__dirname, 'public')));

// Rutas
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

// Ruta para la URL raíz
app.get('/', (req, res) => {
    res.send('¡Bienvenido a mi aplicación!');
});

app.use(errorHandler);

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));
const httpServer = app.listen(PORT, () => console.log(`🚀 Server ok en el puerto ${PORT}`));

const socketServer = new Server(httpServer);

socketServer.on('connection', async (socket) => {
    console.log('🟢 ¡Nueva conexión!', socket.id);

    socket.on('deleteProduct', async (data) => {
        try {
            const { idProduct } = data;

            await productDaoMongoDB.deleteProduct(idProduct);

            const products = await productDaoMongoDB.getProducts();
            socketServer.emit('products', products);
        } catch (error) {
            // Emitir un evento de error específico para que el cliente pueda manejarlo
            socket.emit('deleteProductError', { errorMessage: error.message });
            console.error('Error al eliminar el producto:', error.message);
        }
    });
});


export default socketServer;










