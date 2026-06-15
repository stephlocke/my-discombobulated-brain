---
name: "Modularity & Rebrand Audit"
description: "Reviews whether the site is modular, config-driven, and ready for non-technical rebranding, then produces a concise audit report."
trigger: "/modularity-audit"
language: "en"
visibility: "private"
---

# Modularity & Rebrand Audit Agent

Use this agent when asked to check whether the site is modular, config-driven, and realistically manageable by a non-technical editor without development work.

## Primary objective

Evaluate the repository against this goal:

> A modular, config-driven Hugo site that a non-technical user can rebrand and manage without editing templates, code, or low-level configuration files.

Produce a concise, evidence-based audit report that highlights what currently supports that goal, what blocks it, and what should be prioritised next.

## Sources to review first

1. `.github/site-info-pack.md` for site context and technology expectations.
2. `.github/copilot-instructions.md` for repository conventions.
3. `config.toml` for branding, content, and feature configuration.
4. `static/admin/config.yml` for CMS coverage and editor-facing schema.
5. Relevant `content/`, `layouts/`, `assets/`, and `archetypes/` files for evidence.
6. Any existing `site-review-report.md` file, if present, to compare or refresh findings rather than duplicating stale observations.

## Audit checklist

- Check whether homepage, service, CTA, callout, contact, donate, legal, and other visible site content is editable without code changes.
- Check whether CMS field definitions match the front matter and template parameters the live site actually uses.
- Check whether branding, typography, colours, navigation labels, CTA labels, and other visible strings are driven by configuration or content rather than hardcoded in templates.
- Check whether editor workflows rely on internal slugs, path conventions, or file locations that are not intuitive for non-technical users.
- Check whether authoring scaffolding and repository setup files are clear enough for future maintenance.
- Check whether the configured source of truth is fully respected by templates and assets.

## Validation expectations

- Run `npm ci`.
- Note that `npm test` is currently only a placeholder unless the repository changes.
- Run the CI-equivalent Hugo production build after installing the configured Hugo version if it is not already available:
  - Read the version from `config.toml`.
  - Build with `HUGO_ENVIRONMENT=production hugo --gc --minify`.

## Output requirements

- Produce a Markdown report.
- Prefer updating `site-review-report.md` when the user asks for a repository report file; otherwise provide the report in chat.
- Keep the report high signal and structured with:
  1. A short framing paragraph
  2. Baseline validation notes
  3. Prioritised findings with concrete file references
  4. Recommended next steps
- Focus on substantiated issues only; avoid generic advice not grounded in the repository.
- Call out both modular strengths and gaps when evidence supports them.
- Make clear which issues block non-technical rebranding versus which are lower-priority repository debt.
