// Obtiene referencias a los elementos del DOM
let nextDom = document.getElementById('next'); // Botón para avanzar al siguiente elemento
let prevDom = document.getElementById('prev'); // Botón para retroceder al elemento anterior

let carouselDom = document.querySelector('.carousel'); // Contenedor principal del carrusel
let SliderDom = carouselDom.querySelector('.carousel .list'); // Contenedor de los elementos del carrusel
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail'); // Contenedor de miniaturas
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item'); // Elementos de miniatura
let timeDom = document.querySelector('.carousel .time'); // Barra de tiempo del carrusel

// Mueve la primera miniatura al final del contenedor de miniaturas para mantener el orden
thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

// Intervalos de tiempo en milisegundos
let timeRunning = 3000; // Duración del tiempo de animación en el carrusel
let timeAutoNext = 7000; // Tiempo de transición automática entre elementos

// Asigna funciones a los eventos de clic en los botones
nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}

// Variable para almacenar el temporizador de la transición automática
let runTimeOut;

// Establece un temporizador para avanzar automáticamente al siguiente elemento
let runNextAuto = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

// Función para mostrar el siguiente o el anterior elemento del carrusel
function showSlider(type){
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item'); // Todos los elementos del carrusel
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item'); // Todas las miniaturas

    let currentVideo = SliderItemsDom[0].querySelector('video'); // Video actual que se está reproduciendo
    if (type === 'next') {
        // Avanza al siguiente elemento
        SliderDom.appendChild(SliderItemsDom[0]); // Mueve el primer elemento al final
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]); // Mueve la primera miniatura al final
        carouselDom.classList.add('next'); // Añade clase para la animación de avance
    } else {
        // Retrocede al elemento anterior
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]); // Mueve el último elemento al inicio
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]); // Mueve la última miniatura al inicio
        carouselDom.classList.add('prev'); // Añade clase para la animación de retroceso
    }

    let nextVideo = SliderItemsDom[0].querySelector('video'); // Video del siguiente elemento
    currentVideo.pause(); // Pausa el video actual
    nextVideo.play(); // Reproduce el siguiente video

    // Reinicia el temporizador de la animación
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next'); // Elimina clase de avance
        carouselDom.classList.remove('prev'); // Elimina clase de retroceso
    }, timeRunning);

    // Reinicia el temporizador de transición automática
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextDom.click(); // Avanza automáticamente al siguiente elemento
    }, timeAutoNext);
}

// Controla la transición automática cuando la ventana está activa o inactiva
let checkRunAutoNext = true;

// Cuando la ventana se enfoca, reinicia el temporizador de transición automática
window.onfocus = () => {
    if (checkRunAutoNext) {
        clearTimeout(runNextAuto);
        runNextAuto = setTimeout(() => {
            nextDom.click(); // Avanza automáticamente al siguiente elemento
        }, timeAutoNext);
    }
}

// Cuando la ventana pierde el enfoque, detiene la transición automática
window.onblur = () => {
    clearTimeout(runNextAuto);
    checkRunAutoNext = true; // Permite que se reinicie el temporizador cuando la ventana se enfoca de nuevo
}
