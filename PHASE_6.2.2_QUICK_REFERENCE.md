# Phase 6.2.2 Quick Reference
## UI Component Library - Film Tiles & Controls

**Status:** ✅ Complete | **Date:** 2026-01-07

---

## Components Created

### 1. Film Tile (`filmTile.njk`)
```njk
{% import "macros/filmTile.njk" as filmTile %}

{{ filmTile.filmTile(
  title="Film Title",
  year="2024",
  image="/path/image.jpg",
  url="/films/slug/",
  category="Feature"  // optional
) }}
```

**Features:**
- 3:2 aspect ratio, borderless
- Hover: 105% scale, drop shadow
- Overlay with title/year on hover
- Optional category badge

---

### 2. Buttons (`buttons.njk`)
```njk
{% import "macros/buttons.njk" as buttons %}

{{ buttons.arrowButton('/url/', 'Label', 'right') }}
{{ buttons.playButton('/trailer/', 'Play video') }}
{{ buttons.textButton('Text', '/url/') }}
{{ buttons.closeButton('Close') }}
{{ buttons.iconButton(svg, 'Label', '/url/', 'md') }}
```

**Sizes:** `sm` (32px), `md` (40px), `lg` (48px)  
**Hover:** Black → White inversion, 200ms

---

### 3. Language Toggle (`languageToggle.njk`)
```njk
{% import "macros/languageToggle.njk" as lang %}

{{ lang.languageToggle('en', '/path/') }}
{{ lang.languageToggleCompact('de') }}
```

**Languages:** DE / EN  
**Active state:** Background tint, 100% opacity

---

## Styleguide Page

**URL:** `/styleguide/`  
**View:** `_site/styleguide/index.html`

Contains:
- Film tile examples (single + grid)
- All button variants
- Language toggle variations
- Interactive demos
- Technical specifications

---

## File Structure

```
src/
├── _includes/
│   └── macros/
│       ├── filmTile.njk
│       ├── buttons.njk
│       └── languageToggle.njk
├── css/
│   └── main.css (+ component layer)
└── styleguide.njk
```

---

## Build & Test

```bash
npm run build
# Output: _site/styleguide/index.html
# CSS: _site/css/main.css (1410 lines)
# Build time: ~1.2 seconds
```

---

## Usage Pattern

```njk
{# Import at top of template #}
{% import "macros/filmTile.njk" as filmTile %}
{% import "macros/buttons.njk" as buttons %}
{% import "macros/languageToggle.njk" as lang %}

{# Use in template #}
<section>
  <div class="flex justify-between mb-6">
    <h2>Feature Films</h2>
    {{ buttons.arrowButton('/films/', 'View all') }}
  </div>
  
  <div class="grid grid-cols-3 gap-6">
    {% for film in films %}
      {{ filmTile.filmTile(
        title=film.title,
        year=film.year,
        image=film.poster,
        url=film.url,
        category="Feature"
      ) }}
    {% endfor %}
  </div>
</section>
```

---

## Hover States Summary

| Component | Hover Effect | Duration |
|-----------|-------------|----------|
| Film Tile | Scale 105%, Shadow, Overlay | 300ms |
| Icon Button | White bg, Black text | 200ms |
| Text Button | White bg, Black text | 200ms |
| Lang Toggle | Opacity 100%, Subtle bg | 200ms |

---

## Accessibility ✅

- Semantic HTML (`<article>`, `<nav>`)
- ARIA labels on all interactive elements
- `aria-current` for active language
- Focus ring indicators
- Keyboard navigation support
- Alt text on images

---

## Design Specs Met ✅

Per Spec 7.1 "Streaming Service Style":
- ✅ Film Tile: 3:2 aspect ratio, borderless
- ✅ Hover State: Smooth scale-up (105%), Z-index lift, drop shadow
- ✅ Overlay: Title + Year appear on hover
- ✅ Buttons: Minimalist, icon-driven, monochrome
- ✅ Styleguide: Renders components with interactive hover states

---

## Next Phase Ready

Components ready for:
- Homepage film grid implementation
- Film detail page layouts
- Navigation menu integration
- Content collection binding
- Image optimization

---

**Dependencies:** Phase 6.2.1 (Layouts) ✅  
**Phase 6.2.2:** ✅ Complete
