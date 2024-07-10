let cart = [];
let total = 0;

function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.style.display = cartElement.style.display === 'none' ? 'block' : 'none';
}

function addToCart(item, price) {
    cart.push({ item, price });
    total += price;
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPrice = document.getElementById('totalPrice');
    cartItems.innerHTML = '';
    cart.forEach((product, index) => {
        const li = document.createElement('li');
        li.textContent = `${product.item} - S/${product.price.toFixed(2)}`;
        cartItems.appendChild(li);
    });
    totalPrice.textContent = `Total: S/${total.toFixed(2)}`;
}

function clearCart() {
    cart = [];
    total = 0;
    updateCart();
}

function addItem() {
    // Obtener el valor del input
    var itemValue = document.getElementById('itemInput').value;

    // Verificar que el input no esté vacío
    if(itemValue.trim() !== "") {
        // Crear un nuevo div para el elemento
        var newItem = document.createElement('div');
        newItem.className = 'grid-item';
        newItem.textContent = itemValue;

        // Agregar el nuevo elemento a la grilla
        document.getElementById('itemGrid').appendChild(newItem);

        // Limpiar el input
        document.getElementById('itemInput').value = "";

        // Opcional: Podrías agregar el nuevo item al carrito automáticamente
        // addToCart(itemValue, precio); // Ajusta esto según tus necesidades
    } else {
        alert("Por favor, escribe un elemento antes de agregar.");
    }
}

function purchaseItems() {
    if (cart.length > 0) {
        alert('El producto ha sido comprado con éxito');
        clearCart();
    } else {
        alert('El carrito está vacío');
    }
}
