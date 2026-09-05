/**
 * Vidvamsa — Navigation Module
 * IBM.com-style sticky top navigation bar
 * src/js/navigation.js
 */

import { SITE }                          from './config.js';
import { $, $$, icon, getActiveSection, setHash } from './utils.js';

/* ── Public API ──────────────────────────────── */

export function initNavigation() {
  _renderTopbar();
  _renderMobileNav();
  _activateSection(getActiveSection());
  _bindEvents();
}

export function navigateTo(sectionId) {
  _activateSection(sectionId);
  setHash(sectionId);
}

/* ── Render Topbar ───────────────────────────── */

function _renderTopbar() {
  const topbar = $('#topbar');
  if (!topbar) return;

  topbar.innerHTML = /* html */`
    <div class="topbar__inner">

      <!-- Brand — VIDVAMSA logo image -->
      <div class="topbar__brand">
        <a href="#home" class="topbar__logo" aria-label="${SITE.company.name} — go to home">
          <img
            src="assets/logo.png"
            alt="${SITE.company.name} logo"
            class="topbar__logo-img"
            width="160"
            height="40"
          />
        </a>
      </div>

      <!-- Primary nav links (desktop) -->
      <nav class="topbar__nav" aria-label="Primary navigation">
        <ul class="topbar__nav-list" role="list">
          ${SITE.navigation.map(_renderTopbarLink).join('')}
        </ul>
      </nav>

      <!-- Right-side actions -->
      <div class="topbar__actions">
        <a href="#contact" class="btn btn--primary" data-section="contact">
          Get in touch
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>

        <!-- Hamburger (mobile) -->
        <button id="menu-toggle"
                class="topbar__menu-btn"
                aria-label="Toggle navigation menu"
                aria-expanded="false"
                aria-controls="mobile-nav">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round"
               stroke-linejoin="round" aria-hidden="true">
            <line x1="3" y1="6"  x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>

    </div>
  `;
}

function _renderTopbarLink({ id, label }) {
  return /* html */`
    <li class="topbar__nav-item">
      <a href="#${id}"
         class="topbar__nav-link"
         data-section="${id}"
         aria-current="false"
         aria-label="${label}">
        ${label}
      </a>
    </li>
  `;
}

/* ── Render Mobile Nav ───────────────────────── */

function _renderMobileNav() {
  const nav = $('#mobile-nav');
  if (!nav) return;

  nav.innerHTML = /* html */`
    <!-- Mobile nav header with logo -->
    <div style="padding: var(--space-4) var(--space-6); border-bottom: 1px solid var(--color-border); display:flex; align-items:center;">
      <img src="assets/logo.png" alt="${SITE.company.name}" style="height:32px; width:auto;">
    </div>
    <ul class="topbar__mobile-list" role="list">
      ${SITE.navigation.map(({ id, label, icon: iconName }) => /* html */`
        <li>
          <a href="#${id}"
             class="topbar__mobile-link"
             data-section="${id}"
             aria-current="false">
            ${icon(iconName, 16)}
            ${label}
          </a>
        </li>
      `).join('')}
    </ul>
    <div style="padding: var(--space-4) var(--space-6); border-top: 1px solid var(--color-border);">
      <a href="#contact" class="btn btn--primary" data-section="contact" style="width:100%; justify-content:center;">
        Get in touch
      </a>
    </div>
  `;

  // Un-hide after rendering
  nav.removeAttribute('hidden');
}

/* ── Activate Section ────────────────────────── */

function _activateSection(sectionId) {
  const validIds = SITE.navigation.map(n => n.id);
  const target   = validIds.includes(sectionId) ? sectionId : 'home';

  // Desktop nav links
  $$('.topbar__nav-link').forEach(link => {
    const active = link.dataset.section === target;
    link.classList.toggle('is-active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
  });

  // Mobile nav links
  $$('.topbar__mobile-link').forEach(link => {
    const active = link.dataset.section === target;
    link.classList.toggle('is-active', active);
    link.setAttribute('aria-current', active ? 'page' : 'false');
  });

  // Page sections
  $$('.page-section').forEach(section => {
    const active = section.dataset.section === target;
    section.classList.toggle('is-active', active);
  });

  // Document title
  const navItem = SITE.navigation.find(n => n.id === target);
  if (navItem) {
    document.title = `${navItem.label} — ${SITE.meta.title}`;
  }

  _closeMobileMenu();
}

/* ── Events ──────────────────────────────────── */

function _bindEvents() {
  // Topbar nav clicks
  document.body.addEventListener('click', e => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const id = anchor.getAttribute('href').slice(1);
    const validIds = SITE.navigation.map(n => n.id);
    if (validIds.includes(id)) {
      e.preventDefault();
      navigateTo(id);
    }
  });

  // Hash changes (browser back/fwd)
  window.addEventListener('hashchange', () => {
    _activateSection(getActiveSection());
  });

  // Mobile menu toggle
  document.addEventListener('click', e => {
    const btn = e.target.closest('#menu-toggle');
    if (btn) _toggleMobileMenu();
  });

  // Escape key closes mobile menu
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') _closeMobileMenu();
  });
}

function _toggleMobileMenu() {
  const nav = $('#mobile-nav');
  const btn = $('#menu-toggle');
  if (!nav) return;
  const isOpen = nav.classList.toggle('is-open');
  if (btn) btn.setAttribute('aria-expanded', String(isOpen));
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function _closeMobileMenu() {
  const nav = $('#mobile-nav');
  const btn = $('#menu-toggle');
  if (nav) nav.classList.remove('is-open');
  if (btn) btn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}
