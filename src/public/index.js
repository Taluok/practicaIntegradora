document.addEventListener('DOMContentLoaded', () => {
    const socket = io();

    // Manejar la recepción de productos actualizados desde el servidor
    socket.on('listUpdate', (products) => {
        // Limpiar la lista de productos
        const productList = document.querySelector('ul');
        productList.innerHTML = '';

        // Agregar productos actualizados a la lista
        products.forEach((product) => {
            const productElement = document.createElement('li');
            productElement.innerText = `${product.title} - ${product.description} - $${product.price}`;
            productList.appendChild(productElement);
        });
    });

    // Manejar el envío del formulario para agregar productos
    const productForm = document.getElementById('productForm');
    productForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(productForm);
        const productData = {};
        formData.forEach((value, key) => {
            productData[key] = value;
        });

        // Emitir la actualización de productos al servidor a través de WebSockets
        socket.emit('addProduct', productData);

        // Limpiar el formulario
        productForm.reset();
    });
});