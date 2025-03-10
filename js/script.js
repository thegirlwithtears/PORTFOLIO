$(document).ready(function() {
    let text = "Hola, soy Diseñadora Gráfica.";
    let container = $(".animated-text");
    text.split("").forEach((char, i) => {
        let span = $("<span>").text(char);
        span.css("animation-delay", `${i * 0.05}s`);
        container.append(span);
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    let isHovering = false;
    let scrollSpeed = 0;

    function duplicateImages() {
        const images = Array.from(carousel.children);
        images.forEach(img => {
            const clone = img.cloneNode(true);
            carousel.appendChild(clone);
        });
    }

    function moveCarousel() {
        if (isHovering) {
            carousel.style.transform = `translateX(${-scrollSpeed}px)`;
            scrollSpeed += 10; // Velocidad súper rápida
            if (scrollSpeed >= carousel.scrollWidth / 2) {
                scrollSpeed = 0;
            }
        }
        requestAnimationFrame(moveCarousel);
    }

    carousel.addEventListener("mouseenter", () => isHovering = true);
    carousel.addEventListener("mouseleave", () => isHovering = false);

    duplicateImages(); // Duplica imágenes para el efecto infinito
    moveCarousel();
});