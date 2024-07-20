// Variable para almacenar los elementos del carrito
let cart = [];

// Función para agregar un producto al carrito
function addToCart(itemTitle, itemPrice) {
    const item = { title: itemTitle, price: itemPrice };
    cart.push(item);
    updateCart();
}

// Función para actualizar el carrito de compras
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    cartItems.innerHTML = '';

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.title} - S/${item.price}`;
        cartItems.appendChild(listItem);
        totalPrice += item.price;
    });

    totalPriceElement.textContent = `Total: S/${totalPrice.toFixed(2)}`;
}

// Función para vaciar el carrito
function clearCart() {
    cart = [];
    updateCart();
}

// Función para mostrar/ocultar el carrito de compras
function toggleCart() {
    const cartElement = document.getElementById('cart');
    cartElement.style.display = cartElement.style.display === 'none' || cartElement.style.display === '' ? 'block' : 'none';
}

// Función para procesar la compra
function processPurchase() {
    // Obtener los valores de los campos del formulario
    var cardOwner = document.getElementById('cardOwner').value;
    var cardNumber = document.getElementById('cardNumber').value;
    var cardExp = document.getElementById('cardExp').value;
    var cardCVC = document.getElementById('cardCVC').value;
    var address = document.getElementById('address').value;
    var deliveryDate = document.getElementById('deliveryDate').value;

    // Validar que todos los campos obligatorios estén completos
    if (cardOwner === '' || cardNumber === '' || cardExp === '' || cardCVC === '' || address === '' || deliveryDate === '') {
        alert('Por favor, complete todos los campos antes de procesar la compra.');
        return; // Detener el proceso de compra si falta algún dato
    }

    // Validar la longitud del número de tarjeta (debe ser 16 dígitos)
    if (cardNumber.length !== 16) {
        alert('Número de tarjeta inválido. El número de tarjeta debe tener 16 dígitos.');
        return; // Detener el proceso de compra si la longitud no es válida
    }

    // Validar la fecha de expiración (formato MM/AA)
    if (!isValidCardExp(cardExp)) {
        alert('Fecha de expiración inválida. Por favor, ingrese una fecha de expiración válida en formato MM/AA.');
        return;
    }

    // Validar el CVC (solo números y longitud)
    if (!isValidCardCVC(cardCVC)) {
        alert('CVC inválido. Por favor, ingrese un código CVC válido.');
        return;
    }

    // Si todos los campos y datos de la tarjeta son válidos, mostrar alerta de compra exitosa
    alert("¡Producto comprado con éxito!");

    // Redirigir a la página principal
    window.location.href = "../index/index1.html";
}

// Función para validar el número de tarjeta
function isValidCardNumber(cardNumber) {
    var cardNumberRegex = /^[0-9]{16}$/; // Asumiendo tarjetas de crédito con 16 dígitos
    return cardNumberRegex.test(cardNumber);
}

// Función para validar la fecha de expiración (MM/AA)
function isValidCardExp(cardExp) {
    var cardExpRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    return cardExpRegex.test(cardExp);
}

// Función para validar el CVC
function isValidCardCVC(cardCVC) {
    var cardCVCRegex = /^[0-9]{3}$/; // Asumiendo CVC de 3 dígitos
    return cardCVCRegex.test(cardCVC);
}

// Función para manejar el evento de entrada en los campos del formulario
document.addEventListener('DOMContentLoaded', function() {
    var cardOwnerInput = document.getElementById('cardOwner');
    var cardNumberInput = document.getElementById('cardNumber');
    var cardExpInput = document.getElementById('cardExp');
    var cardCVCInput = document.getElementById('cardCVC');
    var addressInput = document.getElementById('address');
    var deliveryDateInput = document.getElementById('deliveryDate');

    // Escuchar los eventos de entrada para actualizar dinámicamente el valor del campo
    cardOwnerInput.addEventListener('input', function() {
        updateFormData('cardOwner', cardOwnerInput.value);
    });

    cardNumberInput.addEventListener('input', function() {
        updateFormData('cardNumber', cardNumberInput.value);
    });

    cardExpInput.addEventListener('input', function() {
        updateFormData('cardExp', cardExpInput.value);
    });

    cardCVCInput.addEventListener('input', function() {
        updateFormData('cardCVC', cardCVCInput.value);
    });

    addressInput.addEventListener('input', function() {
        updateFormData('address', addressInput.value);
    });

    deliveryDateInput.addEventListener('input', function() {
        updateFormData('deliveryDate', deliveryDateInput.value);
    });

    // Escuchar el evento click del botón de procesar compra
    document.getElementById('btnPurchase').addEventListener('click', function() {
        validateAndProcess();
    });
});

// Función para actualizar el valor del campo en el formulario
function updateFormData(fieldName, value) {
    var formElement = document.getElementById(fieldName);
    if (formElement) {
        formElement.value = value;
    }
}
