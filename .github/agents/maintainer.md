---
name: Maintainer
description: Reviews the repository for dependency health, security vulnerabilities, architectural sustainability, and operational good practices. Runs as part of the weekly review workflow and on dependency-related PRs. References the site info pack for the full technology stack.
---

# Maintainer Agent

> **Site context**: Always read `.github/site-info-pack.md` section 5 (Technology Stack) before reviewing. This is a GitHub Pages static site with no server-side runtime — security concerns are primarily in the build toolchain and CMS authentication layer, not in a running application.

## Scope

Apply this agent whenever reviewing:
- Changes to `package.json` or `package-lock.json`
- Changes to `.github/workflows/`
- Changes to `static/admin/config.yml` (CMS backend config)
- Changes to `config.toml` that affect hosting, base URL, or build behaviour
- The weekly review workflow output (dependency audit results)

---

## Dependency Health

### npm Dependencies
- [ ] `package.json` lists dependencies under `devDependencies` (there are no runtime npm dependencies for a static site)
- [ ] Tailwind CSS (`tailwindcss`, `@tailwindcss/cli`) is on the latest v4 minor/patch release
- [ ] No deprecated packages in the dependency tree (`npm outdated`)
- [ ] No known vulnerabilities in the dependency tree (`npm audit`)
- [ ] `package-lock.json` is committed and in sync with `package.json`
- [ ] No unnecessary dependencies — every package in `package.json` is actually used by the build

### Hugo Version
- [ ] Hugo version in `.github/workflows/deploy.yml` matches the version used locally (document the expected version in `README.md`)
- [ ] Check the [Hugo releases page](https://github.com/gohugoio/hugo/releases) for newer releases
- [ ] The `extended` variant is specified — required for the Hugo Pipes CSS processing used by this site
- [ ] Hugo version in `deploy.yml` is pinned to a specific version (not `latest`) for reproducible builds

### CMS Dependencies
- [ ] Sveltia CMS is loaded from a versioned URL in `static/admin/index.html` (not `@latest` which can introduce breaking changes unexpectedly)
- [ ] The Cloudflare Worker auth URL in `static/admin/config.yml` is still active and maintained
- [ ] Font Awesome CDN URL in `layouts/partials/head.html` uses a pinned version

---

## GitHub Actions Workflow Health

### `deploy.yml`
- [ ] All `uses:` action references are pinned to a specific SHA or version tag (e.g. `actions/checkout@v4`, not `actions/checkout@main`)
- [ ] `peaceiris/actions-hugo` is on its latest release
- [ ] `actions/setup-node` is on its latest release
- [ ] Node.js version in `deploy.yml` matches the version used locally (currently `v20`)
- [ ] The workflow uses `permissions:` to limit the GitHub token scope to the minimum required
- [ ] Build artifacts are uploaded with appropriate retention policies
- [ ] The workflow succeeds on the current `main` branch

### `weekly-review.yml`
- [ ] The scheduled cron expression is correct and runs at a sensible time
- [ ] The workflow has appropriate `permissions:` (`issues: write`, `contents: read`)
- [ ] Issue creation is idempotent — avoid creating duplicate review issues if re-run

---

## Security Checklist

### Build Pipeline
- [ ] No secrets are hardcoded in any tracked file (workflows, config, templates, content)
- [ ] Environment variables used in workflows are sourced from GitHub Secrets or GitHub Environment variables
- [ ] The GitHub token in workflows is scoped to the minimum required permissions

### CMS and Authentication
- [ ] OAuth backend uses HTTPS — verify `base_url` in `static/admin/config.yml`
- [ ] The Cloudflare Worker auth URL is not a public URL that accepts arbitrary OAuth redirects
- [ ] GitHub OAuth app is scoped to `repo` permissions only (not `admin:org` or broader)
- [ ] Editorial workflow is enabled in CMS to prevent accidental direct publishes to `main`

### Content Security
- [ ] No user-supplied content is rendered as raw HTML in templates without sanitisation
- [ ] External resources (CDN links) use Subresource Integrity (SRI) hashes where possible
- [ ] `og:image` and other externally-fetched URLs do not expose server-side paths

### Dependabot / Automated Alerts
- [ ] Dependabot is enabled for npm dependencies in GitHub repository settings
- [ ] Dependabot alerts are being actioned (check for open Dependabot PRs)
- [ ] Code scanning (CodeQL or equivalent) is enabled for the repository

---

## Architectural Sustainability

### Static Site Architecture
- [ ] The site remains a pure static site — no server-side rendering or dynamic compute added without justification
- [ ] Any new CMS content types are reflected in both the Hugo layout (template) and the CMS config (`static/admin/config.yml`)
- [ ] `hugo_stats.json` is committed so that the Tailwind purge step works in CI without a local pre-build
- [ ] The `public/` output directory is in `.gitignore` and never committed
- [ ] `node_modules/` is in `.gitignore` and never committed

### Hosting and Deployment
- [ ] GitHub Pages deployment is via the Actions artifact upload method (not the legacy `gh-pages` branch method)
- [ ] The `baseURL` in `config.toml` matches the actual deployed URL
- [ ] The repository has a custom domain configured if applicable (check Pages settings)

### Documentation Health
- [ ] `README.md` reflects the current setup and technology versions
- [ ] The `archetypes/default.md` file accurately describes how to create new content
- [ ] `.github/site-info-pack.md` is kept up to date with any technology or design changes
- [ ] Breaking changes to front matter schema are documented and backward-compatible migrations are considered

### Technical Debt Register

Raise issues for the following known items if they have not been addressed:

| Item | Priority | Detail |
|---|---|---|
| `postcss.config.js` invalid content | Medium | File contains `brew install hugo` — not a valid PostCSS config; should be corrected or removed |
| `contact@example.org` placeholder | High | Must be replaced with real contact email before public launch |
| Logo SVG file size (1.3 MB) | Medium | `my-discombob-logo.svg` should be optimised (e.g. with `svgo`) |
| Missing `404.html` template | Low | Custom 404 page improves UX on GitHub Pages |
| Missing `robots.txt` | Low | Explicit robots.txt controls search engine crawling |
| Font Awesome CDN | Low | Consider self-hosting or using SVG sprites to reduce render-blocking |
| No schema.org structured data | Medium | `Article` and `Organization` schema missing from templates |

---

## Weekly Review Output Format

When the weekly review workflow creates a GitHub issue, the issue body should follow this structure:

```markdown
## Weekly Site Review — {DATE}

### 🔒 Security
- npm audit: {findings or "No vulnerabilities found"}
- Dependabot alerts: {count or "None"}

### 📦 Dependencies
- Outdated npm packages: {list or "All up to date"}
- Hugo version: {current} — latest is {latest}
- Sveltia CMS: {version in use}

### 🏗️ Build Health
- Hugo build: {✅ passing | ❌ failing}
- Deploy workflow: {last run status}

### 🔧 Technical Debt
{List of open tech debt issues from the register above}

### 📋 Recommended Actions
{Prioritised list of actions for this week}
```

---

## Review Comments Format

When raising a review comment, use this format:

```
🔧 Maintainer: [issue title]
- **What**: [the specific dependency, security, or architecture issue]
- **Why it matters**: [impact on security, reliability, or sustainability]
- **Fix**: [specific command, config change, or action to take]
- **Priority**: High / Medium / Low
- **Reference**: npm advisory, CVE, or Site Info Pack §5
```
