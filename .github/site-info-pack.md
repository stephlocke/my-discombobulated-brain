# Site Information Pack — My Discombobulated Brain

> **Purpose**: This document is the single source of truth for site context. All Copilot agents in `.github/agents/` reference it when performing reviews or generating code. Keep it up to date whenever the site's mission, design system, or tech stack changes.

---

## 1. Organisation Overview

| Field | Value |
|---|---|
| **Organisation name** | My Discombobulated Brain / Mental Health Charity |
| **Website** | <https://stephlocke.com/my-discombobulated-brain/> |
| **Repository** | `stephlocke/my-discombobulated-brain` |
| **Owner / maintainer** | @stephlocke |
| **Primary purpose** | Mental health charity website providing support, education, and community for people experiencing mental health challenges |

### Mission Statement
> We are dedicated to providing compassionate support, education, and community for those experiencing mental health challenges — breaking down stigma and making mental health resources accessible to everyone.

### Three Pillars
1. **Support** — Compassionate resources and crisis information for those in need
2. **Education** — Raising awareness and breaking down stigma
3. **Community** — Building inclusive spaces where no one feels alone

---

## 2. Brand Voice

### Tone of Voice
- **Compassionate and empathetic** — Always centre the feelings and experiences of the reader
- **Hopeful but honest** — Acknowledge difficulty while reinforcing that support exists
- **Accessible and plain** — Avoid clinical jargon, complex acronyms, and academic language
- **Inclusive and affirming** — Use affirming, person-first language; never blame or shame
- **Action-oriented** — Guide the reader clearly towards next steps (contact, resources, community)

### Writing Principles
- Use **second person** ("you") to speak directly to the reader
- Use **first person plural** ("we") for the organisation
- Sentence lengths: mix short punchy sentences with medium ones; avoid walls of text
- Use Oxford commas; use em dashes (—) for parenthetical clauses
- Avoid: stigmatising terms (`crazy`, `lunatic`, `commit` suicide), negative imperatives, passive voice
- Prefer: `died by suicide`, `living with depression`, `experiencing a mental health challenge`
- Headlines should be empathetic and solution-focused, not alarming or sensationalist

### Voice Examples
| ❌ Avoid | ✅ Prefer |
|---|---|
| "Suffering from mental illness?" | "Going through a tough time? You're not alone." |
| "Get help now!" | "Reach out whenever you're ready — we're here." |
| "Crazy deals on resources" | "Free resources, crafted with care" |
| "All users must register" | "Join our community — it only takes a minute." |

---

## 3. Ideal Customer Profile (ICP)

### Primary Audience — People Seeking Support
- **Who**: Adults (18+) experiencing anxiety, depression, stress, or other mental health challenges
- **Needs**: Non-judgmental information, crisis contacts, a sense of community
- **Barriers**: Stigma, fear of being misunderstood, limited energy to navigate complex sites
- **Behaviour**: Often searching in moments of distress; mobile-first; may have limited concentration

### Secondary Audience — Supporters and Carers
- **Who**: Family members, friends, and carers of people experiencing mental health challenges
- **Needs**: Guidance on how to help, educational resources, community connection
- **Behaviour**: Researching on behalf of others; desktop more common; looking for clear guidance

### Tertiary Audience — Professionals and Advocates
- **Who**: Mental health workers, HR professionals, community leaders
- **Needs**: Shareable resources, educational content, partnership opportunities
- **Behaviour**: Desktop; looking for credibility signals and structured content

### Audience Implications for Design and Content
- Never bury crisis/contact information — it must be easy to find on every page
- Minimise cognitive load: short paragraphs, clear headings, no pop-ups
- Ensure WCAG 2.1 AA compliance at minimum; target AAA where practical
- Mobile-first design is non-negotiable for the primary audience
- Performance matters: the primary audience may be on mobile data or low-spec devices

---

## 4. Design System

### Colour Palette

| Token | Light Mode | Dark Mode | Usage |
|---|---|---|---|
| `--color-primary` | `oklch(63.5% 0.15 158)` — teal | `oklch(40% 0.1 164)` — dark teal | CTAs, links, highlights |
| `--color-primary-darken` | `oklch(54% 0.13 158)` | `oklch(37% 0.09 162)` | Hover states on primary |
| `--color-secondary` | `yellow-500` | `yellow-700` | Accent, warnings |
| `--color-secondary-darken` | `yellow-700` | `yellow-900` | Hover states on secondary |
| `--color-body` | `white` | `gray-900` | Page background |
| `--color-off-black` | `gray-700` | — | Body text |
| `--color-off-black-darken` | `gray-800` | — | Strong body text |
| `--color-white-darken` | `gray-200` | — | Subtle backgrounds |

All colours are defined as CSS custom properties in `assets/css/main.css` under `@theme {}`.

### Typography
- **Font family**: Exo (Google Fonts) — `--font-exo: 'Exo', sans-serif;`
- Applied via Tailwind utility classes; body copy is `font-exo` by default
- Heading hierarchy must be respected (H1 → H2 → H3); never skip levels

### Spacing and Layout
- Tailwind v4 spacing scale; prefer semantic spacing classes (`p-4`, `gap-6`, etc.)
- Max content width: use `container mx-auto` with appropriate padding
- Grid: mobile-first, typically 1 col → 2 col → 3 col breakpoints

### Component Library

| Component | File | Usage |
|---|---|---|
| Button | `layouts/partials/components/button.html` | All interactive buttons across the site |
| Overview Card | `layouts/partials/components/overview-card.html` | Feature/pillar cards on home and section pages |
| Footer CTA | `layouts/partials/components/footer-cta.html` | End-of-page call-to-action blocks |

**Button variants**: `solid`, `outline`, `solid-alt`, `outline-alt`, `ghost`, `danger`, `success`, `warning`

### Dark Mode
- Implemented via a `.dark` class on `<html>`; NOT using `prefers-color-scheme` media query directly
- JavaScript in `header.html` manages three states: `light`, `dark`, `auto` (follows system)
- Preference persisted in `localStorage` under the key `theme`
- All components must include `dark:` variant classes where colours or backgrounds differ

### Icons
- **Font Awesome** (CDN) — referenced as `fa-solid fa-{icon-name}` in class attributes
- Used in Overview Cards (`icon` front matter field maps to FA icon name)

---

## 5. Technology Stack

| Layer | Technology | Version | Notes |
|---|---|---|---|
| Static site generator | Hugo (extended) | `0.146.6` | Extended for asset processing |
| CSS framework | Tailwind CSS v4 | `^4.2.1` | Via `@tailwindcss/cli`; config in `assets/css/main.css` |
| CMS | Sveltia CMS | latest | Git-based; admin at `/admin/` |
| Auth | GitHub OAuth + Cloudflare Worker | — | Worker URL in `static/admin/config.yml` |
| Hosting | GitHub Pages | — | Deployed via GitHub Actions |
| CI/CD | GitHub Actions | — | `.github/workflows/deploy.yml` |
| Fonts | Google Fonts | — | Exo family |
| Icons | Font Awesome | CDN | Free tier |
| Package manager | npm | — | `package.json` in repo root |

### Key File Locations
- Site config: `config.toml`
- CSS entry point: `assets/css/main.css`
- Custom styles: `assets/css/custom.css` (currently empty — extend here)
- Base layout: `layouts/_default/baseof.html`
- Home page layout: `layouts/index.html`
- CMS config: `static/admin/config.yml`
- Hugo build stats (for Tailwind purging): `hugo_stats.json`

---

## 6. SEO and AEO Strategy

### Target Keywords
- Primary: `mental health charity`, `mental health support`, `mental health resources`
- Secondary: `mental health community`, `mental health awareness`, `wellbeing support`
- Long-tail: `free mental health resources UK`, `how to support someone with mental health`

### SEO Conventions
- Every page must have a unique `<title>` and `<meta name="description">`
- Descriptions should be 120–160 characters
- `<h1>` should appear exactly once per page and include a target keyword naturally
- Images must have descriptive `alt` text — never empty except for purely decorative images
- Open Graph (`og:`) and Twitter Card (`twitter:`) tags are generated in `layouts/partials/head.html`
- Canonical URLs are set automatically

### AEO (Answer Engine Optimisation)
- Structure FAQ and resource content using clear question-based headings
- Add FAQ schema (`schema.org/FAQPage`) to relevant blog posts and resource pages
- Use structured data for Organisation, WebSite, and BreadcrumbList
- Write content that directly answers the questions the primary audience is searching

### Performance Targets
- Lighthouse Performance score: ≥ 90
- Lighthouse Accessibility score: ≥ 95
- Core Web Vitals: all green
- CSS is minified and fingerprinted in production

---

## 7. Accessibility Standards

- **Target**: WCAG 2.1 AA minimum; AAA where practical (especially for crisis/contact content)
- Semantic HTML elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- Skip-to-main-content link in every page (implemented in `baseof.html`)
- All interactive elements have visible focus rings (`focus-visible:ring-*` Tailwind classes)
- ARIA labels on icon-only buttons and navigation toggles
- Colour contrast ratios must meet WCAG AA (4.5:1 for normal text, 3:1 for large text)
- `prefers-reduced-motion` media query respected for any animations
- `lang="en-us"` on `<html>`; update if content is translated

---

## 8. Content Strategy

### Content Types
1. **Blog posts** — Mental health resources, stories, and educational articles; stored under `content/blog/`
2. **Pages** — Static pages (About, Contact); stored as individual `content/*.md` files
3. **CTA blocks** — Reusable call-to-action sections; stored under `content/cta/`

### Front Matter Schema (Blog Posts)
```yaml
title: ""
description: ""          # 120–160 chars for SEO
date: YYYY-MM-DDTHH:MM:SS+00:00
draft: false
categories: []
tags: []
featured_image: ""       # path relative to static/images/
```

### Editorial Workflow (Sveltia CMS)
Draft → Review → Publish (editorial workflow enabled in CMS config)

### Content Tone Checklist
- [ ] Empathetic, non-stigmatising language throughout
- [ ] Crisis information visible or linked where relevant
- [ ] Person-first language used consistently
- [ ] Clear call-to-action at end of post

---

## 9. Social Media Presence

| Platform | Handle / URL |
|---|---|
| Bluesky | Linked in site header |
| LinkedIn | Linked in site header |
| YouTube | Linked in site header |

Social links are configured in `layouts/partials/header.html` and `layouts/partials/footer.html`.

---

## 10. Crisis Information Protocol

Crisis and safety information must:
- Appear in the footer on **every page** (currently implemented in `layouts/partials/footer.html`)
- Appear inline at the end of **every blog post** (implemented in `layouts/_default/single.html`)
- Never be hidden behind a toggle or collapsed UI element
- Include at minimum: a crisis helpline reference and the "Get Help" CTA button

---

## 11. Development Conventions

- Hugo templates use `{{- ... -}}` whitespace trimming consistently
- Partials are passed a `dict` context when they need multiple parameters
- All new layout components go in `layouts/partials/components/`
- New content types require an archetype in `archetypes/`
- Tailwind classes are purged via `hugo_stats.json`; rebuild stats after adding new classes
- Do not add inline `<style>` blocks; use Tailwind utilities or `assets/css/custom.css`
- JavaScript is inline in the relevant partial (no separate JS build pipeline currently)
- `config.toml` is the single site configuration file; do not add `hugo.yaml` or `hugo.json`
- Branch `main` is the production branch; GitHub Actions deploys on push to `main`
