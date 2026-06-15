# Site review report

This review checked the site against the project goal of being modular, config-driven, and safe for a non-technical user to rebrand without web development work.

## Baseline

- `npm ci` completed successfully.
- `HUGO_ENVIRONMENT=production hugo --gc --minify` completed successfully.
- `npm test` is still a placeholder command, so there is no automated test suite covering this audit.

The site builds cleanly, but there are several structural gaps that work against the stated goal.

## Findings

1. **The CMS only exposes a small part of the site**
   - `static/admin/config.yml` only defines collections for blog posts and one About page.
   - Core editable areas, including the homepage (`content/_index.md`), footer crisis callout (`content/callouts/footer/index.md`), services, events, CTA content, and contact content are still outside the CMS.
   - This means a non-technical user still has to edit Markdown and config files directly for major parts of the site.

2. **The CMS configuration does not match the current content structure**
   - The About page entry points at `content/about.md`, but the repository uses `content/about/index.md`.
   - The blog collection stores `featured_image`, but `layouts/_default/single.html` renders `.Params.resource.src` and `.Params.resource.alt`.
   - These mismatches will confuse editors and can result in content changes not appearing on the site.

3. **Key rebranding settings are not actually end-user friendly**
   - Brand settings live in `config.toml`, including colours, fonts, logo, footer details, contact details, and socials.
   - That keeps the code modular, but it does not yet meet the goal of easy non-technical modification because editing TOML is still required.
   - A dedicated settings collection or data-driven settings layer is still needed.

4. **Some template output is still hardcoded instead of configurable**
   - The header has a hardcoded Donate CTA in `layouts/partials/essentials/header.html`.
   - The footer includes hardcoded section headings and hardcoded maintainer attribution in `layouts/partials/essentials/footer.html`.
   - `layouts/partials/service-details.html` hardcodes `What We Do` instead of using the services section title from `content/services/_index.md`.
   - These values block easy white-labelling and make rebrands depend on template edits.

5. **Font loading is only partly wired to configuration**
   - `config.toml` exposes `style_rules.title_font` and `style_rules.body_font`.
   - `layouts/partials/essentials/head.html` still hardcodes Exo in the Google Fonts preload and noscript stylesheet.
   - Changing fonts in config alone will not fully change the live site, which breaks the expectation that config is the source of truth.

6. **Some components still depend on internal path conventions**
   - Homepage CTA selection in `content/_index.md` uses slug values such as `version-1`.
   - `layouts/partials/components/cta-display.html` then assembles paths like `/cta/footer/<slug>` and `/cta/inline/<slug>`.
   - This is modular from a developer perspective, but it is not intuitive for a non-technical editor and is not exposed through the CMS.

7. **Authoring scaffolding is not ready for real content maintenance**
   - `archetypes/default.md` is tutorial text, not a usable front matter scaffold for this site.
   - `postcss.config.js` contains `brew install hugo`, which is not a valid PostCSS configuration and adds confusion for future maintainers.
   - Both files increase setup friction and make the repository harder to understand.

## Recommended next steps

1. Expand `static/admin/config.yml` so the CMS covers homepage, CTA, callout, services, events, contact, donate, legal, and site settings content.
2. Align the CMS field schema with the front matter that templates actually read.
3. Move remaining visible template strings and CTA settings into content or configuration.
4. Make font loading follow the configured font choices, not a hardcoded family.
5. Replace the placeholder archetype and invalid PostCSS file with repository-specific scaffolding or remove them.
