const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector(".main-nav");
const navigationLinks = document.querySelectorAll(".main-nav a");
const revealElements = document.querySelectorAll(".reveal");
const currentYear = document.querySelector("#current-year");

// Cambia el fondo del header al hacer scroll
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

// Cierra el menú móvil
function closeMenu() {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

// Abrir / cerrar menú
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

// Cerrar menú al pulsar un enlace
navigationLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// Scroll
window.addEventListener("scroll", updateHeader);
updateHeader();

// Animaciones al entrar en pantalla
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// Año automático del footer
currentYear.textContent = new Date().getFullYear();