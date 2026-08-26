# Using this CMS

A quick guide for anyone editing this site's content. You're reading this inside the CMS
itself — edit it the same way you'd edit any other page here.

## Collections vs Files

The sidebar is split into two kinds of entries:

- **Collections** — the site's actual content: Homepage, Pages, Blog, Events, Services, and
  so on. Most of your day-to-day editing happens here.
- **Files** — site-wide settings that aren't really "pages": Site Settings, Domain, Navigation
  Labels, Contact, Social Media, Blog settings. Change these rarely, and changes here affect
  the whole site at once (e.g. the site title, theme colours, or which domain the site
  describes itself as). Use the Site Settings file to edit how the site looks and behaves.

## Publishing is immediate

Saving a change here commits it directly — there's no draft/review step. It goes live as soon
as the site finishes rebuilding after your save.

## A warning about "Name" fields on CTAs

Several collections — CTA — Header, CTA — Hero, CTA — Footer, CTA — Inline — have a "Name"
field described as a "short, simple, permanent identifier". Other pages (like the Homepage)
look up these CTAs _by that name_. If you rename one after it's already been selected
elsewhere, it will disappear from wherever it was used until someone goes back and re-selects
it. Treat these names as permanent once in use — change the CTA's title/headline/body instead
of its Name if you want different wording. The field itself will refuse to save anything
other than lowercase letters, numbers, and hyphens (e.g. `donate-appeal`) — this is enforced,
not just a suggestion.

## A warning about the Domain setting

Files → Domain has a single field, "DANGER: Site URL". This is the actual web address the
whole site is built and published under — it isn't cosmetic. Changing it changes every link,
canonical tag, RSS feed, and sitemap entry the site generates. Only change it once the site's
real hosting/domain has actually moved to match; otherwise the live site will describe itself
with the wrong address. This should be a rare, deliberate change, not a routine edit.

## Field validation

Some fields now check the format of what you type and will show an error and refuse to save
if it doesn't match, rather than just warning you in a hint:

- **URLs** (Social Media URL, External Link, Site URL, etc.) must be a proper web address —
  typically starting with `http://` or `https://`. A couple of button/link fields also accept a
  relative path starting with `/` (e.g. `/donate`), since those can point within the site.
- **Emails** (Contact Details, Support Email) must look like a valid email address.
- **Identifier-style fields** (CTA "Name", Netlify "Form Name") must be lowercase letters,
  numbers, and hyphens only — no spaces or capital letters.
- **Numbers** with a sensible range (Weight, Award Year, search result lengths) are capped to
  reasonable bounds so an obvious typo (like a 3-digit year) can't be saved.

If saving is blocked, check the field's hint text — it explains what format is expected.

## Image tips

- Use landscape images for hero and social share images; square images for logos and
  favicons.
- Always fill in alt text — it's required on content images and matters for accessibility and
  search engines.
- Recommended social share image size: 1200×630px.
- Prefer `.webp` where you can — smaller file sizes, same quality.

## Where to find things

- **Homepage** — hero text/image, section on/off toggles, and all the homepage CTAs, in one
  place.
- **Pages** — About, Donate, Contact, Search, Sitemap.
- **Sections** — the intro text shown at the top of `/blog`, `/events`, `/services`, etc.
- **Blog / Events / Services / Worked With / Awards & Recognition** — the repeatable content
  types, each its own collection.
- **Footer** — the About and Get Help columns shown in the site footer.
- **Legal Pages** — privacy policy, terms, and similar.
- **Callouts** — the small fixed support messages shown in the footer, on single pages, and on
  the 404 page.
- **CTA — Header / Hero / Footer / Inline** — reusable call-to-action buttons, referenced by
  name from the Homepage and elsewhere.
- **Site Settings** (Files) — site title, author, logo, favicon, theme colours and fonts,
  search settings, logo carousel scroll speed.
- **Domain** (Files) — the site's real public web address. See the warning above before
  touching this.
