# Accessibility Guidelines - My Discombobulated Brain

This document outlines our commitment to WCAG 2.1 AA accessibility compliance and provides guidelines for developers maintaining this site.

## Accessibility Standards

This site adheres to **WCAG 2.1 Level AA** with AAA targets for crisis/mental health content.

## Key Accessibility Features

### 1. Keyboard Navigation ✅
- Skip to main content link available on all pages
- All interactive elements (buttons, links, form inputs) are keyboard accessible
- Logical tab order: header → main content → footer
- No keyboard traps

### 2. Focus Indicators ✅
- All interactive elements have visible focus indicators
- Focus rings use `focus:ring-2 focus:ring-offset-2` pattern
- Focus styling is never removed without replacement
- `focus:outline-none` is paired with `focus:ring-*` for proper ring display

### 3. Screen Reader Support ✅
- Semantic HTML structure (header, nav, main, article, footer)
- Proper use of `<label>` elements for form inputs
- Screen reader only text uses `.sr-only` class
- Decorative elements use `aria-hidden="true"`
- Navigation elements have `aria-label` attributes

### 4. Images and Media ✅
- All `<img>` tags have meaningful `alt` attributes
- SVG icons use `aria-hidden="true"` when decorative
- Images lazy load with `loading="lazy"`
- Images decode asynchronously with `decoding="async"`

### 5. Color & Contrast ✅
- Text meets minimum 4.5:1 contrast ratio (WCAG AA)
- Crisis support content meets 7:1 contrast ratio (WCAG AAA)
- Color is not used as the only means of conveying information

### 6. Touch Targets ✅
- All buttons have minimum 44px height/width (`min-h-11`)
- Touch targets have adequate spacing
- No accidentally clickable areas

### 7. Motion & Animation ✅
- `prefers-reduced-motion: reduce` media query respected
- Animations disabled for users who prefer reduced motion
- Logo carousel checks user preference before animating
- Scroll behavior is smooth but not forced

### 8. Heading Hierarchy ✅
- Proper heading structure (h1 → h6, no skipped levels)
- Headings describe content sections
- Sections use `aria-labelledby` linking to heading IDs

### 9. Form Accessibility ✅
- All form inputs have associated labels
- Hidden form elements use `aria-label` when needed
- Focus states clearly visible
- Error messages associated with inputs (when applicable)

## CSS Classes for Accessibility

### `.sr-only`
Hides text visually while keeping it available to screen readers.
```html
<span class="sr-only">Email:</span>
<a href="mailto:...">email@example.com</a>
```

### Focus Ring Pattern
Always use `focus:outline-none` with `focus:ring-*`:
```html
<a href="#" class="focus:outline-none focus:ring-2 focus:ring-primary rounded">
  Link text
</a>
```

### Button Pattern
Buttons must have minimum 44px height:
```html
<button class="min-h-11 focus:outline-none focus:ring-2 focus:ring-primary">
  Button text
</button>
```

## ARIA Attributes

### Common ARIA Usage

**Navigation labels:**
```html
<nav aria-label="Main navigation">
  <!-- menu items -->
</nav>
```

**Landmarks:**
```html
<header role="banner"><!-- header content --></header>
<main id="main-content"><!-- main content --></main>
<footer role="contentinfo"><!-- footer content --></footer>
```

**Active page indicator:**
```html
<a href="/current-page" aria-current="page">Current Page</a>
```

**Decorative elements:**
```html
<svg aria-hidden="true"><!-- decorative icon --></svg>
```

**Interactive labels:**
```html
<button aria-label="Toggle dark mode">🌙</button>
```

**Mobile menu:**
```html
<button 
  aria-label="Toggle mobile menu"
  aria-expanded="false"
  aria-controls="mobile-menu">
  Menu
</button>
```

## Testing Accessibility

### Browser DevTools
1. Firefox: Enable accessibility inspector (right-click → Inspect Accessibility)
2. Chrome: DevTools → Accessibility panel

### Screen Readers
- **Windows**: NVDA (free), JAWS (commercial)
- **macOS**: VoiceOver (built-in)
- **iOS**: VoiceOver (Settings → Accessibility)
- **Android**: TalkBack (Settings → Accessibility)

### Keyboard Testing
1. Use Tab to navigate
2. Use Enter/Space to activate
3. Use Arrow keys in menus
4. Verify logical tab order

### Automated Testing Tools
- WAVE (browser extension)
- axe DevTools (browser extension)
- Pa11y (command line)
- Lighthouse (built into Chrome DevTools)

## Heading Audit

Each page should have:
- Exactly one `<h1>` (page title)
- Sequential heading hierarchy (no skipping)
- Descriptive heading text
- Headings linked to sections with `aria-labelledby`

## Form Accessibility Checklist

For every form input:
- [ ] Associated `<label>` with `for` attribute
- [ ] `id` attribute matches label `for`
- [ ] Clear visible focus indicator
- [ ] Error messages associated with input
- [ ] Required fields marked as such
- [ ] Help text provided where needed
- [ ] Form can be submitted via keyboard

## Development Checklist

When adding new components:
- [ ] Keyboard navigation tested (Tab, Arrow, Enter)
- [ ] Focus indicators visible
- [ ] Screen reader labels present
- [ ] Images have alt text
- [ ] Color contrast verified
- [ ] Touch targets 44px minimum
- [ ] Semantic HTML used
- [ ] ARIA attributes appropriate
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Mobile responsive and accessible

## References

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Tailwind Accessibility](https://tailwindcss.com/docs/accessibility)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Reporting Accessibility Issues

If you find an accessibility issue:
1. Document the issue with specific steps to reproduce
2. Note the browser/screen reader used
3. Screenshot or screen recording if possible
4. Create an issue with the `♿ accessibility` label

## Support

For questions about accessibility implementation, refer to:
- `.github/copilot-instructions.md` (site-specific guidance)
- `.github/agents/design-style.md` (Design & Style agent checklist)
- `.github/agents/maintainer.md` (Maintainer agent checklist)
