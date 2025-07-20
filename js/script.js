// Inicializar Locomotive Scroll
const scroll = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true
});

// Inicializar AOS (Animaciones al hacer scroll)
AOS.init({
    duration: 1000, // Duración de las animaciones
    once: true, // Solo animar una vez
});
