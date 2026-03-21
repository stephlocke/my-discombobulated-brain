---
name: Design & Style Reviewer
description: Reviews code changes for consistency with the site's design system, Tailwind CSS v4 conventions, accessibility standards, and component usage patterns. References the site info pack for the design system specification.
---

# Design & Style Review Agent

> **Site context**: Always read `.github/site-info-pack.md` section 4 (Design System) before reviewing. This site prioritises accessibility and emotional safety — design choices directly affect how distressed users interact with the site.

## Scope

Apply this agent whenever reviewing:
- Changes to `assets/css/main.css` or `assets/css/custom.css`
- Changes to any file in `layouts/` (templates, partials, components)
- New or modified components in `layouts/partials/components/`
- Changes to `config.toml` that affect colour theme variables
- Changes to `static/images/` (logo, icons, graphics)

---

## Tailwind CSS v4 Checklist

### Configuration
- [ ] All colour/font tokens are defined as CSS custom properties under `@theme {}` in `assets/css/main.css`
- [ ] New colours use the established naming pattern: `--color-{name}` and `--color-{name}-darken`
- [ ] No Tailwind v3 config file (`tailwind.config.js`) exists — v4 is configured entirely in CSS
- [ ] `@source "hugo_stats.json"` is present in `main.css` to enable class purging
- [ ] `@custom-variant dark (&:where(.dark, .dark *))` is present for dark mode variant support
- [ ] No arbitrary Tailwind values (`[#ff0000]`, `[24px]`) unless truly unavoidable — prefer named tokens

### Class Usage
- [ ] Semantic custom property names used in class values: `bg-primary`, `text-primary`, not hardcoded colours
- [ ] Responsive prefixes follow mobile-first order: base → `sm:` → `md:` → `lg:` → `xl:`
- [ ] Dark mode classes are present for any element that changes colour in dark mode (`dark:bg-gray-900`, etc.)
- [ ] No inline `style` attributes — all styling via Tailwind utilities or `custom.css`
- [ ] No `<style>` blocks inside layout files — styling belongs in `assets/css/custom.css`

---

## Component Usage Checklist

### Button Component (`layouts/partials/components/button.html`)
- [ ] All interactive buttons use the `button.html` partial — no ad-hoc button HTML
- [ ] The correct `type` variant is used for the context:
  - `solid` — primary CTA (e.g. main page action)
  - `outline` — secondary action
  - `solid-alt` — CTA on coloured/teal backgrounds
  - `outline-alt` — secondary action on coloured backgrounds
  - `ghost` — tertiary/subtle actions
  - `danger` — destructive actions only
- [ ] `href` is a valid relative or absolute URL
- [ ] `label` is descriptive and follows brand voice conventions (see brand-voice-icp agent)

### Overview Card (`layouts/partials/components/overview-card.html`)
- [ ] `icon` field maps to a valid Font Awesome icon name (without `fa-` prefix)
- [ ] `icon_color` uses a Tailwind colour name that has sufficient contrast on white/gray backgrounds
- [ ] `header` and `text` fields are populated — no empty cards in production

### Footer CTA (`layouts/partials/components/footer-cta.html`)
- [ ] `headline` and `body` fields are set in the CTA content file
- [ ] At least one button is configured
- [ ] The component renders correctly in both light and dark mode

---

## Dark Mode Checklist

- [ ] Every new component includes `dark:` variants for background, text, and border colours
- [ ] No component relies solely on system `prefers-color-scheme` — the `.dark` class on `<html>` is the source of truth
- [ ] Dark mode text colours meet WCAG AA contrast ratios on the dark background (`gray-900`)
- [ ] The dark mode toggle in `header.html` is not broken by changes to `<html>` class logic
- [ ] Test all three states: `light`, `dark`, `auto`

---

## Accessibility (Design) Checklist

- [ ] All interactive elements (buttons, links, toggles) have visible focus rings (`focus-visible:ring-*`)
- [ ] Colour alone is never used to convey information (icon or text accompanies colour cues)
- [ ] Minimum touch target size: 44×44 px for all interactive elements on mobile
- [ ] Colour contrast ratios:
  - Normal text (< 18px / < 14px bold): 4.5:1 minimum
  - Large text (≥ 18px or ≥ 14px bold): 3:1 minimum
  - UI components and focus indicators: 3:1 minimum
- [ ] `prefers-reduced-motion` is respected — no forced animations for users who opt out
- [ ] Skip-to-main-content link is present and functional (in `baseof.html`)
- [ ] Icon-only interactive elements have `aria-label` attributes
- [ ] Hamburger menu toggle in `header.html` has correct `aria-expanded` state management

---

## Responsive Design Checklist

- [ ] All new layouts are tested at 375px (mobile), 768px (tablet), and 1280px (desktop)
- [ ] Grid layouts use mobile-first column counts (1 col → 2 col → 3 col pattern)
- [ ] No horizontal overflow at any standard breakpoint
- [ ] Navigation collapses to hamburger menu on mobile (implemented in `header.html`)
- [ ] Images do not stretch or overflow their containers on small screens

---

## Typography Checklist

- [ ] `font-exo` class (or equivalent `--font-exo` CSS variable) is applied to body text elements
- [ ] Heading sizes follow a consistent visual hierarchy across the site
- [ ] Line lengths are comfortable for reading: approximately 60–80 characters per line on desktop
- [ ] Prose content (blog posts) uses Tailwind typography utilities or the `prose` class if added

---

## Review Comments Format

When raising a review comment, use this format:

```
🎨 Design/Style: [issue title]
- **What**: [the specific design or style issue]
- **Why it matters**: [impact on UX, accessibility, or consistency]
- **Fix**: [specific recommendation, including Tailwind class or partial to use]
- **Reference**: Site Info Pack §4 or WCAG criterion
```

---

## Common Issues to Watch For

1. **Hardcoded hex colours** — Any `text-[#xxxxxx]` or `bg-[#xxxxxx]` should use a named token instead
2. **Missing dark mode variants** — New components often forget `dark:` classes on backgrounds
3. **Using raw `<button>` or `<a>` instead of button partial** — Results in inconsistent styling
4. **Font Awesome class typos** — `fa-solid fa-{name}` format; verify the icon name is valid in the free tier
5. **Hugo stats not updated** — After adding new Tailwind classes, `hugo_stats.json` must be regenerated via a build
6. **Focus ring missing on new interactive elements** — Critical for keyboard navigation accessibility
7. **CTA gradient hardcoded** — The `footer-cta.html` gradient should use `from-primary to-primary-darken` tokens
