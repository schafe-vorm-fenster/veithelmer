# Phase 6.1.1: Greenfield Eleventy + Tailwind Base

## Overview

Clean, modern static site generator setup for the Veithelmer director portfolio and film microsites. This phase establishes the foundation with Eleventy 3.1+, Tailwind CSS v3, and integration hooks for GSAP animations and Ruffle Flash emulation.

**Status**: ✅ Complete  
**Date**: 2026-01-07

## What's Included

### Core Stack
- **Eleventy 3.1.2** - Modern static site generator with Nunjucks templating
- **Tailwind CSS v3** - Utility-first CSS framework with custom design tokens
- **GSAP** - Animation library (lazy-loaded when needed)
- **Ruffle** - Flash emulation for legacy SWF content

### Directory Structure
```
veithelmer/
├── src/
│   ├── _layouts/       # Nunjucks layout templates
│   │   ├── base.njk    # Base HTML wrapper
│   │   └── page.njk    # Standard page layout
│   ├── _includes/      # Reusable components (empty for now)
│   ├── _data/          # Global data files (empty for now)
│   ├── css/
│   │   └── main.css    # Tailwind entry with custom tokens
│   ├── js/
│   │   └── main.js     # GSAP & Ruffle initialization hooks
│   ├── assets/         # Static assets (images, fonts, etc.)
│   └── index.njk       # Homepage template
├── _site/              # Build output (gitignored)
├── content/            # Existing content from migration phases
├── legacy/             # Original legacy assets (preserved)
├── eleventy.config.js  # Eleventy configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── DESIGN_TOKENS.md    # Extracted design tokens documentation
└── package.json        # Dependencies and scripts
```

## Design Tokens

All design tokens extracted from legacy assets are documented in `DESIGN_TOKENS.md`. Key tokens:

### Colors
- **Brand Black**: `#000000` - Main background
- **Brand Dark Gray**: `#1F1F1F` - Secondary backgrounds
- **Brand Brown**: `#8D5315` - Accent color
- **Brand White**: `#FFFFFF` - Primary text

### Typography
- **Font Family**: Verdana, Arial, Sans-serif
- **Base Size**: 15px
- **Line Height**: 1.6

### Tailwind Usage
Colors are available as utilities:
```html
<div class="bg-brand-black text-white">
<button class="bg-brand-brown hover:bg-brand-darkgray">
```

## Build Commands

```bash
# Development server with hot reload
npm run dev
# or
npm start

# Production build
npm run build

# Individual tasks
npm run build:css    # Build Tailwind CSS
npm run build:11ty   # Build Eleventy site
npm run watch:css    # Watch CSS changes
npm run watch:11ty   # Watch template changes
```

## GSAP Integration

GSAP is lazy-loaded when needed. Example usage:

```javascript
import { initGSAP } from '/js/main.js';

const gsap = await initGSAP();
gsap.from('.element', { opacity: 0, duration: 1 });
```

## Ruffle Integration

Ruffle automatically initializes when Flash content is detected:

```html
<!-- Legacy Flash embed - Ruffle will handle it -->
<embed src="movie.swf" type="application/x-shockwave-flash">
```

## Migration Notes

### What's New (Not from Legacy)
- ✨ Modern ES6+ JavaScript modules
- ✨ Tailwind utility classes (replaced Bootstrap 3)
- ✨ Nunjucks templating (clean, maintainable)
- ✨ GSAP for animations (replaced jQuery)
- ✨ Ruffle for Flash (replaced native Flash Player)

### What's Preserved from Legacy
- ✅ Color palette (#000, #1F1F1F, #8D5315, #FFF)
- ✅ Typography (Verdana, Arial, Sans-serif)
- ✅ Font sizes and spacing rhythm
- ✅ Shadow effects for UI elements

### What's NOT Migrated Yet
- ⏳ Legacy HTML/CSS/JS (intentionally excluded)
- ⏳ Bootstrap grid system (replaced with Tailwind)
- ⏳ Inline styles and table layouts (will be modernized)
- ⏳ Logo assets (migration pending)

## Next Steps (Future Phases)

1. **Content Integration**: Wire up existing `content/` markdown files
2. **Component Library**: Build reusable Nunjucks includes
3. **Routing**: Set up multilingual routing (de/en)
4. **Film Microsites**: Create individual film page templates
5. **Media Migration**: Move and optimize legacy images/videos
6. **Flash Content**: Identify and test SWF files with Ruffle
7. **Animation System**: Implement GSAP animations for page transitions

## Testing the Build

After running `npm run build`, check:

```bash
ls _site/               # Should show: css/, js/, assets/, index.html
open _site/index.html   # View in browser
```

The homepage showcases:
- Design token color swatches
- Responsive layout
- Clean typography
- Dark theme from legacy

## Dependencies

```json
{
  "devDependencies": {
    "@11ty/eleventy": "^3.1.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "npm-run-all": "^4.x"
  },
  "dependencies": {
    "gsap": "^3.x",
    "@ruffle-rs/ruffle": "^0.x"
  }
}
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- CSS Grid and Flexbox support
- No IE11 support (intentional)

## Important Notes

- **No legacy reuse**: This is a greenfield project; no legacy HTML/CSS/JS is copied
- **CommonJS modules**: Package uses CommonJS (`type: "commonjs"`)
- **Git ignored**: `_site/` and `node_modules/` are not committed
- **Design tokens**: All values documented and centralized

## Troubleshooting

### Build fails
```bash
rm -rf node_modules _site
npm install
npm run build
```

### CSS not updating
```bash
# Clear Tailwind cache
rm -rf .tailwindcss
npm run build:css
```

### Eleventy config errors
- Ensure `eleventy.config.js` uses `module.exports` (not `export default`)
- Check `package.json` has `"type": "commonjs"`

---

**Phase 6.1.1 Complete** ✅  
Foundation ready for content integration and component development.
