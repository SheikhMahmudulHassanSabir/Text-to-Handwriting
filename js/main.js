/**
 * main.js
 * ─────────────────────────────────────────────
 * Entry point. Bootstraps the app:
 *   1. Injects Google Fonts
 *   2. Populates dynamic UI (font dropdown, color swatches, etc.)
 *   3. Wires all event listeners to state updates
 *   4. Subscribes preview renderer to state changes
 *   5. Triggers initial render
 */

import { FONTS, INK_COLORS, PAPER_SIZES, EFFECTS, GOOGLE_FONTS_URL } from './config.js';
import { getState, setState, subscribe, resetToDefaults } from './state.js';
import { renderPreview } from './preview.js';
import { exportImage, exportPDF } from './export.js';
import { initMenu } from './menu.js';
import { toast } from './toast.js';

// ── 1. Inject Google Fonts ────────────────────────────────────────────────────
(function injectFonts() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = GOOGLE_FONTS_URL;
    document.head.appendChild(link);
})();

// ── 2. Populate dynamic UI ────────────────────────────────────────────────────

/** Populate <select id="font-select"> */
function buildFontSelect() {
    const select = document.getElementById('font-select');
    if (!select) return;
    select.innerHTML = '';
    FONTS.forEach(f => {
        const opt = document.createElement('option');
        opt.value = f.value;
        opt.textContent = f.name;
        opt.style.fontFamily = f.value;
        select.appendChild(opt);
    });
    select.value = getState().font;
}

/** Populate color swatches */
function buildColorSwatches() {
    const container = document.getElementById('color-swatches');
    if (!container) return;
    container.innerHTML = '';
    INK_COLORS.forEach(c => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `color-swatch color-swatch--${c.bgClass}`;
        btn.dataset.color = c.value;
        btn.title = c.name;
        btn.setAttribute('aria-label', `Select ink color: ${c.name}`);
        btn.setAttribute('aria-pressed', 'false');
        container.appendChild(btn);
    });
    updateColorSwatches(getState().inkColor);
}

/** Highlight the active swatch */
function updateColorSwatches(activeColor) {
    document.querySelectorAll('.color-swatch').forEach(btn => {
        const isActive = btn.dataset.color === activeColor;
        btn.classList.toggle('color-swatch--active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

/** Populate <select id="paper-size-select"> */
function buildPaperSizeSelect() {
    const select = document.getElementById('paper-size-select');
    if (!select) return;
    select.innerHTML = '';
    PAPER_SIZES.forEach(ps => {
        const opt = document.createElement('option');
        opt.value = ps.name;
        opt.textContent = ps.name;
        select.appendChild(opt);
    });
    select.value = getState().paperSize.name;
}

/** Populate <select id="effect-select"> */
function buildEffectSelect() {
    const select = document.getElementById('effect-select');
    if (!select) return;
    select.innerHTML = '';
    EFFECTS.forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.value;
        opt.textContent = e.name;
        select.appendChild(opt);
    });
    select.value = getState().effect;
}

// ── 3. Sync UI elements to state ─────────────────────────────────────────────

function syncUIToState(state) {
    // Text area
    const textarea = document.getElementById('text-input');
    if (textarea && textarea.value !== state.text) textarea.value = state.text;

    // Character count
    const charCount = document.getElementById('char-count');
    if (charCount) charCount.textContent = `${state.text.length} characters`;

    // Font select
    const fontSelect = document.getElementById('font-select');
    if (fontSelect) fontSelect.value = state.font;

    // Color swatches
    updateColorSwatches(state.inkColor);

    // Font size
    const fontSizeSlider = document.getElementById('font-size-slider');
    const fontSizeValue = document.getElementById('font-size-value');
    if (fontSizeSlider) fontSizeSlider.value = state.fontSize;
    if (fontSizeValue) fontSizeValue.textContent = `${state.fontSize}px`;

    // Paper size
    const paperSizeSelect = document.getElementById('paper-size-select');
    if (paperSizeSelect) paperSizeSelect.value = state.paperSize.name;

    // Effect
    const effectSelect = document.getElementById('effect-select');
    if (effectSelect) effectSelect.value = state.effect;


    // Spacing sliders
    const lineHeightSlider = document.getElementById('line-height-slider');
    const lineHeightValue = document.getElementById('line-height-value');
    if (lineHeightSlider) lineHeightSlider.value = Math.round(state.lineHeight * 10);
    if (lineHeightValue) lineHeightValue.textContent = `${state.lineHeight}×`;

    const wordSpacingSlider = document.getElementById('word-spacing-slider');
    const wordSpacingValue = document.getElementById('word-spacing-value');
    if (wordSpacingSlider) wordSpacingSlider.value = state.wordSpacing;
    if (wordSpacingValue) wordSpacingValue.textContent = `${state.wordSpacing}px`;

    const letterSpacingSlider = document.getElementById('letter-spacing-slider');
    const letterSpacingValue = document.getElementById('letter-spacing-value');
    if (letterSpacingSlider) letterSpacingSlider.value = state.letterSpacing + 5;
    if (letterSpacingValue) letterSpacingValue.textContent = `${state.letterSpacing}px`;

    const marginSlider = document.getElementById('margin-slider');
    const marginValue = document.getElementById('margin-value');
    if (marginSlider) marginSlider.value = state.margin;
    if (marginValue) marginValue.textContent = `${state.margin}px`;

    // Download button states (disabled when text is empty or generating)
    const hasText = state.text.trim().length > 0;
    const btnImage = document.getElementById('btn-download-image');
    const btnPDF = document.getElementById('btn-download-pdf');
    if (btnImage) btnImage.disabled = !hasText;
    if (btnPDF) btnPDF.disabled = !hasText;
}

// ── 4. Event listeners ────────────────────────────────────────────────────────

function wireEvents() {
    // Text input
    const textarea = document.getElementById('text-input');
    if (textarea) {
        textarea.addEventListener('input', e => {
            setState({ text: e.target.value });
        });
    }

    // Clear text
    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            setState({ text: '' });
        });
    }

    // Font
    const fontSelect = document.getElementById('font-select');
    if (fontSelect) {
        fontSelect.addEventListener('change', e => {
            setState({ font: e.target.value });
        });
    }

    // Color swatches (event delegation)
    const colorSwatches = document.getElementById('color-swatches');
    if (colorSwatches) {
        colorSwatches.addEventListener('click', e => {
            const btn = e.target.closest('.color-swatch');
            if (btn) setState({ inkColor: btn.dataset.color });
        });
    }

    // Font size
    const fontSizeSlider = document.getElementById('font-size-slider');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', e => {
            setState({ fontSize: parseInt(e.target.value, 10) });
        });
    }

    // Paper size
    const paperSizeSelect = document.getElementById('paper-size-select');
    if (paperSizeSelect) {
        paperSizeSelect.addEventListener('change', e => {
            const ps = PAPER_SIZES.find(p => p.name === e.target.value);
            if (ps) setState({ paperSize: ps });
        });
    }

    // Effect
    const effectSelect = document.getElementById('effect-select');
    if (effectSelect) {
        effectSelect.addEventListener('change', e => {
            setState({ effect: e.target.value });
        });
    }


    // Line height
    const lineHeightSlider = document.getElementById('line-height-slider');
    if (lineHeightSlider) {
        lineHeightSlider.addEventListener('input', e => {
            setState({ lineHeight: parseInt(e.target.value, 10) / 10 });
        });
    }

    // Word spacing
    const wordSpacingSlider = document.getElementById('word-spacing-slider');
    if (wordSpacingSlider) {
        wordSpacingSlider.addEventListener('input', e => {
            setState({ wordSpacing: parseInt(e.target.value, 10) });
        });
    }

    // Letter spacing
    const letterSpacingSlider = document.getElementById('letter-spacing-slider');
    if (letterSpacingSlider) {
        letterSpacingSlider.addEventListener('input', e => {
            setState({ letterSpacing: parseInt(e.target.value, 10) - 5 });
        });
    }

    // Margin
    const marginSlider = document.getElementById('margin-slider');
    if (marginSlider) {
        marginSlider.addEventListener('input', e => {
            setState({ margin: parseInt(e.target.value, 10) });
        });
    }

    // Reset
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
        btnReset.addEventListener('click', () => {
            resetToDefaults();
            toast.success('Settings reset to defaults.');
        });
    }

    // Download image
    const btnImage = document.getElementById('btn-download-image');
    if (btnImage) btnImage.addEventListener('click', exportImage);

    // Download PDF
    const btnPDF = document.getElementById('btn-download-pdf');
    if (btnPDF) btnPDF.addEventListener('click', exportPDF);
}

// ── 5. Bootstrap ──────────────────────────────────────────────────────────────

function init() {
    const paperEl = document.getElementById('preview-paper');

    // Build dynamic UI components (only if relevant elements exist)
    if (document.getElementById('font-select')) buildFontSelect();
    if (document.getElementById('color-swatches')) buildColorSwatches();
    if (document.getElementById('paper-size-select')) buildPaperSizeSelect();
    if (document.getElementById('effect-select')) buildEffectSelect();

    // Subscribe to state: re-render preview + sync controls
    subscribe(state => {
        if (paperEl) renderPreview(state, paperEl);
        syncUIToState(state);
    });

    // Wire all user-interaction events
    wireEvents();

    // Initial render with default state (if preview exists)
    const state = getState();
    if (paperEl) renderPreview(state, paperEl);
    syncUIToState(state);

    // Initialize mobile menu (Always run)
    initMenu();
}

// Run after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
