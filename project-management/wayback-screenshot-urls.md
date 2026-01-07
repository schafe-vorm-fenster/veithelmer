# Wayback Machine URLs for Website Screenshot Capture

Quick reference for supplementary Wayback Machine screenshots.

**IMPORTANT**: We have complete legacy website code locally. Primary screenshots should come from local files, not Wayback.

## Local Website Code (PRIMARY SOURCE)

✅ **Complete websites preserved:**
- `legacy/movie-websites/absurdistan/` - Full site with Flash SWF, HTML, images
- `legacy/movie-websites/baikonur/` - Complete WordPress installation  
- `legacy/movie-websites/torzumhimmel/` - Full site with Flash SWF (DE/EN)
- `legacy/movie-websites/tuvalu/` - Full site with Flash intro SWF

**Recommendation**: Set up local web server and capture screenshots from these preserved sites.

---

## Wayback URLs (SUPPLEMENTARY ONLY)

Use these only for historical documentation of how sites appeared in Wayback Machine.

### 1. Tor zum Himmel (Gate to Heaven)

**Best snapshot (2003 - earliest authentic Flash site):**
```
http://web.archive.org/web/20031203000332/http://www.tor-zum-himmel.de/
```

**Alternative snapshots:**
```
http://web.archive.org/web/20040519031818/http://www.tor-zum-himmel.de/
http://web.archive.org/web/20040831203418/http://www.tor-zum-himmel.de/
http://web.archive.org/web/20051231093040/http://www.tor-zum-himmel.de/
```

**Save screenshots to:** `legacy/movie-websites/torzumhimmel/web-archive-org/` (if capturing Wayback)

---

### 2. Absurdistan

**⚠️ WARNING**: Wayback URLs show farbfilm-verleih.de distributor page, NOT the actual Absurdistan website.

**Do NOT use these URLs**:
```
❌ http://web.archive.org/web/20110822100043/http://www.farbfilm-verleih.de/filme/absurdistan.html
❌ http://web.archive.org/web/20080914115603/http://www.farbfilm-verleih.de/filme/absurdistan.html
```

**Use local code instead**: `legacy/movie-websites/absurdistan/`

---

### 3. Tuvalu

**Wayback URLs for Flash intro and site:**
```
http://web.archive.org/web/20110606013610/http://www.veithelmer.de/Tuvalu.11.0.html?&L=0
```

**Flash SWF file (preserved):**
```
http://web.archive.org/web/20110702120426/http://www.veithelmer.de/tuvalu/de/intro.swf
```

**Alternative snapshots:**
```
http://web.archive.org/web/20110702114920/http://www.veithelmer.de/tuvalu/de/
http://web.archive.org/web/20110606014154/http://www.veithelmer.de/Tuvalu.11.0.html?&L=1
```

**Save screenshots to:** `legacy/movie-websites/tuvalu/web-archive-org/` (if capturing Wayback)
**Also available locally**: `legacy/movie-websites/tuvalu/` (use this for primary screenshots)

---

### 4. Baikonur

**Status:** ⚠️ No verified Wayback captures found
**Use local code instead**: `legacy/movie-websites/baikonur/` (complete WordPress site)

---

## Primary Recommendation

**✅ USE LOCAL WEBSITE CODE FOR SCREENSHOTS**

All four Flash websites are fully preserved in `legacy/movie-websites/`. These local files are the authoritative source and should be used for:
- Primary website screenshots
- Website reconstruction
- Documentation

Wayback Machine URLs should only be used as **supplementary historical documentation** showing how sites appeared when archived online.

---

## Screenshot Naming Convention

```
screenshot-{number}-{description}.png

Examples (from local rendering):
- screenshot-01-homepage.png
- screenshot-02-navigation.png  
- screenshot-03-gallery.png

Examples (from Wayback, if used):
- wayback-20031203-homepage.png
- wayback-20110606-flash-intro.png
```

## Technical Notes

- **Primary Source**: Local website code in `legacy/movie-websites/`
- **Ruffle Emulation**: Wayback Machine may render Flash content via Ruffle (JavaScript Flash emulator)
- **Limitations**: Wayback Flash rendering is imperfect; local SWF files are more reliable
- **Browser**: Use modern browser with Wayback Machine's playback system (for Wayback captures only)
- **Resolution**: Capture full viewport, typically 1920x1080 or higher
- **Format**: Save as PNG for lossless quality

## What to Capture

### From Local Website Code (PRIMARY):
✓ Full website rendered in browser with local web server
✓ Flash elements (use Ruffle or Flash emulator)
✓ All pages and sections
✓ Navigation and interactive elements

### From Wayback (SUPPLEMENTARY ONLY):
✓ Historical appearance of sites in archive
✓ Comparison with local code
✓ Missing elements not in local preservation

### Don't Capture:
✗ Distributor pages (like farbfilm-verleih.de for Absurdistan)
✗ Movie posters alone (we already have wayback_screenshot.jpg)
✗ Error pages or broken Flash placeholders
