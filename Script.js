// NAVBAR Y SIDEBAR
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY > 100;
  navbar.classList.toggle('scrolled', scrolled);
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  sidebar.classList.toggle('active');
  overlay.classList.toggle('active');
});

overlay.addEventListener('click', closeSidebar);

// Cerrar sidebar al hacer clic fuera del menú y del botón
document.addEventListener('click', (e) => {
  const isClickInsideSidebar = sidebar.contains(e.target);
  const isClickOnHamburger = hamburger.contains(e.target);

  if (!isClickInsideSidebar && !isClickOnHamburger && sidebar.classList.contains('active')) {
    closeSidebar();
  }
});

function closeSidebar() {
  hamburger.classList.remove('open');
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
  sidebarSubmenu?.classList.remove('active');
}

// ACORDEÓN DE SERVICIOS (sección de tabs horizontal)
const items = document.querySelectorAll('.acordeon-item');
items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) item.classList.add('open');
  });
  item.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) item.classList.remove('open');
  });
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      items.forEach(i => i !== item && i.classList.remove('open'));
      item.classList.toggle('open');
    }
  });
});

// CONTADOR ANIMADO
function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

const counters = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function runCounters() {
  if (hasAnimated) return;
  if ([...counters].some(counter => isInViewport(counter))) {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / 80;

        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 40);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    hasAnimated = true;
  }
}
window.addEventListener('scroll', runCounters);

// TABS DE PROYECTOS
const tabs = document.querySelectorAll(".tab");
const galleries = document.querySelectorAll(".collage-gallery-horizontal");

const data = {
  comercial: ["comercial1.jpg", "comercial2.jpg", "comercial3.jpg", "comercial4.jpg", "comercial2.jpg"],
  minera: ["minera1.jpg", "minera2.jpg", "minera3.jpg", "minera4.jpg"],
  electrica: ["electrica1.jpeg", "electrica2.jpeg", "electrica3.jpeg", "electrica3.jpeg"],
  industrial: ["industrial1.jpeg", "industrial2.jpeg", "industrial3.jpeg", "industrial4.jpeg"],
  inmobiliaria: ["inmobiliaria1.jpg", "inmobiliaria2.jpg", "inmobiliaria3.jpg", "inmobiliaria4.jpg"]
};

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const key = tab.getAttribute("data-tab");
    const topRow = galleries[0];
    const bottomRow = galleries[1];
    topRow.innerHTML = "";
    bottomRow.innerHTML = "";

    const images = data[key];

    images.concat(images).forEach((src, index) => {
      const img = document.createElement("img");
      img.src = `img/${src}`;
      img.alt = `${key} ${index + 1}`;
      img.style.width = "140px";
      img.style.height = "100px";
      img.style.borderRadius = "10px";
      img.style.objectFit = "cover";
      img.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
      (index % 2 === 0 ? topRow : bottomRow).appendChild(img);
    });
  });
});

// REDES FLOTANTES
const toggle = document.getElementById('launcher-toggle');
const icons = document.getElementById('social-icons');
if (toggle && icons) {
  toggle.addEventListener('click', () => {
    icons.classList.toggle('show');
  });
}

// SUBMENÚ DEL SIDEBAR
const sidebarServiciosLink = document.getElementById('sidebar-servicios-link');
const sidebarSubmenu = document.getElementById('sidebar-submenu');

if (sidebarServiciosLink && sidebarSubmenu) {
  sidebarServiciosLink.addEventListener('click', (e) => {
    e.preventDefault();
    sidebarSubmenu.classList.toggle('active');
  });
}

// AUDIO DEL VIDEO DE FONDO
const video = document.getElementById('background-video');
const btn = document.getElementById('toggleAudio');
let isMuted = true;

if (video && btn) {
  btn.addEventListener('click', () => {
    isMuted = !isMuted;
    video.muted = isMuted;
    video.volume = isMuted ? 0 : 1;
    btn.textContent = isMuted ? '🔊 Activar sonido' : '🔇 Silenciar';
  });
}


const visualCards = document.querySelectorAll('.accordion-visual-mobile .accordion-header');

visualCards.forEach(header => {
  header.addEventListener('click', () => {
    const card = header.closest('.accordion-card');
    const isActive = card.classList.contains('active');

    document.querySelectorAll('.accordion-card').forEach(c => {
      c.classList.remove('active');
      c.querySelector('.icon').textContent = '+';
    });

    if (!isActive) {
      card.classList.add('active');
      card.querySelector('.icon').textContent = '−';
    }
  });
});
