/**
 * Services Section
 * src/js/sections/services.js
 */
import { escapeHtml } from '../utils.js';
import { SERVICES } from '../config.js';

const ARROW = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/></svg>`;

const EMOJIS = {
  cpu:'⚙️', zap:'⚡', cloud:'☁️', code:'💻',
  database:'🗄️', 'refresh-cw':'🔄', shield:'🛡️', layers:'🗂️',
};

export function mountServices(el) {
  el.innerHTML = `
    ${pageHero()}
    ${serviceGrid()}
    ${aiSpotlight()}
    ${processSteps()}
    ${ctaBand()}
  `;
}

function pageHero() {
  return `
    <section class="page-hero">
      <div class="page-hero__inner">
        <span class="section-eyebrow section-eyebrow--on-dark">What we offer</span>
        <h1 class="page-hero__title">Services &amp; capabilities</h1>
        <p class="page-hero__lead">
          From strategic architecture to production engineering — complete, API-ready
          solutions built for longevity and your AI future.
        </p>
      </div>
    </section>`;
}

function serviceGrid() {
  const items = SERVICES.items || [];
  return `
    <div class="section-band section-band--white">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">Core services</span>
          <h2 class="section-title">Everything you need to build</h2>
        </div>
        <div class="tile-grid tile-grid--4col">
          ${items.map(s => `
            <article class="tile" id="svc-${escapeHtml(s.id)}">
              <div class="tile__icon" aria-hidden="true">${EMOJIS[s.icon] || '◆'}</div>
              <div class="tile__title">${escapeHtml(s.title)}</div>
              <p class="tile__body">${escapeHtml(s.short || s.description)}</p>
              ${(s.highlights || []).length ? `
                <ul style="list-style:none;padding:0;margin:var(--space-3) 0 0;flex:1;">
                  ${s.highlights.slice(0, 3).map(h => `
                    <li style="display:flex;align-items:flex-start;gap:var(--space-2);
                               font-size:var(--text-xs);color:var(--color-text-secondary);
                               padding:var(--space-2) 0;border-bottom:1px solid var(--color-border);">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                           stroke="var(--color-blue-60)" stroke-width="2.5"
                           stroke-linecap="round" stroke-linejoin="round"
                           aria-hidden="true" style="margin-top:1px;flex-shrink:0;">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      ${escapeHtml(h)}
                    </li>`).join('')}
                </ul>` : ''}
              <a href="#contact" class="tile__link" data-section="contact"
                 aria-label="Enquire about ${escapeHtml(s.title)}">
                Enquire now ${ARROW}
              </a>
            </article>`).join('')}
          <div class="tile tile--dark">
            <div class="tile__tag">Phase 2</div>
            <div class="tile__icon" aria-hidden="true">🤖</div>
            <div class="tile__title">AI Platform &amp; FastAPI</div>
            <p class="tile__body">Production AI inference, agent workflows, and RESTful APIs — built on your Phase 1 foundation with zero replatforming.</p>
            <a href="#contact" class="tile__link" data-section="contact">
              Enquire about Phase 2 ${ARROW}
            </a>
          </div>
        </div>
      </div>
    </div>`;
}

function aiSpotlight() {
  return `
    <div class="feature-row feature-row--dark" style="border-top:1px solid var(--color-dark-border);">
      <div class="feature-row__content">
        <span class="section-eyebrow section-eyebrow--on-dark">Phase 2 — coming next</span>
        <h2 class="feature-row__title">AI Platform &amp; FastAPI integration</h2>
        <p class="feature-row__body">
          Our Phase 2 roadmap delivers a production-ready AI inference platform,
          agent orchestration, and RESTful FastAPI services — all built on the
          foundation we create today. No replatforming required.
        </p>
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;margin-top:var(--space-2);">
          <a href="#contact" class="btn btn--primary" data-section="contact">
            Register interest ${ARROW}
          </a>
          <a href="#support" class="btn btn--ghost" data-section="support"
             style="color:var(--color-blue-40);border:1px solid var(--color-dark-border);">
            Learn more
          </a>
        </div>
      </div>
      <div class="feature-row__visual" aria-hidden="true">🤖</div>
    </div>`;
}

function processSteps() {
  const steps = [
    { n:'01', t:'Discovery',    b:'Structured workshops to learn your context, constraints, and goals.' },
    { n:'02', t:'Architecture', b:'Blueprint with clear extension points and documented decisions.' },
    { n:'03', t:'Design',       b:'Validated prototypes and a component library before code is written.' },
    { n:'04', t:'Engineering',  b:'Modular, config-driven code — tested and API-ready from day one.' },
    { n:'05', t:'Handover',     b:'Full documentation, runbooks, and a knowledge-transfer session.' },
    { n:'06', t:'Support',      b:'SLA-backed support and a clear path to Phase 2 AI integration.' },
  ];
  return `
    <div class="section-band section-band--subtle">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">How we work</span>
          <h2 class="section-title">Our delivery process</h2>
          <p class="section-lead">A repeatable, transparent process that keeps you in control at every stage.</p>
        </div>
        <div class="steps" style="grid-template-columns:repeat(3,1fr);">
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

function ctaBand() {
  return `
    <div class="section-band section-band--blue">
      <div class="section-band__inner cta-row">
        <div class="cta-row__text">
          <h2>Have a project in mind?</h2>
          <p>Talk to our team and receive a tailored approach document within 48 hours.</p>
        </div>
        <a href="#contact" class="btn btn--inverse btn--lg" data-section="contact">
          Get in touch ${ARROW}
        </a>
      </div>
    </div>`;
}
