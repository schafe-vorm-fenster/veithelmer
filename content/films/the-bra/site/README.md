# The Bra - Microsite Migration

## Overview
This microsite has been migrated from `legacy/movie-websites/the-bra` to `content/films/the-bra/site/`.

## Changes Made

### Structure
- **German version**: `de.html`
- **English version**: `en.html` (newly translated)
- **Assets folder**: `assets/` containing:
  - `css/styles.css` - Standalone CSS (no build process needed)
  - `img/` - All images from the original site
  - `favicons/` - Favicon files

### Key Improvements

1. **No Build Process Required**
   - Converted Bootstrap SCSS to standalone CSS
   - All assets are pre-compiled and ready to use
   - No gulp, npm, or other build tools needed

2. **Fully Standalone**
   - Uses relative paths for all assets
   - Can be opened directly from the filesystem in any browser
   - No server or web server required for local viewing

3. **Local Video Integration**
   - Replaced YouTube embed with local MP4 video
   - Video path: `../../trailer.mp4`
   - Poster image: `../../trailer.jpg`
   - Native HTML5 video player with controls

4. **Bilingual Support**
   - German version (de.html) - original content
   - English version (en.html) - newly translated
   - Language switcher in the top-right corner

5. **No JavaScript**
   - Removed all JavaScript dependencies
   - Language switcher uses simple HTML links
   - Pure CSS for all styling and layout
   - Video player uses native browser controls

6. **Modern, Clean Code**
   - Semantic HTML5
   - Responsive design with flexbox
   - Accessible (includes hidden h1 for screen readers)
   - SEO optimized with meta tags

## File Structure
```
content/films/the-bra/site/
├── de.html                          # German version
├── en.html                          # English version
└── assets/
    ├── css/
    │   └── styles.css               # Standalone CSS
    ├── img/
    │   ├── background.jpg           # Background image
    │   ├── the-bra.png              # Logo
    │   └── ...                      # Other images
    └── favicons/
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        └── favicon-96x96.png
```

## Comparison with Live Site
The microsite maintains the visual design and layout of the original site at:
https://www.veithelmer.com/en/feature-films/the-bra/

Key differences:
- Simplified to standalone HTML/CSS (no dependencies)
- Local video instead of YouTube embed
- Added language switcher for easy navigation
- Removed all JavaScript for better performance

## Usage

### Local Development
Simply open `de.html` or `en.html` in any modern web browser:
```bash
open content/films/the-bra/site/de.html
```

### Deployment
Upload the entire `site/` folder to any web server. The relative paths ensure it works in any location.

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Requires HTML5 video support for the trailer

## Credits
Original microsite design and concept by Veit Helmer Films.
Migration completed: January 2026
