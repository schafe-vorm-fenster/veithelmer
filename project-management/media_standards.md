# Media Standards & Technical Specifications

This document defines the technical standards, workflows, and protocols for processing, optimizing, and managing media assets (images, video, audio, and fonts) for the Veit Helmer digital archive. It serves as the implementation guide for the Media Technician Agent.

## 1. Video Protocol

### 1.1 Target Format
All video content must be standardized for web compatibility and performance.
- **Container:** MP4
- **Video Codec:** H.264 (High Profile preferred)
- **Audio Codec:** AAC (LC)
- **Quality Goal:** Visually lossless (CRF 23)
- **Frame Rate:** Keep original (usually 24, 25, or 30 fps) unless standardization is required.

### 1.2 Conversion Workflow (FFmpeg)
Legacy video files (primarily `.flv` from Flash sites, but also `.swf` embedded video or `.mov`) must be converted to modern standards.

**Standard Conversion Command:**
```bash
ffmpeg -i input.flv -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**Parameters Explained:**
- `-c:v libx264`: Use the x264 encoder for H.264 video.
- `-crf 23`: Constant Rate Factor (Quality). 23 is a good default for web.
- `-preset medium`: Balance between encoding speed and compression.
- `-c:a aac`: Use the AAC audio encoder.
- `-b:a 128k`: Audio bitrate.
- `-movflags +faststart`: Essential for web streaming; allows playback to start before the file is fully downloaded.

### 1.3 Asset Organization
- Converted videos reside in the film's content bundle (e.g., `/content/films/absurdistan/trailer.mp4`).
- Referenced in Markdown Frontmatter via the `trailer_video` key.

## 2. Image Protocol (Eleventy Image)

We use `@11ty/eleventy-img` to generate optimized, responsive images with low-quality placeholders (LQIP).

### 2.1 Generation Requirements
- **Output Formats:** `avif` (primary), `webp` (secondary), `jpeg` (fallback).
- **Widths:**
  - **Thumbnails/Teasers:** `[300, 600]`
  - **Hero/Posters:** `[600, 900, 1500, "auto"]`
  - **General responsive:** `[400, 800, 1200]`
- **Filename Format:** `[name]-[width].[format]`
- **Output Directory:** `_site/img/optimized/`
- **URL Path:** `/img/optimized/`

### 2.2 Performance & Placeholders
- **Blur-up Strategy:** A **10px Base64-encoded** version of the image must be generated for every processed image.
- **Implementation:** This Base64 string should be injected inline as a background image or `src` on the `<img>` tag to prevent layout shift (CLS).
- **Standard Attributes:**
  - `loading="lazy"` (default for below-the-fold)
  - `decoding="async"`
  - `alt`: Mandatory, sourced from Frontmatter or localized content.

### 2.3 Localized `srcset` Logic
To support localized visual assets (e.g., posters with translated typography):
1.  **Resolution Logic:** The image processing pipeline must check the content language context (`de` or `en`).
2.  **File Lookup:**
    - First, attempt to find `[filename]_[lang].[ext]` (e.g., `poster_de.jpg`).
    - If found, generate the `srcset` from this localized source.
    - If not found, fallback to the default `[filename].[ext]` (e.g., `poster.jpg`).
3.  **Result:** The generated HTML will serve the culturally correct image automatically.

### 2.4 Flash Extraction (JPEXS)
- **Vectors:** Export shapes as **SVG** to maintain scalability.
- **Bitmaps:** Export embedded images as PNG/JPG without re-compressing if possible.

## 3. Audio Standards

### 3.1 Target Format
- **Format:** MP3 or AAC (in MP4 container).
- **Bitrate:** 128kbps - 192kbps.
- **Sample Rate:** 44.1kHz or 48kHz.

### 3.2 Use Cases
- **Background Music:** Loop-ready MP3/AAC.
- **Sound Effects:** Short MP3 or OGG/WAV files for UI interactions.

## 4. Fonts & Privacy (GDPR)

### 4.1 Compliance
- **Zero External Requests:** Google Fonts, Adobe Fonts, or other CDNs are strictly prohibited.
- **Hosting:** All font files must be served from the local domain.

### 4.2 Technical Specs
- **Format:** `WOFF2` is the required standard for compression.
- **Location:** `/assets/fonts/`
- **Implementation:** Standard CSS `@font-face` declarations using relative paths.

## 5. File Organization & Naming

### 5.1 Structure
- **Film Assets:** `/content/films/[film-slug]/[asset-name]` (preferred).
- **Shared Assets:** `/src/assets/img/`, `/src/assets/video/`.

### 5.2 Naming Conventions
- **Style:** kebab-case (lowercase, hyphen-separated).
- **Structure:** `[film-slug]-[type]-[descriptor].[ext]`

## 6. Metadata & Accessibility
- **Alt Text:** All images must have descriptive `alt` text.
- **Captions:** Video content should ideally have VTT captions if dialogue is present.
- **Copyright:** Retain any embedded metadata regarding credits (e.g., `veit-helmer_copyright-by-boryana-pandova.jpg`).