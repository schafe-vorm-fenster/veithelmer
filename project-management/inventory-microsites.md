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
- **Video Assets**:
    - `videos/QUATSCH-Der-Film_Trailer-HD.mp4`
    - `videos/QUATSCH-Der-Film_Wir-sind-die-Nasenbaerenbande_Musikvideo.mp4`
    - `videos/QUATSCH-Der-Film_Wir-bleiben-auf_Musikvideo.mp4`

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
- **Flash Components**: 
    - `de/template/global/jwplayer/player-licensed.swf` (Video player)
    - `de/media/trailer.flv` (Trailer video)

---

## Category: Hybrid Microsites
*Mixed extraction path. Contains significant HTML content but may rely on Flash for entry or specific features.*

### 6. Tuvalu
- **Slug**: `tuvalu`
- **Source Directory**: `legacy/movie-websites/tuvalu/`
- **Flash Components**: 
    - `index.html` (Flash loader)
    - `de/intro.swf` (German intro)
    - `en/intro.swf` (English intro)
- **HTML Content**: `de/main.html`, `en/main.html` and extensive sub-pages in `de/seiten/`, `en/seiten/`
- **Video Assets**:
    - `de/video/tuvalu.mov` (German trailer/clip)
    - `en/video/tuvalu.mov` (English trailer/clip)
- **Languages**: German, English
- **Notes**: The core content is HTML-based and can be extracted, but the entry point is Flash.

---

## Category: Flash-based Microsites
*Complex extraction path. Requires SWF decompilation or Wayback Machine research for content extraction.*

### 7. Absurdistan
- **Slug**: `absurdistan`
- **Source Directory**: `legacy/movie-websites/absurdistan/`
- **Main File**: `absurdistan.swf` (loaded via `index.html`)
- **Flash Components**:
    - `absurdistan.swf` (Main application)
    - `player.swf` (Media player)
    - `trailer/absurdistan_trailer.flv` (Trailer video)
- **Languages**: German (based on file structure and typical patterns)
- **Notes**: Content (text/images) appears to be bundled or loaded into the SWF.

### 8. Tor zum Himmel (Gate to Heaven)
- **Slug**: `torzumhimmel`
- **Source Directory**: `legacy/movie-websites/torzumhimmel/`
- **Main File**: `torzumhimmel.swf`, `torzumhimmel_en.swf`
- **Flash Components**:
    - `torzumhimmel.swf` (German main application)
    - `torzumhimmel_en.swf` (English main application)
- **Video Assets**:
    - `video/tzh/TorZumHimmel-Tr_hi.mov`, `TorZumHimmel-Tr_hi.wmv`
    - `video/tzh/TorZumHimmel-Tr_med.mov`, `TorZumHimmel-Tr_med.wmv`
    - `video/tzh/TorZumHimmel-Tr_low.mov`, `TorZumHimmel-Tr_low.wmv`
- **Languages**: German, English
- **Notes**: Purely Flash-based entry points in `de/index.html` and `en/index.html`.

---

## SWF File Inventory

Comprehensive list of all `.swf` files found in `legacy/movie-websites/`:

| Path | Microsite | Description |
|------|-----------|-------------|
| `legacy/movie-websites/absurdistan/absurdistan.swf` | Absurdistan | Main Flash Application |
| `legacy/movie-websites/absurdistan/player.swf` | Absurdistan | Media Player |
| `legacy/movie-websites/baikonur/de/template/global/jwplayer/player-licensed.swf` | Baikonur | JW Player (Video) |
| `legacy/movie-websites/torzumhimmel/torzumhimmel.swf` | Tor zum Himmel | Main Flash Application (DE) |
| `legacy/movie-websites/torzumhimmel/torzumhimmel_en.swf` | Tor zum Himmel | Main Flash Application (EN) |
| `legacy/movie-websites/tuvalu/de/intro.swf` | Tuvalu | Intro Animation (DE) |
| `legacy/movie-websites/tuvalu/en/intro.swf` | Tuvalu | Intro Animation (EN) |

## Video and Media File Inventory

Comprehensive list of all video and other non-HTML media files found in `legacy/movie-websites/`:

| Path | Microsite | Type | Description |
|------|-----------|------|-------------|
| `legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv` | Absurdistan | FLV | Trailer video |
| `legacy/movie-websites/baikonur/de/media/trailer.flv` | Baikonur | FLV | Trailer video |
| `legacy/movie-websites/quatsch/videos/QUATSCH-Der-Film_Trailer-HD.mp4` | Quatsch | MP4 | Trailer HD |
| `legacy/movie-websites/quatsch/videos/QUATSCH-Der-Film_Wir-sind-die-Nasenbaerenbande_Musikvideo.mp4` | Quatsch | MP4 | Musikvideo |
| `legacy/movie-websites/quatsch/videos/QUATSCH-Der-Film_Wir-bleiben-auf_Musikvideo.mp4` | Quatsch | MP4 | Musikvideo |
| `legacy/movie-websites/tuvalu/de/video/tuvalu.mov` | Tuvalu | MOV | Movie clip (DE) |
| `legacy/movie-websites/tuvalu/en/video/tuvalu.mov` | Tuvalu | MOV | Movie clip (EN) |
| `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_hi.mov` | Tor zum Himmel | MOV | Trailer High Quality |
| `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_hi.wmv` | Tor zum Himmel | WMV | Trailer High Quality |
| `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_med.mov` | Tor zum Himmel | MOV | Trailer Medium Quality |
| `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_med.wmv` | Tor zum Himmel | WMV | Trailer Medium Quality |
| `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_low.mov` | Tor zum Himmel | MOV | Trailer Low Quality |
| `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_low.wmv` | Tor zum Himmel | WMV | Trailer Low Quality |
| `legacy/movie-websites/quatsch/downloads/QUATSCH_TRL_HD_WEB.zip` | Quatsch | ZIP | Trailer Download |
| `legacy/movie-websites/quatsch/downloads/Quatsch_FBW_Empfehlung.pdf` | Quatsch | PDF | Recommendation |
| `legacy/movie-websites/quatsch/downloads/QUATSCH_Schule.pdf` | Quatsch | PDF | School Material |
| `legacy/movie-websites/quatsch/downloads/QUATSCH_Malvorlage.pdf` | Quatsch | PDF | Coloring Template |
