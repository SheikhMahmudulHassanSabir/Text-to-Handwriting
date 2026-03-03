/**
 * preview.js
 * ─────────────────────────────────────────────
 * Responsible for rendering the live handwriting
 * preview sheet based on the current app state.
 */

/** Scale factor: the preview is shown at 50 % of real export size */
const PREVIEW_SCALE = 0.5;


/**
 * Re-render the paper sheet in the preview panel.
 * Called every time state changes.
 *
 * @param {object} state  - full state object from state.js
 * @param {HTMLElement} paperEl - the #preview-paper element
 */
export function renderPreview(state, paperEl) {
    const {
        text, font, fontSize, inkColor, paperSize,
        lineHeight, wordSpacing, letterSpacing, margin,
        effect, paperColor,
    } = state;

    const scaledFontSize = fontSize * PREVIEW_SCALE;
    const scaledMargin = margin * PREVIEW_SCALE;
    const scaledWordSpacing = wordSpacing * PREVIEW_SCALE;
    const scaledLetterSpacing = letterSpacing * PREVIEW_SCALE;
    const scaledWidth = paperSize.width * PREVIEW_SCALE;
    const scaledMinHeight = paperSize.height * PREVIEW_SCALE;

    // ── Paper container ──────────────────────────────────────────
    paperEl.style.width = `${scaledWidth}px`;
    paperEl.style.minHeight = `${scaledMinHeight}px`;
    paperEl.style.padding = `${scaledMargin}px`;
    paperEl.style.backgroundColor = paperColor;
    paperEl.style.position = 'relative';

    // Toggle effect classes (CSS handles the actual filter/shadow)
    paperEl.classList.toggle('effect-texture', effect === 'texture');
    paperEl.classList.toggle('effect-shadow', effect === 'shadow');
    paperEl.classList.toggle('effect-scanner', effect === 'scanner');



    // ── Text content wrapper ──────────────────────────────────────
    let contentEl = paperEl.querySelector('.paper-content');
    if (!contentEl) {
        contentEl = document.createElement('div');
        contentEl.className = 'paper-content';
        paperEl.appendChild(contentEl);
    }

    contentEl.style.fontFamily = font;
    contentEl.style.fontSize = `${scaledFontSize}px`;
    contentEl.style.lineHeight = lineHeight;
    contentEl.style.color = inkColor;
    contentEl.style.wordSpacing = `${scaledWordSpacing}px`;
    contentEl.style.letterSpacing = `${scaledLetterSpacing}px`;
    contentEl.style.whiteSpace = 'pre-wrap';
    contentEl.style.position = 'relative';
    contentEl.style.marginTop = `-${fontSize * 0.05}px`;


    // ── Text node ─────────────────────────────────────────────────
    let textEl = contentEl.querySelector('.paper-text');
    if (!textEl) {
        textEl = document.createElement('div');
        textEl.className = 'paper-text';
        contentEl.appendChild(textEl);
    }
    // Use textContent — never innerHTML — to prevent XSS
    textEl.textContent = text;
}
