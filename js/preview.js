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
    if (!paperEl) return;
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
    const scaledHeight = paperSize.height * PREVIEW_SCALE;

    // Clear existing sheets
    paperEl.innerHTML = '';

    // ── Pagination Logic ──────────────────────────────────────────
    // Create a hidden measuring element to check for overflow
    const measureEl = document.createElement('div');
    measureEl.style.cssText = `
        position: absolute;
        visibility: hidden;
        width: ${scaledWidth - (scaledMargin * 2)}px;
        font-family: ${font};
        font-size: ${scaledFontSize}px;
        line-height: ${lineHeight};
        word-spacing: ${scaledWordSpacing}px;
        letter-spacing: ${scaledLetterSpacing}px;
        white-space: pre-wrap;
    `;
    document.body.appendChild(measureEl);

    const pages = [];
    let currentPageText = '';
    const lines = text.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const testText = currentPageText + (currentPageText ? '\n' : '') + line;
        measureEl.textContent = testText;

        // If this line causes overflow, push current page and start new one
        if (measureEl.offsetHeight > (scaledHeight - (scaledMargin * 2)) && currentPageText !== '') {
            pages.push(currentPageText);
            currentPageText = line;
        } else {
            currentPageText = testText;
        }
    }
    pages.push(currentPageText); // Push the last page

    document.body.removeChild(measureEl);

    // ── Render Sheets ──────────────────────────────────────────
    pages.forEach(pageText => {
        const sheet = document.createElement('div');
        sheet.className = 'preview-sheet';
        sheet.style.width = `${scaledWidth}px`;
        sheet.style.height = `${scaledHeight}px`;
        sheet.style.padding = `${scaledMargin}px`;
        sheet.style.backgroundColor = paperColor;

        // Effects
        sheet.classList.toggle('effect-texture', effect === 'texture');
        sheet.classList.toggle('effect-shadow', effect === 'shadow');
        sheet.classList.toggle('effect-scanner', effect === 'scanner');

        const content = document.createElement('div');
        content.className = 'paper-content';
        content.style.fontFamily = font;
        content.style.fontSize = `${scaledFontSize}px`;
        content.style.lineHeight = lineHeight;
        content.style.color = inkColor;
        content.style.wordSpacing = `${scaledWordSpacing}px`;
        content.style.letterSpacing = `${scaledLetterSpacing}px`;
        content.style.whiteSpace = 'pre-wrap';
        content.style.position = 'relative';
        content.style.marginTop = `-${fontSize * 0.05 * PREVIEW_SCALE}px`;

        const textDiv = document.createElement('div');
        textDiv.className = 'paper-text';
        textDiv.textContent = pageText;

        content.appendChild(textDiv);
        sheet.appendChild(content);
        paperEl.appendChild(sheet);
    });
}
