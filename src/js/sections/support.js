/**
 * Support Section
 * src/js/sections/support.js
 */
import { escapeHtml } from '../utils.js';
import { CONTACT } from '../config.js';

const ARROW = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/></svg>`;

const CHANNEL_EMOJIS = { email:'📧', slack:'💬', phone:'📞', portal:'🌐', chat:'💬', video:'🎥' };

export function mountSupport(el) {
  el.innerHTML = `
    ${pageHero()}
    ${channelGrid()}
    ${statusBar()}
    ${slaTable()}
    ${faqSection()}
    ${ctaBand()}
  `;
  initAccordion(el);
}

function pageHero() {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="section-eyebrow section-eyebrow--on-dark">We're here for you</span>
        <h1 class="page-hero__title">Support &amp; service levels</h1>
        <p class="page-hero__lead">
          Clear response commitments, multiple contact channels, and a transparent
          knowledge base — all backed by a dedicated team.
        </p>
      </div>
    </section>`;
}

function channelGrid() {
  const channels = CONTACT.support?.channels || [];
  return `
    <div class="section-band section-band--white">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">Contact channels</span>
          <h2 class="section-title">How to reach us</h2>
        </div>
        <div class="tile-grid">
          ${channels.map(ch => `
            <div class="tile">
              <div class="tile__icon" aria-hidden="true">${CHANNEL_EMOJIS[ch.type] || '📌'}</div>
              <div class="tile__tag">${escapeHtml(ch.type || 'Channel')}</div>
              <div class="tile__title">${escapeHtml(ch.label || ch.name || '—')}</div>
              <p class="tile__body">${escapeHtml(ch.value || '')}</p>
              ${ch.available ? `<div style="margin-top:auto;padding-top:var(--space-4);border-top:1px solid var(--color-border);">
                <span class="badge badge--success">${escapeHtml(ch.available)}</span>
              </div>` : ''}
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function statusBar() {
  return `
    <div style="background:var(--color-gray-10);border-top:1px solid var(--color-border);
                border-bottom:1px solid var(--color-border);padding:var(--space-5) var(--content-padding);">
      <div style="max-width:var(--content-max-width);margin:0 auto;display:flex;align-items:center;gap:var(--space-4);">
        <div style="width:10px;height:10px;border-radius:50%;background:var(--color-success);flex-shrink:0;" aria-hidden="true"></div>
        <div>
          <span style="font-weight:var(--font-semi);font-size:var(--text-sm);">All systems operational</span>
          <span style="font-size:var(--text-xs);color:var(--color-text-secondary);margin-left:var(--space-4);">
            Last checked just now &nbsp;·&nbsp;
            <a href="#contact" class="inline-link" data-section="contact" style="font-size:var(--text-xs);">
              Subscribe to updates
            </a>
          </span>
        </div>
      </div>
    </div>`;
}

function slaTable() {
  const rows = normaliseSLA(CONTACT.support?.sla);
  return `
    <div class="section-band section-band--white">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">Service levels</span>
          <h2 class="section-title">Response commitments</h2>
          <p class="section-lead">Structured SLAs applied to every request — so you always know what to expect.</p>
        </div>
        <div style="border:1px solid var(--color-border);overflow-x:auto;">
          <table class="data-table" aria-label="Service level agreement">
            <thead>
              <tr>
                <th scope="col">Priority</th>
                <th scope="col">Definition</th>
                <th scope="col">First response</th>
                <th scope="col">Resolution target</th>
              </tr>
            </thead>
            <tbody>
              ${rows.map(r => `
                <tr>
                  <td><span class="badge ${
                    r.priority === 'Critical' ? 'badge--error' :
                    r.priority === 'High'     ? 'badge--warning' : 'badge--blue'
                  }">${escapeHtml(r.priority)}</span></td>
                  <td>${escapeHtml(r.definition)}</td>
                  <td style="font-weight:var(--font-semi);white-space:nowrap;">${escapeHtml(r.first_response)}</td>
                  <td>${escapeHtml(r.resolution)}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>`;
}

function faqSection() {
  const faqs = CONTACT.faq || [];
  return `
    <div class="section-band section-band--subtle">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">Knowledge base</span>
          <h2 class="section-title">Frequently asked questions</h2>
        </div>
        <div style="max-width:720px;">
          <div class="accordion" role="list" aria-label="FAQ">
            ${faqs.map((faq, i) => `
              <div class="accordion-item" role="listitem">
                <button class="accordion-trigger"
                        id="faq-${i}-btn"
                        aria-expanded="false"
                        aria-controls="faq-${i}-body">
                  ${escapeHtml(faq.question)}
                  <svg class="accordion-icon" viewBox="0 0 24 24" fill="none"
                       stroke="currentColor" stroke-width="2"
                       stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div class="accordion-body" id="faq-${i}-body" role="region" aria-labelledby="faq-${i}-btn">
                  <div class="accordion-content">${escapeHtml(faq.answer)}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

function ctaBand() {
  return `
    <div class="section-band section-band--dark">
      <div class="section-band__inner cta-row">
        <div class="cta-row__text">
          <h2>Didn't find your answer?</h2>
          <p>Our team typically replies within one business hour.</p>
        </div>
        <a href="#contact" class="btn btn--primary btn--lg" data-section="contact">
          Contact us ${ARROW}
        </a>
      </div>
    </div>`;
}

/* ── SLA normaliser ──────────────────────── */
function normaliseSLA(sla) {
  const defaults = [
    { priority:'Critical', definition:'Production down, all users blocked',        first_response:'2 hours',  resolution:'ASAP' },
    { priority:'High',     definition:'Major feature broken, many users affected',  first_response:'8 hours',  resolution:'Same day' },
    { priority:'Medium',   definition:'Partial degradation, workaround available',  first_response:'24 hours', resolution:'Next business day' },
    { priority:'Low',      definition:'Minor issue or general enquiry',             first_response:'72 hours', resolution:'3 business days' },
  ];
  if (Array.isArray(sla)) return sla;
  if (!sla) return defaults;
  return defaults.map((d, i) => ({
    ...d,
    first_response: [sla.critical, sla.high, sla.medium, sla.low][i] || d.first_response,
  }));
}

/* ── Accordion ───────────────────────────── */
function initAccordion(el) {
  el.querySelectorAll('.accordion-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      const item   = btn.closest('.accordion-item');
      const isOpen = item.classList.contains('is-open');
      el.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('is-open');
        i.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
