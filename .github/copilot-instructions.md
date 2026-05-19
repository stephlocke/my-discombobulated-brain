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

#### Icon Component
Icons are handled via `layouts/partials/components/icon.html`. Render icons with the `icon` partial, passing `name` (required) and optional `class`:
```html
{{ partial "components/icon" (dict "name" "facebook" "class" "h-6 w-6") }}
```

**Supported icon names:**
- Social: `facebook`, `instagram`, `x-twitter`, `youtube`
- Functional: `music`, `toolbox`, `hand-holding-hand`
- Unsupported names fall back to a generic info icon

**Usage:**
- `name`: Icon identifier (required)
- `class`: SVG Tailwind classes (default: `h-5 w-5`). Always use Tailwind size classes, never hardcoded dimensions.
- All icons include `aria-hidden="true"` automatically (decorative by default). Pair with `aria-label` on parent element if icon conveys meaning.

### Tailwind CSS v4
- All colours and font tokens are CSS custom properties in `assets/css/main.css` under `@theme {}`
- Use named token classes (`bg-primary`, `text-primary`) and semantic custom tokens, not hardcoded Tailwind palette colour classes
- Use only defined colour tokens/classes. Do not add hardcoded colour values in templates, classes, or CSS (for example, avoid inline `style` colours, arbitrary colour utilities, or literal hex/rgb/oklch values in layout files).
- If a needed colour token does not exist yet, add or update the custom theme tokens in `assets/css/main.css` first, then use those tokens in templates and styles
- Prefer inline Tailwind utility classes in layout/partial templates for component styling. Use `assets/css/modules/layout.css` only for shared cross-component rules, global utilities, keyframes, or cases that cannot be expressed cleanly inline.
- **Rounding (edges parameter):** All cards, buttons, and rounded components must respect the `style_rules.edges` parameter. Extract `$edgesStyle := .Site.Params.style_rules.edges | default "round"` and apply conditional rounding: `sharp` → `rounded-none`, `curved` → `rounded-lg`, `round` → `rounded-full` (buttons) or `rounded-[2rem]`/`rounded-[3rem]` (cards). This ensures consistency across the site when the edges setting changes.
- **Config-driven styling is required:** Any new UI component or visual behaviour must check and use values from `params.style_rules` in `config.toml` where relevant. Do not hardcode styles that duplicate or bypass these controls.
- **When building or updating components, verify style_rules integration:**
  - `style_rules.edges`: shape/rounding via shared logic (prefer `components/edge-rounding`)
  - `style_rules.expanded_nav`: navigation expansion/compact behaviour
  - `style_rules.hero_format`: hero layout mode selection
  - `style_rules.hero_image`: hero background media source
  - `style_rules.stacked_button_position`: alignment of stacked button groups
  - `style_rules.primary_color` and `style_rules.secondary_color`: site theme colours
  - `style_rules.title_font` and `style_rules.body_font`: typography families
- Prefer shared partials/helpers for style_rules behaviour instead of re-implementing conditional class logic in multiple files.
- Do not add `dark:` variants or other dark mode styles unless explicitly requested
- Do not add a `tailwind.config.js` file — v4 is configured in CSS only
- Do not add inline `<style>` blocks in layout files

### Accessibility (Non-Negotiable) — WCAG 2.1 AA Compliant

**Read `ACCESSIBILITY.md` for complete guidelines.** This section covers critical patterns.

#### Keyboard Navigation
- All interactive elements (buttons, links, form inputs) must be keyboard accessible
- Tab order must be logical (header → main → footer)
- No keyboard traps
- Skip to main content link must be first focusable element

#### Focus Indicators
- **Every** interactive element must have visible focus indicator
- Use pattern: `focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`
- Never remove focus indicators without replacing with visible alternative
- Focus ring offset uses `ring-offset-body` or appropriate background colour

#### Semantic HTML (Non-Negotiable)
- Use semantic elements always: `<header role="banner">`, `<nav aria-label="...">`, `<main id="main-content">`, `<article>`, `<footer role="contentinfo">`
- Proper heading hierarchy: one `<h1>` per page, sequential h2-h6 (no skipping)
- Link text must describe destination (no "click here")
- Buttons use `<button>` element (not `<a>` styled as button)

#### Screen Reader Support
- All images have meaningful `alt` text:
  - Decorative images: `alt=""` with `aria-hidden="true"`
  - Content images: descriptive alt (80 characters max)
  - Logo: `alt="{{ .Site.Title }}"`
- Screen reader only text uses `.sr-only` class:
  ```html
  <span class="sr-only">Email:</span>
  <a href="mailto:...">email@example.com</a>
  ```
- Navigation and landmark areas have `aria-label`:
  ```html
  <nav aria-label="Main navigation">
  <nav aria-label="Footer navigation">
  <nav aria-label="Legal links">
  ```

#### ARIA Attributes
- `aria-label`: Buttons with icon-only, unclear text, or interactive elements
  ```html
  <button aria-label="Toggle mobile menu">☰</button>
  <button aria-label="Back to top">↑</button>
  ```
- `aria-expanded`: Collapsible/toggleable elements
  ```html
  <button aria-expanded="false" aria-controls="mobile-menu">Menu</button>
  ```
- `aria-current="page"`: Active navigation link
  ```html
  <a href="/blog" aria-current="page">Blog</a>
  ```
- `aria-hidden="true"`: Decorative elements (SVG icons, visual separators)
  ```html
  <svg aria-hidden="true"><!-- decorative --></svg>
  ```

#### Touch Targets & Click Areas
- Minimum 44px height/width for all clickable elements: `min-h-11` or `min-w-11`
- Adequate spacing between touch targets (8px minimum)
- No overlapping click areas

#### Color & Contrast
- Text: minimum 4.5:1 contrast ratio (WCAG AA)
- Crisis/contact content: 7:1 contrast ratio (WCAG AAA)
- Use semantic colour tokens (`text-primary`, `bg-primary`) not hardcoded colours
- Colour alone must not convey information (use text, icons, or patterns)

#### Motion & Animation
- Respect `prefers-reduced-motion: reduce` media query
- Disable animations for users who opt out:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01ms !important; }
  }
  ```
- Check user preference in JavaScript:
  ```javascript
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  ```

#### Form Accessibility
- All form inputs have associated `<label with for="id">`
- Hidden form inputs use `aria-label`
- Clear focus indicators on all inputs
- Error messages associated with inputs
- Required fields marked and announced

#### Heading Hierarchy
- One `<h1>` per page (page title)
- Sequential heading levels (h2 → h3 → h4, no skips)
- Descriptive heading text
- Sections link to headings via `aria-labelledby`:
  ```html
  <section aria-labelledby="blog-heading">
    <h2 id="blog-heading">Latest Blog Posts</h2>
  </section>
  ```

#### Testing Before Commit
- [ ] Keyboard: Tab through page, all elements accessible
- [ ] Screen reader: Test with NVDA, JAWS, or VoiceOver
- [ ] Focus indicators: All interactive elements have visible focus
- [ ] Colour contrast: Test with Lighthouse or axe DevTools
- [ ] Mobile: Touch targets 44px+, accessible at all breakpoints
- [ ] Motion: Verify `prefers-reduced-motion` respected
- [ ] Images: All have alt text
- [ ] Headings: Proper hierarchy, no skipped levels

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

### Accessibility — Do Not
- Do not remove focus indicators or use `focus:outline-none` without `focus:ring-*` replacement
- Do not use images without `alt` text
- Do not create clickable elements smaller than 44px
- Do not use colour alone to convey information
- Do not force animations on users with `prefers-reduced-motion: reduce`
- Do not skip heading levels (no h1 → h3)
- Do not use non-semantic elements for interactive purposes (`<div>` as button)
- Do not hide form inputs without `aria-label`
- Do not use `aria-hidden="true"` on interactive elements
- Do not create keyboard traps or inaccessible tab order
- Do not remove or hide the skip to main content link
