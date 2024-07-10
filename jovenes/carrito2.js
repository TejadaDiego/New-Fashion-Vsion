document.addEventListener('DOMContentLoaded', () => {
    // Selecciona los elementos del DOM necesarios
    const carrito = document.getElementById('carrito');
    const cuenta = document.getElementById('cuenta');
    const carritoModal = document.getElementById('carrito-modal');
    const carritoItems = document.getElementById('carrito-items');
    const closeBtn = document.querySelector('.close');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const totalCompra = document.getElementById('total-compra');

    // Variables para llevar la cuenta de productos y almacenar los productos en el carrito
    let carritoCuenta = 0;
    let carritoProductos = [];

    // Función para actualizar el contador del carrito
    function actualizarCarrito() {
        cuenta.textContent = carritoCuenta; // Actualiza el número mostrado en el icono del carrito
    }

    // Función para calcular el total de la compra
    function calcularTotal() {
        let total = 0;
        carritoProductos.forEach(producto => {
            total += producto.precio * producto.cantidad; // Suma el precio de cada producto multiplicado por su cantidad
        });
        totalCompra.textContent = `Total: $${total.toFixed(2)}`; // Actualiza el total mostrado en el modal del carrito
    }

    // Función para mostrar el carrito
    function mostrarCarrito() {
        carritoItems.innerHTML = ''; // Limpia la lista de productos en el modal
        carritoProductos.forEach((producto, index) => {
            // Crea un elemento de lista para cada producto en el carrito
            const li = document.createElement('li');
            li.innerHTML = `
                ${producto.nombre} - $${producto.precio} 
                <input type="number" value="${producto.cantidad}" min="1" data-index="${index}">
                <button data-index="${index}" class="eliminar">Eliminar</button>
            `;
            carritoItems.appendChild(li); // Añade el elemento de lista al modal
        });
        carritoModal.style.display = 'block'; // Muestra el modal del carrito
        calcularTotal(); // Calcula y muestra el total de la compra
    }

    // Función para añadir producto al carrito
    function añadirProducto(producto) {
        const index = carritoProductos.findIndex(p => p.nombre === producto.nombre); // Busca si el producto ya está en el carrito
        if (index !== -1) {
            carritoProductos[index].cantidad++; // Si el producto ya está, incrementa su cantidad
        } else {
            carritoProductos.push({ ...producto, cantidad: 1 }); // Si es un nuevo producto, lo añade al carrito con cantidad 1
        }
        carritoCuenta++; // Incrementa el contador del carrito
        actualizarCarrito(); // Actualiza el contador mostrado en el icono del carrito
    }

    // Añade event listeners a los botones "Añadir" de los productos
    const botones = document.querySelectorAll('.btn-2');
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const producto = {
                nombre: boton.parentElement.parentElement.querySelector('h3').textContent, // Obtiene el nombre del producto
                precio: parseFloat(boton.parentElement.querySelector('p').textContent.replace('$', '')), // Obtiene el precio del producto
            };
            añadirProducto(producto); // Añade el producto al carrito
        });
    });

    // Muestra el carrito cuando se hace clic en el icono del carrito
    carrito.addEventListener('click', mostrarCarrito);

    // Cierra el modal del carrito cuando se hace clic en el botón de cerrar
    closeBtn.addEventListener('click', () => {
        carritoModal.style.display = 'none';
    });

    // Vacía el carrito cuando se hace clic en el botón "Vaciar Carrito"
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoProductos = []; // Vacía la lista de productos
        carritoCuenta = 0; // Reinicia el contador del carrito
        actualizarCarrito(); // Actualiza el contador mostrado en el icono del carrito
        mostrarCarrito(); // Muestra el carrito vacío
    });

    // Maneja los cambios de cantidad y eliminación de productos en el carrito
    carritoItems.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains('eliminar')) {
            // Elimina un producto cuando se hace clic en el botón "Eliminar"
            const index = e.target.dataset.index;
            carritoCuenta -= carritoProductos[index].cantidad; // Resta la cantidad del producto eliminado del contador del carrito
            carritoProductos.splice(index, 1); // Elimina el producto de la lista
            actualizarCarrito(); // Actualiza el contador mostrado en el icono del carrito
            mostrarCarrito(); // Muestra el carrito actualizado
        } else if (e.target.tagName === 'INPUT') {
            // Actualiza la cantidad de un producto cuando se cambia el valor del input
            const index = e.target.dataset.index;
            const nuevaCantidad = parseInt(e.target.value);
            carritoCuenta += (nuevaCantidad - carritoProductos[index].cantidad); // Actualiza el contador del carrito según la nueva cantidad
            carritoProductos[index].cantidad = nuevaCantidad; // Actualiza la cantidad del producto en la lista
            actualizarCarrito(); // Actualiza el contador mostrado en el icono del carrito
            calcularTotal(); // Calcula y muestra el nuevo total de la compra
        }
    });
});
