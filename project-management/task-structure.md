This document provides a sequence for a **Multi-Agent Coding System** to migrate and modernize the Veit Helmer digital archive. The structure follows a **Definition -> Inventory -> Execution -> Quality Assurance** pattern to ensure no data is lost and all modern standards are met.

---

## 1. Project Initialization and Content Architecture Definition

## 1.1 Define Global Schema and Film-Bundle Standards

* **Step 1 (Structure Definition):** Establish the exact folder naming convention: `/content/films/[film-slug]/`.
* **Step 2 (Localization Definition):** Define the bilingual Markdown file names: `index_de.md` and `index_en.md` for localized content.
* **Step 3 (Schema Definition):** Set the strict Frontmatter schema including: `title`, `language`, `director`, `cast`, `release_year`, `duration`, `category` (Feature, Short, Commercial, Documentary), `poster_image`, and `trailer_video`.
* **Step 4 (Internal Documentation):** Create a `.guidelines.md` file in the root directory that serves as the "source of truth" for all other agents throughout the project.

## 1.2 Setup Media Transformation Protocols

* **Step 1 (Video Protocol):** Define the FFmpeg command for H.264 MP4 conversion: `ffmpeg -i input.flv -c:v libx264 -crf 23 -c:a aac trailer.mp4`.
* **Step 2 (Image Protocol):** Set requirements for `eleventy-img` to generate 10px Base64 blur-up placeholders and localized `srcset`.
* **Step 3 (Privacy & Fonts):** Enforce local hosting of all WOFF2 fonts and assets to ensure GDPR compliance.
* **Step 4 (Documentation):** Create a `media_standards.md` file detailing these technical specs for the Media Technician Agent.

## 1.3 Quality Check: Architecture Validation

* **Step 1 (Verification):** Validate that the schema covers all film types found in the legacy repo (Features, Shorts, Docs).
* **Step 2 (Logic Check):** Verify the schema allows for 1:1 bilingual mapping without data loss.

---

## 2. Legacy HTML Content Extraction

## 2.1 Extract Global Static Pages (Bio & Legal)

* **Step 1 (Inventory):** Locate all biography and legal HTML files in `legacy/directors-website/de/` and `/en/`.
* **Step 2 (Execute Transformation):** Convert content to `/content/pages/biography/index_de.md` and `index_en.md`.
* **Step 3 (Asset Relocation):** Move biography images to the page folder, renaming them to meaningful names like `portrait.jpg`.
* **Step 4 (Documentation):** Update a `migration_log.md` file marking the global pages as "Complete."

## 2.2 Inventory and Extract HTML-based Movie Microsites

* **Step 1 (Batch Inventory):** Create a checklist of all non-Flash film folders: `the-bra`, `behindthecouch`, `quatsch`, `vom-lokfuehrer-der-die-liebe-suchte`, and `tuvalu`.
* **Step 2 (Iterative Extraction):** For each film in the checklist:
* Create the folder `/content/films/[film-slug]/`.
* Extract text and metadata into `index_de.md` and `index_en.md`.
* Locate the poster/hero image and move it into the folder as `poster.jpg`.


* **Step 3 (Batch Quality Check):** Cross-reference the extracted cast and synopses against the original HTML for 100% data retention.

---

## 3. Digital Archeology and Flash Research

## 3.1 Map and Document Legacy Flash Websites

* **Step 1 (Inventory):** Identify domains requiring Wayback Machine research: `absurdistan-the-movie.com`, `baikonur-film.de`, and `tor-zum-himmel.de`.
* **Step 2 (Archive Selection):** Locate snapshots with the highest file sizes from 1999–2015 to ensure Flash asset availability.
* **Step 3 (Visual Capture):** Capture high-resolution screenshots of navigation, sub-pages, and interaction states.
* **Step 4 (Layout Documentation):** Create a `visual_mapping.md` for each film documenting element coordinates, typography, and hex colors.

## 3.2 Quality Check: Research Completeness

* **Step 1 (Validation):** Ensure all text visible in the archive (slogans, quotes) is recorded in the film's research notes.
* **Step 2 (Verification):** Confirm screenshots cover every primary UI state needed for modern reconstruction.

---

## 4. Flash Asset Decompilation and Modernization

## 4.1 Batch Decompilation of Flash Assets

* **Step 1 (Inventory):** Create a comprehensive list of all `.swf` files located in `legacy/movie-websites/`.
* **Step 2 (Export Rules):** Define JPEXS rules: Export JPG/PNG for bitmaps and SVG for vector shapes.
* **Step 3 (Iterative Decompilation):** For each `.swf` file in the inventory:
* Extract all embedded assets.
* Identify and rename background, UI buttons, and animations.
* Place them into the corresponding `/content/films/[film-slug]/assets/` folder.


* **Step 4 (Reporting):** Create an `asset_extraction_report.md` listing the quantity and types of files recovered per movie.

## 4.2 Transcode Legacy Video Formats

* **Step 1 (Inventory):** Search the entire `legacy/` directory for all `.flv` files.
* **Step 2 (Batch Transcoding):** Run the FFmpeg batch conversion script on the discovered inventory.
* **Step 3 (Bundle Organization):** Move resulting `.mp4` files into their respective film bundles, naming them `trailer.mp4`.
* **Step 4 (Verification):** Confirm all videos play in modern browsers with correct audio/video sync.

---

## 5. Content Enrichment and Gap Filling

## 5.1 Research and Assemble "New Movies" Metadata

* **Step 1 (Inventory):** List films from the `new-movies/` folder: `Akiko`, `Gondola`, and `Shanghai`.
* **Step 2 (Research Execution):** Perform external web research (IMDb/YouTube) to find missing synopses, cast lists, and release dates.
* **Step 3 (Bundle Creation):** Create bilingual Markdown bundles for these films, including a `poster.jpg` discovered during research.
* **Step 4 (Documentation):** Update `film_database_status.md` indicating these films are now "Ready."

## 5.2 Final Library Audit and Categorization

* **Step 1 (Deep Audit):** Walk through every folder in `/content/films/`.
* **Step 2 (Constraint Check):** Ensure every folder contains: `index_de.md`, `index_en.md`, `poster.jpg`, and a video or hero image.
* **Step 3 (Category Verification):** Confirm each film is correctly assigned to Feature, Short, Commercial, or Documentary.

---

## 6. Website Implementation and Deployment

## 6.1 Implement 11ty Engine and UI

* **Step 1 (Base Implementation):** Setup Eleventy with Tailwind CSS v4 and Nunjucks templates.
* **Step 2 (Homepage Logic):** Build the "Streaming Service" grid (Black background, white text) with release-year sorting.
* **Step 3 (Detail Templates):** Create templates for film details using the standardized Markdown and Frontmatter data.
* **Step 4 (Animation):** Implement GSAP for fluid transitions and Ruffle for legacy Flash emulation where required.

## 6.2 Deployment and Performance Optimization

* **Step 1 (Asset Pipeline):** Run the `eleventy-img` pipeline to generate all responsive assets.
* **Step 2 (SEO & Locales):** Generate `sitemap.xml`, `robots.txt`, and `hreflang` tags.
* **Step 3 (CI/CD):** Configure and execute the GitHub Actions workflow for GitHub Pages.
* **Step 4 (Documentation):** Create a `handover_documentation.md` describing the site architecture and maintenance steps.

## 6.3 Quality Check: Production Validation

* **Step 1 (Crawl):** Perform a full site crawl to ensure zero broken links or missing images.
* **Step 2 (Compliance):** Verify all fonts and assets are served locally (GDPR check).

---
