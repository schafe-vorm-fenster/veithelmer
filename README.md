# Veit Helmer Archive

A bilingual (German/English) filmography and archive website for filmmaker Veit Helmer, built with Eleventy and Tailwind CSS.

## Features

- **Bilingual**: Full German and English translations
- **Static Site Generator**: Built with Eleventy 3.x
- **Styling**: Tailwind CSS v4 with PostCSS
- **Legacy Integration**: Microsite migrations (Fiddlesticks, The Bra, etc.)
- **Video Support**: Git LFS tracked media files, optimized for web
- **CI/CD**: Automated builds and deployments via GitHub Actions

## Development

```bash
# Install dependencies
pnpm install

# Local development server
pnpm dev

# Build for production
pnpm build
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when pushing to `main`.

**Live site**: https://schafe-vorm-fenster.github.io/veithelmer/

## Project Structure

```
content/
  films/          # Film details and microsites
  pages/          # Workshop, biography, legal pages
src/
  _layouts/       # Nunjucks templates
  _data/          # Global data files
  css/            # Tailwind CSS
  de/, en/        # Language-specific pages
.github/workflows/
  build-and-deploy.yml  # CI/CD pipeline
```

## Tech Stack

- **Builder**: Eleventy 3.1.2
- **CSS**: Tailwind CSS 4.1.18
- **Package Manager**: pnpm 10.27.0
- **Node.js**: 20+
- **Deployment**: GitHub Pages + GitHub Actions