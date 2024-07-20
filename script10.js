// script.js

document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('login-form');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevenir el envío del formulario

        var emailInput = document.getElementById('email');
        var emailValue = emailInput.value.trim();

        if (emailValue !== '') {
            if (validarCorreoElectronico(emailValue)) {
                alert('Se ha ingresado correctamente el correo electrónico');
                // Aquí puedes agregar más lógica de envío del formulario si es necesario
            } else {
                alert('El formato del correo electrónico no es válido');
            }
        } else {
            alert('Por favor ingrese su correo electrónico');
        }
    });
});

// Función para validar el formato de correo electrónico
function validarCorreoElectronico(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener el formulario de login por su ID
    var loginForm = document.getElementById('login-form');

    // Agregar un evento de escucha para el envío del formulario
    loginForm.addEventListener('submit', function(event) {
        // Evitar que el formulario se envíe normalmente
        event.preventDefault();

        // Simular validación del formulario
        // Aquí deberías realizar la validación del login (por ejemplo, mediante AJAX)

        // Redirigir al usuario a index.html después de un inicio de sesión exitoso
        window.location.href = 'index/index1.html'; // Cambiar 'index.html' por tu página de inicio real
    });
});
