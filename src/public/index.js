// Importa las funciones necesarias y modifica según tus rutas y configuraciones
import { cleanForm, getProductList } from './utils.js';

const socket = io();

const productsList = document.getElementById('containerList');
const add = document.getElementById('add');
const price = document.getElementById('price');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const category = document.getElementById('category');
const idProduct = document.getElementById('idProduct');
const stock = document.getElementById('stock');
const btnCargar = document.getElementById('cargar');
const btnEliminar = document.getElementById('eliminar');

// Utiliza una función para renderizar la lista de productos
function renderProductList(products) {
    let infoProducts = '';
    productsList.innerHTML = `<ul>`;
    products.forEach(p => {
        infoProducts += `<li>
            <strong>Titulo: </strong>${p.title}<br>
            <strong>Price: </strong>${p.price}<br>
            <strong>Description: </strong>${p.description}<br>
            <strong>Category: </strong>${p.category}<br>
        </li>`;
    });
    infoProducts += `</ul>`;
    productsList.innerHTML = infoProducts;
}

// Escucha el evento 'products' y actualiza la lista de productos
socket.on('products', (products) => {
    renderProductList(products);
    cleanForm();
});

// Maneja el evento click del botón eliminar
btnEliminar.addEventListener('click', () => {
    const action = document.getElementById('eliminarForm').getAttribute('data-action');
    if (action === 'delete') {
        const idToDelete = parseInt(idProduct.value, 10);
        socket.emit('deleteProduct', { idProduct: idToDelete });
    }
});
