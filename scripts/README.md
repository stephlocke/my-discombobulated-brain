# scripts/

## generate_netlify_redirects.py

Scans the Hugo `content/` directory for pages that declare a `redirect_from`
frontmatter key and writes a `static/_redirects` file. Netlify picks up
`static/_redirects` automatically during deployment, issuing HTTP 301
permanent redirects that preserve link equity and prevent 404s after URL
changes.

### When to run

Run this script any time you:

- rename a content file or directory (changing its canonical URL)
- change `slug` in a page's frontmatter
- retire a page and want to forward traffic to a replacement

Commit the updated `static/_redirects` alongside the content change.

### Usage

```bash
python3 scripts/generate_netlify_redirects.py
```

No dependencies outside the Python standard library.

### Frontmatter syntax

Add a `redirect_from` key to the YAML frontmatter of any content file:

```yaml
---
title: My Updated Post
redirect_from:
  - /old-url/
  - /really-old-url/
---
```

A single URL is also accepted:

```yaml
redirect_from: /single-old-url/
```

### Output format

The generated `static/_redirects` file uses Netlify's plain-text redirect
syntax:

```
/old-url/   /new-url/   301!
```

The trailing `!` forces the redirect even if a file at the old path exists,
ensuring stale cached files don't shadow the rule.

### Integration with the build

To generate redirects automatically on every Netlify deploy, update the
`command` in `netlify.toml`:

```toml
[build]
  command = "python3 scripts/generate_netlify_redirects.py && npm install && hugo --gc --minify"
```
