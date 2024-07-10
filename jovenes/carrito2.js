document.addEventListener('DOMContentLoaded', () => {
    const carritoImg = document.getElementById('carrito-img');
    const carritoModal = document.getElementById('carrito-modal');
    const closeModal = document.querySelector('.close');
    const cuenta = document.getElementById('cuenta');
    const carritoItems = document.getElementById('carrito-items');
    const totalCompra = document.getElementById('total-compra');
    const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
    const botonesAgregar = document.querySelectorAll('.btn-2');

    let carrito = [];
    
    const actualizarCarrito = () => {
        carritoItems.innerHTML = '';
        let total = 0;

        carrito.forEach((producto, index) => {
            const li = document.createElement('li');
            li.textContent = `${producto.nombre} - $${producto.precio}`;
            carritoItems.appendChild(li);

            total += producto.precio;
        });

        cuenta.textContent = carrito.length;
        totalCompra.textContent = `Total: $${total.toFixed(2)}`;
    };

    carritoImg.addEventListener('click', () => {
        carritoModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        carritoModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === carritoModal) {
            carritoModal.style.display = 'none';
        }
    });

    botonesAgregar.forEach((boton, index) => {
        boton.addEventListener('click', () => {
            const productoElement = boton.closest('.product-1');
            const nombreProducto = productoElement.querySelector('h3').textContent;
            const precioProducto = parseFloat(productoElement.querySelector('.price p').textContent.replace('$', ''));

            carrito.push({ nombre: nombreProducto, precio: precioProducto });

            actualizarCarrito();
        });
    });

    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
    });
});
