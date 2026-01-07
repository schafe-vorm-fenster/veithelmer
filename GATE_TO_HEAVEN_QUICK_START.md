# Gate to Heaven Microsite - Quick Start Guide

## What Was Created

A standalone microsite for the film "Gate to Heaven" (Tor zum Himmel) that recreates the look of the original Flash website in modern HTML/CSS.

## URLs

- 🇩🇪 German: `/de/gate-to-heaven/site`
- 🇬🇧 English: `/en/gate-to-heaven/site`

## Key Files Modified/Created

### Film Metadata (Updated)
- `content/films/gate-to-heaven/index_de.md` - Complete cast, crew, and expanded content
- `content/films/gate-to-heaven/index_en.md` - Complete cast, crew, and expanded content
- `content/films/gate-to-heaven/bild01.jpg` - Cinema poster (added)

### Microsite Sources (New)
- `src/de/gate-to-heaven/site.html` - German microsite
- `src/en/gate-to-heaven/site.html` - English microsite

### Configuration (Updated)
- `eleventy.config.js` - Added film assets passthrough copy

## Building

```bash
# Install dependencies (if needed)
npm install

# Production build
npm run build

# Development with live reload
npm run dev
```

## Output

After building, the microsites will be available at:
- `_site/de/gate-to-heaven/site/index.html`
- `_site/en/gate-to-heaven/site/index.html`

All film assets are copied to:
- `_site/assets/films/gate-to-heaven/`

## Features

✅ Four-section layout (Story, Cast, Trailer, Photos)  
✅ Embedded video trailer  
✅ Photo gallery with 3 images  
✅ Language switcher (DE/EN)  
✅ Responsive design  
✅ Blue color scheme matching original Flash site  
✅ Links back to main film page and homepage

## Making Changes

1. Edit the HTML files in `src/de/gate-to-heaven/site.html` or `src/en/gate-to-heaven/site.html`
2. Run `npm run build` to regenerate
3. Check output in `_site/de/gate-to-heaven/site/` or `_site/en/gate-to-heaven/site/`

## Documentation

See `GATE_TO_HEAVEN_MICROSITE_COMPLETION.md` for full details.
