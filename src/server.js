import express from "express";
import http from "http";
import fs from "fs/promises";
import { Server } from "socket.io";
import handlebars from "express-handlebars";
import morgan from "morgan";
import path from "path";
import viewRouter from "./routes/view.router.js";
import productsRouter from "./routes/product.router.js";
import chatRouter from "./routes/chat.router.js";
import cartsRouter from "./routes/carts.router.js";
import { errorHandler } from "./middlewares/errorHanlder.js";
import { initMongoDB } from "./daos/mongodb/connection.js";

const products = [];
const pathToProducts = './src/daos/filesystem/data/products.json';
const persistence = "MONGO";

try {
    const listProduct = await fs.promises.readFile(pathToProducts, 'utf-8');
    const listProductParse = JSON.parse(listProduct);
    products.push(...listProductParse);
} catch (error) {
    console.error('Error al leer el archivo:', error);
}

if (persistence === "MONGO") {
    try {
        await initMongoDB();
    } catch (error) {
        console.error('Error al inicializar MongoDB:', error);
    }
}

const app = express();
const httpServer = http.createServer(app);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/chat", chatRouter);

let usuariosConectado = [];

const socketServer = new Server(httpServer);

socketServer.on("connection", async (socket) => {
    console.log("🟢 ¡New connection!", socket.id);
    socketServer.emit("messages", await service.getAll());

    socket.on("disconnect", () => {
        console.log("🔴 ¡User disconnect!", socket.id);
        const sockeidBuscado = socket.id
        usuariosConectado = usuariosConectado.filter(e => e.socketID !== sockeidBuscado) 
        socketServer.emit("usuariosConectados", usuariosConectado);
    });

    socket.on("newUser", (user) => {
        console.log(`⏩ ${user} inició sesión`);
        usuariosConectado.push(user);
        socketServer.emit("usuariosConectados", usuariosConectado);
    });

    socket.on("chat:message", async (msg) => {
        await service.createMessage(msg);
        socketServer.emit("messages", await service.getAll());
    });

    socket.on("newUser", (user) => {
        socket.broadcast.emit("newUser", user);
    });

    socket.on("chat:typing", (data) => {
        socket.broadcast.emit("chat:typing", data);
    });

    socket.on('addProduct', async (data) => {
        if (products.length !== 0) {
            products.push(data);
            try {
                await fs.writeFile(pathToProducts, JSON.stringify(products, null, 2));
            } catch (error) {
                console.error('Error al escribir en el archivo:', error);
            }

            socketServer.emit('listUpdate', products);
        }
    });
});

const PORT = 8080;

httpServer.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));



