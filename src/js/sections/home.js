/**
 * Vidvamsa — Home Section
 * src/js/sections/home.js
 *
 * Renders the landing / home page content.
 *
 * @module sections/home
 */

import { SITE, SERVICES, TEAM }                     from '../config.js';
import { renderStat, renderFooter }                 from '../renderer.js';
import { icon }                                     from '../utils.js';

/* ── Public ──────────────────────────────────── */

/**
 * Mount the Home section into #section-home.
 */
export function mountHome() {
  const el = document.getElementById('section-home');
  if (!el) return;
  el.innerHTML = _buildHome();
}

/* ── Private ─────────────────────────────────── */

function _buildHome() {
  const { hero, stats, company, contact } = SITE;

  return `
    <!-- Hero -->
    <section class="hero" aria-labelledby="hero-heading">
      <div class="hero__content">
        <div class="hero__eyebrow">
          ${icon('zap', 12)}
          Technology Services &amp; AI Automation
        </div>
        <h1 id="hero-heading" class="hero__headline">
          ${hero.headline}
          <span class="hero__headline-accent">${hero.headlineAccent}</span>
        </h1>
        <p class="hero__subtext">${hero.subtext}</p>
        <div class="hero__cta-group">
          <a href="${hero.ctaPrimary.href}" class="btn btn--white btn--lg">
            ${hero.ctaPrimary.label}
            ${icon('arrow-right', 16, 'btn__icon')}
          </a>
          <a href="${hero.ctaSecondary.href}" class="btn btn--white-outline btn--lg">
            ${hero.ctaSecondary.label}
          </a>
        </div>
      </div>
    </section>

    <!-- Stats Bar -->
    <div class="stats-bar" aria-label="Key metrics">
      <div class="stats-bar__inner">
        ${stats.map(renderStat).join('')}
      </div>
    </div>

    <!-- Featured Services -->
    <section class="section-container" aria-labelledby="services-preview-heading">
      <div class="section-header">
        <div class="section-eyebrow">What We Do</div>
        <h2 id="services-preview-heading" class="section-title">
          Technology that <em>drives growth</em>
        </h2>
        <p class="section-lead">
          From strategy to deployment, our experts cover every layer of your
          technology and data stack.
        </p>
      </div>
      <div class="grid-3">
        ${SERVICES.items
          .filter((s) => s.featured)
          .map((s, i) => _servicePreviewCard(s, i))
          .join('')}
      </div>
      <div style="text-align:center; margin-top: var(--space-8);">
        <a href="#services" class="btn btn--outline">
          View all services ${icon('arrow-right', 16, 'btn__icon')}
        </a>
      </div>
    </section>

    <!-- Team Disciplines -->
    <section
      style="background: var(--color-surface); border-top: 1px solid var(--color-border);"
      aria-labelledby="team-preview-heading"
    >
      <div class="section-container">
        <div class="section-header section-header--centered">
          <div class="section-eyebrow">Our Team</div>
          <h2 id="team-preview-heading" class="section-title">
            Designers, Architects <em>&amp; Engineers</em>
          </h2>
          <p class="section-lead">
            Three disciplines. One seamless team. Working together to deliver
            solutions that are beautiful, robust and intelligent.
          </p>
        </div>
        <div class="grid-3">
          ${TEAM.disciplines.map(_disciplinePreview).join('')}
        </div>
      </div>
    </section>

    <!-- Values Strip -->
    <section class="section-container" aria-labelledby="values-heading">
      <div class="section-header section-header--centered">
        <div class="section-eyebrow">Our Principles</div>
        <h2 id="values-heading" class="section-title">How we work</h2>
      </div>
      <div class="grid-4">
        ${TEAM.values.map(_valueItem).join('')}
      </div>
    </section>

    <!-- CTA Band -->
    <section
      style="background: var(--color-primary); padding: var(--space-16) var(--space-10); text-align: center;"
      aria-label="Call to action"
    >
      <div style="max-width: 560px; margin: 0 auto;">
        <h2 style="color: #fff; font-size: var(--text-3xl); margin-bottom: var(--space-4);">
          Ready to transform your technology?
        </h2>
        <p style="color: rgba(232,244,253,0.8); margin-bottom: var(--space-8); font-size: var(--text-lg);">
          Let's talk about your goals and design a path forward together.
        </p>
        <a href="#contact" class="btn btn--white btn--lg">
          Get in touch ${icon('arrow-right', 16, 'btn__icon')}
        </a>
      </div>
    </section>

    ${renderFooter(contact, new Date().getFullYear())}
  `;
}

function _servicePreviewCard(service, index) {
  const staggerClass = `stagger-${Math.min(index + 1, 6)}`;
  return `
    <article class="card animate-slide-up ${staggerClass}" style="border-top: 3px solid ${service.color};">
      <div class="card__icon-wrapper" style="background:${service.color}18; color:${service.color};">
        ${icon(service.icon, 24, 'card__icon')}
      </div>
      <h3 class="card__title">${service.title}</h3>
      <p class="card__text">${service.short}</p>
    </article>
  `;
}

function _disciplinePreview(d, index) {
  const staggerClass = `stagger-${Math.min(index + 1, 3)}`;
  return `
    <div class="card card--flat animate-slide-up ${staggerClass}" style="border-left: 3px solid ${d.color}; padding-left: var(--space-5);">
      <div style="color:${d.color}; margin-bottom: var(--space-3);">${icon(d.icon, 28)}</div>
      <h3 class="card__title" style="font-size: var(--text-xl);">${d.title}</h3>
      <p class="card__text">${d.tagline}</p>
      <div class="tool-pills">
        ${d.tools.slice(0, 3).map((t) => `<span class="tool-pill">${t}</span>`).join('')}
      </div>
    </div>
  `;
}

function _valueItem(v, index) {
  const staggerClass = `stagger-${Math.min(index + 1, 4)}`;
  return `
    <div class="card card--flat animate-slide-up ${staggerClass}" style="text-align:center;">
      <div style="display:flex; justify-content:center; margin-bottom: var(--space-4);">
        <div style="width:48px; height:48px; border-radius:50%; background:rgba(0,119,204,0.08); display:flex; align-items:center; justify-content:center; color:var(--color-secondary);">
          ${icon(v.icon, 22)}
        </div>
      </div>
      <h4 style="font-size:var(--text-base); font-weight:var(--font-semi); color:var(--color-text-dark); margin-bottom:var(--space-2);">${v.title}</h4>
      <p style="font-size:var(--text-sm); color:var(--color-text-light); margin:0;">${v.text}</p>
    </div>
  `;
}
