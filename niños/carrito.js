let cartItems = [];

function toggleCart() {
    const cart = document.getElementById('cart');
    if (cart.style.display === 'none' || cart.style.display === '') {
        cart.style.display = 'block';
    } else {
        cart.style.display = 'none';
    }
}

function addToCart(itemName, itemId) {
    cartItems.push({ name: itemName, id: itemId });
    updateCart();
}

function updateCart() {
    const cartList = document.getElementById('cartItems');
    cartList.innerHTML = '';
    cartItems.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = item.name;
        cartList.appendChild(listItem);
    });
}

function clearCart() {
    cartItems = [];
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
    } else {
        alert("Por favor, escribe un elemento antes de agregar.");
    }
}