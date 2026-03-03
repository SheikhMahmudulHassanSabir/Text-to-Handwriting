/**
 * menu.js
 * ─────────────────────────────────────────────
 * Handles the mobile hamburger menu toggle.
 */

export function initMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('site-nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.contains('site-nav--open');

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !toggle.contains(e.target) && nav.classList.contains('site-nav--open')) {
            closeMenu();
        }
    });

    // Close menu when pressing Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('site-nav--open')) {
            closeMenu();
        }
    });

    function openMenu() {
        nav.classList.add('site-nav--open');
        toggle.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // Prevent scroll when menu is open
    }

    function closeMenu() {
        nav.classList.remove('site-nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }
}
