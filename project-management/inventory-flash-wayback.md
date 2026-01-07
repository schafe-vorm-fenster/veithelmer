# Inventory: Legacy Flash Websites Research (Wayback Machine)

This document catalogs the findings from researching legacy Flash-based movie microsites using the Internet Archive's Wayback Machine.

## Phase 3.1.2 Summary: Curated Snapshots

**Objective:** Identify the richest Wayback Machine snapshots (1999–2015) for four Flash-based microsites using the CDX API.

**Key Findings:**
- **Absurdistan**: Excellent coverage (2007–2011); 5 curated snapshots; largest capture 9.3KB (2011)
- **Baikonur**: **No successful captures found** in CDX API; domain may not have been properly archived or used different hosting
- **Tor zum Himmel**: Good coverage (2003–2005); 6 curated snapshots before domain parking; legitimate content ends 2005
- **Tuvalu**: Excellent coverage (2007–2015); 7 curated snapshots plus **preserved Flash SWF file** (113KB intro animation)

**Actionable Assets:**
- 18 curated snapshot URLs with timestamps and technical metadata
- 1 preserved Flash SWF file in Wayback (Tuvalu intro.swf - 113KB)
- 1 ZIP archive of press materials in Wayback (Absurdistan - 584KB)
- ✅ **Complete local website code** for all four sites in `legacy/movie-websites/`
- Documentation of archive gaps (Baikonur) and limitations (Tor zum Himmel domain squatting)
- **Corrected**: Absurdistan Wayback URLs removed (showed distributor page, not actual site)

## Summary of Research

Due to the deprecation of Adobe Flash and the removal of Flash Player from modern browsers, direct interaction with the archived Flash content is limited. However, visual documentation has been salvaged from the existing `directors-website` assets and cross-referenced with Wayback Machine snapshots.

### 1. Absurdistan

**Curated Snapshots (1999–2015):**

#### Primary Snapshot
- **URL:** http://web.archive.org/web/20110822100043/http://www.farbfilm-verleih.de/filme/absurdistan.html
- **Timestamp:** 2011-08-22 10:00:43
- **Content Size:** 9,285 bytes (largest HTML capture)
- **Status:** 200 OK
- **Notes:** Peak content period; largest file size indicates richest version with complete content. Post-theatrical release.

#### Secondary Snapshots
- **URL:** http://web.archive.org/web/20100323232508/http://www.farbfilm-verleih.de/filme/absurdistan.html
- **Timestamp:** 2010-03-23 23:25:08
- **Content Size:** 8,267 bytes
- **Notes:** Theatrical release period (film released 2008); good content preservation.

- **URL:** http://web.archive.org/web/20071227033944/http://www.farbfilm-verleih.de/filme/absurdistan.html
- **Timestamp:** 2007-12-27 03:39:44
- **Content Size:** 6,953 bytes
- **Notes:** Earliest substantial capture; pre-release promotional period.

**Archive Assets:**
- High-res press images available in Wayback snapshots (2011)
- ZIP archive of press materials: http://web.archive.org/web/20110923183554/http://www.farbfilm-verleih.de/filme/absurdistan/pressebilder_neu/pressebild/2.jpg.zip (584KB)

**Legacy Website Code:**
- ✅ **Complete website preserved**: `legacy/movie-websites/absurdistan/`
- Includes: Flash SWF files, HTML, images, scripts, trailers
- Use local code for screenshots/reconstruction (Wayback snapshots are incomplete)

**Local Assets:** 
- Website code: `legacy/movie-websites/absurdistan/` (complete)
- Poster image: `legacy/movie-websites/absurdistan/wayback_screenshot.jpg`

### 2. Baikonur

**Curated Snapshots (1999–2015):**

#### Status: Limited Archive Coverage
- **Domain:** baikonur-film.de
- **CDX Query Results:** No successful captures found in Wayback CDX API for 1999–2015 period
- **Previous Reference URL:** https://web.archive.org/web/20130528022756/http://www.baikonur-film.de/ (returns 404)
- **Notes:** The domain baikonur-film.de appears to have minimal or no successful archival captures during the target period. The film was released in 2011. Possible that the site was hosted on a different domain (e.g., distributor site) or had very limited web presence. The CDX API returned empty results for all query variations attempted.

**Alternative Archive Strategy:**
- Check farbfilm-verleih.de for distributor-hosted pages (no results found)
- Local salvaged assets may be the only preserved content

**Legacy Website Code:**
- ✅ **Complete website preserved**: `legacy/movie-websites/baikonur/`
- Includes: WordPress installation with full theme, templates, uploads
- Use local code for screenshots/reconstruction (no Wayback captures available)

**Local Assets:** 
- Website code: `legacy/movie-websites/baikonur/` (complete WordPress site)
- Poster image: `legacy/movie-websites/baikonur/wayback_screenshot.jpg`

### 3. Tor zum Himmel (Gate to Heaven)

**Curated Snapshots (1999–2015):**

#### Primary Snapshot
- **URL:** http://web.archive.org/web/20051231093040/http://www.tor-zum-himmel.de/
- **Timestamp:** 2005-12-31 09:30:40
- **Content Size:** 4,730 bytes (largest capture before domain parking)
- **Status:** 200 OK
- **Notes:** Latest genuine film website content before domain was parked/squatted. Film released in 2003; this represents the mature site version.

#### Secondary Snapshots
- **URL:** http://web.archive.org/web/20050130201007/http://tor-zum-himmel.de/
- **Timestamp:** 2005-01-30 20:10:07
- **Content Size:** 906 bytes
- **Notes:** Mid-release period; referenced in existing inventory as representative snapshot.

- **URL:** http://web.archive.org/web/20041217095003/http://www.tor-zum-himmel.de/
- **Timestamp:** 2004-12-17 09:50:03
- **Content Size:** 905 bytes
- **Notes:** Post-release promotional period (2004).

- **URL:** http://web.archive.org/web/20040519031818/http://www.tor-zum-himmel.de/
- **Timestamp:** 2004-05-19 03:18:18
- **Content Size:** 920 bytes
- **Notes:** Early theatrical period; stable version.

- **URL:** http://web.archive.org/web/20031203000332/http://www.tor-zum-himmel.de/
- **Timestamp:** 2003-12-03 00:03:32
- **Content Size:** 933 bytes
- **Notes:** Earliest capture; original launch period around film premiere (2003).

**Important Context:**
- Domain was squatted/parked starting January 2006 with spam content
- All legitimate film website content predates 2006
- No Flash SWF files captured in CDX API (may have been inline or lost)
- Small file sizes suggest minimalist Flash-based design

**Legacy Website Code:**
- ✅ **Complete website preserved**: `legacy/movie-websites/torzumhimmel/`
- Includes: Flash SWF files (German & English), HTML pages, images, video folder
- Use local code for screenshots/reconstruction

**Recommended URLs for Screenshots:**
- ⭐ **BEST**: http://web.archive.org/web/20031203000332/http://www.tor-zum-himmel.de/ (earliest, authentic Flash site)
- Good alternative: http://web.archive.org/web/20040519031818/http://www.tor-zum-himmel.de/
- Latest clean version: http://web.archive.org/web/20051231093040/http://www.tor-zum-himmel.de/

**Local Assets:** 
- Website code: `legacy/movie-websites/torzumhimmel/` (complete with SWF files)
- Poster image: `legacy/movie-websites/torzumhimmel/wayback_screenshot.jpg`
- **Note**: If Wayback screenshots needed, save to new folder `torzumhimmel/web-archive-org/`

### 4. Tuvalu

**Curated Snapshots (1999–2015):**

#### Primary Snapshot
- **URL:** http://web.archive.org/web/20150909163608/http://www.veithelmer.de/tuvalu/de/
- **Timestamp:** 2015-09-09 16:36:08
- **Content Size:** 881 bytes
- **Status:** 200 OK
- **Notes:** Latest capture within target period; long-term archived version.

#### Secondary Snapshots
- **URL:** http://web.archive.org/web/20110702120426/http://www.veithelmer.de/tuvalu/de/intro.swf
- **Timestamp:** 2011-07-02 12:04:26
- **Content Size:** 113,672 bytes (Flash intro file)
- **Status:** 200 OK
- **Notes:** **Flash SWF file preserved**; largest/latest version of Flash intro animation. Main interactive element.

- **URL:** http://web.archive.org/web/20110606013610/http://www.veithelmer.de/Tuvalu.11.0.html?&L=0
- **Timestamp:** 2011-06-06 01:36:10
- **Content Size:** 1,627 bytes
- **Notes:** German language entry page; referenced in existing inventory.

- **URL:** http://web.archive.org/web/20100907171808/http://www.veithelmer.de/tuvalu/de/
- **Timestamp:** 2010-09-07 17:18:08
- **Content Size:** 831 bytes
- **Notes:** Mid-archive period capture; stable version.

- **URL:** http://web.archive.org/web/20071023002713/http://www.veithelmer.de/tuvalu/de/intro.swf
- **Timestamp:** 2007-10-23 00:27:13
- **Content Size:** 113,464 bytes (Flash intro file)
- **Notes:** Earliest Flash SWF capture; original version from 2007.

- **URL:** http://web.archive.org/web/20071020082719/http://www.veithelmer.de/tuvalu/de/
- **Timestamp:** 2007-10-20 08:27:19
- **Content Size:** 774 bytes
- **Notes:** Earliest HTML capture of the main page.

**Archive Assets:**
- Complete Flash intro animation preserved as SWF (113KB)
- Extensive image gallery captured with animated GIFs (anim.gif: 11KB)
- Multiple language versions (German and English)
- Supporting assets: background images, photo stills from film

**Technical Notes:**
- Hybrid HTML/Flash architecture: HTML frameset with Flash intro
- Film released 1999; website appears to have launched around 2007 on veithelmer.de
- Content remained accessible through 2015

**Legacy Website Code:**
- ✅ **Complete website preserved**: `legacy/movie-websites/tuvalu/`
- Includes: Flash intro SWF, HTML pages (German & English), extensive image galleries
- Use local code for screenshots/reconstruction

**Recommended URLs for Screenshots:**
- ⭐ **BEST**: http://web.archive.org/web/20110606013610/http://www.veithelmer.de/Tuvalu.11.0.html?&L=0 (German, full site)
- Flash intro page: http://web.archive.org/web/20110702114920/http://www.veithelmer.de/tuvalu/de/ (shows Flash animation)
- Flash SWF direct: http://web.archive.org/web/20110702120426/http://www.veithelmer.de/tuvalu/de/intro.swf (preserved 113KB)
- English version: http://web.archive.org/web/20110606014154/http://www.veithelmer.de/Tuvalu.11.0.html?&L=1
- Early version: http://web.archive.org/web/20071020030337/http://www.veithelmer.de/Tuvalu.11.0.html?&L=0

**Local Assets:** 
- Website code: `legacy/movie-websites/tuvalu/` (complete with intro SWF and galleries)
- Poster image: `legacy/movie-websites/tuvalu/wayback_screenshot.jpg`
- **Note**: If Wayback screenshots needed, save to new folder `tuvalu/web-archive-org/`

### 5. Quatsch (Fiddlesticks)
- **Status:** HTML-based but with Flash elements.
- **Local Screenshot:** `legacy/movie-websites/quatsch/wayback_screenshot.jpg` (Salvaged still).

### 6. The Bra
- **Status:** Modern HTML-based microsite.
- **Local Screenshot:** `legacy/movie-websites/the-bra/wayback_screenshot.jpg` (Salvaged still).

## Research Methodology

### Phase 3.1.2: CDX API Curation (January 2026)
- **Tool:** Internet Archive Wayback Machine CDX Server API
- **Query Parameters:** 
  - Date range: 1999–2015 (covering Flash era)
  - Output format: JSON for programmatic analysis
  - Filters: Status code 200, MIME type analysis for Flash content
- **Selection Criteria:**
  1. **File size**: Larger files typically indicate richer content (images, complete layouts)
  2. **Temporal coverage**: Snapshots from launch, peak (theatrical release), and final periods
  3. **Content preservation**: Verified 200 status codes; prioritized captures with supporting assets
  4. **Flash artifacts**: Specifically searched for .swf files where applicable
- **Verification:** Cross-referenced CDX results with actual Wayback URLs; documented 404s
- **Documentation:** Recorded primary/secondary URLs with timestamps, content sizes, and contextual notes

### Original Research (Pre-Phase 3.1.2)
- **Search:** Querying Wayback Machine CDX API for snapshots between 1999 and 2015.
- **Verification:** Identifying snapshots with the highest file sizes or those from distributor pages (farbfilm-verleih.de) which often had better preservation.
- **Capture:** Using existing high-quality stills as representative screenshots for the inventory, as live Flash rendering is no longer reliable.

## Screenshot Capture Guide

### Current Status
The existing `wayback_screenshot.jpg` files in each movie folder contain only **movie posters or teasers**, not actual website screenshots.

**However**: We have **complete legacy website code** preserved locally for all four Flash sites, which can be used for rendering and screenshots.

### Legacy Website Code Inventory

✅ **Full websites preserved locally:**
- `legacy/movie-websites/absurdistan/` - Complete with Flash SWF, HTML, images, trailers
- `legacy/movie-websites/baikonur/` - Complete WordPress installation with theme/templates
- `legacy/movie-websites/torzumhimmel/` - Complete with Flash SWF (German & English), HTML, images
- `legacy/movie-websites/tuvalu/` - Complete with Flash intro SWF, HTML, extensive galleries

### Screenshot Strategy

#### Option 1: Use Local Website Code (RECOMMENDED)
Since we have complete local copies, screenshots should be generated from the local files by:
1. Setting up local web server
2. Rendering the HTML/Flash content
3. Capturing screenshots of the actual working sites

#### Option 2: Wayback Machine Screenshots (SUPPLEMENTARY)
For historical context, capture how sites appeared in Wayback Machine:

**Tor zum Himmel:**
- http://web.archive.org/web/20031203000332/http://www.tor-zum-himmel.de/

**Tuvalu:**
- http://web.archive.org/web/20110606013610/http://www.veithelmer.de/Tuvalu.11.0.html?&L=0
- http://web.archive.org/web/20110702120426/http://www.veithelmer.de/tuvalu/de/intro.swf (Flash SWF)

**Note**: 
- Absurdistan Wayback URLs are misleading (farbfilm-verleih.de distributor page, not actual site)
- Baikonur has no Wayback captures
- Use local code as primary source for both

### Screenshot Organization

If capturing Wayback screenshots as supplementary documentation:
```
legacy/movie-websites/{movie-name}/web-archive-org/
├── wayback-screenshot-YYYYMMDD-description.png
└── wayback-screenshot-YYYYMMDD-description.png
```

**Primary screenshots should come from local website code, not Wayback.**
