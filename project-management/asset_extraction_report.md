# Asset Extraction Report

This document provides the complete, repeatable workflow for extracting assets from legacy Adobe Flash (SWF) files using JPEXS Free Flash Decompiler. It defines exact export settings, naming conventions, and metadata handling to ensure consistent asset recovery across all film microsites.

## 1. Overview

### 1.1 Purpose
Extract all visual and media assets embedded within Flash files for use in the modern web archive, maintaining quality and provenance.

### 1.2 Tool Requirements
- **JPEXS Free Flash Decompiler** (FFDec) v19.1.0 or later
  - Download: https://github.com/jindrapetrik/jpexs-decompiler
  - Platform: Cross-platform (Java-based)
- **Ruffle** (optional for preview/validation)
- **ImageMagick** (optional for batch post-processing)

### 1.3 Source Files
Flash files located in `legacy/movie-websites/[film-slug]/`:
- `absurdistan/absurdistan.swf`
- `absurdistan/player.swf`
- `baikonur/de/template/global/jwplayer/player-licensed.swf`
- `torzumhimmel/torzumhimmel.swf`
- `torzumhimmel/torzumhimmel_en.swf`
- `tuvalu/de/intro.swf`
- `tuvalu/en/intro.swf`

---

## 2. JPEXS Export Workflow

### 2.1 Initial Setup

#### 2.1.1 Application Configuration
1. Launch JPEXS Free Flash Decompiler
2. Navigate to **Settings** → **Advanced Settings**
3. Configure the following:
   - **Export format**: Check `Use sub-folders for images/shapes`
   - **Image format**: `PNG` (for bitmaps)
   - **Shape export format**: `SVG` (for vectors)
   - **Allow decompress**: Enabled
   - **Parallel speedup**: Enabled (for batch operations)

#### 2.1.2 Open SWF File
1. **File** → **Open** → Select target `.swf` file
2. Wait for decompilation to complete (progress bar in bottom-right)
3. Review the file tree structure in left panel

### 2.2 Bitmap Export Rules

#### 2.2.1 Export Settings
Navigate to **images** folder in the left panel tree structure.

**Settings Path:** Right-click on **images** folder → **Export selection**

**Export Dialog Configuration:**
- **Format**: PNG (8-bit with alpha if needed, otherwise 24-bit RGB)
- **Quality**: Maximum (no compression/re-encoding)
- **Color mode**: Preserve original (RGB or RGBA)
- **Alpha channel**: Preserve transparency
- **Metadata**: Strip EXIF (we'll add our own)

**Button to click:** `Export` → Choose destination folder

#### 2.2.2 Bitmap Naming Convention
Exported files should follow this pattern:
```
[source-swf-name]_[asset-type]_[descriptor]_[id].[ext]

Examples:
- absurdistan_background_sky_001.png
- absurdistan_button_play_002.png
- absurdistan_photo_poster_003.jpg
- torzumhimmel_sprite_character_005.png
```

**Asset Type Codes:**
- `background` – Full-frame background images
- `button` – Interactive UI elements
- `photo` – Embedded photographic content
- `sprite` – Character/object sprites
- `texture` – Repeating patterns or fills
- `logo` – Branding/title graphics
- `icon` – Small UI icons

**ID Format:** 3-digit zero-padded sequence (001, 002, 003...)

#### 2.2.3 Manual Naming Process
1. Export images to temporary folder: `/tmp/jpexs-export/[film-slug]/bitmaps/`
2. Review each exported file in JPEXS preview pane to determine asset type
3. Rename files according to convention above
4. Add source metadata to companion `.txt` file (see Section 4)

### 2.3 Vector Export Rules

#### 2.3.1 Export Settings
Navigate to **shapes** folder in the left panel tree structure.

**Settings Path:** Right-click on **shapes** folder → **Export selection**

**Export Dialog Configuration:**
- **Format**: SVG (Scalable Vector Graphics)
- **Use Clipper**: Enabled (for complex path operations)
- **Transform**: Apply (ensures proper coordinate space)
- **Precision**: 2 decimal places
- **Optimize paths**: Enabled
- **Embed fonts**: Disabled (we'll handle fonts separately)

**Button to click:** `Export` → Choose destination folder

#### 2.3.2 Vector Naming Convention
```
[source-swf-name]_[asset-type]_[descriptor]_[id].svg

Examples:
- absurdistan_shape_title_001.svg
- torzumhimmel_shape_border_002.svg
- tuvalu_animation_wave_003.svg
```

**Vector-Specific Asset Types:**
- `shape` – Static vector shapes
- `animation` – Animated vector sequences (export keyframes)
- `text` – Text converted to outlines
- `border` – Decorative borders/frames
- `icon` – Vector icons

#### 2.3.3 SVG Post-Processing
After export, SVG files should be:
1. **Optimized** with SVGO (if available): `svgo input.svg -o output.svg`
2. **Validated** for proper viewBox and dimensions
3. **Cleaned** of unnecessary metadata/comments

### 2.4 Embedded Video/Audio Extraction

#### 2.4.1 Video Assets
Navigate to **binaryData** or **videos** folder in tree.

**Settings Path:** Right-click individual video → **Export selection**

- **Format**: Original container (FLV, MP4) – do not re-encode
- **Naming**: `[film-slug]_video_[descriptor]_[id].[ext]`
- **Note**: Mark for transcoding per [media_standards.md](media_standards.md) Section 1.2

#### 2.4.2 Audio Assets
Navigate to **sounds** folder in tree.

**Settings Path:** Right-click individual sound → **Export selection**

- **Format**: WAV (uncompressed) or original format
- **Naming**: `[film-slug]_audio_[descriptor]_[id].[ext]`
- **Types**: `music`, `sfx`, `voice`, `ambient`

### 2.5 Font Extraction

#### 2.5.1 Embedded Fonts
Navigate to **fonts** folder in tree.

**Settings Path:** Right-click font → **Export selection**

- **Format**: TTF or WOFF (if available)
- **Fallback**: Screenshot glyphs for manual recreation
- **Naming**: `[font-family-name].[ext]`
- **Note**: Convert to WOFF2 for web use (see [media_standards.md](media_standards.md) Section 4.2)

---

## 3. Batch Export Procedure

### 3.1 Multi-File Processing
For processing multiple SWF files in a session:

1. **Create master directory structure:**
   ```bash
   mkdir -p /tmp/jpexs-export/{absurdistan,baikonur,torzumhimmel,tuvalu}/{bitmaps,vectors,video,audio,fonts}
   ```

2. **For each SWF file:**
   - Open in JPEXS
   - Export bitmaps → `/tmp/jpexs-export/[slug]/bitmaps/`
   - Export vectors → `/tmp/jpexs-export/[slug]/vectors/`
   - Export media → `/tmp/jpexs-export/[slug]/video/` or `/audio/`
   - Close file

3. **Rename and categorize:**
   - Review each exported asset
   - Apply naming convention
   - Document in extraction log (see Section 5)

4. **Move to project structure:**
   ```bash
   # After renaming and validation
   mv /tmp/jpexs-export/[slug]/* /content/films/[slug]/assets/extracted/
   ```

### 3.2 Command-Line Export (Advanced)
JPEXS supports CLI for automation:

```bash
# Export all images from SWF
ffdec -export image "/tmp/jpexs-export/absurdistan/bitmaps" absurdistan.swf

# Export all shapes as SVG
ffdec -export shape "/tmp/jpexs-export/absurdistan/vectors" absurdistan.swf

# Export all sounds
ffdec -export sound "/tmp/jpexs-export/absurdistan/audio" absurdistan.swf
```

**Note:** Manual review and renaming still required after CLI export.

---

## 4. Metadata Documentation

### 4.1 Source Metadata File
For each exported asset, create a companion `.txt` file with provenance:

**Filename:** `[asset-filename].meta.txt`

**Content Template:**
```
Source SWF: absurdistan.swf
Asset ID: CharacterID 42
Asset Type: DefineBitsJPEG3
Original Dimensions: 1024x768
Color Depth: 24-bit RGB
Extraction Date: 2026-01-07
Extractor: [Your Name/Tool Version]
Notes: Background image for main menu scene
```

### 4.2 Extraction Log
Maintain a running log: `extraction_log.csv`

**Columns:**
```csv
film_slug,asset_filename,asset_type,source_swf,character_id,dimensions,file_size,checksum_sha256,extraction_date,notes
absurdistan,absurdistan_background_sky_001.png,bitmap,absurdistan.swf,42,1024x768,245678,abc123...,2026-01-07,Main menu background
```

**Generate checksum:**
```bash
shasum -a 256 absurdistan_background_sky_001.png
```

---

## 5. Quality Assurance Checklist

### 5.1 Per-Asset Validation
- [ ] Asset opens without errors
- [ ] No visible compression artifacts (for bitmaps)
- [ ] Transparency preserved (if applicable)
- [ ] SVG renders correctly in browser
- [ ] Dimensions match original
- [ ] Naming convention followed
- [ ] Metadata file created
- [ ] Checksum recorded

### 5.2 Per-Film Validation
- [ ] All images folder items exported
- [ ] All shapes folder items exported
- [ ] Video/audio assets identified and extracted
- [ ] Fonts documented (even if not extractable)
- [ ] Asset count matches JPEXS tree view
- [ ] Extraction log updated
- [ ] Files moved to project structure

### 5.3 Documentation Requirements
- [ ] `extraction_log.csv` updated
- [ ] Missing/unextractable assets flagged
- [ ] Quality issues noted
- [ ] Manual recreation tasks identified
- [ ] Source SWF archived with checksums

---

## 6. Post-Extraction Processing

### 6.1 Image Optimization
After extraction, bitmaps should be:
1. **Reviewed** for quality and completeness
2. **Optimized** if necessary (e.g., PNG crushing):
   ```bash
   pngcrush -brute input.png output.png
   ```
3. **Prepared** for Eleventy Image pipeline (see [media_standards.md](media_standards.md) Section 2)

### 6.2 SVG Cleanup
Vector assets should be:
1. **Optimized** with SVGO
2. **Tested** for browser compatibility
3. **Documented** for responsive scaling needs

### 6.3 Video/Audio Transcoding
Extracted media must follow transcoding protocols:
- **Video**: Convert to H.264 MP4 (Section 1.2 of media_standards.md)
- **Audio**: Convert to MP3/AAC (Section 3 of media_standards.md)

---

## 7. Known Limitations & Workarounds

### 7.1 ActionScript-Generated Graphics
**Issue:** Some Flash animations create graphics programmatically via ActionScript.  
**Workaround:** Use Ruffle or Flash Player Projector to screenshot runtime states.

### 7.2 Encrypted/Protected SWFs
**Issue:** Some SWFs may be obfuscated or encrypted.  
**Workaround:** Try JPEXS's "Rename invalid identifiers" option or use screenshots.

### 7.3 Font Embedding
**Issue:** Embedded fonts may not export cleanly.  
**Workaround:** Identify font family via metadata, source commercial font, or recreate from screenshots.

### 7.4 Complex Animations
**Issue:** Timeline animations don't export as single assets.  
**Workaround:** Export keyframes individually and document frame sequences.

---

## 8. Appendix: JPEXS Menu Reference

### 8.1 Export Paths Quick Reference
- **Images**: Left panel → `images` folder → Right-click → `Export selection`
- **Shapes**: Left panel → `shapes` folder → Right-click → `Export selection`
- **Sounds**: Left panel → `sounds` folder → Right-click → `Export selection`
- **Videos**: Left panel → `binaryData` or `videos` folder → Right-click → `Export selection`
- **Fonts**: Left panel → `fonts` folder → Right-click → `Export selection`
- **Scripts**: Left panel → `scripts` folder → Right-click → `Export selection` (ActionScript)

### 8.2 Critical Settings Locations
- **Settings** → **Advanced Settings**
  - `export.formats.shape.exportFormats` → Select `SVG`
  - `export.formats.image.exportFormats` → Select `PNG`
  - `export.useSubFolders` → Enable
  - `parallelSpeedUp` → Enable

### 8.3 Batch Export Menu
- **Tools** → **Export All** → Choose types (images, shapes, sounds, etc.)
- Select destination folder
- JPEXS will create subfolders automatically

---

## 9. Extraction Status Summary

| Film Slug | SWF Files | Bitmaps Extracted | Vectors Extracted | Video/Audio | Status |
|-----------|-----------|-------------------|-------------------|-------------|--------|
| absurdistan | 2 | TBD | TBD | TBD | Pending |
| baikonur | 1 | TBD | TBD | TBD | Pending |
| torzumhimmel | 2 | TBD | TBD | TBD | Pending |
| tuvalu | 2 | TBD | TBD | TBD | Pending |

**Last Updated:** 2026-01-07  
**Next Action:** Execute extraction workflow per Section 2 for each SWF file.

---

## 10. References

- **JPEXS Documentation**: https://github.com/jindrapetrik/jpexs-decompiler/wiki
- **Media Standards**: [media_standards.md](media_standards.md)
- **Project Specification**: [project-specification.md](project-specification.md)
- **Flash Inventory**: [inventory-flash-wayback.md](inventory-flash-wayback.md)
- **Migration Log**: ../migration_log.md

---

**Document Version:** 1.0  
**Author:** GitHub Copilot CLI  
**Date:** 2026-01-07  
**Status:** Initial Release
