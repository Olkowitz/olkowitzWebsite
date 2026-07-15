// Základní JavaScript pro olkowitz.cz

document.addEventListener('DOMContentLoaded', function () {
    console.log('Stránka olkowitz.cz načtena.');

    // Aktuální rok v copyrightu
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    // Zde můžete přidat interakce, např. smooth scroll nebo menu
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// Hamburger menu na mobilu
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.getElementById('main-nav');

if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', () => {
        const isOpen = mainNav.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Zavřít menu po kliknutí na odkaz
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}