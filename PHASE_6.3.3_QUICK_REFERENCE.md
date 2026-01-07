# Phase 6.3.3 Quick Reference: Film Metadata (LD+JSON)

## Overview
Schema.org Movie structured data implementation for Rich Snippets and enhanced SEO.

---

## Key Components

### 1. Nunjucks Filter: `generateMovieSchema`
**Location**: `eleventy.config.js`

Generates complete Schema.org Movie JSON-LD from frontmatter data.

**Usage in template**:
```njk
{{ frontmatterData | generateMovieSchema(page) | safe }}
```

### 2. Film Layout Integration
**Location**: `src/_layouts/film.njk`

Structured data automatically added to `<head>` for all film pages.

---

## Schema.org Fields Mapped

| Frontmatter Field | Schema.org Property | Type | Example |
|-------------------|---------------------|------|---------|
| `title` | `name` | Text | "Tuvalu" |
| `description` | `description` | Text | "A place, far away..." |
| `director` | `director` | Person | "Veit Helmer" |
| `release_year` | `datePublished` | Date | "1999-01-01" |
| `duration` | `duration` | Duration | "PT1H32M" |
| `country` | `countryOfOrigin` | Country | "Germany" |
| `cast` | `actor` | [Person] | Array of actors |
| `poster_image` | `image` | URL | Full URL to poster |
| `trailer_video` | `trailer` | VideoObject | Complete video data |
| `awards` | `award` | [Text] | Array of awards |

---

## Duration Conversion

**Input**: Frontmatter duration field
- "90 minutes"
- "92 min"
- "120"

**Output**: ISO 8601 format
- "PT1H30M" (1 hour 30 minutes)
- "PT1H32M" (1 hour 32 minutes)
- "PT2H" (2 hours)

**Format**: `PT[hours]H[minutes]M`

---

## VideoObject Structure

When `trailer_video` exists in frontmatter:

```json
{
  "@type": "VideoObject",
  "name": "Film Title - Trailer",
  "description": "Trailer for Film Title",
  "contentUrl": "https://veithelmer.com/assets/films/slug/trailer.mp4",
  "uploadDate": "YYYY-01-01",
  "thumbnailUrl": "https://veithelmer.com/assets/films/slug/poster.jpg"
}
```

---

## Validation

### Run Validation Script
```bash
node scripts/validate-schema.js
```

### Expected Output
```
🔍 Validating Schema.org Movie structured data...

✅ de/films/tuvalu/index.html
✅ en/films/tuvalu/index.html
...

📊 Results: 34 valid, 0 invalid

✅ All film pages have valid Schema.org Movie structured data!
```

---

## Testing with Google

### Rich Results Test
1. Build site: `npm run build`
2. Visit: https://search.google.com/test/rich-results
3. Test URL or paste HTML
4. Verify "Movie" result detected

### Expected Rich Result
- ✅ Movie title
- ✅ Poster image
- ✅ Director name
- ✅ Release year
- ✅ Duration
- ✅ Description

---

## Common Commands

```bash
# Build site
npm run build

# Validate structured data
node scripts/validate-schema.js

# View generated schema for a film
cat _site/en/films/tuvalu/index.html | grep -A 60 'application/ld+json'

# Check all films
ls -la _site/en/films/*/index.html
```

---

## Troubleshooting

### Schema Not Appearing
- Check film has required fields in frontmatter
- Verify build completed successfully
- Inspect page source in browser

### Validation Errors
- Verify duration format converts correctly
- Check all URLs are absolute (https://...)
- Ensure JSON is properly escaped

### Duration Format Issues
- Must be in format: "90 minutes" or "90 min" or "90"
- Filter extracts number and converts to ISO 8601
- Format: PT[H]H[M]M (hours and minutes)

---

## File Locations

```
eleventy.config.js          # Filters defined here
src/_layouts/film.njk       # LD+JSON template integration
scripts/validate-schema.js  # Validation script
_site/*/films/*/index.html  # Generated output
```

---

## Key URLs

- Schema.org Movie: https://schema.org/Movie
- VideoObject: https://schema.org/VideoObject
- ISO 8601: https://en.wikipedia.org/wiki/ISO_8601#Durations
- Rich Results Test: https://search.google.com/test/rich-results

---

## Quick Check

```bash
# Quick validation check
node scripts/validate-schema.js && echo "✅ All valid"

# View one film's schema
cat _site/en/films/tuvalu/index.html | grep -A 60 'ld+json' | head -70
```

---

**Status**: ✅ Complete | **Pages**: 34 (17 films × 2 locales) | **Validation**: 100% pass
