This document outlines a "bullet-proof" sequence for a Multi-Agent Coding System to migrate the Veit Helmer digital archive. The structure follows a **Definition -> Execution -> Quality Assurance** pattern for every major milestone to ensure no data is lost and all modern standards are met.

---

## 1. Project Initialization and Content Architecture Definition

## 1.1 Define Global Schema and Film-Bundle Standards

The Lead Architect Agent must define the exact folder and file naming convention. Every film must reside in `/content/films/[film-slug]/`.
Markdown files must be named `index_de.md` and `index_en.md`.
Assets must be named functionally: `poster.jpg`, `cover.jpg`, `hero.jpg`, `trailer.mp4`.
Frontmatter must include: `title`, `language`, `director`, `cast`, `release_year`, `duration`, `category`, `poster_image`, and `trailer_video`.

## 1.2 Setup Media Transformation Protocols

Define technical conversion parameters.
Videos: FFmpeg H.264 MP4 (`-c:v libx264 -crf 23 -c:a aac`).
Images: Guidelines for `eleventy-img` to generate 10px Base64 blur-up placeholders and responsive `srcset`.
Fonts: Requirement for local WOFF2 hosting for GDPR compliance.

## 1.3 Quality Check: Architecture Validation

Validate the schema against the provided legacy data.
Ensure all film categories (Feature, Short, Commercial, Documentary) are represented.
Verify that the bilingual structure allows for 1:1 mapping between German and English content.

---

## 2. Legacy Data Extraction (HTML Sources)

## 2.1 Define Extraction Logic for HTML Microsites

Create a mapping for the following folders: `the-bra`, `behindthecouch`, `quatsch`, `vom-lokfuehrer-der-die-liebe-suchte`, and `tuvalu`.
Identify the HTML selectors for titles, synopses, and credits in the legacy Bootstrap and custom CSS layouts.

## 2.2 Execute HTML Content Migration

Extract text and metadata.
Create the film bundles with `index_de.md` and `index_en.md`.
Move and rename existing posters and video files from the legacy directories into the new bundles.

## 2.3 Quality Check: Extraction Integrity

Compare the word count and metadata of the new Markdown files against the original legacy HTML files.
Verify that all cast members and technical credits were successfully scraped.

---

## 3. Digital Archeology and Flash Recovery

## 3.1 Define Research Targets and Wayback Mapping

Map legacy domains (`absurdistan-the-movie.com`, `baikonur-film.de`, `tor-zum-himmel.de`) to specific Wayback Machine timestamps between 1999 and 2015.
Identify snapshots with high file sizes indicating successful Flash asset capture.

## 3.2 Execute Visual Research and Screenshot Capture

Capture high-resolution screenshots of primary navigation, sub-pages, and unique UI elements.
Document the "Flash Stage" layout, including specific element positioning, typography, and the hex color palette.
Recover text and slogans visible in the archived versions that are missing from local source files.

## 3.3 Quality Check: Research Completeness

Review the `research_notes.md` in each film bundle.
Ensure that the visual documentation is sufficient for a frontend developer to recreate the "Flash-era" experience without access to the original software.

---

## 4. Flash Asset Decompilation and Modernization

## 4.1 Define Decompilation and Export Rules

Set requirements for JPEXS Free Flash Decompiler.
Mandate the export of JPG/PNG assets and the conversion of all vector shapes to SVG.

## 4.2 Execute Asset Extraction and Video Transcoding

Decompile `.swf` files from the identified movie folders.
Convert all `.flv` files to MP4 using the FFmpeg protocol.
Rename all extracted assets to the functional naming convention (e.g., `background.svg`, `trailer.mp4`) and place them in the correct film bundles.

## 4.3 Quality Check: Asset Quality and Format

Verify that all SVG files are valid and scalable.
Check converted MP4 files for audio-video sync and playback compatibility in modern browsers.

---

## 5. Content Enrichment and Gap Filling

## 5.1 Define Missing Content Research Tasks

Identify films with incomplete data (e.g., `Akiko`, `Gondola`, `Shanghai` from the `new-movies` folder).
List specific missing fields: synopses, cast, duration, or high-res posters.

## 5.2 Execute External Web Research

Search IMDb, Crew-United, and YouTube for missing film data.
Download high-quality posters and extract trailer stills where local assets are missing.
Update the Markdown files with the newly discovered information.

## 5.3 Quality Check: Final Library Audit

Perform a global check of the `/content/` directory.
Ensure every film bundle contains two Markdown files (`de`/`en`), a `poster.jpg`, and a `trailer.mp4` (where applicable).
Validate that all Frontmatter fields are populated.

---

## 6. Website Architecture and Frontend Implementation

## 6.1 Define 11ty and Tailwind v4 Integration

Set up the Eleventy 3.1+ environment.
Configure the build hook (`eleventy.before`) for PostCSS and Tailwind.
Set up the routing logic for bilingual subdirectories and browser language auto-redirects.

## 6.2 Execute UI/UX Rebuild (Streaming Service Style)

Implement the homepage with a black background and white text.
Create the teaser grid with rounded-corner tiles and hover effects.
Build the detail pages with hero images and definition lists for crew data.
Implement GSAP for transitions that mimic the fluid Flash experience.

## 6.3 Quality Check: Responsive Performance and SEO

Test the site on mobile, tablet, and desktop views.
Run a Lighthouse audit for performance, accessibility, and SEO.
Verify that `hreflang` tags and the `sitemap.xml` are correctly generated for both languages.

---

## 7. Final Deployment and Preservation

## 7.1 Define Deployment Pipeline

Configure GitHub Actions for automated deployment to GitHub Pages.
Set up the `robots.txt` and ensure local font hosting is active for GDPR.

## 7.2 Execute Production Build and Launch

Run the final build command.
Deploy the site to the production URL.

## 7.3 Quality Check: Production Validation

Verify that all internal links between the main site and the reconstructed movie microsites are functional.
Ensure that video lazy-loading and blur-up image placeholders are working in the live environment.

---

**Next Step**: Would you like me to generate the specific **Agent System Prompt** for Task 2.2 (HTML Content Migration) to ensure the agent correctly handles the transformation from legacy HTML to the new bilingual film bundles?