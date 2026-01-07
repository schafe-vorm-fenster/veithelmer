This document translates the remaining Kanban cards for the Veit Helmer archive rewrite into actionable development stories. For strategic context see [project-specification.md](project-specification.md); for encoding and asset rules see [media_standards.md](media_standards.md).

## Completed Groundwork (Phase 1 – Analysis)
- `1.1.*` schema/folder structure finalized (spec Section 5.1).
- `1.2.1`, `1.2.2`, `1.2.4` media protocols defined and documented.
- `1.3.*`, `2.1.*`, `2.2.1`, `2.2.2`, `3.1.1`, `4.2.1`, `4.1.1`, `5.1.1-5.1.4`, `5.2.*` inventories and schemas delivered.

The remaining work now follows the requested flow: **Phase 2 content extraction & research → Phase 3 website setup → Phase 4 implementation & deployment → Phase 5 final validation.**

---

## Phase 2 – Content Extraction & Research
_All tasks in this phase rely only on the legacy sources and inventories; no Eleventy runtime is required yet._

### 2.2.3 Quality-check extracted HTML microsites
**Story:** Ensure every HTML-based microsite under `/content/films/[slug]/` matches its legacy counterpart (spec Section 2.2).
- **Dependencies:** Completion of 2.2.2 exports.
- **Steps:**
  1. For `the-bra`, `behindthecouch`, `quatsch`, `vom-lokfuehrer-der-die-liebe-suchte`, `tuvalu`, diff the Markdown vs. `legacy/movie-websites/[slug]/` HTML.
  2. Run a Node script that parses frontmatter and asserts all Section 5.1 keys exist (`cast`, `crew`, `category`, `poster_image`, `trailer_video`).
  3. Confirm `poster.jpg` (or localized variants) sits beside each Markdown file with descriptive alt text.
  4. Document findings in `migration_log.md` with source/target references.
- **Tools:** `diff`, custom Node checker, manual review in VS Code.
- **Acceptance:** `migration_log.md` lists pass/fail per slug with remediation notes for discrepancies.

### 3.1.2 Select best Wayback snapshots for Flash sites
**Story:** Curate the richest Wayback captures for `absurdistan`, `baikonur`, `torzumhimmel`, `tuvalu` (spec Sections 4.1–4.2).
- **Dependencies:** Domain inventory from 3.1.1.
- **Steps:** Query the Wayback CDX API (1999–2015), rank snapshots by `compressed_length`, fetch the top two per domain, and record URLs/timestamps plus thumbnail notes in `project-management/inventory-flash-wayback.md`.
- **Tools:** Browser + Ruffle, `curl`/`wget`, Markdown tables.
- **Acceptance:** Inventory lists primary/secondary snapshots per domain with notes on available UI states.

### 3.2.1 Validate research completeness for screenshots
**Story:** Capture every primary UI state required to rebuild the Flash sites.
- **Dependencies:** Snapshot shortlist (3.1.2).
- **Steps:** Grab ≥3 PNGs per film (hero, menu, subpage), store them under `legacy/movie-websites/[slug]/research/`, and describe coordinates/colors/typography in `visual_mapping.md`.
- **Tools:** Ruffle/browser screenshots, ImageMagick, Markdown notes.
- **Acceptance:** `visual_mapping.md` references each PNG and documents layout characteristics.

### 3.2.2 Confirm textual coverage of archived materials
**Story:** Transcribe every slogan/quote visible in archived Flash states so narrative copy is preserved.
- **Dependencies:** Screenshot set from 3.2.1.
- **Steps:** Transcribe text per scene, cite snapshot IDs, add notes to each film’s research entry, and flag any gaps needing interviews.
- **Tools:** Text editor, optional OCR, research notebooks.
- **Acceptance:** Research notes enumerate all textual content with provenance references.

### 3.2.3 Extensive Ruffle Screenshot Capture
**Story:** Execute legacy SWF websites locally using Ruffle to capture a comprehensive visual history of the interactive elements.
- **Dependencies:** Domain inventory (3.1.1) and Ruffle setup.
- **Steps:** Set up local server for `legacy/movie-websites/`, run SWFs in Ruffle, navigate extensively (menus, sub-pages, animations), take screenshots of every state, and save to `legacy/movie-websites/[slug]/ruffle/`.
- **Tools:** Ruffle (https://ruffle.rs/), `npx serve`.
- **Acceptance:** `ruffle/` folders contain comprehensive visual audits of the legacy interaction design.

### 4.1.2 Define JPEXS export rules
**Story:** Document a repeatable SWF extraction recipe (spec Section 8.1).
- **Dependencies:** SWF list in `inventory-microsites.md`.
- **Steps:** Install JPEXS, capture screenshots of the settings for bitmap/vector export, define naming conventions (`background`, `button`, `animation-*`), and add the procedure to `asset_extraction_report.md`.
- **Tools:** JPEXS Free Flash Decompiler, Ruffle for previews.
- **Acceptance:** Report contains a “How to export” section with exact menu paths/settings and naming rules.

### 4.1.3 Decompile and categorize Flash assets
**Story:** Apply the JPEXS workflow to every SWF to recover assets.
- **Dependencies:** 4.1.2 procedure.
- **Steps:** Process `absurdistan.swf`, `player.swf`, `torzumhimmel*.swf`, `tuvalu/intro.swf`, etc.; export PNG/JPG/SVG assets into `/content/films/[slug]/assets/`, tag them with source metadata, and checksum the files.
- **Tools:** JPEXS, `shasum`.
- **Acceptance:** `asset_extraction_report.md` lists each exported asset with slug, type, and checksum; missing assets are flagged.

### 4.1.4 Produce the asset extraction report
**Story:** Summarize the recovered Flash assets for downstream designers.
- **Dependencies:** Completed exports from 4.1.3.
- **Steps:** Aggregate counts per film + asset type, add notes about quality or gaps, and link to the stored files.
- **Tools:** Markdown tables, helper script (optional) to count files.
- **Acceptance:** Report includes `Film | Asset Type | Count | Notes | Source SWF` and highlights unresolved gaps.

### 4.2.2 Transcode FLV/MOV legacy videos
**Story:** Convert every legacy video (FLV/MOV/WMV) into H.264 MP4 per [media_standards.md](media_standards.md).
- **Dependencies:** Video inventory from `inventory-microsites.md`.
- **Steps:** Install FFmpeg, run the standard command for each source, log command/output, store MP4s as `/content/films/[slug]/trailer.mp4`, archive originals under `/legacy-archives/`.
- **Tools:** FFmpeg, shell scripts, `ffprobe` for verification.
- **Acceptance:** Every source file has a corresponding MP4 with metadata recorded in the conversion log.

### 4.2.3 Organize transcoded videos and generate posters
**Story:** Integrate the converted MP4s into the film bundles.
- **Dependencies:** 4.2.2 conversions.
- **Steps:** Move MP4s into film folders, update both language Markdown files with `trailer_video`, extract poster frames via `ffmpeg -ss 00:00:01 -i trailer.mp4 -frames:v 1 poster.jpg`, and record the linkage in `migration_log.md`.
- **Tools:** FFmpeg, Node script for frontmatter edits.
- **Acceptance:** Bundles include MP4 + poster assets with alt text, and the log confirms the updates.

### 4.2.5 Audit Video Assets
**Story:** Systematically check all 17 film bundles for valid trailer assets.
- **Dependencies:** 4.2.3 organization.
- **Steps:** strict check of `content/films/*/trailer.mp4`. distinct generic error placeholders. Log missing assets to `project-management/missing_trailers.md`.
- **Tools:** `ls -R`, Markdown report.
- **Acceptance:** A clear "Hit List" of films missing video content.

### 5.1.5 Research and assemble new-movies metadata
**Story:** Promote `Akiko`, `Gondola`, `Once Upon a Time in Shanghai` from raw notes to full bilingual bundles.
- **Dependencies:** `new-movies/` drafts and research plan.
- **Steps:** Gather external references (IMDb, press kits), write `index_de.md`/`index_en.md` with full frontmatter, capture/design posters, cite sources in comments.
- **Tools:** Web research, Markdown editing, `pnpm run lint`.
- **Acceptance:** Each film has localized Markdown, poster assets, and documented references.

### 5.1.6 Trailer Research
**Story:** Locate best-available video sources for the "Hit List" from 4.2.5.
- **Dependencies:** 4.2.5 Audit.
- **Steps:** Search YouTube, Vimeo, Archive.org for official trailers. Prefer 1080p, accept 480p/360p if necessary. Download using `yt-dlp` or similar.
- **Tools:** `yt-dlp`, Web Search.
- **Acceptance:** Local source files for missing trailers downloaded to `_incoming_trailers/`.

### 5.1.7 Trailer Integration
**Story:** Process and normalize the newly researched trailers.
- **Dependencies:** 5.1.6 Research.
- **Steps:** Run standard transcoding (Task 4.2.2), generate posters, move to `content/films/[slug]/`, update frontmatter.
- **Tools:** FFmpeg.
- **Acceptance:** All films in the "Hit List" now have working `trailer.mp4` and `poster.jpg`.

---

## Phase 6 – Website Development (Greenfield 11ty)
_Implements the complete, modern "Black & White" streaming-style experience using the clean stack. No legacy code is used—only the content extracted in Phase 2._

### 6.1.1 Initialize Eleventy & Tailwind Foundation
**Story:** Set up the technical baseline with the "Eleventy Excellent" philosophy (spec Section 6).
- **Dependencies:** None (Greenfield).
- **Steps:** Initialize a clean Eleventy 3.1+ project in `/src`, install Tailwind CSS v4 and PostCSS, configure the build pipeline to output to `/dist` (or `_site`), and set up the `eleventy.before` hook for CSS processing.
- **Tools:** `npm init`, `11ty`, Tailwind CLI.
- **Acceptance:** `pnpm run build` runs successfully, processing a "Hello World" Nunjucks template and a Tailwind-processed CSS file.

### 6.1.2 Design System & Minimalist Brand Identity
**Story:** Codify the "Veit Helmer" minimalist aesthetic (Black/White, clean typography) into the tech stack.
- **Dependencies:** 6.1.1 Setup.
- **Design Specs:**
  - **Color:** Pure Black (`#000`) background, Pure White (`#fff`) text.
  - **Logo:** Use `legacy/directors-website/img/veithelmer.gif` (white text on transparent/black) as the site header logo. Convert to optimized PNG/SVG if necessary.
  - **Typography:** Sans-serif, neutral, high-legibility (e.g., Inter, Neue Haas Grotesk style) to mimic the stark "Director" aesthetic.
- **Steps:** Define Tailwind theme config, download/self-host fonts in `/src/assets/fonts/`, and establish base typography rules in CSS.
- **Tools:** CSS/Tailwind Config, ImageMagick (to optimize logo if needed).
- **Acceptance:** A test page displays the "Veit Helmer" logo on a black background with correct typography conventions.

### 6.2.1 Implement Base Layouts & Page Shell
**Story:** Create the master Nunjucks templates that drive the site structure.
- **Dependencies:** 6.1.2 Design System.
- **Steps:** Create `_layouts/base.njk` (HTML5 shell, SEO meta tags, CSS/JS injection), `_layouts/page.njk` (generic wrapper), and ensure the `<main>` element and accessible landmarks are present.
- **Tools:** Nunjucks.
- **Acceptance:** All pages inherit a consistent header (with Logo) and footer structure.

### 6.2.2 Build UI Component Library (Tiles & Controls)
**Story:** Develop the reusable "Streaming Service" UI components described in Spec 7.1.
- **Dependencies:** 6.2.1 Layouts.
- **Design Details:**
  - **Film Tile:** 3:2 aspect ratio, borderless.
  - **Hover State:** Smooth scale-up (105%), slight Z-index lift, drop shadow.
  - **Overlay:** Title + Year appear on hover (white text, subtle gradient background for readability).
  - **Buttons:** Minimalist, icon-driven (e.g., simple arrows), monochrome.
- **Steps:** Create Nunjucks macros for Film Tiles, Buttons, and Language Toggles.
- **Tools:** Nunjucks Macros, Tailwind.
- **Acceptance:** A styleguide page renders the Film Tile and Buttons with correct interactive hover states.

### 6.3.1 Implement Homepage "Streaming Grid"
**Story:** Build the main index page grouping films by category.
- **Dependencies:** 6.2.2 Components and Phase 2 Content.
- **Steps:** Create `index.njk` that consumes the `films` collection, filters by category (Feature, Short, etc.), and renders sorted horizontal grids (flex row with overflow-scroll or grid wrap) under H2 headings.
- **Tools:** Eleventy Collections, Nunjucks loops.
- **Acceptance:** Homepage displays all films grouped correctly, sorted by year (newest first), with working links to detail pages.

### 6.2.3 Implement Cross-Browser Video Player component
**Story:** Develop the custom HTML5 video player component for film pages.
- **Dependencies:** 6.2.2 Components.
- **Design Details:**
  - **Controls:** Custom overlay controls (Play/Pause, Volume, Fullscreen) styled to match the "Design System" (Minimalist white icons).
  - **Behavior:** Autoplay muted on hero (if applicable), click to unmute/restart.
- **Steps:** Build a custom `<video>` wrapper component (Nunjucks macro or Web Component). ensure fallback text for missing JS is handled.
- **Tools:** HTML5 Media API, CSS/Tailwind.
- **Acceptance:** Player works in Chrome, Firefox, Safari (desktop/mobile) and successfully plays local H.264 files with custom UI.

### 6.3.2 Implement Film Detail Pages
**Story:** Build the dedicated view for each movie.
- **Dependencies:** 6.3.1 Homepage.
- **Design Layout:**
  - **Hero:** Full-width trailer (muted autoplay if possible) or high-res poster.
  - **Info:** H1 Title (Large), Year, Duration, Genre to the right or below.
  - **Content:** Synopsis (left col), Crew/Cast info (right col).
  - **Interaction:** Prominent "Visit Microsite" button (if legacy site exists).
- **Steps:** Create `film.njk` template featuring the Video Player (Task 4.2.4 spec) and definition lists for metadata.
- **Tools:** Nunjucks.
- **Acceptance:** Clicking a tile on Homepage opens a beautiful Detail page populated with frontmatter data.

### 6.4.1 Implement Navigation & Localization Logic
**Story:** Wire up the global navigation and language routing.
- **Dependencies:** 6.3.2 Detail Pages.
- **Steps:** Implement sticky Top Menu (Logo left, Anchor links right), simple Footer, and `/de/` vs `/en/` subdirectory logic with `hreflang` generation.
- **Tools:** Eleventy I18n plugin (or custom logic).
- **Acceptance:** Switching language preserves the current view (Home DE -> Home EN) and navigation links jump to the correct page sections.

### 6.5.1 Integrate GSAP Animations
**Story:** Add the "Flash-era" fluid feel using modern web performance standards.
- **Dependencies:** 6.4.1 Navigation.
- **Steps:** Install GSAP, implement subtle page transitions (fade/slide), and add micro-interactions to the Film Tiles (smooth scale up on hover) to meet Spec 8.2 goals.
- **Tools:** GSAP (GreenSock).
- **Acceptance:** Site navigation feels fluid; tiles animate smoothly without layout shifts.

---

## Phase 7 – Quality Assurance & Validation
_Ensures the new greenfield implementation meets design, performance, and functionality requirements._

### 7.1.1 Design & Responsive QA
**Story:** Verify the visual implementation against the "Black & White" spec across devices.
- **Dependencies:** Phase 6 complete.
- **Steps:** Manual visual audit on Desktop, Tablet, and Mobile. Check for horizontal scrolling issues, readable font sizes, and correct contrast (White on Black).
- **Tools:** Browser DevTools (Device Mode).
- **Acceptance:** Site is fully responsive, distinct "Netflix-style" look is consistent, text is legible on all screens.

### 7.1.2 Performance & Technical Audit
**Story:** Technical validation for speed and implementation hygiene.
- **Dependencies:** Phase 6 complete.
- **Steps:** Run Lighthouse audit (target 95+), check for missing `alt` text, verify logical heading hierarchy (`h1` -> `h2`).
- **Tools:** Chrome Lighthouse, HTML Validator.
- **Acceptance:** Lighthouse scores are green, site structure is semantic and accessible.

### 7.2.1 Final Content Verification
**Story:** One-to-one comparison of the new site against the legacy content inventory.
- **Dependencies:** All previous tasks.
- **Steps:** Walk through every film page on the staged build. Verify correct Trailer, Poster, Cast list, and Biography text against the `migration_log.md`.
- **Tools:** Multi-monitor manual review.
- **Acceptance:** Sign-off that the new 11ty site is a complete, faithful, and modern representation of the Veit Helmer archive.

---
