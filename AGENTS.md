# AGENTS.md – olkowitzWebsite Development Guide

**Purpose**: This site is a static website for Olkowitz z.s., a Czech environmental nonprofit. Zero-dependency approach — plain HTML/CSS/JavaScript hosted on GitHub Pages.

## Architecture Overview

### Structure
- **Pages**: 5 HTML files (`index.html`, `about.html`, `events.html`, `contact.html`, `404.html`)
- **Styling**: Single `css/style.css` file organized by feature (header, main, hero, buttons, events, footer, mobile)
- **JavaScript**: Two files — `js/main.js` (core, ~36 lines) and `js/events.js` (~69 lines)
- **Data**: `events.json` contains event data in ISO 8601 format (referenced in `events.html` only)
- **Deployment**: GitHub Pages with CNAME set to `www.olkowitz.cz`

### Key Design Decision
**Minimal dependencies by design**. No build tools, no frameworks — everything must work with plain HTML/CSS/JS. Future portability to Raspberry Pi server (Apache/nginx) is planned; 404.html will need server-side config when migrated.

## Critical Data Flows

### Event Loading & Display (events.html)
1. `events.html` includes `<script src="js/events.js"></script>` 
2. On DOMContentLoaded, `loadEvents()` fetches `events.json`
3. Events are filtered (only future events), sorted chronologically
4. Each event renders into `#events-list` container with ICS download button
5. Button click triggers `downloadICS(event)` → generates .ics file → browser download

**Important**: Events use ICS date format (`20250730T100000Z`). Parsing via `parseICSDate()` converts to JS Date; `formatDate()` renders in Czech locale.

### Dynamic Year in Footer
`main.js` sets `#year` element to current year via `new Date().getFullYear()`. This runs on every page automatically.

### Mobile Menu
Hamburger button (`.menu-toggle`) toggles `.open` class on `#main-nav`. Links auto-close menu. ARIA attributes managed (`aria-expanded`, `aria-controls`).

## Page Template Pattern

All HTML pages follow identical structure:
```html
<header> ... nav container with logo, menu toggle, navigation ...
<main> ... page-specific content ...
<footer> ... copyright year, footer nav ...
<script src="js/main.js"></script>
```

**Header/footer are NOT in separate includes** — each file has full markup. When updating nav, update all 5 HTML files consistently.

## CSS Conventions

- **Color scheme**: Primary blue `#0133C5`, secondary yellow `#F9F203`, neutral grays `#f8f9fa`, `#333`, `#555`
- **Sections marked by comments**: `/* ===== Section Name ===== */`
- **Responsive breakpoint**: `@media (max-width: 768px)` — mobile-first not used; base styles are desktop
- **Accessibility**: Uses semantic HTML, ARIA labels on interactive elements
- **Image format**: WebP preferred (hero-bg.webp, logo.webp); JPG fallback for og-image

## Language & Content

- **Primary language**: Czech (`lang="cs"`)
- **Code comments**: Czech (except technical terms in English)
- **Date formatting**: Czech locale (`toLocaleString("cs-CZ")`)
- **Contact page**: Email obfuscated as `info[zavinac]olkowitz.cz` to prevent scraping

## Developer Workflows

### Adding a New Event
Edit `events.json` with ICS-formatted date `YYYYMMDDTHHMMSSZ` (UTC). Example:
```json
{"title": "Event Title", "description": "...", "location": "...", "start": "20270608T070000Z", "end": "20270608T170000Z"}
```
Events are auto-loaded and sorted; only future events show.

### Updating Navigation Links
Edit the `<nav id="main-nav">` block in ALL HTML files (index, about, events, contact). No partial update will sync across pages.

### Adding a New Page
1. Copy template from existing page (preserve header/footer structure)
2. Update `<title>`, `<meta name="description">`, `og:url`, `og:title`, `og:description`
3. Add link to `<nav id="main-nav">` in all existing pages + footer
4. Include `<script src="js/main.js"></script>` at end

### Styling New Elements
Add CSS in `style.css` within appropriate section. Keep color palette consistent (`#0133C5`, `#F9F203`). Test mobile at `max-width: 768px`.

### Image Optimization
Use WebP for modern browsers (hero, logo). Keep JPG for OG tags. Store in `images/` or subdirectories (e.g., `images/favicon/`).

## Integration Points & Dependencies

- **GitHub Pages**: Deployment automatic on push to main branch. `CNAME` ensures custom domain routes correctly.
- **External**: Google Maps iframe (contact.html) — no API key needed, embedded directly.
- **No build process**: Changes pushed directly; no compilation step.
- **404 handling**: GitHub Pages automatically routes 404s to `404.html`. Server migration will require manual 404 config.

## Common Patterns

### HTML Form Elements (if needed)
No forms currently exist. Contact info is static. If adding forms in future, ensure Czech placeholder text and validation messages.

### Date Handling
Always use `parseICSDate()` for event dates, never parse manually. This ensures consistency across events.js.

### Accessibility
- Use semantic HTML (`<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`)
- ARIA labels on buttons: `aria-label="Czech text"`
- Link titles for non-obvious destinations
- Color contrast meets WCAG standards (blue `#0133C5` on white ~5:1 ratio)

## Future Migration Considerations

When moving from GitHub Pages to Raspberry Pi + Apache/nginx:
1. Remove GitHub Pages reliance on `404.html` — configure 404 in server config
2. Update `CNAME` (or equivalent DNS) to point to Pi IP/domain
3. Consider adding `.htaccess` (Apache) or nginx config for rewrites
4. No code changes needed; static site works identically on any server

## Quick Reference: Key Files

| File | Purpose |
|------|---------|
| `css/style.css` | All styling; organized by feature |
| `js/main.js` | Header scroll shadow, hamburger menu, year in footer |
| `js/events.js` | Fetch events.json, filter/sort, render, ICS export |
| `events.json` | Event data; ICS date format YYYYMMDDTHHMMSSZ |
| `CNAME` | GitHub Pages custom domain config |
| All `.html` files | Complete pages (header/nav/footer duplicated in each) |

---

**Project Philosophy**: Simplicity, maintainability, and long-term independence from tools/frameworks. Every line of code must be understandable by a non-technical site owner.

