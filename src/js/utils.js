/**
 * Vidvamsa — Utility Functions
 * src/js/utils.js
 *
 * Pure helper functions with no side-effects.
 * All DOM utilities accept an optional root element
 * to keep functions testable without a real document.
 *
 * @module utils
 */

/* ── DOM Helpers ─────────────────────────────── */

/**
 * Shorthand for document.querySelector (or within a root).
 * @param {string} selector
 * @param {Element|Document} [root=document]
 * @returns {Element|null}
 */
export const $ = (selector, root = document) => root.querySelector(selector);

/**
 * Shorthand for document.querySelectorAll, returns Array.
 * @param {string} selector
 * @param {Element|Document} [root=document]
 * @returns {Element[]}
 */
export const $$ = (selector, root = document) =>
  Array.from(root.querySelectorAll(selector));

/**
 * Create a DOM element with optional attributes and children.
 * @param {string} tag  - HTML tag name
 * @param {Object} [attrs={}] - key/value attribute map
 * @param {(string|Element)[]} [children=[]] - text or child elements
 * @returns {Element}
 */
export function createElement(tag, attrs = {}, children = []) {
  const el = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (key === 'className')       el.className = value;
    else if (key === 'innerHTML')  el.innerHTML = value;
    else if (key === 'textContent')el.textContent = value;
    else if (key.startsWith('data-')) el.setAttribute(key, value);
    else                           el.setAttribute(key, value);
  }
  for (const child of children) {
    if (typeof child === 'string') el.appendChild(document.createTextNode(child));
    else if (child instanceof Element) el.appendChild(child);
  }
  return el;
}

/**
 * Add/remove classes and return the element (for chaining).
 * @param {Element} el
 * @param {string} cls
 * @param {boolean} [force]
 * @returns {Element}
 */
export const toggleClass = (el, cls, force) => {
  el.classList.toggle(cls, force);
  return el;
};

/**
 * Delegate event listening to a parent element.
 * @param {Element} parent
 * @param {string} event
 * @param {string} selector
 * @param {Function} handler
 */
export function delegate(parent, event, selector, handler) {
  parent.addEventListener(event, (e) => {
    const target = e.target.closest(selector);
    if (target && parent.contains(target)) handler(e, target);
  });
}

/* ── String Helpers ──────────────────────────── */

/**
 * Convert a string to a URL-safe slug.
 * @param {string} str
 * @returns {string}
 */
export const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

/**
 * Capitalise the first letter of a string.
 * @param {string} str
 * @returns {string}
 */
export const capitalise = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/**
 * Truncate a string to maxLen with an ellipsis.
 * @param {string} str
 * @param {number} maxLen
 * @returns {string}
 */
export const truncate = (str, maxLen) =>
  str.length > maxLen ? `${str.slice(0, maxLen).trimEnd()}…` : str;

/* ── SVG Icon Registry ───────────────────────── */
/**
 * Returns inline SVG markup for a Feather-compatible icon.
 * Icons are inline (no external dependency at runtime).
 * @param {string} name - icon name from registry
 * @param {number} [size=20] - viewport size in px
 * @returns {string} SVG string
 */
const ICON_PATHS = {
  home:         '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  layers:       '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  headphones:   '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>',
  mail:         '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  cpu:          '<rect x="9" y="9" width="6" height="6"/><path d="M20 16h1a1 1 0 0 0 0-2h-1M4 16H3a1 1 0 0 1 0-2h1m16-4h1a1 1 0 0 0 0-2h-1M4 10H3a1 1 0 0 1 0-2h1m14-2v1M6 4v1M10 4v1M14 4v1m0 14v1M10 18v1M6 18v1m8-14H10a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1z"/>',
  zap:          '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  cloud:        '<path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>',
  code:         '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  database:     '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  'refresh-cw': '<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>',
  'pen-tool':   '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>',
  terminal:     '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
  target:       '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  shield:       '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  users:        '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  'trending-up':'<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  'chevron-down':'<polyline points="6 9 12 15 18 9"/>',
  menu:         '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
  x:            '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  'arrow-right':'<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  'check-circle':'<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  phone:        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.42 12 19.79 19.79 0 0 1 1.21 3.59 2 2 0 0 1 3.18 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.85a16 16 0 0 0 8 8l1.21-1.21a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 24 17z"/>',
  slack:        '<path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/>',
};

/**
 * @param {string} name
 * @param {number} [size=20]
 * @param {string} [className='']
 * @returns {string}
 */
export function icon(name, size = 20, className = '') {
  const paths = ICON_PATHS[name] || ICON_PATHS['layers'];
  return `<svg class="${className}" width="${size}" height="${size}" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true">${paths}</svg>`;
}

/* ── Formatting Helpers ──────────────────────── */

/**
 * Format a field value for safe HTML insertion (basic escaping).
 * @param {string} str
 * @returns {string}
 */
export const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/* ── Async Helpers ───────────────────────────── */

/**
 * A basic debounce implementation.
 * @param {Function} fn
 * @param {number} delayMs
 * @returns {Function}
 */
export function debounce(fn, delayMs) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delayMs);
  };
}

/**
 * Throttle a function to at most once per intervalMs.
 * @param {Function} fn
 * @param {number} intervalMs
 * @returns {Function}
 */
export function throttle(fn, intervalMs) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= intervalMs) {
      lastCall = now;
      fn(...args);
    }
  };
}

/* ── Hash / Router Helpers ───────────────────── */

/**
 * Get the current hash without the '#' prefix.
 * Returns 'home' if no hash is present.
 * @returns {string}
 */
export const getActiveSection = () =>
  (window.location.hash.replace('#', '') || 'home');

/**
 * Set the page hash without triggering a scroll.
 * @param {string} id
 */
export const setHash = (id) => {
  history.pushState(null, '', `#${id}`);
};
