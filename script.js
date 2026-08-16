const projects = [
  ["Proyecto Uno", "Identidad / Dirección de arte", "2026", "Una identidad con un lenguaje propio. Sustituye este texto por el contexto, la idea y las piezas principales del proyecto.", "assets/project-01.svg"],
  ["Proyecto Dos", "Editorial / Publicación", "2025", "Un sistema editorial pensado para crear ritmo, contraste y una lectura memorable.", "assets/project-02.svg"],
  ["Proyecto Tres", "Campaña / Sistema visual", "2025", "Una campaña flexible donde la tipografía y la imagen forman un pequeño universo visual.", "assets/project-03.svg"],
  ["Proyecto Cuatro", "Packaging / Universo de marca", "2024", "Un proyecto de packaging donde el material y los detalles táctiles forman parte de la idea.", "assets/project-04.svg"],
  ["Proyecto Cinco", "Digital / Experiencia", "2024", "Una experiencia digital centrada en la composición, el movimiento y la narración visual.", "assets/project-05.svg"]
];
const modal = document.querySelector('.project-modal');
const openProject = (index) => {
  const [title, category, year, description, image] = projects[index];
  document.querySelector('.modal-number').textContent = `${String(index + 1).padStart(2, '0')} / 05`;
  document.querySelector('.modal-title').textContent = title;
  document.querySelector('.modal-description').textContent = description;
  document.querySelector('.modal-meta').textContent = `${category} — ${year}`;
  const modalImage = document.querySelector('.modal-image');
  modalImage.src = image; modalImage.alt = title;
  modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false');
};
document.querySelectorAll('.project').forEach((card) => {
  const show = () => openProject(Number(card.dataset.project));
  card.querySelector('.project-image').addEventListener('click', show);
  card.querySelector('.project-link').addEventListener('click', show);
});
const closeModal = () => { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); };
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
const toggle = document.querySelector('.menu-toggle'); const nav = document.querySelector('.site-nav');
toggle.addEventListener('click', () => { const open = nav.classList.toggle('is-open'); toggle.setAttribute('aria-expanded', open); });
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => { nav.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }));
