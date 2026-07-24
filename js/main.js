// Základní JavaScript pro olkowitz.cz

document.addEventListener('DOMContentLoaded', function () {
    // Sestavení klikacího e-mailu (v HTML zůstává [zavinac] jako ochrana proti scraperům)
    const emailLink = document.getElementById('contact-email');
    if (emailLink) {
        const address = 'info' + '@' + 'olkowitz.cz';
        emailLink.href = 'mailto:' + address;
        emailLink.textContent = address;
    }

    // Mapa Google se načte až po kliknutí uživatele (soukromí / GDPR)
    const loadMapBtn = document.getElementById('load-map');
    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', () => {
            const iframe = document.createElement('iframe');
            iframe.src = 'https://www.google.com/maps?q=Oleksovice+133,+671+62+Oleksovice&output=embed';
            iframe.width = '100%';
            iframe.height = '400';
            iframe.style.border = '0';
            iframe.loading = 'lazy';
            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            iframe.title = 'Mapa - sídlo Olkowitz z.s.';
            loadMapBtn.replaceWith(iframe);
        });
    }
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
        menuToggle.setAttribute('aria-label', isOpen ? 'Zavřít menu' : 'Otevřít menu');
    });

    // Zavřít menu po kliknutí na odkaz
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Otevřít menu');
        });
    });
}