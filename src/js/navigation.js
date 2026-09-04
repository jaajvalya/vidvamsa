/**
 * Vidvamsa — Navigation Module
 * src/js/navigation.js
 *
 * Manages sidebar rendering, active-state highlighting,
 * hash-based routing, and mobile menu toggle.
 *
 * @module navigation
 */

import { SITE }                       from './config.js';
import { $, $$, icon, getActiveSection, setHash } from './utils.js';

/* ── Public API ──────────────────────────────── */

/**
 * Initialise the sidebar navigation.
 * Must be called after DOMContentLoaded.
 */
export function initNavigation() {
  _renderSidebar();
  _activateSection(getActiveSection());
  _bindEvents();
}

/**
 * Programmatically navigate to a section.
 * @param {string} sectionId
 */
export function navigateTo(sectionId) {
  _activateSection(sectionId);
  setHash(sectionId);
}

/* ── Private Helpers ─────────────────────────── */

function _renderSidebar() {
  const sidebar = $('#sidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <!-- Brand -->
    <div class="sidebar__brand">
      <a href="#home" class="sidebar__logo" aria-label="${SITE.company.name} — go to home">
        <div class="sidebar__logo-mark" aria-hidden="true">${SITE.company.logoText}</div>
        <div>
          <div class="sidebar__company-name">${SITE.company.name}</div>
          <div class="sidebar__tagline">${SITE.company.tagline}</div>
        </div>
      </a>
    </div>

    <!-- Navigation -->
    <nav class="sidebar__nav" aria-label="Primary navigation">
      <div class="sidebar__nav-section">
        <ul class="sidebar__nav-list" role="list">
          ${SITE.navigation.map(_renderNavItem).join('')}
        </ul>
      </div>
    </nav>

    <!-- Footer -->
    <div class="sidebar__footer">
      <p class="sidebar__footer-text">
        &copy; ${new Date().getFullYear()} ${SITE.company.name}<br>
        All rights reserved
      </p>
    </div>
  `;
}

/**
 * Build the HTML for a single nav item.
 * @param {{ id: string, label: string, icon: string }} item
 * @returns {string}
 */
function _renderNavItem({ id, label, icon: iconName }) {
  return `
    <li class="sidebar__nav-item">
      <a
        href="#${id}"
        class="sidebar__nav-link"
        data-section="${id}"
        aria-label="${label}"
      >
        ${icon(iconName, 18, 'sidebar__nav-icon')}
        <span>${label}</span>
      </a>
    </li>
  `;
}

/**
 * Activate a section: update link states and show/hide panels.
 * @param {string} sectionId
 */
function _activateSection(sectionId) {
  // Validate — fall back to 'home' if unknown
  const validIds = SITE.navigation.map((n) => n.id);
  const target   = validIds.includes(sectionId) ? sectionId : 'home';

  // Nav links
  $$('.sidebar__nav-link').forEach((link) => {
    const isActive = link.dataset.section === target;
    link.classList.toggle('is-active', isActive);
    link.setAttribute('aria-current', isActive ? 'page' : 'false');
  });

  // Page sections
  $$('.page-section').forEach((section) => {
    const isActive = section.dataset.section === target;
    section.classList.toggle('is-active', isActive);
  });

  // Update document title
  const navItem = SITE.navigation.find((n) => n.id === target);
  if (navItem) {
    document.title = `${navItem.label} — ${SITE.meta.title}`;
  }

  // Close mobile menu after navigation
  _closeMobileMenu();
}

/* ── Event Binding ───────────────────────────── */

function _bindEvents() {
  // Sidebar nav clicks
  const nav = $('.sidebar__nav');
  if (nav) {
    nav.addEventListener('click', (e) => {
      const link = e.target.closest('.sidebar__nav-link');
      if (!link) return;
      e.preventDefault();
      navigateTo(link.dataset.section);
    });
  }

  // Hero CTA clicks (delegate from body)
  document.body.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const sectionId = anchor.getAttribute('href').replace('#', '');
    const validIds  = SITE.navigation.map((n) => n.id);
    if (validIds.includes(sectionId)) {
      e.preventDefault();
      navigateTo(sectionId);
    }
  });

  // Hash change (browser back/forward)
  window.addEventListener('hashchange', () => {
    _activateSection(getActiveSection());
  });

  // Mobile menu toggle
  const menuToggle = $('#menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', _toggleMobileMenu);
  }

  // Overlay click
  const overlay = $('#sidebar-overlay');
  if (overlay) {
    overlay.addEventListener('click', _closeMobileMenu);
  }

  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') _closeMobileMenu();
  });
}

function _toggleMobileMenu() {
  const sidebar = $('#sidebar');
  const overlay = $('#sidebar-overlay');
  if (!sidebar) return;
  const isOpen = sidebar.classList.toggle('is-open');
  if (overlay) overlay.classList.toggle('is-visible', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function _closeMobileMenu() {
  const sidebar = $('#sidebar');
  const overlay = $('#sidebar-overlay');
  if (!sidebar) return;
  sidebar.classList.remove('is-open');
  if (overlay) overlay.classList.remove('is-visible');
  document.body.style.overflow = '';
}
