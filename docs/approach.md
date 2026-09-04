# Approach Document
## Vidvamsa Technology Services Website

**Version:** 1.0  
**Date:** September 2026  
**Status:** Approved  

---

## 1. Executive Summary

This document outlines the strategic approach for designing and building the Vidvamsa public-facing website — a clean, professional, blue-and-white single-page application (SPA) that communicates the company's technology services, AI automation capabilities, and team credentials.

The site is built as a **static-first, API-ready** application: it ships as pure HTML/CSS/JavaScript with no build tool dependency, but is architected to seamlessly upgrade to a FastAPI-powered dynamic platform without re-writing the frontend.

---

## 2. Objectives

| # | Objective | Success Metric |
|---|-----------|---------------|
| 1 | Establish digital presence for Vidvamsa | Site live and accessible |
| 2 | Communicate services clearly to prospects | <3 clicks to any service detail |
| 3 | Generate qualified leads via contact form | Form submission rate ≥ 5% |
| 4 | Reflect brand identity (blue/white, professional) | Design review sign-off |
| 5 | Enable future FastAPI + AI platform evolution | Zero breaking changes on backend addition |
| 6 | Maintain developer experience and maintainability | All config in YAML, no hardcoding |

---

## 3. Guiding Principles

### 3.1 Config-Driven Content
All textual content, colour tokens, navigation items, service definitions, team data and contact details are externalised into YAML configuration files (`config/*.yml`). The JavaScript runtime mirrors this via `src/js/config.js`. Changing business content never requires touching application code.

### 3.2 Modular Architecture
- **CSS** is split into five modules: `variables`, `base`, `layout`, `components`, `animations`, stitched together by `main.css`.
- **JavaScript** follows a section-per-module pattern with a central router (`navigation.js`) and renderer utilities (`renderer.js`).
- Each navigation section is a self-contained JS module that mounts lazily on first visit.

### 3.3 Zero Build Tooling (Phase 1)
The initial release uses native ES Modules (`type="module"`) and CSS `@import` — no webpack, Vite, or bundler required. This maximises portability and lowers ops overhead while the team is small.

### 3.4 Static-First, API-Ready
A single flag in `config/site.yml` (`future.enable_dynamic_config: false`) controls static vs. dynamic mode. When flipped, the contact form submits to a live FastAPI endpoint and content can be served from the backend.

### 3.5 Accessibility by Default
- Semantic HTML5 landmarks and ARIA attributes throughout.
- Keyboard navigation fully supported.
- Focus management for SPA route transitions.
- Skip-to-content link.
- Colour contrast meets WCAG 2.2 AA.

---

## 4. Phased Delivery Plan

### Phase 1 — Static Website (Current)
**Scope:** Full design, all four sections, contact form (simulated), config-driven content.  
**Stack:** HTML5, CSS3 (custom properties), ES Modules, YAML configs.  
**Timeline:** Sprint 1 (2 weeks).  
**Done when:** Site renders correctly in Chrome, Firefox, Safari, Edge; passes Lighthouse ≥ 90.

### Phase 2 — FastAPI Backend
**Scope:** REST API for contact form submission, dynamic config serving, optional CMS.  
**Stack:** Python 3.12, FastAPI, Pydantic v2, SQLite/PostgreSQL, Docker.  
**Pre-requisites:** Phase 1 complete.  
**Key change in frontend:** Set `enableDynamicConfig: true` in `config.js`.

### Phase 3 — AI Platform Integration
**Scope:** AI chatbot widget, intelligent lead qualification, automated follow-up emails.  
**Stack:** LangChain / LlamaIndex, OpenAI / Anthropic APIs, Redis for session state.  
**Pre-requisites:** Phase 2 complete.

### Phase 4 — Scale & CDN
**Scope:** Deploy to CDN (Cloudflare / AWS CloudFront), performance hardening, analytics.  
**Pre-requisites:** Phase 2 and Phase 3.

---

## 5. Technology Selection Rationale

| Decision | Options Considered | Choice | Reason |
|----------|-------------------|--------|--------|
| Frontend framework | React, Vue, Vanilla JS | **Vanilla JS (ES Modules)** | Zero deps, no build, easy handoff |
| CSS approach | Tailwind, CSS-in-JS, BEM | **CSS Custom Properties + BEM-lite** | No tooling, design-token driven |
| Config format | JSON, .env, YAML | **YAML** | Human-readable, FastAPI-native |
| Backend (future) | Express, Django, FastAPI | **FastAPI** | Async, Pydantic, auto-docs |
| Routing | SPA library, server-side | **Hash-based client routing** | Works without a server |

---

## 6. Risk Register

| Risk | Probability | Impact | Mitigation |
|------|------------|--------|-----------|
| ES Modules not supported in very old browsers | Low | Medium | Serve Babel-transpiled fallback in Phase 2 |
| YAML config drifts from JS config.js | Medium | Low | Lint/CI check to diff both in Phase 2 |
| Contact form spam without backend | Medium | Low | Add honeypot field; rate-limit in Phase 2 |
| CSS @import blocked by CSP | Low | High | Inline critical CSS or bundle in Phase 2 |
| FastAPI migration breaks frontend | Low | High | Adapter pattern isolates API calls to one module |

---

## 7. Team Responsibilities

| Role | Responsibility |
|------|---------------|
| Designer | Figma mockups, design system tokens, review `variables.css` |
| Architect | Config strategy, Phase 2–4 API design, infrastructure planning |
| Engineer | Frontend implementation, tests, CI/CD setup |

---

## 8. Definition of Done

- [ ] All four sections render correctly on desktop and mobile
- [ ] Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- [ ] All config values sourced from `config.js` (zero hardcoded strings in section modules)
- [ ] Automated test suite passes (`tests/tests.js`)
- [ ] `.gitignore` excludes all build/env artefacts
- [ ] Documents (approach, design, requirements, tech-spec) reviewed and signed off
- [ ] Architecture diagram updated and committed
