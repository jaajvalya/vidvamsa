/**
 * Vidvamsa — Application Entry Point
 * src/js/main.js
 *
 * Bootstraps the SPA:
 *   1. Registers service sections.
 *   2. Lazy-mounts each section on first visit.
 *   3. Initialises navigation after DOM is ready.
 *
 * @module main
 */

import { initNavigation, navigateTo } from './navigation.js';
import { getActiveSection }           from './utils.js';
import { mountHome }                  from './sections/home.js';
import { mountServices }              from './sections/services.js';
import { mountSupport }               from './sections/support.js';
import { mountContact }               from './sections/contact.js';
import { SITE }                       from './config.js';

/* ── Section Registry ────────────────────────── */

/**
 * Maps section IDs to their mount functions.
 * All mounts are idempotent — calling them twice is safe.
 * @type {Map<string, Function>}
 */
const SECTION_REGISTRY = new Map([
  ['home',     mountHome],
  ['services', mountServices],
  ['support',  mountSupport],
  ['contact',  mountContact],
]);

/** Track which sections have already been mounted. */
const mounted = new Set();

/* ── Bootstrap ───────────────────────────────── */

function bootstrap() {
  // Set document metadata from config
  document.title              = SITE.meta.title;
  document.documentElement.lang = SITE.meta.lang;

  // Add meta description if not already present
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.name = 'description';
    document.head.appendChild(metaDesc);
  }
  metaDesc.content = SITE.meta.description;

  // Initialise navigation (renders sidebar, binds routing)
  initNavigation();

  // Mount the initial section eagerly
  const initial = getActiveSection();
  _ensureMounted(initial);

  // Pre-mount the home section if we're elsewhere (fast back-nav)
  if (initial !== 'home') _ensureMounted('home');

  // Listen for section changes to lazy-mount on first visit
  window.addEventListener('hashchange', () => {
    _ensureMounted(getActiveSection());
  });

  // Expose navigateTo globally for inline hrefs (non-module scripts)
  window.__vidvamsa = { navigateTo, version: '1.0.0' };

  console.info(
    `%c Vidvamsa v1.0.0 %c ${SITE.company.tagline} `,
    'background:#0F2D54;color:#00A8E8;font-weight:bold;padding:2px 6px;border-radius:3px 0 0 3px;',
    'background:#00A8E8;color:#fff;padding:2px 6px;border-radius:0 3px 3px 0;',
  );
}

/* ── Lazy Mount ──────────────────────────────── */

/**
 * Mount a section if it hasn't been mounted yet.
 * @param {string} sectionId
 */
function _ensureMounted(sectionId) {
  if (mounted.has(sectionId)) return;
  const mountFn = SECTION_REGISTRY.get(sectionId);
  if (!mountFn) return;
  mountFn();
  mounted.add(sectionId);
}

/* ── Init ────────────────────────────────────── */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  bootstrap();
}
