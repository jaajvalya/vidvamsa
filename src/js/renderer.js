/**
 * Vidvamsa — DOM Renderer Utilities
 * src/js/renderer.js
 *
 * Shared HTML-string template helpers used by
 * all section modules. Pure functions that return
 * HTML strings; sections insert them via innerHTML.
 *
 * @module renderer
 */

import { icon, escapeHtml } from './utils.js';

/* ── Section Page-Header Band ───────────────── */

/**
 * Render the blue page-header band common to all inner pages.
 * @param {{ eyebrow: string, title: string, description: string }} opts
 * @returns {string}
 */
export function renderPageHeader({ eyebrow, title, description }) {
  return `
    <div class="page-header-band">
      <div class="page-header-band__inner">
        <div class="page-header-band__eyebrow">${escapeHtml(eyebrow)}</div>
        <h1 class="page-header-band__title">${escapeHtml(title)}</h1>
        <p class="page-header-band__desc">${escapeHtml(description)}</p>
      </div>
    </div>
  `;
}

/* ── Service Card ────────────────────────────── */

/**
 * Render a single service card.
 * @param {Object} service - from SERVICES.items
 * @param {number} index   - used for stagger animation
 * @returns {string}
 */
export function renderServiceCard(service, index = 0) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
  const iconBgStyle  = `background: ${service.color}18; color: ${service.color};`;

  return `
    <article
      class="card animate-slide-up ${staggerClass} ${service.featured ? 'card--featured' : ''}"
      data-service-id="${service.id}"
    >
      <div class="card__icon-wrapper" style="${iconBgStyle}">
        ${icon(service.icon, 24, 'card__icon')}
      </div>
      <h3 class="card__title">${escapeHtml(service.title)}</h3>
      <p class="card__text">${escapeHtml(service.short)}</p>
      <ul class="card__list" aria-label="Key capabilities">
        ${service.highlights.map((h) => `<li class="card__list-item">${escapeHtml(h)}</li>`).join('')}
      </ul>
    </article>
  `;
}

/* ── Discipline Card ─────────────────────────── */

/**
 * Render a team discipline card.
 * @param {Object} discipline - from TEAM.disciplines
 * @param {number} index
 * @returns {string}
 */
export function renderDisciplineCard(discipline, index = 0) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
  const iconBgStyle  = `background: ${discipline.color}18; color: ${discipline.color};`;

  return `
    <article class="card animate-slide-up ${staggerClass}">
      <div class="card__icon-wrapper" style="${iconBgStyle}">
        ${icon(discipline.icon, 24, 'card__icon')}
      </div>
      <div class="card__eyebrow">${escapeHtml(discipline.tagline)}</div>
      <h3 class="card__title">${escapeHtml(discipline.title)}</h3>
      <p class="card__text">${escapeHtml(discipline.description)}</p>
      <ul class="card__list" aria-label="Skills">
        ${discipline.skills.map((s) => `<li class="card__list-item">${escapeHtml(s)}</li>`).join('')}
      </ul>
      <div class="tool-pills" aria-label="Tools">
        ${discipline.tools.map((t) => `<span class="tool-pill">${escapeHtml(t)}</span>`).join('')}
      </div>
    </article>
  `;
}

/* ── Value Card ──────────────────────────────── */

/**
 * Render a company value card.
 * @param {{ icon: string, title: string, text: string }} value
 * @param {number} index
 * @returns {string}
 */
export function renderValueCard(value, index = 0) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;

  return `
    <div class="card card--flat animate-slide-up ${staggerClass}">
      <div class="card__icon-wrapper" style="background: rgba(0,119,204,0.08); color: var(--color-secondary);">
        ${icon(value.icon, 22, 'card__icon')}
      </div>
      <h4 class="card__title" style="font-size: var(--text-base);">${escapeHtml(value.title)}</h4>
      <p class="card__text">${escapeHtml(value.text)}</p>
    </div>
  `;
}

/* ── Process Step ────────────────────────────── */

/**
 * Render a single process step.
 * @param {{ step: number, title: string, description: string }} step
 * @returns {string}
 */
export function renderProcessStep(step) {
  return `
    <div class="process-step">
      <div class="process-step__number">${step.step}</div>
      <div class="process-step__title">${escapeHtml(step.title)}</div>
      <p class="process-step__text">${escapeHtml(step.description)}</p>
    </div>
  `;
}

/* ── FAQ Item ────────────────────────────────── */

/**
 * Render a single FAQ accordion item.
 * @param {{ id: string, question: string, answer: string }} faq
 * @returns {string}
 */
export function renderFAQItem(faq) {
  return `
    <li class="faq-item" data-faq-id="${faq.id}">
      <button
        class="faq-question"
        aria-expanded="false"
        aria-controls="answer-${faq.id}"
      >
        <span>${escapeHtml(faq.question)}</span>
        ${icon('chevron-down', 18, 'faq-chevron')}
      </button>
      <div
        class="faq-answer"
        id="answer-${faq.id}"
        role="region"
        aria-hidden="true"
      >
        ${escapeHtml(faq.answer)}
      </div>
    </li>
  `;
}

/* ── Support Channel ─────────────────────────── */

/**
 * Render a support channel card.
 * @param {{ type: string, label: string, value: string, available: string }} channel
 * @returns {string}
 */
export function renderSupportChannel(channel) {
  const iconName = channel.type === 'email' ? 'mail'
                 : channel.type === 'phone' ? 'phone'
                 : 'slack';

  return `
    <div class="support-channel">
      <div class="support-channel__icon" style="color: var(--color-secondary);">
        ${icon(iconName, 22)}
      </div>
      <div>
        <div class="support-channel__title">${escapeHtml(channel.label)}</div>
        <div class="support-channel__value">${escapeHtml(channel.value)}</div>
        <div class="support-channel__hours">${escapeHtml(channel.available)}</div>
      </div>
    </div>
  `;
}

/* ── Contact Form ────────────────────────────── */

/**
 * Render a form field from a field descriptor.
 * @param {Object} field - from CONTACT.form.fields
 * @returns {string}
 */
export function renderFormField(field) {
  const labelClass = `form__label${field.required ? ' form__label--required' : ''}`;
  let control;

  if (field.type === 'textarea') {
    control = `
      <textarea
        id="${field.id}"
        name="${field.id}"
        class="form__control form__control--textarea"
        placeholder="${escapeHtml(field.placeholder || '')}"
        ${field.required ? 'required' : ''}
        aria-required="${field.required}"
      ></textarea>`;
  } else if (field.type === 'select') {
    const options = (field.options || [])
      .map((opt) => `<option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`)
      .join('');
    control = `
      <div class="form__select-wrapper">
        <select
          id="${field.id}"
          name="${field.id}"
          class="form__control"
          ${field.required ? 'required' : ''}
          aria-required="${field.required}"
        >
          <option value="">Select an option…</option>
          ${options}
        </select>
      </div>`;
  } else {
    control = `
      <input
        type="${field.type}"
        id="${field.id}"
        name="${field.id}"
        class="form__control"
        placeholder="${escapeHtml(field.placeholder || '')}"
        ${field.required ? 'required' : ''}
        aria-required="${field.required}"
        autocomplete="${field.type === 'email' ? 'email' : field.id === 'name' ? 'name' : 'off'}"
      >`;
  }

  return `
    <div class="form__group">
      <label for="${field.id}" class="${labelClass}">${escapeHtml(field.label)}</label>
      ${control}
    </div>
  `;
}

/* ── Stat Item ───────────────────────────────── */

/**
 * Render a single stats-bar item.
 * @param {{ value: string, label: string }} stat
 * @returns {string}
 */
export function renderStat(stat) {
  return `
    <div class="stat-item">
      <span class="stat-item__value">${escapeHtml(stat.value)}</span>
      <span class="stat-item__label">${escapeHtml(stat.label)}</span>
    </div>
  `;
}

/* ── Footer ──────────────────────────────────── */

/**
 * Render the site footer HTML.
 * @param {{ name: string, email: string, linkedin: string, twitter: string, github: string }} opts
 * @param {number} year
 * @returns {string}
 */
export function renderFooter(opts, year) {
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="site-footer__inner">
        <p class="site-footer__copy">
          &copy; ${year} ${escapeHtml(opts.name)} &mdash; All rights reserved.<br>
          ${escapeHtml(opts.address)}
        </p>
        <nav class="site-footer__links" aria-label="Footer links">
          <a class="site-footer__link" href="mailto:${opts.email}">${escapeHtml(opts.email)}</a>
          <a class="site-footer__link" href="${opts.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
          <a class="site-footer__link" href="${opts.github}"   target="_blank" rel="noopener">GitHub</a>
        </nav>
      </div>
    </footer>
  `;
}
