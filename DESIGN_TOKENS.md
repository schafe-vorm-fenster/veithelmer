# Design Tokens Documentation

Extracted from legacy assets on 2026-01-07 for Phase 6.1.1 greenfield migration.

## Color Palette

### Primary Colors
- **Brand Black**: `#000000` - Main background color
- **Brand Dark Gray**: `#1F1F1F` - Secondary backgrounds, UI elements
- **Brand Brown**: `#8D5315` - Accent color, highlights, hover states
- **Brand White**: `#FFFFFF` - Primary text color

### Secondary Colors
- **Light Gray**: `#EEEEEE` - Hover text states
- **Medium Gray**: `#CCCCCC` - Borders, dividers
- **Charcoal**: `#333333` - Dark text on light backgrounds

### Overlays
- **Light Overlay**: `rgba(255,255,255,0.2)` - Subtle transparency effects
- **Medium Overlay**: `rgba(255,255,255,0.5)` - Hover states with transparency

## Typography

### Font Families
- **Primary**: Verdana, Arial, Sans-serif
- **Sizes**: 
  - Base: 15px
  - Small/Navigation: 13px
  - Large headings: 18px, 20px, 24px

### Font Weights
- Regular: 400 (default)
- No bold weights used in legacy

## Spacing

- **Base**: 15px
- **Small**: 13px
- **Vertical rhythm**: Line-height 160% (1.6)

## Effects

### Shadows
- **Base shadow**: `-1px 0 8px 2px rgba(0,0,0,0.58)` - Used for navigation/sidebar elements

### Border Radius
- **Small**: 4px (not heavily used in legacy)

## Logo Assets

Legacy logo files found (not yet migrated):
- `legacy/movie-websites/behindthecouch/img/logo_btc.gif`
- `legacy/movie-websites/baikonur/de/template/images/titel-logo.png`
- `legacy/movie-websites/vom-lokfuehrer-der-die-liebe-suchte/assets/imgs/logos@2x.png`

**Note**: Logo assets require separate migration strategy. Current greenfield project uses text branding only.

## Usage in Tailwind v4

All tokens are defined in `src/css/main.css` using the `@theme` directive and are available as:
- CSS custom properties: `var(--color-brand-black)`
- Tailwind utilities: `bg-black`, `text-white`, etc.

## Legacy References

- Source files:
  - `legacy/directors-website/styles/custom.css`
  - `legacy/directors-website/styles/cssstyledcontent.css`
  - `legacy/directors-website/styles/bootstrap.min.css` (not extracted - using Tailwind instead)

## Migration Notes

- Legacy used Bootstrap 3 grid system - **replaced with Tailwind**
- Legacy had minimal responsive design - **Tailwind provides modern responsive utilities**
- Legacy used inline styles and table layouts - **not replicated in greenfield**
- Flash/Ruffle integration points identified in legacy but not yet implemented
