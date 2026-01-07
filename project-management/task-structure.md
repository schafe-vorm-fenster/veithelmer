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

### 5.1.5 Research and assemble new-movies metadata
**Story:** Promote `Akiko`, `Gondola`, `Once Upon a Time in Shanghai` from raw notes to full bilingual bundles.
- **Dependencies:** `new-movies/` drafts and research plan.
- **Steps:** Gather external references (IMDb, press kits), write `index_de.md`/`index_en.md` with full frontmatter, capture/design posters, cite sources in comments.
- **Tools:** Web research, Markdown editing, `pnpm run lint`.
- **Acceptance:** Each film has localized Markdown, poster assets, and documented references.

---

## Phase 3 – Website Setup (Greenfield 11ty/Tailwind Foundation)
_Bootstraps a **fresh greenfield** Eleventy stack so later tasks have a clean platform. No legacy HTML/CSS/JS is copied—legacy files are referenced only to extract colors, font families, logos, or favicons._

### 6.1.1 Implement Eleventy + Tailwind + Nunjucks
**Story:** Stand up the Eleventy stack described in spec Sections 6–7 as a brand-new codebase; legacy layouts are **not** ported line-for-line.
- **Dependencies:** Phase 2 content bundles for sample data.
- **Steps:** Configure `eleventy.config.js`, integrate Tailwind v4 via PostCSS, install GSAP/Ruffle hooks, scaffold base layouts, and render placeholder data in the streaming grid/detail views.
- **Fresh build guardrails:**
  - Start from an Eleventy starter or minimalist template; delete any scaffolding you don’t need.
  - Only inspect legacy assets to pull palette values, font families, or iconography—do **not** copy existing HTML/CSS/JS into the new repo.
  - Document any extracted palette/typography decisions in `visual_mapping.md` or design notes for traceability.
- **Tools:** Eleventy 3.1+, Tailwind CLI, GSAP (`pnpm install gsap`), Ruffle (`pnpm install @ruffle-rs/ruffle`).
- **Acceptance:** `pnpm run build` succeeds, producing base layouts ready for real content.

---

## Phase 4 – Website Implementation & Deployment
_Refines the greenfield platform, enforces policies, and wires up production delivery without reusing legacy markup. Legacy code may only be consulted for visual tokens (colors/fonts/logos/favicons)._ 

### 1.2.3 Enforce local hosting of fonts & GDPR assets
**Story:** Ensure all fonts/assets load from `/assets/` to meet GDPR obligations (spec Section 9).
- **Dependencies:** Eleventy setup (6.1.1) so font usage is discoverable.
- **Steps:** Audit the new CSS codebase for remote fonts (no legacy CSS allowed), download/convert to WOFF2, store under `assets/fonts/`, update CSS to use relative URLs, add stylelint/postcss checks that fail on external domains, and rerun `pnpm run build`.
- **Tools:** Node/PostCSS, `curl`, stylelint.
- **Acceptance:** Production build contains zero external font URLs; DevTools shows fonts served locally.

### 4.2.4 Verify legacy video playback within Eleventy
**Story:** Confirm every MP4 renders correctly inside the Eleventy templates.
- **Dependencies:** Video integration (4.2.3) and base site (6.1.1).
- **Steps:** Run `pnpm run dev`, open each film page, test `<video>` playback, verify codecs via DevTools/`ffprobe`, document any re-encode needs.
- **Tools:** Browser, FFmpeg/ffprobe.
- **Acceptance:** All videos reach `readyState 4`, playback is synchronized, and QA notes are appended to `media_standards.md` or equivalent.

### 6.2.1 Asset pipeline + deployment automation
**Story:** Implement the production pipeline (eleventy-img, SEO files, GitHub Pages deploy) outlined in spec Section 6.2/9.
- **Dependencies:** Eleventy base (6.1.1) and local asset enforcement (1.2.3).
- **Steps:** Integrate `@11ty/eleventy-img` for AVIF/WebP/JPEG outputs + blur-up placeholders, emit `sitemap.xml`, `robots.txt`, `hreflang` tags, and create `.github/workflows/deploy.yml` that runs tests/builds before publishing to GitHub Pages; ensure every template/stylesheet involved is authored fresh in this phase (no pasted legacy snippets).
- **Tools:** `@11ty/eleventy-img`, GitHub Actions, `pnpm` scripts.
- **Acceptance:** CI builds succeed with optimized assets and SEO files; deployed site serves only local resources.

---

## Phase 5 – Final Content & Production Validation
_Cross-checks the live site against the curated content and compliance requirements._

### 5.2.1 Deep library audit against the live site
**Story:** Verify every `/content/films/[slug]/` bundle is complete and correctly rendered post-build.
- **Dependencies:** Deployment-ready build (Phase 4).
- **Steps:** Script a Node audit to ensure each slug contains `index_de.md`, `index_en.md`, `poster.jpg`, and media assets; compare frontmatter categories with rendered category pages; log outcomes in `film_database_status.md`; spot-check localized pages in the built site.
- **Tools:** Node (`fs`, `globby`), Eleventy output, browser for spot checks.
- **Acceptance:** Audit reports zero missing assets (or documented exceptions) and the status file marks each film “Ready”.

### 6.3.1 Production validation crawl
**Story:** Perform an end-to-end crawl to catch broken links/assets and confirm GDPR compliance before launch.
- **Dependencies:** Successful deployment (6.2.1) and content audit (5.2.1).
- **Steps:** Run `pnpm run crawl` or `npx broken-link-checker` on the built site, verify via DevTools that fonts/videos load locally, document findings in `verification-results-1.3.2.md` (or new report), and resolve any issues.
- **Tools:** Broken-link checker, browser DevTools, `curl --head` for assets.
- **Acceptance:** Crawl passes; the report evidences local asset delivery and highlights any fixes applied.

---

This phased plan keeps analysis and content extraction independent of implementation tooling, then layers platform setup, feature implementation, and final validation so each task only depends on work that already exists.
