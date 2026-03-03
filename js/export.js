/**
 * export.js
 * ─────────────────────────────────────────────
 * Handles all download functionality:
 *   - exportImage()  → PNG via html2canvas
 *   - exportPDF()    → Multi-page PDF via jsPDF + html2canvas
 *
 * Both functions capture the *full-resolution export sheet*
 * (#export-paper), NOT the scaled-down preview.
 */

import { getState } from './state.js';
import { toast } from './toast.js';

/**
 * Build (or return existing) the hidden full-size export paper element.
 * This element is rendered off-screen at 1× scale for high-quality capture.
 *
 * @returns {HTMLElement}
 */
function getOrCreateExportSheet() {
    let sheet = document.getElementById('export-paper');
    if (!sheet) {
        sheet = document.createElement('div');
        sheet.id = 'export-paper';
        sheet.setAttribute('aria-hidden', 'true');
        document.body.appendChild(sheet);
    }
    return sheet;
}

/**
 * Populate the hidden export sheet with the current state at full resolution.
 * @param {object} state
 * @returns {HTMLElement} the populated sheet
 */
function buildExportSheet(state) {
    const {
        text, font, fontSize, inkColor, paperSize,
        lineHeight, wordSpacing, letterSpacing, margin,
        paperColor,
    } = state;

    const sheet = getOrCreateExportSheet();

    sheet.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: ${paperSize.width}px;
    min-height: ${paperSize.height}px;
    padding: ${margin}px;
    background-color: ${paperColor};
    box-sizing: border-box;
    font-family: ${font};
    font-size: ${fontSize}px;
    line-height: ${lineHeight};
    color: ${inkColor};
    word-spacing: ${wordSpacing}px;
    letter-spacing: ${letterSpacing}px;
    white-space: pre-wrap;
    overflow: visible;
  `;

    sheet.innerHTML = '';


    // Content / ruled lines wrapper
    const contentDiv = document.createElement('div');
    contentDiv.style.position = 'relative';
    contentDiv.style.marginTop = `-${fontSize * 0.05}px`;


    const textDiv = document.createElement('div');
    textDiv.style.position = 'relative';
    textDiv.style.zIndex = '1';
    textDiv.textContent = text;

    contentDiv.appendChild(textDiv);
    sheet.appendChild(contentDiv);

    return sheet;
}

/**
 * Capture the export sheet as a canvas using html2canvas.
 * @param {object} state
 * @returns {Promise<HTMLCanvasElement>}
 */
async function captureSheet(state) {
    const sheet = buildExportSheet(state);

    // Wait for all fonts (Google Fonts) to be fully loaded before capturing
    await document.fonts.ready;
    // Extra tick for layout settling
    await new Promise(r => setTimeout(r, 50));

    return window.html2canvas(sheet, {
        scale: 2,
        backgroundColor: state.paperColor,
        logging: false,
        useCORS: true,
    });
}

/**
 * Download the handwriting as a PNG image.
 */
export async function exportImage() {
    const state = getState();
    toast.info('Generating your handwriting image…');

    try {
        const canvas = await captureSheet(state);
        const link = document.createElement('a');
        link.download = `handwriting-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success('Image downloaded successfully!');
    } catch (err) {
        console.error('[exportImage]', err);
        toast.error('Failed to generate image. Please try again.');
    }
}

/**
 * Download the handwriting as a multi-page PDF.
 * Each page corresponds to one paper-height slice of the captured canvas.
 */
export async function exportPDF() {
    const state = getState();
    toast.info('Generating PDF…');

    try {
        const canvas = await captureSheet(state);
        const imageData = canvas.toDataURL('image/png');
        const pageW = state.paperSize.width;
        const pageH = state.paperSize.height;
        const canvasH = canvas.height;

        // jsPDF is loaded from CDN as a UMD global
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [pageW, pageH] });

        // Slice the tall canvas into page-height chunks
        let offsetY = 0;
        while (offsetY < canvasH) {
            pdf.addImage(imageData, 'PNG', 0, -offsetY, pageW, canvas.height);
            offsetY += pageH;
            if (offsetY < canvasH) {
                pdf.addPage([pageW, pageH], 'portrait');
            }
        }

        pdf.save(`handwriting-${Date.now()}.pdf`);
        toast.success('PDF downloaded successfully!');
    } catch (err) {
        console.error('[exportPDF]', err);
        toast.error('Failed to generate PDF. Please try again.');
    }
}
