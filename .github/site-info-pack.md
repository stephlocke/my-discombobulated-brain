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

### Content Quality Signals

Quick-reference red and green flags for anyone writing or reviewing copy. Full operational checklists live in `.github/agents/brand-voice-icp.md`.

#### ❌ Red Flags — Must Fix

- **Stigmatising language** — `crazy`, `lunatic`, `psycho`, `commit suicide`, `suffered a breakdown`; use the preferred terms in Writing Principles above
- **Clinical jargon without explanation** — `comorbidity`, `affect dysregulation`, `somatisation`, `DSM criteria`; explain or replace with plain language
- **American spelling** — `normalize` → `normalise`, `recognize` → `recognise`, `behavior` → `behaviour`, `color` → `colour`; British English throughout
- **Passive voice** — "support can be accessed" → "find support here"; "help is available" → "we're here to help"
- **Urgent or pressuring CTAs** — "Get Help Now!", "Don't wait", "Act immediately"; replace with gentle, reader-led language
- **Long sentences** — any sentence over 25 words that can be split into two shorter ones
- **Complex vocabulary** — `utilise` → `use`, `commence` → `start`, `ascertain` → `find out`, `facilitate` → `help`; plain English always
- **Walls of text** — three or more list-able items buried inside a paragraph; use a bulleted list instead
- **Broken heading hierarchy** — H3 appearing before any H2; levels skipped (e.g. H2 → H4); a `#` H1 added inside Markdown body (Hugo renders the frontmatter `title` as H1 — the body should start at H2)
- **Horizontal rules in body content** — standalone `---` lines in the body of a Markdown file; use an H2 heading as a section break instead

#### ✅ Green Flags — Approve

- Warm, validating opening — acknowledges the reader's feelings before moving to information or action
- Plain, conversational language — sounds like a knowledgeable, caring friend, not a clinician or institution
- Specific over vague — names a feeling, situation, or challenge rather than speaking in abstractions ("when you're lying awake at 3 am" not "during difficult times")
- Gentle, reader-led CTAs — invites rather than instructs ("whenever you're ready" not "now")
- British English spelling throughout
- Short, scannable structure — short paragraphs, clear headings, bullet points for lists of 3+

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

### ICP Evaluation Dimensions

When reviewing copy, layouts, or features against the ICP, score each persona on the following five dimensions (1 = poor, 5 = excellent). Use these consistently across any ICP review — whether a full site audit or a single PR.

| Dimension | What to assess |
|---|---|
| **Clarity** | Can this person understand what the site offers and whether it is for them in under 10 seconds? |
| **Relevance** | Does the copy speak to *their* specific situation, or does it feel generic? |
| **Trust** | Are there signals that make this person believe the content and feel safe engaging further? |
| **Friction** | How easy is it for this person to take the next step given their energy level, context, and tech comfort? |
| **Contradiction** | Does the site say one thing and signal another? (e.g. "no pressure" in the headline but urgent CTA language below the fold) |

### Audience Implications for Design and Content
- Never bury crisis/contact information — it must be easy to find on every page
- Minimise cognitive load: short paragraphs, clear headings, no pop-ups
- Ensure WCAG 2.1 AA compliance at minimum; target AAA where practical
- Mobile-first design is non-negotiable for the primary audience
- Performance matters: the primary audience may be on mobile data or low-spec devices

### Personas

The personas below give each audience segment a human face. Reference them when writing copy, designing components, or assessing whether a feature serves the people who matter most.

---

#### Persona 1 — Jamie, 24 · *The Burnt-Out Graduate*
**Audience segment**: Primary (seeking support)

| | |
|---|---|
| **Demographics** | 24, non-binary, mixed-race British, living in a shared house in a mid-size city |
| **Occupation** | Junior data analyst, nine months into their first full-time job |
| **Tech comfort** | High — lives on their phone; rarely uses a desktop outside work |
| **Access pattern** | Late-night mobile browsing, often after 11 pm, sometimes mid-panic-attack |

**Personality & context**: Jamie appears capable and put-together at work, but privately experiences waves of anxiety and low mood they can't quite name. They grew up with social media and are comfortable searching for mental health content, but have been burned by sites that felt clinical or preachy. They want to feel understood quickly — if the first sentence doesn't resonate, they're gone. They're looking for validation that what they're feeling is real, and a gentle nudge towards next steps they can take tonight.

**Design implications**: Ultra-fast mobile load; warm, conversational hero copy; crisis line visible without scrolling; no sign-up gates on core content.

---

#### Persona 2 — Priya, 38 · *The Quietly Struggling Parent*
**Audience segment**: Primary (seeking support)

| | |
|---|---|
| **Demographics** | 38, South Asian British woman, married with two primary-school-age children |
| **Occupation** | Part-time pharmacist, recently returned from maternity leave |
| **Tech comfort** | Medium — confident on a smartphone but doesn't explore unfamiliar apps or sites |
| **Access pattern** | Quick mobile visits during lunch break or school run; rarely has more than 5 minutes |

**Personality & context**: Priya has been experiencing persistent low mood and exhaustion since her second pregnancy but has not sought help — there is significant stigma around mental health in her close-knit family and community, and she worries about what seeking help might mean for how others see her. She searches in private browsing mode. She wants information that respects her cultural context, doesn't assume she can "just take time off", and doesn't make her feel broken. A tone that is practical and non-judgmental is essential.

**Design implications**: Fast, no-fuss navigation; stigma-free language everywhere above the fold; content that acknowledges caregiving pressures; no pop-ups or notifications that could be seen by others.

---

#### Persona 3 — Marcus, 57 · *The First-Timer*
**Audience segment**: Primary (seeking support)

| | |
|---|---|
| **Demographics** | 57, Black British man, widowed two years ago, lives alone in a suburban town |
| **Occupation** | Recently retired HGV driver |
| **Tech comfort** | Low-medium — uses a tablet at home; confident with email and YouTube but wary of "complex" sites |
| **Access pattern** | Daytime desktop/tablet; unhurried but easily put off by confusing layouts |

**Personality & context**: Marcus is experiencing low mood and isolation for the first time in his life following retirement and bereavement. He doesn't think of himself as someone with "mental health issues" — he would describe it as "just not feeling right". He is sceptical of therapy jargon and anything that feels like it's aimed at younger people. Trust signals matter enormously: clear language, no buzzwords, a phone number he can call if he needs to. He was encouraged to look online by his GP but is cautious.

**Design implications**: Large, readable font; plain language; phone/helpline number prominent; no youth-coded imagery or slang; generous tap targets for tablet use.

---

#### Persona 4 — Helen, 53 · *The Worried Parent*
**Audience segment**: Secondary (supporter/carer)

| | |
|---|---|
| **Demographics** | 53, white British woman, married, two adult children — one currently in treatment for an eating disorder |
| **Occupation** | Secondary school administrator |
| **Tech comfort** | Medium — comfortable on a laptop; uses Google extensively for research |
| **Access pattern** | Evening desktop research sessions; thorough reader who bookmarks and returns to pages |

**Personality & context**: Helen is exhausted, frightened, and oscillates between wanting to fix everything and feeling completely helpless. She has read a lot online and is now cautious about sources — she trusts sites that feel professional and evidence-informed. She needs practical guidance on how to support her child without making things worse, and she also needs someone to acknowledge that carers need support too. She will share good resources with her husband and her daughter's care team.

**Design implications**: Clear, structured content with headings; sources or evidence signals where possible; carer-specific content clearly labelled; share-friendly page layout.

---

#### Persona 5 — Theo, 31 · *The Researching Partner*
**Audience segment**: Secondary (supporter/carer)

| | |
|---|---|
| **Demographics** | 31, white British man, in a long-term relationship with a partner who has bipolar disorder |
| **Occupation** | UX designer at a tech company |
| **Tech comfort** | Very high — critiques website UX as he browses; notices every friction point |
| **Access pattern** | Late-night laptop sessions; task-focused — comes with a specific question and wants a direct answer |

**Personality & context**: Theo is practical and analytically minded. He loves his partner deeply and wants to understand what they're going through so he can be genuinely helpful. He is put off by vague platitudes and is looking for evidence-based, specific guidance. He will notice broken layouts, poor accessibility, and inconsistent copy immediately. He's also quietly carrying a lot of emotional weight and would benefit from content that acknowledges his experience as a carer — though he'd never search for that directly.

**Design implications**: Efficient navigation; no fluff in headings; structured, scannable content; solid technical execution (broken things erode trust immediately for this persona).

---

#### Persona 6 — Dr. Amara, 46 · *The Trusted Referrer*
**Audience segment**: Tertiary (professional/advocate)

| | |
|---|---|
| **Demographics** | 46, British-Nigerian woman, based in a busy urban NHS GP practice |
| **Occupation** | GP partner |
| **Tech comfort** | High — uses clinical systems daily; expects reliable, fast, accessible tools |
| **Access pattern** | Brief desktop visits mid-consultation or during admin time; needs information fast |

**Personality & context**: Dr. Amara sees mental health presentations in almost every clinic session and wants a trustworthy resource she can recommend to patients who are not yet ready for a referral or who face long waiting lists. She is looking for credibility: clear information, no pseudoscience, and a tone that won't alienate her patients. She will recommend the site only if she trusts it — one piece of questionable content would lose her permanently. She also uses the site herself occasionally, though she would not describe it that way.

**Design implications**: Credibility signals (evidence-based framing, no pseudoscience); clean print/share layout for resource pages; fast load; professional but warm tone.

---

#### Persona 7 — Kezia, 34 · *The Wellbeing Champion*
**Audience segment**: Tertiary (professional/advocate)

| | |
|---|---|
| **Demographics** | 34, mixed-race British woman, works in central London |
| **Occupation** | HR Business Partner at a 200-person tech company |
| **Tech comfort** | High — uses a wide range of SaaS tools; comfortable navigating complex sites |
| **Access pattern** | Daytime desktop; purposeful visits to find resources for her company's wellbeing programme |

**Personality & context**: Kezia is building her company's mental health and wellbeing programme from scratch and is actively curating a list of recommended external resources for employees. She needs content that is inclusive, non-stigmatising, and suitable for a diverse workforce. She will share links directly in Slack channels and internal newsletters, so she needs to trust that whatever she links to won't let her down. She is also quietly passionate about this topic — a family member has lived with OCD for years — though she keeps her professional and personal motivations separate.

**Design implications**: Shareable, standalone pages that make sense without site context; content suitable for a workplace audience; no crisis-only framing (she needs general wellbeing content too); clear, professional visual design.

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
