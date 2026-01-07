# Phase 6.1.2 Quick Reference
## Design System & Minimalist Brand Identity

### ✅ Completed Implementation

**Color System**
- Black: `#000000` / `bg-black`
- White: `#FFFFFF` / `text-white`
- Opacity modifiers: `/10`, `/20`, `/40`, `/60`, `/80`, `/100`

**Typography**
- Font: Inter (self-hosted, 424 KB woff2)
- Weights: 400 (Regular), 500 (Medium), 700 (Bold)
- Base: 16px / 1.6 line-height / -0.011em tracking
- Headings: H1 (2.5rem), H2 (2rem), H3 (1.5rem) / 700 weight / -0.022em tracking

**Logo**
- Typographic wordmark: "VEIT HELMER"
- Location: Header in `src/_layouts/page.njk`
- Style: 3xl, bold, tight tracking, opacity transition on hover

**Assets Location**
```
src/assets/fonts/
  ├── Inter-Regular.woff2
  ├── Inter-Medium.woff2
  └── Inter-Bold.woff2

src/assets/images/
  └── veithelmer-logo.jpg
```

**Design Tokens** (`src/css/main.css`)
```css
@theme {
  --color-brand-black: #000;
  --color-brand-white: #fff;
  --font-sans: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif;
}
```

**Test Page**
- URL: `/design-system-test/`
- Features: Typography scale, color palette, logo variations, components, interactive states

**Development**
```bash
pnpm run dev    # http://localhost:8080
pnpm run build  # Production build
```

**Files Modified**
- `src/css/main.css` - Font faces, theme tokens, typography rules
- `src/_layouts/page.njk` - Header with logo, minimalist layout
- Created: `src/design-system-test.njk` - Comprehensive test page

**Build Output**
- CSS: 863 lines (`_site/css/main.css`)
- Fonts: Copied to `_site/assets/fonts/`
- Pages: 2 HTML files generated

---

**Status:** ✅ Complete | **Next:** Phase 6.1.3 (Content Migration)
