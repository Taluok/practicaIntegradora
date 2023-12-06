// Utiliza desestructuración para extraer los elementos del formulario
const form = document.getElementById("form");
const {
    title: inputTitle,
    description: inputDescription,
    code: inputCode,
    price: inputPrice,
    stock: inputStock,
    category: inputCategory,
    products: inputProducts,
} = form.elements;

// Conecta al servidor de sockets
const socketClient = io();

// Escucha el evento "saludoDesdeBack" y envía una respuesta
socketClient.on("saludoDesdeBack", (msg) => {
    console.log(msg);
    socketClient.emit("respuestaDesdeFront", "Muchas gracias");
});

// Maneja el envío de formulario
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Obtén los valores de los inputs
    const title = inputTitle.value;
    const description = inputDescription.value;
    const code = inputCode.value;
    const price = inputPrice.value;
    const stock = inputStock.value;
    const category = inputCategory.value;

    // Crea el objeto de producto
    const product = { title, description, code, price, stock, category };

    // Imprime en consola el producto a enviar
    console.log("Enviando producto:", product);

    // Emite el evento 'newProduct' con el objeto del producto
    socketClient.emit("newProduct", product);
});

// Escucha el evento 'arrayProducts' y actualiza el contenido en la página
socketClient.on("arrayProducts", (productsArray) => {
    const infoProducts = productsArray
        .map((p) => `${p.title} - $${p.price}`)
        .join("<br>");
    inputProducts.innerHTML = infoProducts;
});

// Escucha el evento 'message' y muestra el mensaje en la consola
socketClient.on("message", (msg) => {
    console.log(msg);
});
