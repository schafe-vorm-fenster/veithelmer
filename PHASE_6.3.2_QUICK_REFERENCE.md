# Phase 6.3.3 Quick Reference
## Film Detail Template Usage Guide

---

## 🎬 Template Location
```
src/_layouts/film.njk
```

## 📁 Auto-Applied To
All files matching: `content/films/*/index_{en,de}.md`

---

## 🔗 URL Structure

| Language | URL Pattern | Example |
|----------|-------------|---------|
| English | `/en/films/{slug}/` | `/en/films/tuvalu/` |
| German | `/de/films/{slug}/` | `/de/films/tuvalu/` |

**Slug** = Parent directory name (e.g., `tuvalu`, `the-bra`, `absurdistan`)

---

## 📝 Required Frontmatter Fields

```yaml
---
title: Film Title          # Required
type: film                 # Required (auto-added if missing)
language: en               # Required (auto-added if missing)
description: "Short desc"  # Recommended for SEO
director: Director Name    # Displayed in sidebar
release_year: 2024        # Displayed prominently
---
```

---

## 🎨 Template Sections

### 1. Hero Section (Full-Width)
- **Video Priority 1**: Autoplays if `trailer_video: trailer.mp4` exists
- **Poster Priority 2**: Shows if `poster_image: poster.jpg` exists
- **Fallback**: SVG placeholder icon

### 2. Quick Info Block
Displays: Title, Year, Duration, Country
- **Microsite Button**: Shows if `external_links` field present

### 3. Information Grid (2-Column)
- **Left (2/3)**: Markdown body content (synopsis)
- **Right (1/3)**: Metadata sidebar

### 4. Metadata Sidebar (Definition List)
- Director
- Cast (list)
- Crew (role + name pairs)
- Technical Specs
- Awards (flexible format)

### 5. Navigation
- "Back to Film Archive" link to homepage

---

## 📦 Asset Management

### Asset Location
```
content/films/{slug}/
├── index_en.md
├── index_de.md
├── poster.jpg          # Fallback poster
├── trailer.mp4         # Hero video
└── trailer.jpg         # Video poster frame
```

### Asset References in Frontmatter
```yaml
poster_image: poster.jpg      # Main poster
trailer_video: trailer.mp4    # Autoplay video
trailer_poster: trailer.jpg   # Video thumbnail
```

### Generated Paths
Assets copied to: `_site/content/films/{slug}/`

Referenced in HTML: `/content/films/{slug}/{filename}`

---

## 🏆 Awards Field Formats

### Simple String Array
```yaml
awards:
  - 1st Prize, Gijon
  - Official closing film, Venice
```

### Object Format (Key-Value)
```yaml
awards:
  - Gent International Film festival: FIPRESCI-Award
  - Kiev International Film festival: Audience-Award
```

**Both formats render correctly!**

---

## 👥 Cast & Crew Fields

### Cast (Simple List)
```yaml
cast:
  - Denis Lavant
  - Chulpan Hamatova
  - Philippe Clay
```

### Crew (Role + Name Objects)
```yaml
crew:
  - role: Screenplay
    name: Michaela Beck, Veit Helmer
  - role: Cinematography
    name: Emil Christov
  - role: Music
    name: Jürgen Knieper
```

---

## 🔗 External Links (Microsite Button)

```yaml
external_links:
  - name: Movie Website
    url: /movie-websites/tuvalu/en/index.html
```

**Button text:** "Visit Microsite →"  
**Appears:** Only if `external_links` array has items  
**Behavior:** Opens in new tab with security headers

---

## 🎯 Quick Testing

### Build Site
```bash
npm run build
```

### Check English Film
```bash
open _site/en/films/tuvalu/index.html
```

### Check German Film
```bash
open _site/de/films/tuvalu/index.html
```

### List All Films
```bash
ls _site/en/films/
```

---

## 🔧 Common Customizations

### Change Video Behavior
**File:** `src/_layouts/film.njk` (Line ~10)

```njk
<video 
  autoplay    ← Remove for manual play
  muted       ← Remove for audio
  loop        ← Remove for single play
  controls    ← Add for player controls
>
```

### Adjust Grid Ratio
**File:** `src/_layouts/film.njk` (Line ~54)

```njk
<section class="information-grid grid md:grid-cols-3 gap-12">
  <div class="md:col-span-2">  ← Change to col-span-1 for 50/50
```

### Change Button Text
**File:** `src/_layouts/film.njk` (Line ~48)

```njk
Visit Microsite →   ← Change to any text
```

---

## 📊 Current Film Count

| Status | Count |
|--------|-------|
| **Total Films** | 17 |
| **English Pages** | 17 |
| **German Pages** | 17 |
| **Total Detail Pages** | 34 |

### Film List
1. Absurdistan
2. Akiko
3. Baikonur
4. Behind the Couch
5. Bling Bling
6. Caspian Bride
7. City Lives Berlin
8. Fiddlesticks
9. Gate to Heaven
10. Gondola
11. Once Upon a Time in Shanghai
12. Strangers in Tokyo
13. Surprise
14. The Bra
15. Tour Eiffel
16. Tuvalu
17. Uzbek Express

---

## 🚀 Adding New Films

### 1. Create Directory
```bash
mkdir content/films/new-film-slug
```

### 2. Add English Content
```bash
touch content/films/new-film-slug/index_en.md
```

### 3. Add German Content
```bash
touch content/films/new-film-slug/index_de.md
```

### 4. Add Assets
```bash
# Add to same directory
content/films/new-film-slug/poster.jpg
content/films/new-film-slug/trailer.mp4
```

### 5. Rebuild
```bash
npm run build
```

**Auto-generated URLs:**
- `/en/films/new-film-slug/`
- `/de/films/new-film-slug/`

---

## 🐛 Troubleshooting

### Film Not Appearing
- ✅ Check filename: Must be `index_en.md` or `index_de.md`
- ✅ Verify frontmatter has `type: film` and `language: en/de`
- ✅ Run `npm run build` after changes

### YAML Parse Error
- ✅ Escape quotes in descriptions: Use `"` or single quotes
- ✅ Quote colons: `description: "Contains: colon"`
- ✅ Check indentation: Must be consistent (2 spaces)

### Video Not Playing
- ✅ Check file exists: `content/films/{slug}/trailer.mp4`
- ✅ Verify format: Must be MP4 with H.264 codec
- ✅ Check frontmatter: `trailer_video: trailer.mp4`
- ✅ Browser autoplay: Some browsers block unmuted autoplay

### Awards Show "[object Object]"
- ✅ Fixed in current template
- ✅ Handles both string and object formats
- ✅ Rebuild site: `npm run build`

---

## 📚 Related Files

| File | Purpose |
|------|---------|
| `src/_layouts/film.njk` | Main template |
| `src/_layouts/page.njk` | Parent layout (header/footer) |
| `src/_layouts/base.njk` | HTML shell (meta tags) |
| `content/films/films.11tydata.js` | Auto-config for all films |
| `eleventy.config.js` | Collections & build config |

---

## 🎨 Design Tokens Used

| Token | Value | Usage |
|-------|-------|-------|
| `bg-black` | `#000000` | Background |
| `text-white` | `#FFFFFF` | Primary text |
| `text-white/60` | 60% opacity | Labels |
| `text-white/40` | 40% opacity | Separators |
| `bg-brand-brown` | `#8D5315` | Button hover |

---

## ✅ Acceptance Criteria Status

- ✅ Clicking film tile opens detail page
- ✅ All 17 films render in both languages
- ✅ Video autoplay (muted) works
- ✅ Posters display as fallback
- ✅ "Visit Microsite" buttons show conditionally
- ✅ No layout breaks on any film
- ✅ Responsive design mobile-ready
- ✅ Streaming service aesthetic maintained

---

**Version:** 1.0  
**Last Updated:** 2026-01-07  
**Phase:** 6.3.3 Complete
