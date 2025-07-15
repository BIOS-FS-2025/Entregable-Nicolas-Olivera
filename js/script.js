window.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initSmoothScrolling();
    initSeleccionJuegoInfo();
    initNavActiveSection();
});

function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSeleccionJuegoInfo() {
    const areaSeleccion = document.getElementById('juego-seleccionado');
    const grid = document.querySelector('.juegos-grid');
    if (!grid) return;

    grid.addEventListener('click', function(e) {
        const boton = e.target.closest('.btn');
        if (!boton) return;
        let juegoDiv = boton.closest('.juego');
        if (!juegoDiv) return;
        let info = juegoDiv.querySelector('.info-juego');

        const titulo = info.querySelector('h3')?.textContent.trim() || '';
        const plataforma = Array.from(info.querySelectorAll('p')).find(p => p.innerText.includes('Plataforma'))?.innerHTML || '';
        const genero = Array.from(info.querySelectorAll('p')).find(p => p.innerText.includes('Género'))?.innerHTML || '';
        const fecha = Array.from(info.querySelectorAll('p')).find(p => p.innerText.includes('Fecha'))?.innerHTML || '';
        const descripcion = Array.from(info.querySelectorAll('p')).find(p => p.innerText.includes('Descripción'))?.innerHTML || '';

        areaSeleccion.innerHTML = `
            <div class="info-juego-seleccionado">
                <h3>${titulo}</h3>
                <p>${plataforma}</p>
                <p>${genero}</p>
                <p>${fecha}</p>
                <p>${descripcion}</p>
            </div>
        `;
    });
}

function initNavActiveSection() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = Array.from(navLinks).map(link => {
        const id = link.getAttribute('href');
        return document.querySelector(id);
    });

    function onScroll() {
        let scrollPos = window.scrollY + document.querySelector('.header').offsetHeight + 10;
        let currentIndex = 0;
        sections.forEach((section, i) => {
            if (section && section.offsetTop <= scrollPos) {
                currentIndex = i;
            }
        });
        navLinks.forEach((link, i) => {
            if (i === currentIndex) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll);
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(onScroll, 400);
        });
    });
    onScroll();
}