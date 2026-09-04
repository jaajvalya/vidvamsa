# Design Document
## Vidvamsa Technology Services Website

**Version:** 1.0  
**Date:** September 2026  
**Status:** Approved  

---

## 1. Design Philosophy

The Vidvamsa website communicates **credibility, clarity and capability**. The design language is:

- **Professional** — Blue and white palette signals trust, technology and precision.
- **Minimal** — Content-first; no visual clutter, no decorative gradients on components.
- **Purposeful** — Every element serves the user's journey from awareness to contact.
- **Accessible** — WCAG 2.2 AA compliance is non-negotiable.

---

## 2. Colour System

All colours are defined as CSS Custom Properties in `src/css/variables.css`.

### 2.1 Brand Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#1A3C6E` | Headings, page-header bands, CTA band |
| `--color-secondary` | `#0077CC` | Links, primary buttons, active states |
| `--color-accent` | `#00A8E8` | Active nav indicator, hero accent text, badges |
| `--color-sidebar-bg` | `#0F2D54` | Sidebar background |

### 2.2 Surface Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#F0F6FF` | Page background |
| `--color-surface` | `#FFFFFF` | Cards, panels, forms |
| `--color-surface-hover` | `#F7FAFF` | Card hover state |

### 2.3 Typography Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-text-dark` | `#1A1A2E` | Headings, labels |
| `--color-text-medium` | `#4A5568` | Body copy |
| `--color-text-light` | `#718096` | Muted text, helper text |
| `--color-sidebar-text` | `#E8F4FD` | Sidebar nav labels |
| `--color-sidebar-muted` | `#94B8D8` | Sidebar secondary text |

### 2.4 Semantic Tokens

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-success` | `#2E7D32` | Success alerts |
| `--color-error` | `#C62828` | Error alerts, required field markers |
| `--color-warning` | `#E65100` | Warning states |

### 2.5 Contrast Ratios (WCAG 2.2 AA)

| Foreground | Background | Ratio | Pass |
|-----------|-----------|-------|------|
| `#FFFFFF` text | `#0F2D54` sidebar | 13.2:1 | ✓ AAA |
| `#1A1A2E` heading | `#FFFFFF` | 18.8:1 | ✓ AAA |
| `#4A5568` body | `#FFFFFF` | 7.1:1 | ✓ AA |
| `#0077CC` link | `#FFFFFF` | 4.6:1 | ✓ AA |
| `#00A8E8` active | `#0F2D54` | 5.3:1 | ✓ AA |

---

## 3. Typography System

Font family: **Inter** (Google Fonts). System fallback: `Segoe UI, system-ui, -apple-system, sans-serif`.

### 3.1 Type Scale

| Token | Size | Usage |
|-------|------|-------|
| `--text-xs` | 12px | Eyebrows, badges, captions |
| `--text-sm` | 14px | Body copy in cards, form labels |
| `--text-base` | 16px | Default body text |
| `--text-lg` | 18px | Lead paragraphs, hero subtext |
| `--text-xl` | 20px | Card titles |
| `--text-2xl` | 24px | H3 |
| `--text-3xl` | 30px | H2, section titles |
| `--text-4xl` | 36px | H1, page titles |
| `--text-5xl` | 48px | Hero headline |

### 3.2 Weight Usage

| Weight | Usage |
|--------|-------|
| 300 Light | Large display text, decorative |
| 400 Regular | Body copy |
| 500 Medium | Nav labels, button labels |
| 600 Semi-bold | Card titles, section eyebrows |
| 700 Bold | Headings, hero headline |

---

## 4. Layout

### 4.1 App Shell

```
┌──────────────────────────────────────────────────────┐
│  Sidebar (260px fixed, left)  │  Main Content (fluid) │
│                               │                       │
│  [V] Vidvamsa                 │  ┌─ Hero / Header ─┐  │
│      Engineering Tomorrow     │  │                 │  │
│                               │  └─────────────────┘  │
│  ▸ Home                       │                       │
│  ▸ Services                   │  ┌─ Content Grid ──┐  │
│  ▸ Support                    │  │  Cards / Forms  │  │
│  ▸ Contact Us                 │  └─────────────────┘  │
│                               │                       │
│  © 2026 Vidvamsa              │  ┌─ Footer ─────────┐ │
│                               │  └──────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### 4.2 Grid System

| Grid | Columns | Use case |
|------|---------|----------|
| `.grid-2` | 2 equal | Form row pairs, two-up layouts |
| `.grid-3` | 3 equal | Service cards, discipline cards |
| `.grid-4` | 4 equal | Stats bar, values strip |
| `.grid-auto` | auto-fill 280px | Responsive card grids |

### 4.3 Spacing Scale (8px grid)

All margins and paddings use multiples of 8px, defined as `--space-N` tokens.

### 4.4 Responsive Breakpoints

| Breakpoint | Width | Behaviour |
|-----------|-------|-----------|
| Desktop (default) | > 1024px | Sidebar visible, full grids |
| Tablet | 768–1024px | Sidebar narrows to 220px |
| Mobile | < 768px | Sidebar hidden, hamburger menu appears |

---

## 5. Component Library

### 5.1 Buttons

| Variant | Class | Use |
|---------|-------|-----|
| Primary | `.btn--primary` | Hero CTA, submit |
| Outline | `.btn--outline` | Secondary actions |
| Ghost | `.btn--ghost` | Tertiary/subtle |
| White | `.btn--white` | On dark backgrounds |
| White Outline | `.btn--white-outline` | Secondary on dark |

Sizes: `.btn--sm`, (default), `.btn--lg`

### 5.2 Cards

Base: `.card`  
Variants: `.card--featured` (accent border), `.card--flat` (no border)  
Cards contain: `.card__icon-wrapper`, `.card__eyebrow`, `.card__title`, `.card__text`, `.card__list`

### 5.3 Forms

- Labels use `.form__label`, required fields get `.form__label--required` (appends `*`).
- All controls styled via `.form__control`.
- Select wrapper adds a custom chevron via `.form__select-wrapper`.

### 5.4 FAQ Accordion

Toggle `.is-open` on `.faq-item` to expand. Chevron rotates 180° via CSS transition.  
ARIA: `aria-expanded` on button, `aria-hidden` on answer panel.

---

## 6. Motion & Animation

Defined in `src/css/animations.css`.

| Animation | Duration | Used for |
|-----------|----------|----------|
| `fadeSlideIn` | 350ms | Page section transitions |
| `slideUp` | 350ms | Cards entering viewport |
| `fadeIn` | 350ms | Overlays |
| `spin` | 800ms | Loading spinners |

Stagger classes (`.stagger-1` through `.stagger-6`) add 50ms delay increments for grid children.

**Reduced motion:** All animations are disabled via `@media (prefers-reduced-motion: reduce)`.

---

## 7. Icon System

Inline SVG icons derived from the Feather icon set. Managed in `src/js/utils.js → ICON_PATHS`.  
Icons are rendered as `<svg>` strings (no external font or CDN request at runtime).  
Size defaults to 20px; adjustable via the `icon(name, size)` utility.

---

## 8. Sidebar Design

- Background: `--gradient-sidebar` (`#0F2D54` → `#0A1F3D`)
- Active nav item: Sky-blue background tint + left 3px accent bar
- Width: 260px desktop / 220px tablet / off-canvas mobile
- Company mark: 40px rounded square, accent blue, displays `V` monogram

---

## 9. Section Page Headers

Inner pages (Services, Support, Contact) use a `.page-header-band` at the top:
- Background: `--color-primary` (`#1A3C6E`)
- Bottom accent bar: 4px gradient stripe
- Eyebrow + H1 + description pattern

---

## 10. Future Design Considerations

- **Dark Mode:** CSS custom property overrides are pre-structured in `variables.css`.
- **Micro-interactions:** Hover state transitions are prepared; complex animations deferred to Phase 2.
- **Illustration / Icons:** Hero background pattern and team illustrations deferred to Phase 2.
- **Design System export:** Figma tokens will sync with `variables.css` in Phase 2.
