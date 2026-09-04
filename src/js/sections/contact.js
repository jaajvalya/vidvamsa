/**
 * Vidvamsa — Contact Section
 * src/js/sections/contact.js
 *
 * Renders the contact form (client-side validation + simulated submission).
 * When FastAPI is live, the form posts to CONTACT.form.apiEndpoint.
 *
 * @module sections/contact
 */

import { CONTACT, SITE }            from '../config.js';
import { renderFormField, renderFooter } from '../renderer.js';
import { icon, $, escapeHtml }      from '../utils.js';

/* ── Public ──────────────────────────────────── */

export function mountContact() {
  const el = document.getElementById('section-contact');
  if (!el) return;
  el.innerHTML = _buildContact();
  _bindForm(el);
}

/* ── Private ─────────────────────────────────── */

function _buildContact() {
  const { form } = CONTACT;
  const { company, contact } = SITE;

  return `
    <!-- Page Header -->
    <div class="page-header-band">
      <div class="page-header-band__inner">
        <div class="page-header-band__eyebrow">Let's Talk</div>
        <h1 class="page-header-band__title">Contact Us</h1>
        <p class="page-header-band__desc">
          Tell us about your project. We'll respond within one business day.
        </p>
      </div>
    </div>

    <!-- Contact Layout -->
    <section class="section-container" aria-labelledby="contact-form-heading">
      <div style="display:grid; grid-template-columns: 1fr 380px; gap: var(--space-12); align-items:start;">

        <!-- Form -->
        <div>
          <h2 id="contact-form-heading" class="section-title" style="margin-bottom:var(--space-8);">
            Send us a <em>message</em>
          </h2>
          <form
            id="contact-form"
            class="form"
            novalidate
            aria-label="Contact form"
            data-api="${escapeHtml(form.apiEndpoint)}"
          >
            <!-- Row: name + email -->
            <div class="grid-2">
              ${renderFormField(form.fields.find((f) => f.id === 'name'))}
              ${renderFormField(form.fields.find((f) => f.id === 'email'))}
            </div>
            <!-- Row: company + service -->
            <div class="grid-2">
              ${renderFormField(form.fields.find((f) => f.id === 'company'))}
              ${renderFormField(form.fields.find((f) => f.id === 'service'))}
            </div>
            <!-- Message -->
            ${renderFormField(form.fields.find((f) => f.id === 'message'))}

            <!-- Status region (filled by JS) -->
            <div id="form-status" role="alert" aria-live="polite"></div>

            <button type="submit" class="btn btn--primary btn--lg" id="form-submit">
              ${icon('arrow-right', 16, 'btn__icon')}
              ${form.submitLabel}
            </button>
          </form>
        </div>

        <!-- Info panel -->
        <aside aria-label="Contact information">
          <div class="card" style="margin-bottom:var(--space-5);">
            <h3 class="card__title" style="font-size:var(--text-lg); margin-bottom:var(--space-5);">
              Get in touch
            </h3>
            ${_infoItem('mail',  contact.email,   `mailto:${contact.email}`)}
            ${_infoItem('phone', contact.phone,   `tel:${contact.phone.replace(/[^+\d]/g,'')}`)}
            ${_infoItem('layers', contact.address, null)}
          </div>

          <div class="card">
            <h3 class="card__title" style="font-size:var(--text-lg); margin-bottom:var(--space-5);">
              Connect with us
            </h3>
            ${_socialItem('linkedin',   'LinkedIn', contact.linkedin)}
            ${_socialItem('x',          'Twitter',  contact.twitter)}
            ${_socialItem('arrow-right','GitHub',   contact.github)}
          </div>
        </aside>
      </div>
    </section>

    ${renderFooter(contact, new Date().getFullYear())}
  `;
}

function _infoItem(iconName, text, href) {
  const inner = href
    ? `<a href="${href}" style="color:var(--color-secondary);">${escapeHtml(text)}</a>`
    : `<span style="color:var(--color-text-medium);">${escapeHtml(text)}</span>`;

  return `
    <div style="display:flex;align-items:center;gap:var(--space-3);margin-bottom:var(--space-4);">
      <div style="width:36px;height:36px;border-radius:var(--radius-md);background:rgba(0,119,204,0.08);color:var(--color-secondary);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        ${icon(iconName, 18)}
      </div>
      <div style="font-size:var(--text-sm);">${inner}</div>
    </div>
  `;
}

function _socialItem(iconName, label, href) {
  return `
    <a href="${href}" target="_blank" rel="noopener"
       style="display:flex;align-items:center;gap:var(--space-3);padding:var(--space-3) 0;color:var(--color-text-medium);text-decoration:none;font-size:var(--text-sm);border-bottom:1px solid var(--color-border);"
       class="site-footer__link"
    >
      ${icon(iconName, 16)}
      ${escapeHtml(label)}
      ${icon('arrow-right', 14)}
    </a>
  `;
}

/* ── Form Handling ───────────────────────────── */

/**
 * Bind submit event and client-side validation.
 * @param {Element} root
 */
function _bindForm(root) {
  const form      = root.querySelector('#contact-form');
  const statusEl  = root.querySelector('#form-status');
  const submitBtn = root.querySelector('#form-submit');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!_validateForm(form, statusEl)) return;

    // Loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
      Sending…
    `;

    try {
      await _submitForm(form);
      _showSuccess(statusEl);
      form.reset();
    } catch (err) {
      _showError(statusEl, err.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `${icon('arrow-right', 16, 'btn__icon')} ${CONTACT.form.submitLabel}`;
    }
  });
}

/**
 * Client-side validation; returns true if valid.
 * @param {HTMLFormElement} form
 * @param {Element} statusEl
 * @returns {boolean}
 */
function _validateForm(form, statusEl) {
  const required = Array.from(form.querySelectorAll('[required]'));
  let firstInvalid = null;

  required.forEach((field) => {
    const group = field.closest('.form__group');
    const isValid = field.value.trim() !== '';
    field.classList.toggle('is-error', !isValid);
    if (group) {
      const existing = group.querySelector('.field-error');
      if (!isValid && !existing) {
        const err = document.createElement('span');
        err.className = 'field-error';
        err.style.cssText = 'color:var(--color-error);font-size:var(--text-xs);margin-top:4px;';
        err.textContent = 'This field is required.';
        group.appendChild(err);
      } else if (isValid && existing) {
        existing.remove();
      }
    }
    if (!isValid && !firstInvalid) firstInvalid = field;
  });

  // Email validation
  const emailField = form.querySelector('#email');
  if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
    emailField.classList.add('is-error');
    const group = emailField.closest('.form__group');
    if (group && !group.querySelector('.field-error')) {
      const err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'color:var(--color-error);font-size:var(--text-xs);margin-top:4px;';
      err.textContent = 'Please enter a valid email address.';
      group.appendChild(err);
    }
    if (!firstInvalid) firstInvalid = emailField;
  }

  if (firstInvalid) {
    firstInvalid.focus();
    _showError(statusEl, 'Please fill in all required fields.');
    return false;
  }

  statusEl.innerHTML = '';
  return true;
}

/**
 * Submit the form. If FastAPI is not yet live, simulates submission.
 * @param {HTMLFormElement} form
 */
async function _submitForm(form) {
  const endpoint = form.dataset.api;
  const payload  = Object.fromEntries(new FormData(form));

  // If dynamic config is disabled, simulate (static site mode)
  if (!SITE.future.enableDynamicConfig) {
    await new Promise((res) => setTimeout(res, 1200)); // simulate network
    console.info('[Vidvamsa] Contact form payload (simulation):', payload);
    return;
  }

  // Live FastAPI submission
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.detail || `Server error ${res.status}`);
  }
}

function _showSuccess(el) {
  el.innerHTML = `
    <div class="alert alert--success" role="status">
      ${icon('check-circle', 18)}
      <span>${CONTACT.form.successMessage}</span>
    </div>
  `;
}

function _showError(el, msg) {
  el.innerHTML = `
    <div class="alert alert--error">
      <span>${escapeHtml(msg)}</span>
    </div>
  `;
}
