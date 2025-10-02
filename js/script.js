// script.js
// Comportamiento: al pulsar el botón central, desplegar/recoger los items en círculo
document.addEventListener('DOMContentLoaded', () => {
  const centerBtn = document.getElementById('centerBtn');
  const container = document.getElementById('portfolio');
  const items = Array.from(container.querySelectorAll('.portfolio-item'));
  const radius = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--expanded-radius')) || 160;
  let open = false;

  // Prepara items — extraer ángulo desde data-angle si existe
  const prepared = items.map((el, index) => {
    let angleDeg = parseFloat(el.dataset.angle);
    if (Number.isNaN(angleDeg)) {
      // si no hay ángulo definido, repartir equidistantemente
      angleDeg = (360 / items.length) * index;
    }
    const angleRad = angleDeg * (Math.PI / 180);
    return { el, angleDeg, angleRad };
  });

  // Función para abrir
  function openItems() {
    container.classList.add('open');
    centerBtn.setAttribute('aria-expanded', 'true');

    prepared.forEach(({el, angleRad}, i) => {
      // calcular posición relativa al centro
      const x = Math.cos(angleRad) * radius;
      const y = Math.sin(angleRad) * radius * -1; // invertimos eje Y para CSS
      gsap.to(el, {
        duration: 0.6,
        x: x,
        y: y,
        scale: 1,
        opacity: 1,
        ease: "back.out(1.4)",
        delay: i * 0.04
      });
    });
    open = true;
  }

  // Función para cerrar
  function closeItems() {
    container.classList.remove('open');
    centerBtn.setAttribute('aria-expanded', 'false');

    prepared.forEach(({el}, i) => {
      gsap.to(el, {
        duration: 0.45,
        x: 0,
        y: 0,
        scale: 0.001,
        opacity: 0,
        ease: "power3.inOut",
        delay: i * 0.03
      });
    });
    open = false;
  }

  // Toggle al click
  centerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!open) openItems(); else closeItems();
  });

  // Soporte teclado (Enter/Espacio para abrir)
  centerBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      centerBtn.click();
    }
  });

  // Clicks en los items — ejemplo: abrir modal o navegar a proyecto
  prepared.forEach(({el}) => {
    el.addEventListener('click', (e) => {
      const label = el.dataset.label || el.querySelector('.item-label')?.textContent || 'Elemento';
      // Ejemplo simple: mostrar alert con nombre (sustituye por navegación real)
      alert(`Abriste: ${label}`);
    });

    // permitir activación por teclado
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        el.click();
      }
    });
  });

  // Cerrar si se hace click fuera (opcional)
  document.addEventListener('click', (e) => {
    if (!container.contains(e.target) && open) {
      closeItems();
    }
  });

  // Inicial: aseguramos items en centro (por si JS carga lento)
  prepared.forEach(({el}) => {
    gsap.set(el, { x: 0, y: 0, scale: 0.001, opacity: 0 });
  });

});
