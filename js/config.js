/**
 * config.js
 * ─────────────────────────────────────────────
 * Static data constants used throughout the app.
 * Edit this file to add/remove fonts, colors, etc.
 */

/** Available handwriting fonts (loaded from Google Fonts) */
export const FONTS = [
    { id: 'homemade-apple', name: 'Homemade Apple', value: '"Homemade Apple", cursive' },
    { id: 'caveat', name: 'Caveat', value: '"Caveat", cursive' },
    { id: 'dancing-script', name: 'Dancing Script', value: '"Dancing Script", cursive' },
    { id: 'indie-flower', name: 'Indie Flower', value: '"Indie Flower", cursive' },
    { id: 'kalam', name: 'Kalam', value: '"Kalam", cursive' },
    { id: 'satisfy', name: 'Satisfy', value: '"Satisfy", cursive' },
    { id: 'shadows-into-light', name: 'Shadows Into Light', value: '"Shadows Into Light", cursive' },
    { id: 'patrick-hand', name: 'Patrick Hand', value: '"Patrick Hand", cursive' },
];

/** Ink colors available in the color picker */
export const INK_COLORS = [
    { name: 'Black', value: '#1a1a1a', bgClass: 'black' },
    { name: 'Blue', value: '#0000ff', bgClass: 'blue' },
    { name: 'Red', value: '#ff0000', bgClass: 'red' },
];

/** Paper sizes in pixels (at 96 dpi) */
export const PAPER_SIZES = [
    { name: 'A4', width: 794, height: 1123 },
    { name: 'Letter', width: 816, height: 1056 },
    { name: 'A5', width: 559, height: 794 },
];

/** Visual effects applied to the preview and export */
export const EFFECTS = [
    { name: 'None', value: 'none' },
    { name: 'Paper Texture', value: 'texture' },
    { name: 'Scanner', value: 'scanner' },
    { name: 'Shadow', value: 'shadow' },
];

/** Google Fonts URL covering all handwriting families */
export const GOOGLE_FONTS_URL =
    'https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700' +
    '&family=Dancing+Script:wght@400;500;600;700' +
    '&family=Homemade+Apple' +
    '&family=Indie+Flower' +
    '&family=Kalam:wght@300;400;700' +
    '&family=Satisfy' +
    '&family=Shadows+Into+Light' +
    '&family=Patrick+Hand' +
    '&display=swap';

/** Default app settings */
export const DEFAULT_STATE = {
    font: FONTS[0].value,
    fontSize: 24,
    inkColor: INK_COLORS[0].value,
    paperSize: PAPER_SIZES[0],
    lineHeight: 1.8,
    wordSpacing: 4,
    letterSpacing: 0,
    margin: 60,
    effect: 'none',
    paperColor: '#ffffff',
};

/** Sample text shown on first load */
export const DEFAULT_TEXT = `Dear Friend,

I hope this letter finds you well. I've been thinking about our conversation last week and wanted to put my thoughts down on paper.

There's something magical about handwritten notes that digital messages simply cannot capture. The flow of ink, the subtle variations in each letter, the personal touch that makes every word feel more meaningful.

Looking forward to seeing you soon!

Warm regards`;
