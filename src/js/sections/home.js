/**
 * Home Section
 * src/js/sections/home.js
 */
import { icon, escapeHtml } from '../utils.js';
import { SITE, SERVICES, TEAM } from '../config.js';

const ARROW = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
  aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/>
  <polyline points="12 5 19 12 12 19"/></svg>`;

export function mountHome(el) {
  el.innerHTML = buildHome();
}

function buildHome() {
  const featured    = (SERVICES.items || []).filter(s => s.featured).slice(0, 3);
  const disciplines = TEAM.disciplines || [];

  return `
    ${hero()}
    ${statsBar()}
    ${featuredServices(featured)}
    ${disciplinesBand(disciplines)}
    ${featureRow(
      'Why Vidvamsa',
      'Built for enterprise. Sized for speed.',
      'We combine the rigour of large-system thinking with the agility of a focused team. Every project is config-driven, API-ready, and designed to grow with your ambitions — no lock-in, no black-box delivery.',
      '🏛️', false
    )}
    ${featureRow(
      'Phase 2 Roadmap',
      'Your AI platform — built in from day one.',
      'Our architecture anticipates your next phase. Modular FastAPI services, AI inference engines, and agent orchestration are clear extension points we build into every engagement — so your investment compounds.',
      '🤖', true
    )}
    ${valuesBand()}
    ${ctaBand()}
    ${footer()}
  `;
}

/* ── Hero ─────────────────────────────────── */
function hero() {
  return `
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero__inner">
        <div class="hero__content">
          <span class="hero__eyebrow" style="color:#FFFFFF;letter-spacing:0.18em;">
            BUILDING TOMORROW, TODAY
          </span>
          <h1 id="hero-heading" class="hero__headline">
            Build smarter.<br><em>Deliver faster.</em>
          </h1>
          <p class="hero__lead">${escapeHtml(SITE.company.description)}</p>
          <div class="hero__actions">
            <a href="#services" class="btn btn--primary btn--lg" data-section="services">
              Explore services ${ARROW}
            </a>
            <a href="#contact" class="btn btn--secondary btn--lg" data-section="contact">
              Talk to us
            </a>
          </div>
        </div>
      </div>
    </section>`;
}

/* ── Stats bar ───────────────────────────── */
function statsBar() {
  const stats = SITE.stats || [
    { value: '50+',  label: 'Projects delivered' },
    { value: '3',    label: 'Expert disciplines'  },
    { value: '100%', label: 'Client satisfaction' },
    { value: '24/7', label: 'Support coverage'    },
  ];
  return `
    <div class="stats-bar" role="list" aria-label="Company metrics">
      ${stats.map(s => `
        <div class="stat-tile" role="listitem">
          <div class="stat-tile__value">${escapeHtml(s.value)}</div>
          <div class="stat-tile__label">${escapeHtml(s.label)}</div>
        </div>`).join('')}
    </div>`;
}

/* ── Featured services ───────────────────── */
function featuredServices(items) {
  const EMOJIS = { cpu:'⚙️', zap:'⚡', cloud:'☁️', code:'💻', database:'🗄️', 'refresh-cw':'🔄', layers:'🗂️' };
  return `
    <div class="section-band section-band--white">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow">Our capabilities</span>
          <h2 class="section-title">What we deliver</h2>
          <p class="section-lead">
            End-to-end technology services spanning strategy, design, and engineering —
            built for longevity and AI-readiness.
          </p>
        </div>
        <div class="tile-grid tile-grid--4col" style="margin-bottom:var(--space-6);">
          ${items.map(s => `
            <div class="tile tile--clickable">
              <div class="tile__icon" aria-hidden="true">${EMOJIS[s.icon] || '◆'}</div>
              <div class="tile__title">${escapeHtml(s.title)}</div>
              <p class="tile__body">${escapeHtml(s.short || s.description)}</p>
              <a href="#services" class="tile__link" data-section="services">
                Learn more ${ARROW}
              </a>
            </div>`).join('')}
          <div class="tile tile--dark">
            <div class="tile__tag">Coming next</div>
            <div class="tile__icon" aria-hidden="true">🤖</div>
            <div class="tile__title">AI Platform &amp; FastAPI</div>
            <p class="tile__body">Phase 2 delivers AI inference, agent orchestration, and RESTful services — built on your Phase 1 foundation.</p>
            <a href="#contact" class="tile__link" data-section="contact">
              Enquire about Phase 2 ${ARROW}
            </a>
          </div>
        </div>
        <a href="#services" class="inline-link" data-section="services">
          View all services ${ARROW}
        </a>
      </div>
    </div>`;
}

/* ── Disciplines band ────────────────────── */
function disciplinesBand(disciplines) {
  const EMOJIS = { 'pen-tool':'🎨', layers:'🏛️', terminal:'💻', monitor:'📊', users:'👥' };
  return `
    <div class="section-band section-band--blue">
      <div class="section-band__inner">
        <div class="section-header">
          <span class="section-eyebrow" style="color:rgba(255,255,255,0.7);">Our team</span>
          <h2 class="section-title section-title--on-dark">Three disciplines. One delivery.</h2>
          <p class="section-lead section-lead--on-dark">
            Every engagement brings together Designers, Architects, and Engineers
            in a single cohesive team.
          </p>
        </div>
        <div class="tile-grid">
          ${disciplines.map(d => `
            <div class="tile tile--blue">
              <div class="tile__icon" aria-hidden="true">${EMOJIS[d.icon] || '◆'}</div>
              <div class="tile__title">${escapeHtml(d.title)}</div>
              <p class="tile__body">${escapeHtml(d.description)}</p>
              ${d.skills ? `
                <div style="display:flex;flex-wrap:wrap;gap:var(--space-2);margin-top:var(--space-3);">
                  ${d.skills.slice(0, 3).map(sk => `<span class="badge" style="background:rgba(255,255,255,0.15);color:#fff;">${escapeHtml(sk)}</span>`).join('')}
                </div>` : ''}
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── Feature row ─────────────────────────── */
function featureRow(eyebrow, title, body, emoji, reversed) {
  return `
    <div class="feature-row${reversed ? ' feature-row--reversed' : ''}">
      <div class="feature-row__content">
        <span class="section-eyebrow">${escapeHtml(eyebrow)}</span>
        <h2 class="feature-row__title">${escapeHtml(title)}</h2>
        <p class="feature-row__body">${escapeHtml(body)}</p>
        <a href="${reversed ? '#contact' : '#services'}" class="inline-link"
           data-section="${reversed ? 'contact' : 'services'}">
          ${reversed ? 'Register interest in Phase 2' : 'Explore our services'} ${ARROW}
        </a>
      </div>
      <div class="feature-row__visual" aria-hidden="true">${emoji}</div>
    </div>`;
}

/* ── Values band ─────────────────────────── */
function valuesBand() {
  const values = [
    { em:'🎯', title:'Outcome-driven',  body:'We measure success by your results, not our activity.' },
    { em:'🔧', title:'Modular',         body:'Systems you can extend without touching what works.' },
    { em:'📖', title:'Transparent',     body:'Open config, documented decisions — no black-box delivery.' },
    { em:'🚀', title:'Scalable',        body:'Architecture that grows with your ambitions.' },
  ];
  return `
    <div class="section-band section-band--subtle">
      <div class="section-band__inner">
        <div class="section-header section-header--center">
          <span class="section-eyebrow">Our values</span>
          <h2 class="section-title">How we work</h2>
        </div>
        <div class="tile-grid tile-grid--4col">
          ${values.map(v => `
            <div class="tile">
              <div class="tile__icon" aria-hidden="true">${v.em}</div>
              <div class="tile__title">${v.title}</div>
              <p class="tile__body">${v.body}</p>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

/* ── CTA band ────────────────────────────── */
function ctaBand() {
  return `
    <div class="section-band section-band--blue">
      <div class="section-band__inner cta-row">
        <div class="cta-row__text">
          <h2>Ready to start your project?</h2>
          <p>Let's discuss what you need to build next.</p>
        </div>
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;">
          <a href="#contact" class="btn btn--inverse btn--lg" data-section="contact">
            Get in touch ${ARROW}
          </a>
          <a href="#services" class="btn btn--ghost btn--lg" data-section="services"
             style="color:#fff;border:1px solid rgba(255,255,255,0.4);">
            View services
          </a>
        </div>
      </div>
    </div>`;
}

/* ── Footer ──────────────────────────────── */
function footer() {
  const year = new Date().getFullYear();
  return `
    <footer class="site-footer" role="contentinfo">
      <div class="site-footer__inner">
        <div>
          <div class="site-footer__brand">${escapeHtml(SITE.company.name)}</div>
          <p class="site-footer__copy">
            Technology Services &amp; AI Automation<br>
            ${escapeHtml(SITE.contact?.address || 'Bengaluru, India')}
          </p>
        </div>
        <nav class="site-footer__nav" aria-label="Footer navigation">
          <div>
            <div class="site-footer__nav-group-title">Navigation</div>
            ${SITE.navigation.map(n =>
              `<a href="#${n.id}" class="site-footer__nav-link" data-section="${n.id}">${n.label}</a>`
            ).join('')}
          </div>
          <div>
            <div class="site-footer__nav-group-title">Services</div>
            <a href="#services" class="site-footer__nav-link" data-section="services">Consulting</a>
            <a href="#services" class="site-footer__nav-link" data-section="services">AI Automation</a>
            <a href="#services" class="site-footer__nav-link" data-section="services">Cloud Architecture</a>
            <a href="#services" class="site-footer__nav-link" data-section="services">Engineering</a>
          </div>
          <div>
            <div class="site-footer__nav-group-title">Company</div>
            <a href="#home"    class="site-footer__nav-link" data-section="home">About us</a>
            <a href="#support" class="site-footer__nav-link" data-section="support">Support</a>
            <a href="#contact" class="site-footer__nav-link" data-section="contact">Contact</a>
          </div>
          <div>
            <div class="site-footer__nav-group-title">Connect</div>
            ${SITE.contact?.linkedin ? `<a href="${escapeHtml(SITE.contact.linkedin)}" class="site-footer__nav-link" target="_blank" rel="noopener">LinkedIn</a>` : ''}
            ${SITE.contact?.twitter  ? `<a href="${escapeHtml(SITE.contact.twitter)}"  class="site-footer__nav-link" target="_blank" rel="noopener">Twitter</a>`  : ''}
            ${SITE.contact?.github   ? `<a href="${escapeHtml(SITE.contact.github)}"   class="site-footer__nav-link" target="_blank" rel="noopener">GitHub</a>`   : ''}
          </div>
        </nav>
        <div>
          <a href="#contact" class="btn btn--primary btn--sm" data-section="contact">
            Get in touch ${ARROW}
          </a>
        </div>
      </div>
      <div class="site-footer__legal">
        <span>&copy; ${year} ${escapeHtml(SITE.company.name)}. All rights reserved.</span>
        <a href="#home" class="site-footer__legal-link">Privacy</a>
        <a href="#home" class="site-footer__legal-link">Terms</a>
        <a href="#home" class="site-footer__legal-link">Accessibility</a>
      </div>
    </footer>`;
}
