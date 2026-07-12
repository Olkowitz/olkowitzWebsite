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