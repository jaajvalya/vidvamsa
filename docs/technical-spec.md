# Technical Specification Document
## Vidvamsa Technology Services Website

**Version:** 1.0  
**Date:** September 2026  
**Status:** Approved  

---

## 1. Overview

This document provides the technical specification for the Vidvamsa website. It covers the file structure, module contracts, data flows, configuration schema, naming conventions, and the extension points required for Phase 2 (FastAPI) and Phase 3 (AI Platform).

---

## 2. Project Structure

```
Vidvamsa/
├── .gitignore                     # Excludes OS, IDE, build and env artefacts
├── README.md                      # Project setup and quick-start guide
│
├── config/                        # Canonical configuration (YAML)
│   ├── site.yml                   # Company, nav, hero, stats, theme, meta, future flags
│   ├── services.yml               # Service definitions + delivery process
│   ├── team.yml                   # Disciplines, skills, tools, values
│   └── contact.yml                # Support channels, SLA, FAQ, form fields
│
├── docs/                          # Project documentation
│   ├── approach.md                # Strategic approach and phasing
│   ├── design.md                  # Visual design system
│   ├── requirements.md            # FR/NFR requirements
│   ├── technical-spec.md          # This document
│   └── architecture.drawio        # System architecture diagram
│
├── src/                           # Frontend source
│   ├── index.html                 # HTML shell (no hardcoded content)
│   │
│   ├── css/
│   │   ├── variables.css          # CSS custom properties (design tokens)
│   │   ├── base.css               # Reset, typography, global styles
│   │   ├── layout.css             # App shell, sidebar, main area, grids
│   │   ├── components.css         # Buttons, cards, forms, badges, FAQ, etc.
│   │   ├── animations.css         # Keyframes, utility animation classes
│   │   └── main.css               # @import entry point (load order matters)
│   │
│   ├── js/
│   │   ├── config.js              # Runtime data (mirrors config/*.yml)
│   │   ├── utils.js               # Pure helpers: DOM, strings, icons, debounce
│   │   ├── navigation.js          # Sidebar render, routing, mobile menu
│   │   ├── renderer.js            # HTML-string template helpers (shared)
│   │   ├── main.js                # Bootstrap, section registry, lazy mount
│   │   └── sections/
│   │       ├── home.js            # Home section mount
│   │       ├── services.js        # Services section mount
│   │       ├── support.js         # Support section mount + FAQ accordion
│   │       └── contact.js         # Contact section mount + form handling
│   │
│   └── assets/
│       └── images/                # Static image assets (empty in Phase 1)
│
└── tests/
    ├── test-runner.html           # Browser-based test harness
    └── tests.js                   # Test suite (no external framework)
```

---

## 3. CSS Architecture

### 3.1 Import Order (critical — dependency chain)

```
main.css
  └─ variables.css   (tokens — must load first)
  └─ Google Fonts    (external, async-friendly)
  └─ base.css        (depends on tokens)
  └─ animations.css  (keyframes used by layout + components)
  └─ layout.css      (depends on tokens + animations)
  └─ components.css  (depends on tokens + animations)
```

### 3.2 Naming Convention (BEM-lite)

```
.block
.block__element
.block--modifier
.is-state          (JS-toggled states)
.animate-*         (animation utilities)
.stagger-N         (stagger delay helpers)
```

### 3.3 Design Token Categories

| Category | Prefix | Example |
|----------|--------|---------|
| Colour | `--color-` | `--color-primary` |
| Spacing | `--space-` | `--space-4` (= 16px) |
| Typography | `--text-`, `--font-`, `--leading-` | `--text-xl` |
| Borders | `--radius-`, `--border-` | `--radius-lg` |
| Shadows | `--shadow-` | `--shadow-md` |
| Transitions | `--transition-` | `--transition-base` |
| Z-index | `--z-` | `--z-sidebar` |
| Layout | `--sidebar-width`, `--content-max-width` | — |

---

## 4. JavaScript Architecture

### 4.1 Module Dependency Graph

```
main.js
  ├─ config.js          (data only, no imports)
  ├─ utils.js           (pure functions, no imports)
  ├─ navigation.js
  │    ├─ config.js
  │    └─ utils.js
  ├─ sections/home.js
  │    ├─ config.js
  │    ├─ renderer.js
  │    └─ utils.js
  ├─ sections/services.js
  │    ├─ config.js
  │    └─ renderer.js
  ├─ sections/support.js
  │    ├─ config.js
  │    ├─ renderer.js
  │    └─ utils.js
  └─ sections/contact.js
       ├─ config.js
       ├─ renderer.js
       └─ utils.js

renderer.js
  ├─ utils.js
  └─ (no config.js — pure template functions)
```

### 4.2 Module Contracts

#### `config.js`
- **Exports:** `SITE`, `SERVICES`, `TEAM`, `CONTACT`
- **Contract:** Pure data objects. No functions. No DOM access. Mirrors `config/*.yml` exactly.
- **Extension:** When FastAPI is live, this module becomes an async loader that fetches `GET /api/v1/config`.

#### `utils.js`
- **Exports:** `$`, `$$`, `createElement`, `toggleClass`, `delegate`, `slugify`, `capitalise`, `truncate`, `icon`, `escapeHtml`, `debounce`, `throttle`, `getActiveSection`, `setHash`
- **Contract:** Pure functions with no side effects. DOM helpers accept an optional `root` parameter for testability.

#### `navigation.js`
- **Exports:** `initNavigation()`, `navigateTo(sectionId: string)`
- **Contract:** Call `initNavigation()` once after DOMContentLoaded. `navigateTo` is safe to call from any context including section content (e.g., CTA buttons).
- **Side effects:** Modifies `document.title`, `window.location.hash`, DOM class lists.

#### `renderer.js`
- **Exports:** Template functions (`render*`) that accept data objects and return HTML strings.
- **Contract:** No DOM mutations. All functions are pure (same input → same output). Safe to call in tests.

#### `sections/*.js`
- **Exports:** `mount*()` (e.g., `mountHome()`)
- **Contract:** Idempotent — calling twice replaces content. Writes to `#section-{id}` element only.

#### `main.js`
- **Exports:** None (side-effect module)
- **Contract:** Single entry point. Self-initialises. Exposes `window.__vidvamsa` for debug/external access.

### 4.3 Routing Model

Hash-based client-side routing:

```
URL:          https://vidvamsa.tech/#services
Active hash:  "services"
Active DOM:   #section-services.is-active
Active nav:   [data-section="services"].is-active
```

State transitions:
1. `hashchange` event fires
2. `getActiveSection()` reads `window.location.hash`
3. `_activateSection(id)` updates classes + ARIA
4. `_ensureMounted(id)` lazy-mounts section on first visit

---

## 5. Configuration Schema

### 5.1 `config/site.yml`

```yaml
company:
  name: string
  tagline: string
  description: string
  founded: integer
  logo_text: string (single char)

contact:
  email: string (email)
  phone: string
  address: string
  linkedin: string (URL)
  twitter: string (URL)
  github: string (URL)

navigation:
  items:
    - id: string (slug, used as hash + DOM id)
      label: string
      icon: string (icon registry key in utils.js)

theme:              # Reference only — runtime uses CSS custom properties
  primary: hex
  secondary: hex
  # …

meta:
  title: string
  description: string
  keywords: string[]
  lang: string (BCP 47)

hero:
  headline: string
  headline_accent: string
  subtext: string
  cta_primary:  { label: string, href: string }
  cta_secondary:{ label: string, href: string }

stats:
  - value: string
    label: string

future:
  api_base_url: string (URL)
  ai_platform_url: string (URL)
  enable_dynamic_config: boolean
```

### 5.2 `config/services.yml`

```yaml
services:
  - id: string (slug)
    title: string
    icon: string (icon registry key)
    short: string (≤ 80 chars)
    description: string
    highlights: string[] (4 items recommended)
    color: hex
    featured: boolean

process:
  - step: integer (1–4)
    title: string
    description: string
```

### 5.3 `config/team.yml`

```yaml
disciplines:
  - id: string
    title: string
    icon: string
    tagline: string
    description: string
    skills: string[]
    tools: string[]
    color: hex

values:
  - icon: string
    title: string
    text: string
```

### 5.4 `config/contact.yml`

```yaml
support:
  sla:
    critical: string
    high: string
    medium: string
    low: string
  channels:
    - type: email|phone|slack
      label: string
      value: string
      available: string

faq:
  - id: string
    question: string
    answer: string

contact_form:
  fields:
    - id: string
      label: string
      type: text|email|textarea|select
      required: boolean
      placeholder: string
      options: string[]  # only for type: select
  submit_label: string
  success_message: string
  api_endpoint: string (path)
```

---

## 6. Extension Points for Phase 2 (FastAPI)

### 6.1 Config Endpoint

Add to `main.js`:
```javascript
if (SITE.future.enableDynamicConfig) {
  const cfg = await fetch(`${SITE.future.apiBaseUrl}/config`).then(r => r.json());
  Object.assign(SITE, cfg.site);
  Object.assign(SERVICES, cfg.services);
  // …
}
```

### 6.2 Contact Form

In `sections/contact.js → _submitForm()`:
- `enableDynamicConfig: false` → simulate (current)
- `enableDynamicConfig: true` → `POST ${SITE.future.apiBaseUrl}/contact`

### 6.3 FastAPI Endpoints to Implement

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/v1/config` | Returns full site config as JSON |
| POST | `/api/v1/contact` | Accepts contact form payload |
| GET | `/api/v1/health` | Health check |

---

## 7. Security Considerations

| Threat | Control |
|--------|---------|
| XSS via config data | All config strings passed through `escapeHtml()` before DOM insertion |
| Open redirect | All internal hrefs are hash-only; external links use `rel="noopener"` |
| CSRF (Phase 2) | FastAPI will use CSRF tokens / CORS allowlist |
| Secrets in repo | `.gitignore` excludes `.env*`; no secrets in JS |
| Form spam (Phase 2) | Honeypot field + server-side rate limiting in FastAPI |

---

## 8. Testing Strategy

| Layer | Tool | Coverage |
|-------|------|---------|
| Unit | `tests/tests.js` (vanilla) | `utils.js` pure functions, `renderer.js` templates |
| Integration | `tests/test-runner.html` | Navigation routing, section mounting, FAQ accordion, form validation |
| Visual / E2E | Manual + Lighthouse | All four sections, responsive layouts |
| Accessibility | axe DevTools, Lighthouse | All pages |

See `tests/tests.js` for full test cases.

---

## 9. Performance Budget

| Metric | Target |
|--------|-------|
| HTML | ≤ 10KB |
| CSS (total) | ≤ 40KB |
| JS (total) | ≤ 60KB |
| Fonts (Inter, woff2) | ≤ 50KB (cached) |
| Images | 0 (Phase 1) |
| **Total** | **≤ 160KB** |

---

## 10. Deployment

### Phase 1 — Local Development
```bash
# No build step needed. Serve with any HTTP server:
npx serve src/           # Node
python3 -m http.server   # Python (from src/)
```

### Phase 2 — Production (FastAPI)
```
FastAPI app serves src/ as StaticFiles at "/"
Dynamic routes at "/api/v1/"
YAML configs loaded at startup into Pydantic models
```

### Phase 3 — CDN
```
Build: minify HTML/CSS/JS → dist/
Deploy: Cloudflare Pages / AWS CloudFront
Origin shield → FastAPI on EC2 / ECS
```
