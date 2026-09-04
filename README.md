# Vidvamsa — Technology Services Website

> Engineering Tomorrow, Today

A clean, blue-and-white single-page application for Vidvamsa Technology Services. Built static-first and architected to evolve into a FastAPI + AI platform.

---

## Quick Start

No build tools required. Serve the `src/` directory over HTTP:

```bash
# Node (recommended)
npx serve src/

# Python
cd src && python3 -m http.server 8080

# Then open: http://localhost:8080
```

---

## Project Structure

```
Vidvamsa/
├── config/            # YAML configuration (single source of truth)
│   ├── site.yml       # Company, nav, hero, stats, theme
│   ├── services.yml   # All six service definitions
│   ├── team.yml       # Disciplines and values
│   └── contact.yml    # Support, FAQ, form fields
├── docs/              # Project documentation
│   ├── approach.md    # Strategy and phasing
│   ├── design.md      # Design system and tokens
│   ├── requirements.md# FR/NFR requirements
│   ├── technical-spec.md # Full technical specification
│   └── architecture.drawio # System architecture (open in draw.io)
├── src/
│   ├── index.html     # HTML shell
│   ├── css/           # Modular CSS (variables → base → layout → components)
│   └── js/            # ES Modules (config, utils, navigation, sections)
└── tests/             # Test suite (no framework; run over HTTP)
```

---

## Configuration

All content is config-driven. To change business content, edit:

| File | Controls |
|------|---------|
| `config/site.yml` | Company name, nav items, hero text, stats |
| `config/services.yml` | Service cards, delivery process |
| `config/team.yml` | Disciplines, skills, tools, values |
| `config/contact.yml` | Support channels, SLA, FAQ, form fields |

Then mirror changes in `src/js/config.js` (Phase 2 will automate this sync via FastAPI).

---

## Running Tests

```bash
# Serve from project root
npx serve .

# Open in browser
http://localhost:3000/tests/test-runner.html
```

---

## Sections

| Section | Route | Description |
|---------|-------|-------------|
| Home | `#home` | Hero, stats, featured services, team preview |
| Services | `#services` | All 6 services, AI spotlight, delivery process |
| Support | `#support` | Channels, SLA table, FAQ accordion |
| Contact | `#contact` | Contact form, info panel, social links |

---

## Phase Roadmap

| Phase | Status | Description |
|-------|--------|-------------|
| 1 — Static Site | **Current** | HTML/CSS/JS, config-driven |
| 2 — FastAPI Backend | Planned | Contact API, dynamic config |
| 3 — AI Platform | Planned | Chatbot, workflow automation |
| 4 — CDN + Scale | Planned | Cloudflare Pages, monitoring |

---

## Tech Stack

- **Frontend:** Vanilla JavaScript (ES Modules), CSS Custom Properties
- **Config:** YAML (canonical) + JS mirror (runtime)
- **Backend (future):** Python 3.12, FastAPI, Pydantic v2
- **AI (future):** LangChain / LlamaIndex, OpenAI / Anthropic

---

## Architecture

Open `docs/architecture.drawio` in [draw.io](https://app.diagrams.net) for the full system architecture diagram.

---

&copy; 2026 Vidvamsa. All rights reserved.
