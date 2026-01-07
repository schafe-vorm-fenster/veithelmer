# Migration Log

## Global Static Pages (Bio & Legal)
- [x] Biography: `legacy/directors-website/de/biografie/index.html` -> `/content/pages/biography/index_de.md`
- [x] Biography: `legacy/directors-website/en/biography/index.html` -> `/content/pages/biography/index_en.md`
- [x] Contact: `legacy/directors-website/de/legal/kontakt/index.html` -> `/content/pages/legal/contact/index_de.md`
- [x] Contact: `legacy/directors-website/en/legal/contact/index.html` -> `/content/pages/legal/contact/index_en.md`
- [x] Imprint: `legacy/directors-website/de/legal/impressum/index.html` -> `/content/pages/legal/imprint/index_de.md`
- [x] Imprint: `legacy/directors-website/en/legal/imprint/index.html` -> `/content/pages/legal/imprint/index_en.md`

## Other Global Pages
- [x] Shop: `legacy/directors-website/de/shop/index.html` -> `/content/pages/shop/index_de.md`
- [x] Shop: `legacy/directors-website/en/shop/index.html` -> `/content/pages/shop/index_en.md`
- [x] Commercials: `legacy/directors-website/de/werbung/index.html` -> `/content/pages/commercials/index_de.md`
- [x] Commercials: `legacy/directors-website/en/commercials/index.html` -> `/content/pages/commercials/index_en.md`
- [x] Workshops Overview: `legacy/directors-website/de/workshops/index.html` -> `/content/pages/workshops/index_de.md`
- [x] Workshops Overview: `legacy/directors-website/en/seminars/index.html` -> `/content/pages/workshops/index_en.md`
- [x] Workshop "Guerilla Marketing": `legacy/directors-website/de/workshops/guerilla-film-marketing/index.html` -> `/content/pages/workshops/guerilla-marketing/index_de.md`
- [x] Workshop "7 Days": `legacy/directors-website/de/workshops/kurzfilm-dreh-in-7-tagen/index.html` -> `/content/pages/workshops/7-days/index_de.md`
- [x] Workshop "Casting": `legacy/directors-website/de/workshops/casting-fuer-schauspieler/index.html` -> `/content/pages/workshops/casting/index_de.md`
- [x] Workshop "Visual Storytelling": `legacy/directors-website/de/workshops/visual-storytelling/index.html` -> `/content/pages/workshops/visual-storytelling/index_de.md`
- [x] Workshop "Low Budget": `legacy/directors-website/de/workshops/low-budget-filmproducing/index.html` -> `/content/pages/workshops/low-budget/index_de.md`

Status: **Complete**

---

## Phase 2.2.3: HTML Microsites QA Results

**Date**: 2026-01-07  
**Executed**: Frontmatter validation and legacy comparison for HTML-based microsites

### Summary

✅ **Successfully extracted**: 5 HTML-based microsites  
❌ **Missing or incomplete**: 0 microsites  
⚠️  **Frontmatter issues**: 10 files (all missing `type` and `language` fields)

### Microsite Extraction Status

#### 1. The Bra (Vom Lokführer, der die Liebe suchte...)
- **Legacy Source**: `legacy/movie-websites/the-bra/`
- **Content Destination**: `content/films/the-bra/`
- **Category**: HTML-based
- **Status**: ✅ Extracted
- **Files**: `index_de.md`, `index_en.md`
- **Issues**: Missing frontmatter fields: `type`, `language`

#### 2. Behind the Couch
- **Legacy Source**: `legacy/movie-websites/behindthecouch/`
- **Content Destination**: `content/films/behind-the-couch/`
- **Category**: HTML-based
- **Status**: ✅ Extracted
- **Files**: `index_de.md`, `index_en.md`
- **Issues**: Missing frontmatter fields: `type`, `language`

#### 3. Quatsch (Fiddlesticks)
- **Legacy Source**: `legacy/movie-websites/quatsch/`
- **Content Destination**: `content/films/fiddlesticks/`
- **Category**: HTML-based
- **Status**: ✅ Extracted
- **Files**: `index_de.md` (Quatsch und die Nasenbärbande), `index_en.md` (Fiddlesticks)
- **Issues**: Missing frontmatter fields: `type`, `language`

#### 4. Baikonur
- **Legacy Source**: `legacy/movie-websites/baikonur/`
- **Content Destination**: `content/films/baikonur/`
- **Category**: HTML-based (with Flash video player)
- **Status**: ✅ Extracted
- **Files**: `index_de.md`, `index_en.md`
- **Issues**: Missing frontmatter fields: `type`, `language`
- **Notes**: Legacy site used Flash-based JW Player for video playback

#### 5. Tuvalu
- **Legacy Source**: `legacy/movie-websites/tuvalu/`
- **Content Destination**: `content/films/tuvalu/`
- **Category**: Hybrid (Flash intro + HTML content)
- **Status**: ✅ Extracted
- **Files**: `index_de.md`, `index_en.md`
- **Issues**: Missing frontmatter fields: `type`, `language`
- **Notes**: Legacy site had Flash intro animations, but main content was HTML

### Frontmatter Issues Identified

All extracted microsites are **missing required frontmatter fields**:
- `type`: Should indicate content type (e.g., "film", "microsite")
- `language`: Should indicate language code (e.g., "de", "en")

**Files affected**:
- `content/films/the-bra/index_de.md`
- `content/films/the-bra/index_en.md`
- `content/films/behind-the-couch/index_de.md`
- `content/films/behind-the-couch/index_en.md`
- `content/films/fiddlesticks/index_de.md`
- `content/films/fiddlesticks/index_en.md`
- `content/films/baikonur/index_de.md`
- `content/films/baikonur/index_en.md`
- `content/films/tuvalu/index_de.md`
- `content/films/tuvalu/index_en.md`

### Content Comparison Notes

- **Titles**: ✅ Correctly preserved from legacy HTML
- **Descriptions**: ✅ Extracted and present in frontmatter
- **Cast & Crew**: ✅ Structured as YAML arrays in frontmatter
- **Technical Specs**: ✅ Preserved (release year, duration, country)
- **External Links**: ⚠️  Some microsites retain links to legacy HTML locations
- **Media Assets**: 📝 Videos, images in legacy directories need separate migration plan

### Next Steps

Before proceeding to Eleventy integration:
1. Add missing `type` and `language` fields to all microsite markdown files
2. Standardize frontmatter schema across all microsites
3. Review external links and update to point to new locations
4. Document media asset migration strategy

### Tools Created

- `scripts/check-frontmatter.js`: Automated frontmatter validation script for HTML microsites

**Phase Status**: ⚠️  Complete with issues - Frontmatter standardization required

---

## Phase 2.2.3b: Frontmatter Issues Resolution

**Date**: 2026-01-07  
**Action**: Fixed all missing `type` and `language` fields in HTML microsite markdown files

### Changes Applied

Added missing frontmatter fields to all 10 markdown files:
- **type**: `film` (indicates content type)
- **language**: `de` or `en` (indicates language code)

### Files Updated

1. ✅ `content/films/the-bra/index_de.md` - Added `type: film` and `language: de`
2. ✅ `content/films/the-bra/index_en.md` - Added `type: film` and `language: en`
3. ✅ `content/films/behind-the-couch/index_de.md` - Added `type: film` and `language: de`
4. ✅ `content/films/behind-the-couch/index_en.md` - Added `type: film` and `language: en`
5. ✅ `content/films/fiddlesticks/index_de.md` - Added `type: film` and `language: de`
6. ✅ `content/films/fiddlesticks/index_en.md` - Added `type: film` and `language: en`
7. ✅ `content/films/baikonur/index_de.md` - Added `type: film` and `language: de`
8. ✅ `content/films/baikonur/index_en.md` - Added `type: film` and `language: en`
9. ✅ `content/films/tuvalu/index_de.md` - Added `type: film` and `language: de`
10. ✅ `content/films/tuvalu/index_en.md` - Added `type: film` and `language: en`

### Verification Results

Re-ran `scripts/check-frontmatter.js`:
- ✅ **0 frontmatter issues** remaining
- ✅ All 10 files now have valid frontmatter
- ✅ All required fields present: `title`, `type`, `language`

**Phase Status**: ✅ Complete - All frontmatter issues resolved
