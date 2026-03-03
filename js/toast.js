/**
 * toast.js
 * ─────────────────────────────────────────────
 * Lightweight, dependency-free toast notification
 * system. Creates and auto-dismisses messages.
 *
 * Usage:
 *   import { toast } from './toast.js';
 *   toast.info('Loading…');
 *   toast.success('Done!');
 *   toast.error('Something went wrong.');
 */

/** Duration each toast stays visible (ms) */
const TOAST_DURATION = 3500;
const FADE_DURATION = 400;

/** Lazily create/return the toast container */
function getContainer() {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.setAttribute('aria-live', 'polite');
        document.body.appendChild(container);
    }
    return container;
}

/**
 * Show a toast notification.
 * @param {string} message
 * @param {'info'|'success'|'error'} type
 */
function show(message, type) {
    const container = getContainer();

    const toastEl = document.createElement('div');
    toastEl.className = `toast toast--${type}`;
    toastEl.setAttribute('role', 'status');

    // Icon
    const icons = { info: 'ℹ', success: '✓', error: '✕' };
    const iconEl = document.createElement('span');
    iconEl.className = 'toast__icon';
    iconEl.textContent = icons[type] || 'ℹ';

    const msgEl = document.createElement('span');
    msgEl.className = 'toast__message';
    msgEl.textContent = message;

    toastEl.appendChild(iconEl);
    toastEl.appendChild(msgEl);
    container.appendChild(toastEl);

    // Animate in
    requestAnimationFrame(() => {
        requestAnimationFrame(() => toastEl.classList.add('toast--visible'));
    });

    // Auto-dismiss
    setTimeout(() => {
        toastEl.classList.remove('toast--visible');
        setTimeout(() => toastEl.remove(), FADE_DURATION);
    }, TOAST_DURATION);
}

export const toast = {
    info: msg => show(msg, 'info'),
    success: msg => show(msg, 'success'),
    error: msg => show(msg, 'error'),
};
