# Phase 6.3.1 Quick Reference
## Homepage Streaming Grid

### Overview
The homepage displays all films in a Netflix-style streaming grid with horizontal scrolling categories.

---

## Key Features

### Navigation
- **Sticky Header**: Fixed navigation bar at top
- **Anchor Links**: Jump to Features, Documentaries, or Shorts sections
- **Smooth Scroll**: `scroll-mt-20` offset for sticky header

### Film Categories
1. **Feature Films** (>60 minutes): 11 films
2. **Documentaries** (technical_specs contains "Documentary"): 1 film
3. **Short Films** (≤60 minutes): 5 films

### Sorting
- All categories sorted by `release_year`, newest first
- Implemented in `categorizeFilms` filter

---

## Usage

### Template Structure
```njk
{% from "macros/filmTile.njk" import filmTile %}
{% set categorizedFilms = collections.films | categorizeFilms %}

{# Iterate categories #}
{% for film in categorizedFilms.feature %}
  {{ filmTile(title, year, image, url, category) }}
{% endfor %}
```

### Film Tile Parameters
- `title`: Film title from frontmatter
- `year`: release_year from frontmatter
- `image`: `/assets/films/{slug}/{poster_image}`
- `url`: `/films/{slug}/`
- `category`: "Feature", "Documentary", or "Short"

---

## Horizontal Scroll Styling

### Container Classes
```html
<div class="horizontal-scroll-container 
            overflow-x-auto 
            overflow-y-hidden 
            -mx-6 px-6 pb-6">
  <div class="flex gap-6 w-max">
    {# Film tiles #}
  </div>
</div>
```

### Custom Scrollbar
```css
.horizontal-scroll-container::-webkit-scrollbar {
  height: 8px;
}

.horizontal-scroll-container::-webkit-scrollbar-track {
  background: #1f1f1f; /* brand-darkgray */
}

.horizontal-scroll-container::-webkit-scrollbar-thumb {
  background: #8d5315; /* brand-brown */
  border-radius: 4px;
}
```

---

## Film Collection API

### Access Films
```njk
{{ collections.films }}           {# All films #}
{{ collections.films.length }}    {# Count #}
{{ collections.films[0].data }}   {# Frontmatter #}
{{ collections.films[0].fileSlug }} {# Directory name #}
```

### Film Object Structure
```javascript
{
  data: {
    title: "Film Title",
    release_year: 2024,
    duration: "95 minutes",
    technical_specs: "Color",
    poster_image: "poster.jpg",
    trailer_video: "trailer.mp4",
    // ... more metadata
  },
  content: "Film description markdown...",
  fileSlug: "film-directory-name",
  url: "/films/film-directory-name/"
}
```

---

## Build Commands

### Development
```bash
pnpm run dev
# Starts Eleventy dev server with live reload
```

### Production Build
```bash
pnpm run build
# Generates static site in _site/
```

### Output
- `_site/index.html` - Homepage with film grid
- `_site/assets/films/**/*` - Film assets (posters, trailers)
- `_site/css/main.css` - Processed Tailwind CSS

---

## File Locations

### Templates
- Homepage: `src/index.njk`
- Film Tile: `src/_includes/macros/filmTile.njk`
- Base Layout: `src/_layouts/base.njk`
- Page Layout: `src/_layouts/page.njk`

### Configuration
- Eleventy: `eleventy.config.js`
- Collections: Films collection (custom loader)
- Filters: `categorizeFilms` filter

### Content
- Film Data: `content/films/*/index_en.md`
- Film Assets: `content/films/*/poster.jpg`, `trailer.mp4`, etc.

---

## Customization

### Change Category Rules
Edit `categorizeFilms` filter in `eleventy.config.js`:
```javascript
if (technical.includes("Documentary")) {
  categories.documentary.push(film);
} else if (minutes > 60) {  // ← Change threshold
  categories.feature.push(film);
} else {
  categories.short.push(film);
}
```

### Change Sorting
Modify sort function:
```javascript
categories[key].sort((a, b) => {
  return (b.data.release_year || 0) - (a.data.release_year || 0);
  // ↑ Reverse for oldest first: a - b
});
```

### Add New Category
1. Add to categories object: `categories.newType = []`
2. Add categorization logic in forEach loop
3. Add sort for new category
4. Add section in `index.njk`:
```njk
{% if categorizedFilms.newType.length > 0 %}
<section id="newtype">
  <h2>New Category</h2>
  {# ... film grid ... #}
</section>
{% endif %}
```

---

## Troubleshooting

### Films Not Showing
- Check film has `index_en.md` file
- Verify YAML frontmatter is valid
- Check console for skipped files warnings
- Ensure `release_year` and `duration` fields exist

### YAML Parse Errors
- Quote descriptions with special characters: `description: "Text with: colon"`
- Escape nested quotes: `"\"TITLE\" rest of text"`
- Run build to see specific error messages

### Images Not Loading
- Check `poster_image` field in frontmatter
- Verify file exists in `content/films/{slug}/`
- Ensure passthrough copy is configured in `eleventy.config.js`
- Image path: `/assets/films/{slug}/{poster_image}`

---

## Performance

### Current Stats
- **17 films** loaded from filesystem
- **105 assets** copied via passthrough
- **Build time**: ~0.7 seconds
- **Output size**: 3 HTML files + CSS + assets

### Optimization Tips
- Film collection loads once per build (cached)
- Horizontal scroll uses CSS-only (no JS)
- Images are lazy-loaded: `loading="lazy"`
- Film tiles use GPU-accelerated transforms

---

## Next Phase

**Phase 6.3.2**: Individual film detail pages
- Template: `src/_layouts/film.njk`  
- URL pattern: `/films/{slug}/`
- Features: Trailer player, full description, crew/cast info

