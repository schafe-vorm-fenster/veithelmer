# Phase 6.4.1 Quick Reference: Navigation & Localization

## URL Structure

### Homepages
- Root: `/` → Redirects to `/en/`
- English: `/en/`
- German: `/de/`

### Film Pages
- English: `/en/{film-slug}/`
- German: `/de/{film-slug}/`

### Anchor Navigation
- `/en/#features`, `/en/#documentaries`, `/en/#shorts`
- `/de/#features`, `/de/#documentaries`, `/de/#shorts`

## Key Files

### I18n Configuration
- **`src/_data/i18n.json`** - All translatable strings

### Layouts
- **`src/_layouts/base.njk`** - Base layout with hreflang tags
- **`src/_layouts/page.njk`** - Sticky navigation + footer
- **`src/_layouts/film.njk`** - Film detail page with i18n

### Pages
- **`src/index.njk`** - Root redirect page
- **`src/en/index.njk`** - English homepage
- **`src/de/index.njk`** - German homepage

### Configuration
- **`eleventy.config.js`** - I18n filters (t, alternateUrl, getLocale)
- **`content/films/films.11tydata.js`** - Film permalink logic

## Usage Examples

### Using Translations in Templates

```nunjucks
{# Get current locale #}
{% set currentLocale = locale or page | getLocale %}

{# Translate a string #}
<h2>{{ 'nav.features' | t(currentLocale) }}</h2>

{# Available translation keys #}
{{ 'nav.features' | t(currentLocale) }}          → "Features" / "Spielfilme"
{{ 'nav.documentaries' | t(currentLocale) }}     → "Documentaries" / "Dokumentarfilme"
{{ 'nav.shorts' | t(currentLocale) }}            → "Shorts" / "Kurzfilme"
{{ 'footer.copyright' | t(currentLocale) }}      → "All rights reserved" / "Alle Rechte vorbehalten"
{{ 'film.synopsis' | t(currentLocale) }}         → "Synopsis" / "Synopsis"
{{ 'film.director' | t(currentLocale) }}         → "Director" / "Regie"
```

### Language Switcher

```nunjucks
{% set alternateLocale = 'de' if currentLocale == 'en' else 'en' %}
<a href="{{ page.url | alternateUrl(alternateLocale) }}" 
   hreflang="{{ alternateLocale }}">
  {{ alternateLocale | upper }}
</a>
```

### Generating hreflang Tags

```nunjucks
<link rel="alternate" hreflang="{{ currentLocale }}" 
      href="https://veithelmer.com{{ page.url }}">
<link rel="alternate" hreflang="{{ alternateLocale }}" 
      href="https://veithelmer.com{{ page.url | alternateUrl(alternateLocale) }}">
<link rel="alternate" hreflang="x-default" 
      href="https://veithelmer.com/en/">
```

## Navigation Structure

```
┌──────────────────────────────────────────────────────────┐
│  VEIT HELMER    Features  Documentaries  Shorts  |  DE   │ ← Sticky
└──────────────────────────────────────────────────────────┘

  [Film Content]

┌──────────────────────────────────────────────────────────┐
│  © 2026 Veit Helmer. All rights reserved.                │ ← Footer
└──────────────────────────────────────────────────────────┘
```

## Film Collections

- **`collections.films`** - All films (both languages)
- **`collections.films_en`** - English films only
- **`collections.films_de`** - German films only

Usage:
```nunjucks
{% set categorizedFilms = collections.films_en | categorizeFilms %}
```

## Adding New Translations

Edit `src/_data/i18n.json`:

```json
{
  "en": {
    "your_key": "English text"
  },
  "de": {
    "your_key": "German text"
  }
}
```

Use in templates:
```nunjucks
{{ 'your_key' | t(currentLocale) }}
```

## Testing

```bash
# Build site
npm run build

# Start dev server
npm run dev

# Test URLs
http://localhost:8081/          → Redirects to /en/
http://localhost:8081/en/       → English homepage
http://localhost:8081/de/       → German homepage
http://localhost:8081/en/tuvalu/ → English film page
http://localhost:8081/de/tuvalu/ → German film page
```

## Sticky Navigation Features

- **Position**: `sticky top-0 z-50`
- **Background**: `bg-black/95 backdrop-blur-sm`
- **Border**: Bottom border for visual separation
- **Layout**: Flexbox with space-between
- **Logo**: Left side, links to home
- **Links**: Right side, uppercase, tracking-wider
- **Language**: Separated by `|` divider

## Language Switching Behavior

1. User on `/en/gate-to-heaven/`
2. Clicks "DE" in navigation
3. URL changes to `/de/gate-to-heaven/`
4. Content loads in German
5. Film data remains the same
6. UI labels change to German

## SEO Benefits

- ✅ Google can index both language versions
- ✅ Users get correct language in search results
- ✅ No duplicate content penalties
- ✅ Proper canonical URLs
- ✅ Language-specific meta tags
- ✅ hreflang annotations for international SEO
