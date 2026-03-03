/**
 * state.js
 * ─────────────────────────────────────────────
 * Centralised application state with a simple
 * observer pattern for reactive updates.
 */

import { DEFAULT_STATE, DEFAULT_TEXT } from './config.js';

/** The single source of truth for all app settings */
let state = {
    text: DEFAULT_TEXT,
    ...DEFAULT_STATE,
};

/** Registered subscriber callbacks */
const subscribers = [];

/**
 * Subscribe to state changes.
 * @param {function(state: object): void} fn
 */
export function subscribe(fn) {
    subscribers.push(fn);
}

/**
 * Read a copy of the current state.
 * @returns {object}
 */
export function getState() {
    return { ...state };
}

/**
 * Merge a partial update into state and notify all subscribers.
 * @param {Partial<typeof state>} partial
 */
export function setState(partial) {
    state = { ...state, ...partial };
    subscribers.forEach(fn => fn(state));
}

/**
 * Reset every setting (but not the text) to its default value.
 */
export function resetToDefaults() {
    setState({ ...DEFAULT_STATE });
}
