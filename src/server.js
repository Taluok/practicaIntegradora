import express from "express";
import handlebars from "express-handlebars";
import { __dirname } from "./utils.js";
import productRouter from "./routes/product.router.js";
import "./db/connection.js";
import cartRouter from "./routes/cart.router.js";
import viewRouter from "./routes/views.router.js";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Rutas para productos y carritos
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

// Configuración de Handlebars
app.engine("handlebars", handlebars());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// Enrutamiento para vistas
app.use("/", viewRouter);

// Creación del servidor HTTP y del servidor de sockets
const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const socketServer = new Server(httpServer);

// Array para almacenar productos (deberías considerar persistirlos en una base de datos)
const products = [];

// Manejo de conexiones con sockets
socketServer.on("connection", (socket) => {
    console.log(`Usuario conectado ${socket.id}`);
    
    // Manejo de desconexión
    socket.on("disconnect", () => console.log('Usuario desconectado'));

    // Enviar saludo al cliente
    socket.emit("saludoDesdeBack", "Bienvenido a websocket");

    // Manejo de respuesta desde el cliente
    socket.on("respuestaDesdeFront", (msg) => console.log(msg));

    // Manejo de nuevo producto desde el cliente
    socket.on("newProduct", (product) => {
        console.log("Producto recibido en el servidor:", product);
        products.push(product);
        socketServer.emit("arrayProducts", products);
    });
});








