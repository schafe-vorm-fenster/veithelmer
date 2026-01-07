# Phase 6.2.1 Quick Reference
## Base Layouts & Page Shell

---

## Layout Files

### `src/_layouts/base.njk` - Master HTML5 Shell
Complete HTML5 document structure with:
- SEO meta tags (title, description, keywords, author, canonical)
- Open Graph tags (Facebook/social media sharing)
- Twitter Card tags
- Font preloading (Inter Regular, Bold)
- CSS/JS injection
- Skip-to-content accessibility link
- Extensible template blocks

### `src/_layouts/page.njk` - Generic Page Wrapper
Standard page structure with:
- Header with VEIT HELMER logo
- Main content area
- Footer with copyright
- Navigation placeholder
- Semantic HTML5 landmarks (header, main, footer, nav)
- ARIA roles and labels

---

## Template Variables

### Required in Frontmatter
```yaml
---
layout: page.njk              # Always use page.njk for standard pages
title: Your Page Title         # Page title (shown in browser, SEO)
description: Page description  # Meta description for SEO/social
---
```

### Optional Variables
```yaml
keywords: keyword1, keyword2, keyword3  # SEO keywords
canonicalUrl: https://veithelmer.com/page  # Canonical URL
ogImage: /path/to/image.jpg    # Social sharing image
ogType: article                # Open Graph type (default: website)
locale: en_US                  # Language locale (default: en)
year: 2026                     # Copyright year (default: 2026)
```

---

## Template Blocks

### Extend Templates with Blocks
```njk
---
layout: page.njk
---

{% block head %}
  <!-- Additional meta tags, stylesheets -->
  <link rel="stylesheet" href="/css/custom.css">
{% endblock %}

{% block navigation %}
  <!-- Navigation menu items -->
  <a href="/films">Films</a>
  <a href="/about">About</a>
{% endblock %}

{% block content %}
  <!-- Override default content rendering -->
  <article>Your content here</article>
{% endblock %}

{% block footerContent %}
  <!-- Additional footer content -->
  <nav>
    <a href="/privacy">Privacy</a>
  </nav>
{% endblock %}

{% block scripts %}
  <!-- Additional JavaScript -->
  <script src="/js/custom.js"></script>
{% endblock %}
```

---

## Creating New Pages

### Basic Page
```njk
---
layout: page.njk
title: About Veit Helmer
description: Biography and filmography of award-winning filmmaker Veit Helmer
---

<div class="max-w-4xl">
  <h1 class="text-4xl font-bold mb-8">About</h1>
  <p>Content goes here...</p>
</div>
```

### Page with Custom Navigation
```njk
---
layout: page.njk
title: Films
---

{% block navigation %}
  <a href="/" class="hover:opacity-80">Home</a>
  <a href="/films" class="hover:opacity-80">Films</a>
  <a href="/about" class="hover:opacity-80">About</a>
{% endblock %}

<div class="films-grid">
  <!-- Film content -->
</div>
```

### Page with Custom Meta
```njk
---
layout: page.njk
title: Tuvalu - Film by Veit Helmer
description: Tuvalu (1999) - A silent black comedy set in a decaying swimming pool
ogImage: /assets/images/tuvalu-poster.jpg
ogType: video.movie
keywords: Tuvalu, silent film, Veit Helmer, 1999, swimming pool
---

{% block head %}
  <meta property="video:release_date" content="1999-06-17">
  <meta property="video:duration" content="6000">
{% endblock %}

<article class="film-detail">
  <h1>Tuvalu</h1>
  <!-- Film details -->
</article>
```

---

## Accessibility Features

### Skip Navigation Link
Automatically included on all pages:
```html
<a href="#main-content" class="sr-only focus:not-sr-only...">
  Skip to main content
</a>
```
- Hidden by default
- Visible when keyboard focused (Tab key)
- Jumps to main content area

### Semantic Landmarks
All pages include:
- `<header role="banner">` - Site header
- `<nav role="navigation">` - Navigation menu
- `<main id="main-content" role="main">` - Main content
- `<footer role="contentinfo">` - Site footer

### ARIA Labels
- Logo link: `aria-label="Veit Helmer - Home"`
- Navigation: `aria-label="Main navigation"`
- Site navigation: `aria-label="Site navigation"`

---

## SEO Features

### Automatic Meta Tags
Every page gets:
- Title tag with fallback
- Meta description
- Meta author (Veit Helmer)
- Meta keywords with sensible defaults
- Canonical URL
- Open Graph tags (type, url, title, description, image, locale, site_name)
- Twitter Card tags (card, url, title, description, image)

### Defaults
```
Title: "Veit Helmer - Filmmaker"
Description: "Official website of Veit Helmer, award-winning filmmaker..."
Keywords: "Veit Helmer, filmmaker, director, Tuvalu, Baikonur, The Bra..."
OG Image: "/assets/images/veithelmer-logo.jpg"
OG Type: "website"
```

---

## Design System Classes

### Typography
```html
<h1 class="text-4xl font-bold mb-8">Heading 1</h1>
<h2 class="text-3xl font-bold mb-6">Heading 2</h2>
<h3 class="text-2xl font-bold mb-4">Heading 3</h3>
<p class="text-base opacity-80 mb-4">Body text</p>
```

### Layout
```html
<div class="container mx-auto max-w-6xl px-6 py-12">
  <!-- Centered container -->
</div>

<div class="max-w-4xl">
  <!-- Narrower content -->
</div>
```

### Spacing
```html
<div class="p-8">Padding 2rem</div>
<div class="px-6 py-12">Padding x:1.5rem y:3rem</div>
<div class="mb-8">Margin bottom 2rem</div>
<div class="space-y-6">Stack with 1.5rem gap</div>
```

### Colors
```html
<div class="bg-black text-white">Black bg, white text</div>
<div class="border-white/10">10% white border</div>
<div class="bg-white/5">5% white background</div>
<p class="opacity-80">80% opacity text</p>
```

### Interactive
```html
<a href="#" class="hover:opacity-80 transition-opacity duration-200">
  Link with hover effect
</a>

<button class="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors">
  Button
</button>
```

---

## Build Commands

```bash
# Development server (live reload)
pnpm run dev
# → http://localhost:8080

# Production build
pnpm run build
# → Outputs to _site/

# Start (alias for dev)
pnpm start
```

---

## File Structure

```
src/
├── _layouts/
│   ├── base.njk              # Master HTML5 shell
│   └── page.njk              # Generic page wrapper
├── css/
│   └── main.css              # Design system styles
├── js/
│   └── main.js               # JavaScript entry point
├── assets/
│   ├── fonts/
│   │   ├── Inter-Regular.woff2
│   │   ├── Inter-Medium.woff2
│   │   └── Inter-Bold.woff2
│   └── images/
│       └── veithelmer-logo.jpg
├── index.njk                 # Homepage
└── design-system-test.njk    # Design system showcase

_site/                        # Generated output (gitignored)
├── index.html
├── css/main.css
├── js/main.js
└── assets/
```

---

## Common Patterns

### Film Detail Page
```njk
---
layout: page.njk
title: "{{ film.title }} - Veit Helmer"
description: "{{ film.synopsis }}"
ogImage: "{{ film.poster }}"
ogType: video.movie
---

<article class="max-w-4xl">
  <header class="mb-12">
    <h1 class="text-5xl font-bold mb-4">{{ film.title }}</h1>
    <p class="text-xl opacity-80">{{ film.year }}</p>
  </header>
  
  <div class="prose prose-invert max-w-none">
    {{ content | safe }}
  </div>
</article>
```

### Grid Layout
```njk
---
layout: page.njk
title: Films
---

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {% for film in collections.films %}
    <article class="bg-white/5 p-6 hover:bg-white/10 transition-colors">
      <h2 class="text-2xl font-bold mb-2">{{ film.data.title }}</h2>
      <p class="opacity-60">{{ film.data.year }}</p>
    </article>
  {% endfor %}
</div>
```

### Hero Section
```njk
<section class="py-24 text-center border-b border-white/10">
  <h1 class="text-6xl font-bold mb-6">Veit Helmer</h1>
  <p class="text-2xl opacity-80 max-w-2xl mx-auto">
    Award-winning filmmaker crafting visual poetry without words
  </p>
</section>
```

---

## Validation Checklist

Before committing new pages, verify:
- ✅ `layout: page.njk` in frontmatter
- ✅ `title` and `description` defined
- ✅ Proper heading hierarchy (one h1, then h2, h3)
- ✅ Links have descriptive text (not "click here")
- ✅ Images have alt attributes
- ✅ Build succeeds without errors (`pnpm run build`)
- ✅ Page renders correctly in browser

---

## Troubleshooting

### Page not rendering
- Check frontmatter syntax (YAML)
- Verify `layout: page.njk` is set
- Ensure no syntax errors in Nunjucks

### CSS not loading
- Run `pnpm run build` to regenerate CSS
- Check for Tailwind class typos
- Verify PostCSS is processing

### Build fails
- Check Nunjucks syntax errors
- Verify all referenced files exist
- Look for missing closing tags

### Accessibility warnings
- Ensure all images have alt text
- Verify heading hierarchy
- Test with keyboard navigation
- Use aria-labels for icon-only buttons

---

## Performance Tips

1. **Use Font Preloading** - Already configured for Inter Regular/Bold
2. **Optimize Images** - Use WebP format, proper sizing
3. **Minimize CSS** - Tailwind purges unused classes automatically
4. **Lazy Load Images** - Use `loading="lazy"` attribute
5. **Cache Assets** - Use CDN or long cache headers

---

## Resources

- **Nunjucks Docs:** https://mozilla.github.io/nunjucks/
- **Eleventy Docs:** https://www.11ty.dev/docs/
- **Tailwind v4 Docs:** https://tailwindcss.com/docs
- **ARIA Practices:** https://www.w3.org/WAI/ARIA/apg/

---

**Quick Start:**
```bash
# 1. Create new page
echo '---
layout: page.njk
title: My New Page
description: Page description
---

<h1>Hello World</h1>' > src/my-page.njk

# 2. Build
pnpm run build

# 3. View
open _site/my-page/index.html
```

---

**Phase 6.2.1 Complete** ✅
