# Requirements Document
## Vidvamsa Technology Services Website

**Version:** 1.0  
**Date:** September 2026  
**Status:** Baseline  

---

## 1. Purpose

This document captures the functional and non-functional requirements for the Vidvamsa public-facing website. It serves as the acceptance criteria baseline for Phase 1 (static site) and a reference for subsequent phases.

---

## 2. Stakeholders

| Stakeholder | Role | Interest |
|-------------|------|---------|
| Vidvamsa Leadership | Product owner | Brand representation, lead generation |
| Designer | UX/UI | Pixel-perfect delivery, accessibility |
| Architect | Technical lead | Future-proofing, API-readiness |
| Engineer | Developer | Maintainability, zero hardcoding |
| Website Visitor | End user | Find services quickly, contact the team |

---

## 3. Scope

### 3.1 In Scope (Phase 1)
- Single-page application with four sections: Home, Services, Support, Contact Us
- Left-rail sidebar navigation
- All content driven from YAML config files
- Client-side contact form with validation (simulated submission)
- Responsive design (desktop, tablet, mobile)
- Accessibility compliance (WCAG 2.2 AA)
- Static HTML/CSS/JS — no server required

### 3.2 Out of Scope (Phase 1)
- Backend API / database
- Authentication or user accounts
- CMS / admin panel
- Analytics integration
- Live chat widget
- Blog / news section

---

## 4. Functional Requirements

### FR-01: Navigation
| ID | Requirement | Priority |
|----|-------------|---------|
| FR-01-1 | The sidebar shall display navigation items defined in `config/site.yml → navigation` | Must |
| FR-01-2 | Clicking a nav item shall show the corresponding section without a full page reload | Must |
| FR-01-3 | The active nav item shall be visually highlighted | Must |
| FR-01-4 | The URL hash shall update to reflect the active section | Must |
| FR-01-5 | Browser back/forward navigation shall work correctly | Must |
| FR-01-6 | On mobile (< 768px) the sidebar shall be accessible via a hamburger button | Must |
| FR-01-7 | The mobile sidebar shall close when the overlay, a nav link, or Escape is pressed | Must |

### FR-02: Home Section
| ID | Requirement | Priority |
|----|-------------|---------|
| FR-02-1 | Shall display a hero banner with headline, accent text, subtext and two CTAs | Must |
| FR-02-2 | Headline copy and CTAs shall be read from `config/site.yml → hero` | Must |
| FR-02-3 | Shall display a stats bar with four metrics from `config/site.yml → stats` | Must |
| FR-02-4 | Shall display three featured service cards (those with `featured: true` in `config/services.yml`) | Must |
| FR-02-5 | Shall display three team discipline previews from `config/team.yml` | Must |
| FR-02-6 | Shall display four company values from `config/team.yml → values` | Must |
| FR-02-7 | Shall include a call-to-action band linking to the Contact section | Should |
| FR-02-8 | Shall render a footer with contact info | Must |

### FR-03: Services Section
| ID | Requirement | Priority |
|----|-------------|---------|
| FR-03-1 | Shall render all service items from `config/services.yml → services` | Must |
| FR-03-2 | Each service card shall show icon, title, short description and highlights | Must |
| FR-03-3 | Featured services shall be visually distinguished | Should |
| FR-03-4 | Shall display a "Delivery Process" section with steps from `config/services.yml → process` | Must |
| FR-03-5 | Shall include an AI Platform spotlight section | Should |

### FR-04: Support Section
| ID | Requirement | Priority |
|----|-------------|---------|
| FR-04-1 | Shall display support channels from `config/contact.yml → support.channels` | Must |
| FR-04-2 | Shall display SLA response times from `config/contact.yml → support.sla` | Must |
| FR-04-3 | Shall render an FAQ accordion with items from `config/contact.yml → faq` | Must |
| FR-04-4 | Expanding one FAQ item shall collapse any other open item | Must |
| FR-04-5 | FAQ accordion shall be keyboard-navigable | Must |

### FR-05: Contact Section
| ID | Requirement | Priority |
|----|-------------|---------|
| FR-05-1 | Shall render a contact form with fields defined in `config/contact.yml → contact_form.fields` | Must |
| FR-05-2 | Required fields shall be visually marked and validated before submission | Must |
| FR-05-3 | Email field shall validate format | Must |
| FR-05-4 | On successful (simulated) submission, shall display success message from config | Must |
| FR-05-5 | On failure, shall display a user-friendly error message | Must |
| FR-05-6 | Submit button shall show loading state during submission | Should |
| FR-05-7 | Shall display contact info panel beside the form | Must |
| FR-05-8 | When `enableDynamicConfig: true`, form shall POST to `config/contact.yml → contact_form.api_endpoint` | Could |

### FR-06: Config-Driven Content
| ID | Requirement | Priority |
|----|-------------|---------|
| FR-06-1 | No section module shall contain hardcoded business content (company name, service names, URLs etc.) | Must |
| FR-06-2 | All business content shall be sourced from `src/js/config.js` which mirrors `config/*.yml` | Must |
| FR-06-3 | Changing a value in `config/site.yml` and its mirror in `config.js` shall update the rendered site | Must |

---

## 5. Non-Functional Requirements

### NFR-01: Performance
| ID | Requirement | Target |
|----|-------------|-------|
| NFR-01-1 | Lighthouse Performance score | ≥ 90 |
| NFR-01-2 | First Contentful Paint | ≤ 1.5s |
| NFR-01-3 | Largest Contentful Paint | ≤ 2.5s |
| NFR-01-4 | Total page weight (no images) | ≤ 200KB |

### NFR-02: Accessibility
| ID | Requirement | Target |
|----|-------------|-------|
| NFR-02-1 | Lighthouse Accessibility score | ≥ 95 |
| NFR-02-2 | All interactive elements keyboard accessible | 100% |
| NFR-02-3 | All images have alt text or `aria-hidden` | 100% |
| NFR-02-4 | Colour contrast meets WCAG 2.2 AA | All text elements |
| NFR-02-5 | Screen reader landmarks present | Must |

### NFR-03: Browser Compatibility
| Browser | Version | Support Level |
|---------|---------|--------------|
| Chrome | Last 2 | Full |
| Firefox | Last 2 | Full |
| Safari | Last 2 | Full |
| Edge | Last 2 | Full |
| Mobile Safari (iOS) | Last 2 | Full |
| Chrome for Android | Last 2 | Full |

### NFR-04: Maintainability
| ID | Requirement |
|----|------------|
| NFR-04-1 | CSS uses design tokens (custom properties) exclusively — no hardcoded hex values in component CSS |
| NFR-04-2 | JS is split into single-responsibility modules (≤ 300 lines each) |
| NFR-04-3 | All public functions have JSDoc comments |
| NFR-04-4 | Zero dead code at release |

### NFR-05: Security
| ID | Requirement |
|----|------------|
| NFR-05-1 | All user-supplied data is HTML-escaped before DOM insertion (XSS prevention) |
| NFR-05-2 | External links use `rel="noopener"` |
| NFR-05-3 | No secrets in the codebase |

---

## 6. Constraints

- No build tooling in Phase 1 (no webpack, Vite, Parcel, etc.)
- No third-party JavaScript dependencies at runtime (exception: Google Fonts CSS)
- YAML config files are the canonical source of truth; `config.js` mirrors them
- Site must work from the `file://` protocol in Chromium-based browsers, and from a simple HTTP server in all browsers

---

## 7. Assumptions

1. Google Fonts (`Inter`) will be available via CDN for most users; system fonts provide an acceptable fallback.
2. JavaScript is enabled in the user's browser.
3. Modern browsers (ES2020+) are the primary target.
4. No i18n (internationalisation) is required in Phase 1.

---

## 8. Acceptance Criteria Summary

| Category | Criteria | Verified By |
|----------|---------|------------|
| Navigation | All four sections accessible, active state shown | Manual test |
| Config-driven | Content updates via config.js reflect in UI | Manual test |
| Accessibility | Keyboard-only navigation covers all interactive elements | Manual test |
| Responsive | Layout correct on 320px, 768px and 1440px viewports | Browser DevTools |
| Forms | Validation triggers, success/error states shown | Automated test |
| Performance | Lighthouse ≥ 90 | Lighthouse CI |
| Tests | All test cases in `tests/tests.js` pass | Automated |
