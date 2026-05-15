# GitHub Copilot Instructions

## Site Context

Read **`.github/site-info-pack.md`** for full site context (organisation, mission, audience, design system, and tech stack) before generating or reviewing code. Key sections:
- §2 Brand Voice — tone, language rules, stigma-free writing
- §3 ICP — who visits this site and what they need
- §4 Design System — colour tokens, components, dark mode
- §5 Technology Stack — Hugo + Tailwind v4 + Sveltia CMS
- §6 SEO/AEO Strategy — target keywords, schema requirements
- §11 Development Conventions — file organisation, naming, config rules

---

## Specialised Review Agents

This repository uses six specialised agents for code review. When Copilot reviews a pull request or is asked to review code, apply the relevant agent's checklist from `.github/agents/`:

| Agent | File | Apply when reviewing… |
|---|---|---|
| **SEO & AEO** | `.github/agents/seo-aeo.md` | `head.html`, content files, heading structure, metadata |
| **Brand Voice & ICP** | `.github/agents/brand-voice-icp.md` | All `content/**/*.md`, CTA copy, hardcoded text in templates |
| **Design & Style** | `.github/agents/design-style.md` | `assets/css/`, `layouts/`, Tailwind class usage, components |
| **Hugo Practices** | `.github/agents/hugo-practices.md` | `layouts/`, `config.toml`, `archetypes/`, `hugo_stats.json` |
| **Maintainer** | `.github/agents/maintainer.md` | `package.json`, `.github/workflows/`, `static/admin/config.yml` |
| **Performance** | `.github/agents/performance.md` | `layouts/partials/head.html`, `assets/css/`, images, third-party scripts |

> When reviewing a pull request that touches multiple areas, apply **all relevant agents** and group your comments by agent using the emoji prefix defined in each agent file (🔍 SEO/AEO, 💬 Brand Voice, 🎨 Design/Style, 🦔 Hugo, 🔧 Maintainer, ⚡ Performance).

---

## General Coding Standards

### Hugo Templates
- Use `{{- ... -}}` whitespace trimming in templates
- Pass multiple parameters to partials via `dict`: `{{ partial "foo" (dict "key" "val") }}`
- Use `with` instead of `if` when consuming the truthy value
- Use `$` to access outer scope inside `range` loops
- Components go in `layouts/partials/components/`; partials use kebab-case filenames

### Tailwind CSS v4
- All colours and font tokens are CSS custom properties in `assets/css/main.css` under `@theme {}`
- Use named token classes (`bg-primary`, `text-primary`) and semantic custom tokens, not hardcoded Tailwind palette colour classes
- If a needed colour token does not exist yet, add or update the custom theme tokens in `assets/css/main.css` first, then use those tokens in templates and styles
- **Rounding (edges parameter):** All cards, buttons, and rounded components must respect the `style_rules.edges` parameter. Extract `$edgesStyle := .Site.Params.style_rules.edges | default "round"` and apply conditional rounding: `sharp` → `rounded-none`, `curved` → `rounded-lg`, `round` → `rounded-full` (buttons) or `rounded-[2rem]`/`rounded-[3rem]` (cards). This ensures consistency across the site when the edges setting changes.
- Do not add `dark:` variants or other dark mode styles unless explicitly requested
- Do not add a `tailwind.config.js` file — v4 is configured in CSS only
- Do not add inline `<style>` blocks in layout files

### Accessibility (Non-Negotiable)
- Semantic HTML elements at all times (`<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`)
- All interactive elements have visible focus rings
- All images have `alt` text; decorative images use `alt=""` with `aria-hidden="true"`
- WCAG 2.1 AA minimum; AAA target for crisis/contact content
- Respect `prefers-reduced-motion` for any animations

### Content
- Never use stigmatising mental health language (see brand-voice-icp agent)
- Crisis/contact information must appear on every page — do not remove it
- Use Oxford commas; use commas for parenthetical clauses — do not use em dashes (—) as connectors or parenthetical markers; em dashes are a well-known AI writing signal and read as generated text
- Every blog post must end with the crisis support notice

### Commits and PRs
- Commit messages: imperative mood, ≤72 characters (`add hero section to home page`)
- PRs should be focused: one logical change per PR
- New content types require updates to both the Hugo layout and `static/admin/config.yml`

---

## What Not to Do

- Do not add a `tailwind.config.js` file
- Do not add inline `<style>` tags to layout files
- Do not commit the `public/` directory or `node_modules/`
- Do not remove the crisis support notice from `single.html` or `footer.html`
- Do not hardcode secrets, API keys, or email addresses in tracked files
- Do not use `actions/checkout@main` or other floating action refs — pin to a version tag
- Do not remove `hugo_stats.json` from the repository — it is required for Tailwind class purging in CI
