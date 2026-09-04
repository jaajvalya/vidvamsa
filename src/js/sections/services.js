/**
 * Vidvamsa — Services Section
 * src/js/sections/services.js
 *
 * @module sections/services
 */

import { SERVICES, SITE }                       from '../config.js';
import { renderServiceCard, renderProcessStep, renderFooter } from '../renderer.js';

/* ── Public ──────────────────────────────────── */

export function mountServices() {
  const el = document.getElementById('section-services');
  if (!el) return;
  el.innerHTML = _buildServices();
}

/* ── Private ─────────────────────────────────── */

function _buildServices() {
  return `
    <!-- Page Header -->
    <div class="page-header-band">
      <div class="page-header-band__inner">
        <div class="page-header-band__eyebrow">What We Offer</div>
        <h1 class="page-header-band__title">Our Services</h1>
        <p class="page-header-band__desc">
          Six practice areas. One integrated team. Delivering outcomes across
          the full technology lifecycle.
        </p>
      </div>
    </div>

    <!-- All Services Grid -->
    <section class="section-container" aria-labelledby="all-services-heading">
      <div class="section-header">
        <div class="section-eyebrow">Practice Areas</div>
        <h2 id="all-services-heading" class="section-title">
          End-to-end <em>technology capability</em>
        </h2>
        <p class="section-lead">
          Whether you need a single specialist or a complete delivery team,
          we have the depth and breadth to help you succeed.
        </p>
      </div>
      <div class="grid-3">
        ${SERVICES.items.map((s, i) => renderServiceCard(s, i)).join('')}
      </div>
    </section>

    <!-- AI Spotlight -->
    <section
      style="background:var(--color-surface); border-top: 1px solid var(--color-border); border-bottom: 1px solid var(--color-border);"
      aria-labelledby="ai-spotlight-heading"
    >
      <div class="section-container">
        <div style="display:grid; grid-template-columns:1fr 1fr; gap: var(--space-12); align-items:center;">
          <div>
            <div class="section-eyebrow">AI Platform (Coming Soon)</div>
            <h2 id="ai-spotlight-heading" class="section-title">
              The next frontier:<br><em>AI-native operations</em>
            </h2>
            <p style="color:var(--color-text-medium); line-height:var(--leading-relaxed); margin-bottom:var(--space-6);">
              We are building a proprietary AI automation platform that connects
              your data, workflows, and models into a single intelligent layer —
              designed to evolve as AI capabilities advance.
            </p>
            <ul class="card__list">
              <li class="card__list-item">Drag-and-drop AI workflow builder</li>
              <li class="card__list-item">Pre-built LLM connectors</li>
              <li class="card__list-item">Observability &amp; governance dashboard</li>
              <li class="card__list-item">FastAPI-powered integration layer</li>
            </ul>
          </div>
          <div style="display:flex; gap:var(--space-4); flex-direction:column;">
            ${_aiFeatureItem('zap',      '#00A8E8', 'Workflow Automation',   'Visual builder for complex AI pipelines with no-code and code-first modes.')}
            ${_aiFeatureItem('database', '#0077CC', 'Data Intelligence',     'Connect any data source and apply ML transformations in real-time.')}
            ${_aiFeatureItem('shield',   '#1A3C6E', 'AI Governance',         'Audit trails, model versioning and compliance guardrails out of the box.')}
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <section class="section-container" aria-labelledby="process-heading">
      <div class="section-header section-header--centered">
        <div class="section-eyebrow">How We Deliver</div>
        <h2 id="process-heading" class="section-title">
          Our <em>delivery process</em>
        </h2>
        <p class="section-lead">
          A proven four-step model that keeps projects on track, on budget
          and aligned with your goals.
        </p>
      </div>
      <div class="process-steps">
        ${SERVICES.process.map(renderProcessStep).join('')}
      </div>
    </section>

    ${renderFooter(SITE.contact, new Date().getFullYear())}
  `;
}

function _aiFeatureItem(iconName, color, title, text) {
  return `
    <div style="display:flex; gap:var(--space-4); align-items:flex-start;">
      <div style="width:42px;height:42px;border-radius:var(--radius-md);background:${color}18;color:${color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          ${_iconPath(iconName)}
        </svg>
      </div>
      <div>
        <div style="font-size:var(--text-base);font-weight:var(--font-semi);color:var(--color-text-dark);margin-bottom:var(--space-1);">${title}</div>
        <div style="font-size:var(--text-sm);color:var(--color-text-light);line-height:var(--leading-relaxed);">${text}</div>
      </div>
    </div>
  `;
}

// Minimal icon paths (inline, no dep)
function _iconPath(name) {
  const paths = {
    zap:      '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    shield:   '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  };
  return paths[name] || '';
}
