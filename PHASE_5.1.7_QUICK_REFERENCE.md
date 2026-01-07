# Phase 5.1.7 Quick Reference
## Video Standardization & Poster Frames

---

## 📁 Standardized File Structure

```
content/films/[slug]/
├── trailer.mp4          # H.264 video (standardized name)
├── trailer.jpg          # Poster frame at 1-second mark
├── index_de.md          # German content + frontmatter
├── index_en.md          # English content + frontmatter
├── poster.jpg           # Original film poster
└── assets/              # Additional assets
```

---

## 🎬 All Films with Trailers

| Film | Slug | Video | Poster | Status |
|------|------|-------|--------|--------|
| Absurdistan | `absurdistan` | ✅ 9.1M | ✅ 1.6K | Complete |
| Akiko | `akiko` | ✅ 4.2M | ✅ 1.6K | Complete |
| Baikonur | `baikonur` | ✅ 5.8M | ✅ 1.6K | Complete |
| Caspian Bride | `caspian-bride` | ✅ 7.3M | ✅ 1.6K | Complete |
| Fiddlesticks | `fiddlesticks` | ✅ 6.1M | ✅ 1.6K | Complete |
| Gate to Heaven | `gate-to-heaven` | ✅ 7.2M | ✅ 1.6K | Complete |
| Gondola | `gondola` | ✅ 8.4M | ✅ 1.6K | Complete |
| Once Upon a Time in Shanghai | `once-upon-a-time-in-shanghai` | ✅ 5.9M | ✅ 1.6K | Complete |
| The Bra | `the-bra` | ✅ 6.8M | ✅ 1.6K | Complete |
| Tuvalu | `tuvalu` | ✅ 6.5M | ✅ 1.6K | Complete |
| Uzbek Express | `uzbek-express` | ✅ 7.1M | ✅ 1.6K | Complete |

**Total**: 11 films • 11 videos • 11 posters • 100% complete

---

## 📝 Frontmatter Schema

```yaml
---
title: Film Title
director: Veit Helmer
release_year: 2008
duration: 88 minutes
country: Germany
poster_image: poster.jpg       # Original poster
trailer_video: trailer.mp4      # ← Video reference
trailer_poster: trailer.jpg     # ← Poster frame reference
external_links:
  - name: Movie Website
    url: /movie-websites/film-slug/index.html
---
```

---

## 🔧 Tools & Scripts

### Main Script
```bash
node scripts/phase-5-1-7-standardize-videos.js
```

**What it does**:
1. Finds all `trailer.mp4` files
2. Generates `trailer.jpg` poster frames (1-second mark)
3. Updates frontmatter in all `index_*.md` files
4. Logs everything to `migration_log.md`

---

## ⚡ Quick Commands

### Verify Structure
```bash
# Count videos
find content/films -name "trailer.mp4" | wc -l
# Expected: 11

# Count posters
find content/films -name "trailer.jpg" | wc -l
# Expected: 11

# List all trailer files
find content/films -name "trailer.*" | sort
```

### Check Frontmatter
```bash
# Verify trailer_video references
grep -r "trailer_video: trailer.mp4" content/films/*/index_*.md | wc -l
# Expected: 22 (11 films × 2 languages)

# Verify trailer_poster references
grep -r "trailer_poster: trailer.jpg" content/films/*/index_*.md | wc -l
# Expected: 22
```

### Generate Single Poster (Manual)
```bash
ffmpeg -i "trailer.mp4" -ss 00:00:01.000 -vframes 1 -q:v 2 "trailer.jpg" -y
```

---

## 🎯 Eleventy Integration

### Access in Templates
```javascript
// In .11ty.js or templates
film.data.trailer_video   // "trailer.mp4"
film.data.trailer_poster  // "trailer.jpg"
```

### Example HTML Template
```html
{% if trailer_video %}
<div class="video-container">
  <video 
    poster="{{ trailer_poster }}" 
    controls 
    preload="metadata"
  >
    <source src="{{ trailer_video }}" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</div>
{% endif %}
```

---

## 📊 Statistics

- **Total Films**: 11
- **Videos Standardized**: 11 (100%)
- **Posters Generated**: 11 (100%)
- **Markdown Files Updated**: 22 (100%)
- **Success Rate**: 100%
- **Total Video Size**: ~80MB
- **Total Poster Size**: ~18KB

---

## 📂 File Locations

| Type | Location | Pattern |
|------|----------|---------|
| Videos | `content/films/[slug]/` | `trailer.mp4` |
| Posters | `content/films/[slug]/` | `trailer.jpg` |
| Markdown | `content/films/[slug]/` | `index_{de,en}.md` |
| Script | `scripts/` | `phase-5-1-7-standardize-videos.js` |
| Log | Root | `migration_log.md` |
| Report | Root | `PHASE_5.1.7_COMPLETION_REPORT.md` |

---

## ✅ Acceptance Criteria Status

- ✅ Videos standardized to `trailer.mp4`
- ✅ Files in correct `content/films/[slug]/` directories
- ✅ Frontmatter updated with relative paths
- ✅ Poster frames generated for all trailers
- ✅ All operations logged in `migration_log.md`

---

## 🚀 Next Steps

1. **Integrate with Eleventy templates**
2. **Add video player components**
3. **Optimize for web performance**
4. **Add accessibility features**

---

**Phase 5.1.7**: ✅ **COMPLETE**  
**Date**: 2026-01-07  
**Status**: Ready for production
