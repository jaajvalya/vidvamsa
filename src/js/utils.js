/**
 * Vidvamsa — Utility Functions
 * src/js/utils.js
 */

/* ── DOM ──────────────────────────────────── */

/** querySelector shorthand */
export const $ = (sel, root = document) => root.querySelector(sel);

/** querySelectorAll → Array */
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/* ── String ───────────────────────────────── */

/** Escape HTML special characters to prevent XSS. */
export const escapeHtml = str =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/* ── SVG Icon Registry (Feather-compatible) ── */

const ICON_PATHS = {
  home:          '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  layers:        '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  headphones:    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  mail:          '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  cpu:           '<rect x="9" y="9" width="6" height="6"/><path d="M20 16h1a1 1 0 0 0 0-2h-1M4 16H3a1 1 0 0 1 0-2h1m16-4h1a1 1 0 0 0 0-2h-1M4 10H3a1 1 0 0 1 0-2h1m14-2v1M6 4v1M10 4v1M14 4v1m0 14v1M10 18v1M6 18v1m8-14H10a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>',
  zap:           '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  cloud:         '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  code:          '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  database:      '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  'refresh-cw':  '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  'pen-tool':    '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  terminal:      '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  shield:        '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  users:         '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'arrow-right': '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  'external-link':'<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  'chevron-down':'<polyline points="6 9 12 15 18 9"/>',
  phone:         '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.42 12 19.79 19.79 0 0 1 1.21 3.59 2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 8 8l1.21-1.21a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 24 17z"/>',
};

/**
 * Returns an inline SVG icon string.
 * @param {string} name   - icon key from ICON_PATHS
 * @param {number} [size] - px size (default 20)
 * @param {string} [cls]  - optional CSS class
 */
export function icon(name, size = 20, cls = '') {
  const paths = ICON_PATHS[name] ?? ICON_PATHS['layers'];
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${paths}</svg>`;
}

/* ── Async helpers (Phase 2 ready) ─────────── */

/** Debounce: delay fn until delayMs after last call. */
export function debounce(fn, delayMs) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

/** Throttle: call fn at most once per intervalMs. */
export function throttle(fn, intervalMs) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= intervalMs) { last = now; fn(...args); }
  };
}

/* ── Router ───────────────────────────────── */

/** Returns the current hash section id, falling back to 'home'. */
export const getActiveSection = () =>
  window.location.hash.replace('#', '') || 'home';

/**
 * Set the URL hash — triggers hashchange so main.js lazy-mounts the section.
 * @param {string} id
 */
export const setHash = id => { window.location.hash = `#${id}`; };
