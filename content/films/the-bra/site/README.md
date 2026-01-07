# The Bra - Microsite

Complete standalone microsite for "The Bra" (German: "VOM LOKFÜHRER, DER DIE LIEBE SUCHTE...") film by Veit Helmer.

## Overview

This microsite has been completely rebuilt based on the live website at https://www.veithelmer.com/en/feature-films/the-bra/ with comprehensive content including cast biographies, film synopsis, and credits.

## Content Sections

### German Version (de.html)
- **Trailer** - Local video player with poster
- **Synopsis** - Complete film description
- **Regie** - Director Veit Helmer biography
- **Besetzung** - Full cast with biographies and filmographies:
  - Miki Manojlović (Lokführer Nurlan)
  - Denis Lavant (Lehrling)
  - Paz Vega (Maria)
  - Chulpan Khamatova (Aygül)
- **Credits** - Complete production credits

### English Version (en.html)
- **Trailer** - Local video player with poster
- **Synopsis** - Complete film description (translated)
- **Director** - Veit Helmer biography (translated)
- **Cast** - Full cast with biographies and filmographies (translated)
- **Credits** - Complete production credits (translated)

## Key Features

1. **No Build Process Required**
   - All CSS pre-compiled and ready to use
   - No gulp, webpack, npm, or other build tools needed
   - Works immediately out of the box

2. **Fully Standalone**
   - Uses relative paths for all assets
   - Can be opened directly from the filesystem in any browser
   - No server required for local viewing
   - Works when moved to any folder location

3. **Local Video Integration**
   - Replaced YouTube embed with local MP4 video
   - Video path: `../trailer.mp4`
   - Poster image: `../trailer.jpg`
   - Native HTML5 video player with full controls

4. **Complete Bilingual Support**
   - German version (de.html) - complete content from live site
   - English version (en.html) - fully translated
   - Language switcher in top-right corner for easy navigation

5. **No JavaScript Required**
   - Pure HTML/CSS implementation
   - Language switcher uses simple HTML links
   - Video player uses native browser controls
   - Better performance and compatibility

6. **Modern, Accessible Code**
   - Semantic HTML5 structure
   - Fully responsive design (mobile, tablet, desktop)
   - Accessible with proper heading hierarchy
   - SEO optimized with complete meta tags
   - Print-friendly styles included

## File Structure

```
content/films/the-bra/site/
├── de.html                          # German version (complete)
├── en.html                          # English version (complete)
├── de-old.html                      # Previous minimal version (backup)
├── en-old.html                      # Previous minimal version (backup)
└── assets/
    ├── css/
    │   ├── styles-full.css          # Complete standalone CSS
    │   └── styles.css               # Previous minimal CSS (backup)
    ├── img/
    │   ├── background.jpg           # Background image
    │   ├── the-bra.png              # Main logo
    │   ├── bra.png                  # Additional graphics
    │   ├── the-bra_teaser.jpg       # Teaser image
    │   └── the-bra_title.svg        # Title graphic
    └── favicons/
        ├── favicon-16x16.png
        ├── favicon-32x32.png
        ├── favicon-96x96.png
        └── favicon.ico

Video assets (one level up):
../trailer.jpg                       # Video poster image (39 KB)
../trailer.mp4                       # Trailer video file (6.7 MB)
```

## Usage

### Local Viewing
Simply open the HTML files in any modern web browser:

**From Finder/Explorer:**
- Double-click `de.html` or `en.html`

**From Command Line:**
```bash
# macOS
open content/films/the-bra/site/de.html

# Linux
xdg-open content/films/the-bra/site/de.html

# Windows
start content/films/the-bra/site/de.html
```

### Web Deployment
Upload the entire `site/` folder (including parent folder for video files) to any web server. The relative paths ensure it works in any location without modification.

## Comparison with Live Site

Based on: https://www.veithelmer.com/en/feature-films/the-bra/

### Retained from Original
✅ Complete film synopsis and story
✅ Director biography and information
✅ Full cast profiles with biographies
✅ Complete filmographies for all cast members
✅ Production credits and details
✅ Visual branding and color scheme (#b05780 / #fcd6e5)
✅ Bilingual German/English support
✅ Responsive mobile-friendly design

### Improvements Made
✅ Replaced YouTube with local MP4 video
✅ Removed JavaScript dependencies (was ~50KB minified JS)
✅ Simplified navigation (standard HTML sections vs. complex toggles)
✅ Faster load times (no external dependencies)
✅ Better offline support
✅ Cleaner, more maintainable code structure

### Simplified Elements
- Removed JavaScript-based accordion/toggle navigation
- Removed photo gallery section (no images provided)
- Removed cinema finder (outdated for 2018 film)
- Removed premiere dates section (outdated)
- Streamlined to essential content and information

## Technical Specifications

### Browser Support
- **Chrome/Edge**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile**: iOS Safari 14+, Chrome Android 90+

### Performance
- **HTML**: ~8 KB per file (de.html / en.html)
- **CSS**: ~5 KB (styles-full.css)
- **Images**: ~1.5 MB total (background + logo + graphics)
- **Video**: 6.7 MB (trailer.mp4)
- **Total**: ~8.2 MB complete microsite

### Requirements
- Modern web browser with HTML5 video support
- No internet connection needed (fully offline capable)
- No build tools or compilation required

## Maintenance

### Updating Content
1. Edit `de.html` or `en.html` directly in any text editor
2. Modify styles in `assets/css/styles-full.css`
3. Replace images in `assets/img/` (maintain same filenames)
4. Update video by replacing `../trailer.mp4` and `../trailer.jpg`

### Adding New Languages
1. Duplicate `en.html` or `de.html`
2. Rename to appropriate language code (e.g., `fr.html`)
3. Translate all content
4. Update language switcher links in all HTML files

## Version History

- **January 2026**: Complete rebuild with comprehensive content from live site
- **Previous**: Minimal version with trailer only

## Credits

- **Film**: "The Bra" (VOM LOKFÜHRER, DER DIE LIEBE SUCHTE...)
- **Director**: Veit Helmer
- **Original Website**: Veit Helmer Films
- **Microsite Rebuild**: January 2026
- **Content Source**: https://www.veithelmer.com/en/feature-films/the-bra/
