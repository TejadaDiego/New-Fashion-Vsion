document.addEventListener('DOMContentLoaded', () => {
    const carrito = document.getElementById('carrito');
    const cuenta = document.getElementById('cuenta');
    const carritoModal = document.getElementById('carrito-modal');
    const carritoItems = document.getElementById('carrito-items');
    const closeBtn = document.querySelector('.close');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const totalCompra = document.getElementById('total-compra');
    let carritoCuenta = 0;
    let carritoProductos = [];

    // Función para actualizar el contador del carrito
    function actualizarCarrito() {
        cuenta.textContent = carritoCuenta;
    }

    // Función para calcular el total de la compra
    function calcularTotal() {
        let total = 0;
        carritoProductos.forEach(producto => {
            total += producto.precio * producto.cantidad;
        });
        totalCompra.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Función para mostrar el carrito
    function mostrarCarrito() {
        carritoItems.innerHTML = '';
        carritoProductos.forEach((producto, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${producto.nombre} - $${producto.precio} 
                <input type="number" value="${producto.cantidad}" min="1" data-index="${index}">
                <button data-index="${index}" class="eliminar">Eliminar</button>
            `;
            carritoItems.appendChild(li);
        });
        carritoModal.style.display = 'block';
        calcularTotal();
    }

    // Función para añadir producto al carrito
    function añadirProducto(producto) {
        const index = carritoProductos.findIndex(p => p.nombre === producto.nombre);
        if (index !== -1) {
            carritoProductos[index].cantidad++;
        } else {
            carritoProductos.push({ ...producto, cantidad: 1 });
        }
        carritoCuenta++;
        actualizarCarrito();
    }

    // Event listener para botones "Añadir"
    const botones = document.querySelectorAll('.btn-2');
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const producto = {
                nombre: boton.parentElement.parentElement.querySelector('h3').textContent,
                precio: parseFloat(boton.parentElement.querySelector('p').textContent.replace('$', '')),
            };
            añadirProducto(producto);
        });
    });

    // Event listener para el carrito
    carrito.addEventListener('click', mostrarCarrito);

    // Event listener para cerrar el modal
    closeBtn.addEventListener('click', () => {
        carritoModal.style.display = 'none';
    });

    // Event listener para vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carritoProductos = [];
        carritoCuenta = 0;
        actualizarCarrito();
        mostrarCarrito();
    });

    // Event listener para cambiar cantidad y eliminar productos
    carritoItems.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains('eliminar')) {
            const index = e.target.dataset.index;
            carritoCuenta -= carritoProductos[index].cantidad;
            carritoProductos.splice(index, 1);
            actualizarCarrito();
            mostrarCarrito();
        } else if (e.target.tagName === 'INPUT') {
            const index = e.target.dataset.index;
            const nuevaCantidad = parseInt(e.target.value);
            carritoCuenta += (nuevaCantidad - carritoProductos[index].cantidad);
            carritoProductos[index].cantidad = nuevaCantidad;
            actualizarCarrito();
            calcularTotal();
        }
    });
});
