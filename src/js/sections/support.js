/**
 * Vidvamsa — Support Section
 * src/js/sections/support.js
 *
 * @module sections/support
 */

import { CONTACT, SITE }                       from '../config.js';
import { renderFAQItem, renderSupportChannel, renderFooter } from '../renderer.js';
import { $, $$ }                               from '../utils.js';

/* ── Public ──────────────────────────────────── */

export function mountSupport() {
  const el = document.getElementById('section-support');
  if (!el) return;
  el.innerHTML = _buildSupport();
  _bindFAQ(el);
}

/* ── Private ─────────────────────────────────── */

function _buildSupport() {
  const { support, faq } = CONTACT;

  return `
    <!-- Page Header -->
    <div class="page-header-band">
      <div class="page-header-band__inner">
        <div class="page-header-band__eyebrow">We're Here to Help</div>
        <h1 class="page-header-band__title">Support</h1>
        <p class="page-header-band__desc">
          Expert support with SLA-backed response times across multiple channels.
        </p>
      </div>
    </div>

    <!-- Support Channels -->
    <section class="section-container" aria-labelledby="channels-heading">
      <div class="section-header">
        <div class="section-eyebrow">Reach Us</div>
        <h2 id="channels-heading" class="section-title">Support <em>channels</em></h2>
        <p class="section-lead">Choose the channel that works best for you.</p>
      </div>
      <div class="grid-3">
        ${support.channels.map(renderSupportChannel).join('')}
      </div>
    </section>

    <!-- SLA Table -->
    <section
      style="background:var(--color-surface); border-top:1px solid var(--color-border); border-bottom:1px solid var(--color-border);"
      aria-labelledby="sla-heading"
    >
      <div class="section-container">
        <div class="section-header section-header--centered">
          <div class="section-eyebrow">Response Times</div>
          <h2 id="sla-heading" class="section-title">Our <em>SLA commitments</em></h2>
        </div>
        <div class="grid-4">
          ${_slaCard('Critical', support.sla.critical, '#C62828', 'Production outage or data loss.')}
          ${_slaCard('High',     support.sla.high,     '#E65100', 'Major feature unavailable.')}
          ${_slaCard('Medium',   support.sla.medium,   '#0077CC', 'Degraded performance or workaround available.')}
          ${_slaCard('Low',      support.sla.low,      '#2E7D32', 'Minor issue or enhancement request.')}
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-container" aria-labelledby="faq-heading">
      <div class="section-header">
        <div class="section-eyebrow">Common Questions</div>
        <h2 id="faq-heading" class="section-title">
          Frequently asked <em>questions</em>
        </h2>
        <p class="section-lead">
          Can't find what you're looking for?
          <a href="#contact" style="color:var(--color-secondary);">Contact us</a> directly.
        </p>
      </div>
      <ul class="faq-list" aria-label="Frequently asked questions">
        ${faq.map(renderFAQItem).join('')}
      </ul>
    </section>

    ${renderFooter(SITE.contact, new Date().getFullYear())}
  `;
}

function _slaCard(level, time, color, description) {
  return `
    <div class="card" style="border-top: 3px solid ${color};">
      <div style="margin-bottom:var(--space-3);">
        <span class="badge" style="background:${color}18;color:${color};border-color:${color}38;">${level}</span>
      </div>
      <div style="font-size:var(--text-2xl);font-weight:var(--font-bold);color:${color};margin-bottom:var(--space-2);">${time}</div>
      <p class="card__text" style="margin:0;font-size:var(--text-sm);">${description}</p>
    </div>
  `;
}

/* ── FAQ Accordion ───────────────────────────── */

/**
 * Bind click events for the FAQ accordion.
 * @param {Element} root
 */
function _bindFAQ(root) {
  const faqList = root.querySelector('.faq-list');
  if (!faqList) return;

  faqList.addEventListener('click', (e) => {
    const btn  = e.target.closest('.faq-question');
    if (!btn) return;

    const item     = btn.closest('.faq-item');
    const answer   = item.querySelector('.faq-answer');
    const isOpen   = item.classList.contains('is-open');

    // Close all other items
    $$('.faq-item', root).forEach((i) => {
      i.classList.remove('is-open');
      const q = i.querySelector('.faq-question');
      const a = i.querySelector('.faq-answer');
      if (q) q.setAttribute('aria-expanded', 'false');
      if (a) a.setAttribute('aria-hidden', 'true');
    });

    // Toggle current
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      if (answer) answer.setAttribute('aria-hidden', 'false');
    }
  });
}
