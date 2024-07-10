// Selecciona los elementos del DOM usando querySelector y asigna a variables
const inputName = document.querySelector("#input-name");
const inputNumber = document.querySelector("#input-number");
const inputMonth = document.querySelector("#input-month");
const inputYear = document.querySelector("#input-year");
const inputCVC = document.querySelector("#input-cvc");
const cardNumber = document.querySelector("#card-number");
const cardName = document.querySelector("#card-name");
const cardMonth = document.querySelector("#card-month");
const cardYear = document.querySelector("#card-year");
const cardCVC = document.querySelector("#card-cvc");
const form = document.querySelector("#form");
const thankYou = document.querySelector("#thank-you");
const buttonContinue = document.querySelector("#continue");

// Event listener para el campo de nombre
inputName.addEventListener("input", () => {
    // Actualiza el texto en el elemento de la tarjeta
    cardName.innerText = inputName.value;

    // Si el campo está vacío, restaura un valor predeterminado
    if (inputName.value.length === 0) {
        cardName.innerText = "Jane Appleseed";
    }
});

// Configuración de Cleave.js para el campo de número de tarjeta
var cleave = new Cleave('#input-number', {
    creditCard: true,
});

// Event listener para el campo de número de tarjeta
inputNumber.addEventListener("input", () => {
    // Actualiza el texto en el elemento de la tarjeta
    cardNumber.innerText = inputNumber.value;

    // Si el campo está vacío, restaura un valor predeterminado
    if (inputNumber.value.length === 0) {
        cardNumber.innerText = "0000 0000 0000 0000";
    }
});

// Event listener para el campo de mes de expiración
inputMonth.addEventListener("input", () => {
    // Actualiza el texto en el elemento de la tarjeta
    cardMonth.innerText = inputMonth.value;

    // Si el campo está vacío, restaura un valor predeterminado
    if (inputMonth.value.length === 0) {
        cardMonth.innerText = "00";
    }
});

// Event listener para el campo de año de expiración
inputYear.addEventListener("input", () => {
    // Actualiza el texto en el elemento de la tarjeta
    cardYear.innerText = inputYear.value;

    // Si el campo está vacío, restaura un valor predeterminado
    if (inputYear.value.length === 0) {
        cardYear.innerText = "00";
    }
});

// Event listener para el campo de CVC
inputCVC.addEventListener("input", () => {
    // Actualiza el texto en el elemento de la tarjeta
    cardCVC.innerText = inputCVC.value;

    // Si el campo está vacío, restaura un valor predeterminado
    if (inputCVC.value.length === 0) {
        cardCVC.innerText = "000";
    }
});

// Event listener para el envío del formulario
form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evita el envío del formulario por defecto
    form.classList.add("disabled"); // Añade una clase para deshabilitar el formulario visualmente
    thankYou.classList.remove("disabled"); // Muestra el mensaje de agradecimiento al remover la clase que lo oculta
});

// Event listener para el botón de continuar
buttonContinue.addEventListener("click", () => {
    form.classList.remove("disabled"); // Habilita el formulario al remover la clase de deshabilitación
    thankYou.classList.add("disabled"); // Oculta el mensaje de agradecimiento al añadir la clase de ocultamiento
    form.reset(); // Restablece los valores del formulario a los predeterminados
    cardName.innerText = "Jane Appleseed"; // Restablece el nombre en la tarjeta
    cardNumber.innerText = "0000 0000 0000 0000"; // Restablece el número de tarjeta
    cardMonth.innerText = "00"; // Restablece el mes de expiración
    cardYear.innerText = "00"; // Restablece el año de expiración
    cardCVC.innerText = "000"; // Restablece el CVC de la tarjeta
});
