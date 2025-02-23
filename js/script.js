$(document).ready(function() {
    let text = "Hola, soy Diseñadora Gráfica.";
    let container = $(".animated-text");
    text.split("").forEach((char, i) => {
        let span = $("<span>").text(char);
        span.css("animation-delay", `${i * 0.05}s`);
        container.append(span);
    });
});
