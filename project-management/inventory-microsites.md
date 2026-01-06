# Inventory: Legacy Movie Microsites

This document lists the legacy film microsites, categorized by their primary technology to determine the extraction path.

## Category: HTML-based Microsites
*Easy extraction path. Content is primarily in HTML/CSS/JS.*

### 1. The Bra
- **Slug**: `the-bra`
- **Source Directory**: `legacy/movie-websites/the-bra/`
- **Main HTML**: `html/index.html`
- **Languages**: English
- **Notes**: Modern structure (SASS, JS modules).

### 2. Behind the Couch
- **Slug**: `behindthecouch`
- **Source Directory**: `legacy/movie-websites/behindthecouch/`
- **Main HTML**: `de/index.html`, `en/index.html`
- **Languages**: German, English
- **Additional Pages**: `about.html`, `casting.html`, `credits.html`, `halflife.html`

### 3. Quatsch
- **Slug**: `quatsch`
- **Source Directory**: `legacy/movie-websites/quatsch/`
- **Main HTML**: `index.html`
- **Languages**: German
- **Key Assets**: `imgs/`, `videos/`, `downloads/`

### 4. Vom Lokführer der die Liebe suchte
- **Slug**: `vom-lokfuehrer-der-die-liebe-suchte`
- **Source Directory**: `legacy/movie-websites/vom-lokfuehrer-der-die-liebe-suchte/`
- **Main HTML**: `index.html`
- **Languages**: German
- **Key Assets**: `assets/` (css, fonts, galerie, imgs, js)

### 5. Baikonur
- **Slug**: `baikonur`
- **Source Directory**: `legacy/movie-websites/baikonur/`
- **Main HTML**: `de/index.html`, `en/index.html`
- **Languages**: German, English
- **Key Assets**: `template/global/`

---

## Category: Hybrid Microsites
*Mixed extraction path. Contains significant HTML content but may rely on Flash for entry or specific features.*

### 6. Tuvalu
- **Slug**: `tuvalu`
- **Source Directory**: `legacy/movie-websites/tuvalu/`
- **Flash Components**: `index.html` (Flash loader), `intro.swf`
- **HTML Content**: `de/main.html`, `en/main.html` and extensive sub-pages in `de/seiten/`, `en/seiten/`
- **Languages**: German, English
- **Notes**: The core content is HTML-based and can be extracted, but the entry point is Flash.

---

## Category: Flash-based Microsites
*Complex extraction path. Requires SWF decompilation or Wayback Machine research for content extraction.*

### 7. Absurdistan
- **Slug**: `absurdistan`
- **Source Directory**: `legacy/movie-websites/absurdistan/`
- **Main File**: `absurdistan.swf` (loaded via `index.html`)
- **Languages**: German (based on file structure and typical patterns)
- **Notes**: Content (text/images) appears to be bundled or loaded into the SWF.

### 8. Tor zum Himmel (Gate to Heaven)
- **Slug**: `torzumhimmel`
- **Source Directory**: `legacy/movie-websites/torzumhimmel/`
- **Main File**: `torzumhimmel.swf`, `torzumhimmel_en.swf`
- **Languages**: German, English
- **Notes**: Purely Flash-based entry points in `de/index.html` and `en/index.html`.