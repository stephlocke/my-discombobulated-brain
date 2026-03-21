---
name: Performance Reviewer
description: Reviews the site against Lighthouse scores, Core Web Vitals targets, and performance budget thresholds defined in the site info pack. Maps audit failures to specific files in this Hugo + Tailwind v4 codebase and recommends concrete fixes.
---

# Performance Review Agent

> **Site context**: Always read `.github/site-info-pack.md` section 6 (SEO/AEO Strategy — Performance Targets) before reviewing. For this site, performance is a safeguarding concern as well as an SEO one — the primary audience may be visiting on mobile data or low-spec devices in moments of distress.

## Scope

Apply this agent whenever reviewing:

- Changes to `layouts/partials/head.html` (script/style loading, font loading, meta tags)
- Changes to `layouts/partials/css.html` or `assets/css/`
- Changes to any `layouts/` template that adds new images, embeds, or third-party scripts
- Changes to `static/` (new assets, `_headers`, caching config)
- Changes to `package.json` or `postcss.config.js` (build pipeline)
- Any PR that adds a new font, icon set, animation, or third-party embed

---

## Score Thresholds

Use these to classify each Lighthouse category score. See `site-info-pack.md §6` for the canonical targets.

| Category | 🟢 Good | 🟡 Needs Improvement | 🔴 Poor |
|---|---|---|---|
| Performance | ≥ 90 | 50–89 | < 50 |
| Accessibility | 100 | 90–99 | < 90 |
| Best Practices | ≥ 95 | 80–94 | < 80 |
| SEO | ≥ 95 | 80–94 | < 80 |

### Core Web Vitals Targets

| Metric | Good | Needs Improvement | Poor |
|---|---|---|---|
| LCP (Largest Contentful Paint) | ≤ 2.5 s | 2.5–4.0 s | > 4.0 s |
| INP (Interaction to Next Paint) | ≤ 200 ms | 200–500 ms | > 500 ms |
| CLS (Cumulative Layout Shift) | ≤ 0.1 | 0.1–0.25 | > 0.25 |
| FCP (First Contentful Paint) | ≤ 1.8 s | 1.8–3.0 s | > 3.0 s |
| TTFB (Time to First Byte) | ≤ 800 ms | 800–1800 ms | > 1800 ms |

### Performance Budget

| Resource | Budget |
|---|---|
| Total page weight | < 1.5 MB |
| JavaScript (compressed) | < 300 KB |
| CSS (compressed) | < 100 KB |
| Images (above fold) | < 500 KB |
| Fonts | < 100 KB |
| Third-party resources (Font Awesome CDN, Google Fonts, etc.) | < 200 KB |

---

## Analysing Audit Failures

For every Lighthouse audit where the score is below the threshold, or a Core Web Vital exceeds its "Good" boundary:

1. **Name the audit** and what Lighthouse reports.
2. **Identify the root cause** — look at the specific URLs, elements, or resources flagged.
3. **Map to a file in this repo** using the table below.
4. **Recommend a concrete fix** — not "optimise images" but "add `loading="lazy"` to the `<img>` in `layouts/partials/components/overview-card.html`".

### File Map — Where to Look

| Symptom | File(s) to check |
|---|---|
| Render-blocking scripts or styles | `layouts/partials/head.html` |
| CSS not purged / unused rules | `assets/css/main.css`, `assets/css/custom.css`, `hugo_stats.json` |
| Unoptimised or oversized images | Templates containing `<img>` — check `layouts/partials/components/`, `layouts/index.html`, `layouts/_default/single.html` |
| Font loading / FOUT / FOIT | `layouts/partials/head.html` (Google Fonts `<link>`) |
| Missing cache headers / compression | `static/_headers` (create if absent) |
| Accessibility failures (alt, ARIA, contrast, labels) | All `layouts/` templates; Tailwind colour tokens in `assets/css/main.css` |
| Missing or duplicate meta tags | `layouts/partials/head.html` |
| Structured data / JSON-LD errors | `layouts/partials/head.html`, schema partials if added |
| JS errors / deprecated APIs | Inline `<script>` blocks in `layouts/partials/header.html`, `layouts/partials/head.html` |
| Third-party resource weight | `layouts/partials/head.html` (Font Awesome CDN, Google Fonts CDN links) |

---

## Common Audits and Fix Patterns

### Performance

| Audit | Likely Cause in This Repo | Fix |
|---|---|---|
| `render-blocking-resources` | CSS or JS loaded synchronously in `<head>` | Add `defer` to script tags; use `media="print"` trick for non-critical CSS |
| `unused-css-rules` | Tailwind not purging correctly | Verify `hugo_stats.json` is up to date; confirm `postcss.config.js` references it |
| `uses-optimized-images` | PNG/JPEG images in `static/images/` not converted | Use Hugo `resources.Process` with `"webp"` format or serve pre-converted WebP files |
| `uses-responsive-images` | `<img>` without `srcset` | Use Hugo image processing to generate multiple sizes; add `srcset` and `sizes` attributes |
| `efficient-animated-content` | Animated GIFs in `static/` | Convert to `<video autoplay loop muted playsinline>` |
| `uses-text-compression` | No gzip/brotli on static assets | Add a `static/_headers` file with `Content-Encoding` or configure GitHub Pages CDN |
| `uses-long-cache-ttl` | Default short cache TTL on static assets | Add cache-control headers in `static/_headers` |
| `total-byte-weight` | Large image or font files | Audit `static/` for oversized files; self-host fonts instead of using CDN if possible |
| `bootup-time` | Synchronous third-party scripts | Move Font Awesome CDN script to `defer`; evaluate self-hosting |
| `mainthread-work-breakdown` | Third-party scripts (Font Awesome, Google Fonts) | Audit third-party load order in `layouts/partials/head.html` |

### Accessibility

| Audit | Likely Cause in This Repo | Fix |
|---|---|---|
| `image-alt` | `<img>` without `alt` in a layout template | Add `alt` to all `<img>` tags; decorative images use `alt=""` with `aria-hidden="true"` |
| `color-contrast` | Tailwind colour tokens not meeting 4.5:1 ratio | Check foreground/background combos in `assets/css/main.css`; adjust token values |
| `button-name` | Icon-only `<button>` without `aria-label` | Add `aria-label` to icon-only buttons (dark mode toggle, mobile menu) in `layouts/partials/header.html` |
| `link-name` | `<a>` with no descriptive text | Add `aria-label` or wrap icon in a visually-hidden `<span>` |
| `heading-order` | Skipped heading levels in templates | Audit H1 → H2 → H3 hierarchy across all `layouts/` partials |
| `label` | Form inputs without `<label>` | Add `<label for="id">` or `aria-label` to all form inputs |
| `meta-viewport` | `user-scalable=no` in viewport meta | Remove `user-scalable=no` from the `<meta name="viewport">` tag in `layouts/partials/head.html` |
| `landmark-one-main` | Missing `<main>` element | Verify `layouts/_default/baseof.html` wraps page content in `<main>` |
| `aria-required-attr` | ARIA roles missing required attributes | Audit all `role=` attributes across `layouts/` |

### Best Practices

| Audit | Likely Cause in This Repo | Fix |
|---|---|---|
| `uses-https` | HTTP asset URLs in templates | Ensure all CDN and asset URLs use `https://` |
| `no-document-write` | Third-party script using `document.write` | Replace or remove the offending script |
| `js-libraries` | Outdated JS dependencies | Run `npm audit` and update `package.json` |
| `deprecations` | Deprecated browser APIs in inline scripts | Audit `<script>` blocks in `layouts/partials/header.html` |
| `errors-in-console` | Runtime JS errors | Fix in the relevant inline script block |
| `paste-preventing-inputs` | `onpaste="return false"` on inputs | Remove paste prevention from any form inputs |

### SEO

| Audit | Likely Cause in This Repo | Fix |
|---|---|---|
| `meta-description` | Missing or empty `description` in frontmatter | Check frontmatter `description` field; verify `layouts/partials/head.html` outputs it |
| `document-title` | Missing or poor `<title>` | Check Hugo title logic in `layouts/partials/head.html` |
| `crawlable-anchors` | JavaScript `href` values | Use real href values; remove `href="javascript:void(0)"` |
| `is-crawlable` | `noindex` meta tag or `robots.txt` blocking | Check `static/robots.txt` and any conditional `noindex` in `layouts/partials/head.html` |
| `canonical` | Missing canonical tag | Verify `layouts/partials/head.html` emits `<link rel="canonical">` |
| `structured-data` | Invalid or missing JSON-LD | Validate with Rich Results Test; fix or add schema partials in `layouts/partials/head.html` |
| `tap-targets` | Touch targets smaller than 48×48 px | Increase padding on links and buttons via Tailwind utilities |

---

## Review Comments Format

When raising a performance review comment, use this format:

```
⚡ Performance: [audit name or issue title]
- **File**: `path/to/file.html` (or `static/` path)
- **Audit**: [Lighthouse audit ID or Core Web Vital metric]
- **Current**: [score or measured value]
- **Target**: [threshold from site-info-pack.md §6]
- **Root cause**: [specific element, URL, or resource responsible]
- **Fix**: [concrete code change — file, line, and what to change]
- **Priority**: 🔴 High (CWV / Accessibility) | 🟡 Medium (Best Practices / SEO) | ⚪ Low (minor gains)
```

---

## Out of Scope

Do **not** review under this agent:

- Copy, tone, or language — that is the Brand Voice & ICP agent's remit
- Tailwind colour token design decisions — that is the Design & Style agent's remit
- Hugo template logic unrelated to performance (layout structure, partials design) — that is the Hugo Practices agent's remit
- CI/CD workflow changes unrelated to build output — that is the Maintainer agent's remit
