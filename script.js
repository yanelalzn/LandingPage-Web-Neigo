const WHATSAPP_NUMBER = "51932947270";

function waUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

document.querySelectorAll(".js-whatsapp").forEach(link => {
  const msg = link.dataset.message || "Hola Neigo, quiero información sobre desarrollo web.";
  link.href = waUrl(msg);
  link.target = "_blank";
  link.rel = "noopener";
});

const header = document.querySelector(".site-header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 20);
}, { passive: true });

const menuBtn = document.querySelector(".menu-btn");
const mobileMenu = document.querySelector(".mobile-menu");
menuBtn?.addEventListener("click", () => {
  const open = mobileMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
mobileMenu?.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("mousemove", e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
    glow.style.opacity = "1";
  });
}

const leadForm = document.querySelector("#leadForm");
leadForm?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(leadForm);

  const message =
`Hola Neigo, quiero solicitar una cotización web.

Nombre: ${data.get("nombre") || "-"}
Empresa: ${data.get("empresa") || "-"}
WhatsApp: ${data.get("whatsapp") || "-"}
Tipo de web: ${data.get("tipo") || "-"}
Proyecto: ${data.get("mensaje") || "-"}`;

  window.open(waUrl(message), "_blank", "noopener");
});


// service list

document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("ticker-track");
    if (!track) return;

    // 1. Clonar el contenido lo suficiente para llenar cualquier pantalla
    const originalContent = track.innerHTML;
    
    // Duplicamos unas 4 veces por seguridad para pantallas Ultra-Wide (4K)
    for (let i = 0; i < 4; i++) {
        track.innerHTML += originalContent;
    }

    // 2. Calcular cuánto mide un solo bloque original para saber cuándo reiniciar
    // Creamos un clon temporal para medir exactamente el ancho original con sus gaps
    const totalItems = track.children.length / 5; // Dividido entre el total de copias
    let originalWidth = 0;
    
    for (let i = 0; i < totalItems; i++) {
        originalWidth += track.children[i].offsetWidth + 30; // 30 es el gap en px
    }

    let speed = 1.5; // Velocidad del ticker (puedes subir a 1.5 o 2 si lo quieres más rápido)
    let position = 0;

    function animateTicker() {
        position -= speed;

        // Si ya se desplazó el equivalente a un bloque original completo, reinicia a 0 sin parpadeos
        if (Math.abs(position) >= originalWidth) {
            position = 0;
        }

        track.style.transform = `translateX(${position}px)`;
        requestAnimationFrame(animateTicker);
    }

    // Iniciar la animación de forma fluida
    requestAnimationFrame(animateTicker);
});

    document.addEventListener('DOMContentLoaded', () => {
    const path = document.querySelector('#svg-mono');
    const container = document.querySelector('.intro-process-wrapper');
    
    if (!path || !container) return;

    const pathLength = path.getTotalLength();

    // Inicializa el estado oculto del trazo
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    function animateOnScroll() {
        const rect = container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Porcentaje base de scroll
        const totalDistance = rect.height + windowHeight;
        const currentProgress = (windowHeight - rect.top) / totalDistance;

        // ⚡ MULTIPLICADOR DE VELOCIDAD:
        // Multiplicamos por 1.8 (o 2.0) para que se complete antes de que la sección salga de pantalla
        const speedMultiplier = 2.5; 
        const scrollPercentage = Math.min(Math.max(currentProgress * speedMultiplier, 0), 1);

        // Dibuja la línea dinámicamente
        const drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});

// Active menu

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Detecta la sección cuando entra en la parte superior de la pantalla
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");

        // Quita la clase 'active' de todos los enlaces y se la añade al actual
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  // Observa cada sección de la página
  sections.forEach((section) => observer.observe(section));
});