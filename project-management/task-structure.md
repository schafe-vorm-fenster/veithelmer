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
