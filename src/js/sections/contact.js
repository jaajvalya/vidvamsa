/**
 * Contact Section
 * src/js/sections/contact.js
 */
import { escapeHtml } from '../utils.js';
import { SITE } from '../config.js';

const ARROW = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/></svg>`;

export function mountContact(el) {
  el.innerHTML = `
    ${pageHero()}
    ${mainGrid()}
    ${nextSteps()}
  `;
  initForm(el);
}

function pageHero() {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="section-eyebrow section-eyebrow--on-dark">Let's talk</span>
        <h1 class="page-hero__title">Get in touch</h1>
        <p class="page-hero__lead">
          Tell us about your project and we'll respond with a tailored approach
          document within 48 hours.
        </p>
      </div>
    </section>`;
}

function mainGrid() {
  const c = SITE.contact || {};
  return `
    <div style="border-top:1px solid var(--color-border);">
      <div style="max-width:var(--content-max-width);margin:0 auto;
                  display:grid;grid-template-columns:1fr 360px;">
        <!-- Form -->
        <div style="padding:var(--space-16) var(--content-padding);border-right:1px solid var(--color-border);">
          <div class="section-header" style="margin-bottom:var(--space-8);">
            <span class="section-eyebrow">Send a message</span>
            <h2 class="section-title">Start the conversation</h2>
          </div>
          <div id="form-alert" role="alert" aria-live="polite" style="margin-bottom:var(--space-6);"></div>
          <form id="contact-form" novalidate aria-label="Contact form">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0 var(--space-6);">
              ${field('f-name',    'Full name',  'text',     true,  'Ada Lovelace')}
              ${field('f-email',   'Work email', 'email',    true,  'ada@company.com')}
            </div>
            ${field('f-company', 'Company',    'text',     false, 'Acme Technologies')}
            <div class="form-group">
              <label class="form-label" for="f-service">Service area</label>
              <select class="form-select" id="f-service" name="service">
                <option value="">Select a service area</option>
                <option value="consulting">Technology Consulting</option>
                <option value="ai">AI / ML Platform</option>
                <option value="cloud">Cloud Architecture</option>
                <option value="engineering">Software Engineering</option>
                <option value="data">Data Engineering</option>
                <option value="transformation">Digital Transformation</option>
                <option value="support">Support &amp; Managed Services</option>
                <option value="other">Other</option>
              </select>
            </div>
            ${field('f-message', 'Message',    'textarea', true,  'Describe your project or question…')}
            <div style="display:flex;align-items:center;gap:var(--space-4);flex-wrap:wrap;margin-top:var(--space-6);">
              <button type="submit" class="btn btn--primary btn--lg" id="submit-btn">
                Send message ${ARROW}
              </button>
              <span id="form-status" style="font-size:var(--text-sm);color:var(--color-text-secondary);"></span>
            </div>
            <p style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-top:var(--space-4);">
              We'll respond within 48 hours on business days. No spam, ever.
            </p>
          </form>
        </div>
        <!-- Info sidebar -->
        <div style="padding:var(--space-12) var(--space-8);background:var(--color-gray-10);">
          <h3 style="font-size:var(--text-base);font-weight:var(--font-semi);margin-bottom:var(--space-8);">Contact details</h3>
          ${contactDetails(c)}
          <div style="border-top:1px solid var(--color-border);padding-top:var(--space-6);margin-top:var(--space-6);">
            <h3 style="font-size:var(--text-base);font-weight:var(--font-semi);margin-bottom:var(--space-4);">Follow us</h3>
            <div style="display:flex;flex-direction:column;gap:var(--space-3);">
              ${c.linkedin ? socialLink('LinkedIn', c.linkedin) : ''}
              ${c.twitter  ? socialLink('Twitter',  c.twitter)  : ''}
              ${c.github   ? socialLink('GitHub',   c.github)   : ''}
            </div>
          </div>
        </div>
      </div>
    </div>`;
}

function nextSteps() {
  const steps = [
    { n:'01', t:'We review',        b:'A team member reads every enquiry within one business day.' },
    { n:'02', t:'Discovery call',   b:'30-minute call to clarify your goals, constraints, and timeline.' },
    { n:'03', t:'Approach doc',     b:'A tailored proposal with scope, delivery model, and phasing.' },
    { n:'04', t:'Project kick-off', b:'Once aligned, we start within a week with a structured onboarding.' },
  ];
  return `
    <div class="section-band section-band--subtle">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">What to expect</span>
          <h2 class="section-title">After you reach out</h2>
        </div>
        <div class="steps" style="grid-template-columns:repeat(4,1fr);">
          ${steps.map(s => `
            <div class="step">
              <span class="step__num">${s.n}</span>
              <div class="step__title">${escapeHtml(s.t)}</div>
              <p class="step__body">${escapeHtml(s.b)}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── Helpers ──────────────────────────────── */

function field(id, label, type, required, placeholder) {
  const isArea = type === 'textarea';
  const req    = required ? '<span aria-hidden="true" style="color:var(--color-error)"> *</span>' : '';
  const ac     = { 'f-name':'name', 'f-email':'email', 'f-company':'organization' }[id] || 'off';
  const input  = isArea
    ? `<textarea class="form-textarea" id="${id}" name="${id}" rows="5"
         placeholder="${escapeHtml(placeholder)}" ${required ? 'required' : ''}></textarea>`
    : `<input class="form-input" type="${type}" id="${id}" name="${id}"
         placeholder="${escapeHtml(placeholder)}" autocomplete="${ac}"
         ${required ? 'required' : ''}>`;
  return `
    <div class="form-group">
      <label class="form-label" for="${id}">${escapeHtml(label)}${req}</label>
      ${input}
      <span class="form-error" id="${id}-err" hidden></span>
      ${isArea ? '<span class="form-helper">Min 10 characters.</span>' : ''}
    </div>`;
}

function contactDetails(c) {
  return [
    { lbl:'Email',   val:c.email,   href:`mailto:${c.email}` },
    { lbl:'Phone',   val:c.phone,   href:`tel:${c.phone}`    },
    { lbl:'Address', val:c.address, href:null                },
    { lbl:'Hours',   val:'Mon–Fri, 9 AM – 6 PM IST', href:null },
  ].filter(r => r.val).map(r => `
    <div style="margin-bottom:var(--space-5);">
      <div style="font-size:var(--text-xs);font-weight:var(--font-semi);text-transform:uppercase;
                  letter-spacing:0.08em;color:var(--color-gray-50);margin-bottom:var(--space-1);">
        ${escapeHtml(r.lbl)}
      </div>
      ${r.href
        ? `<a href="${escapeHtml(r.href)}" class="inline-link" style="font-size:var(--text-sm);">${escapeHtml(r.val)}</a>`
        : `<div style="font-size:var(--text-sm);color:var(--color-text-primary);">${escapeHtml(r.val)}</div>`}
    </div>`).join('');
}

function socialLink(name, url) {
  return `
    <a href="${escapeHtml(url)}" class="inline-link" target="_blank" rel="noopener noreferrer"
       style="font-size:var(--text-sm);">
      ${escapeHtml(name)}
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>`;
}

/* ── Form validation & submit ─────────────── */

function initForm(el) {
  const form      = el.querySelector('#contact-form');
  if (!form) return;
  const alertEl   = el.querySelector('#form-alert');
  const statusEl  = el.querySelector('#form-status');
  const submitBtn = el.querySelector('#submit-btn');

  const setErr = (id, msg) => {
    el.querySelector(`#${id}`)?.classList.add('form-input--error');
    const e = el.querySelector(`#${id}-err`);
    if (e) { e.hidden = false; e.textContent = msg; }
  };

  const clearErr = id => {
    el.querySelector(`#${id}`)?.classList.remove('form-input--error');
    const e = el.querySelector(`#${id}-err`);
    if (e) { e.hidden = true; e.textContent = ''; }
  };

  const validate = () => {
    ['f-name','f-email','f-message'].forEach(clearErr);
    let ok = true;
    const name  = el.querySelector('#f-name')?.value.trim();
    const email = el.querySelector('#f-email')?.value.trim();
    const msg   = el.querySelector('#f-message')?.value.trim();
    if (!name)  { setErr('f-name',    'Full name is required'); ok = false; }
    if (!email) { setErr('f-email',   'Work email is required'); ok = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                { setErr('f-email',   'Please enter a valid email address'); ok = false; }
    if (!msg || msg.length < 10)
                { setErr('f-message', 'Please enter at least 10 characters'); ok = false; }
    return ok;
  };

  form.addEventListener('submit', async e => {
    e.preventDefault();
    alertEl.innerHTML = '';
    if (!validate()) return;

    submitBtn.disabled = true;
    if (statusEl) statusEl.textContent = 'Sending…';

    await new Promise(r => setTimeout(r, 1000)); // Phase 2: fetch('/api/v1/contact', {...})

    submitBtn.disabled = false;
    if (statusEl) statusEl.textContent = '';
    submitBtn.innerHTML = `Send message ${ARROW}`;

    alertEl.innerHTML = `
      <div class="alert alert--success" role="status">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <div>
          <strong>Message sent!</strong><br>
          Thanks for reaching out. We'll reply within 48 hours on business days.
        </div>
      </div>`;
    form.reset();
    alertEl.scrollIntoView({ behavior:'smooth', block:'nearest' });
  });
}
