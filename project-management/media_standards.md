# Media Standards & Technical Specifications

This document outlines the technical standards, workflows, and tools for the Media Technician Agent responsible for processing, optimizing, and managing media assets for the Veit Helmer digital archive.

## 1. Video Standards

### 1.1 Target Format
All video content must be standardized for web compatibility and performance.

*   **Container:** MP4
*   **Video Codec:** H.264 (High Profile preferred for compatibility)
*   **Audio Codec:** AAC (LC)
*   **Frame Rate:** Keep original (usually 24, 25, or 30 fps) unless standardization is required (e.g., to 24fps for film).

### 1.2 Conversion Workflow
Legacy video files (primarily `.flv` from Flash sites, but also `.swf` embedded video or `.mov`) must be converted using FFmpeg.

**Standard Conversion Command:**
```bash
ffmpeg -i input.flv -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart output.mp4
```

**Parameters Explained:**
*   `-c:v libx264`: Use the x264 encoder for H.264 video.
*   `-crf 23`: Constant Rate Factor (Quality). Lower is better quality/larger size. 23 is a good default for web.
*   `-preset medium`: Encoding speed/compression ratio balance.
*   `-c:a aac`: Use the AAC audio encoder.
*   `-b:a 128k`: Audio bitrate (128kbps is standard for web stereo).
*   `-movflags +faststart`: Moves metadata to the beginning of the file, allowing playback to start before the file is fully downloaded (essential for web streaming).

### 1.3 Sources
*   **Legacy Files:** Extract from `legacy/` directories.
*   **External:** YouTube/Vimeo downloads (using `yt-dlp` or similar) if local quality is poor.
    *   *Note:* Always prioritize highest available quality.

## 2. Image Standards

### 2.1 Target Formats
Modern formats are prioritized, with fallbacks for compatibility.

*   **Primary:** WebP, AVIF (via `eleventy-img` build pipeline).
*   **Fallback:** JPEG (photos), PNG (graphics/transparent).
*   **Vectors:** SVG (for icons, logos, and Flash vector shapes).

### 2.2 Optimization & Processing
*   **Tooling:** Use `eleventy-img` plugin within the 11ty build process.
*   **Responsive Images:** Generate `srcset` for various viewport widths (e.g., 400w, 800w, 1200w).
*   **Lazy Loading:** Apply `loading="lazy"` to all images below the fold.
*   **Placeholders:** Generate 10px base64-encoded blur-up placeholders for perceived performance.

### 2.3 Flash Extraction (JPEXS)
When extracting images from `.swf` files:
1.  **Vectors:** Export shapes as **SVG** whenever possible to maintain scalability.
2.  **Bitmaps:** Export embedded images as PNG/JPG. Avoid re-compressing if possible.
3.  **Sprites:** If images are part of an animation sprite sheet, consider exporting the sequence or reconstructing the layout.

## 3. Audio Standards

### 3.1 Target Format
*   **Format:** MP3 or AAC (in MP4 container).
*   **Bitrate:** 128kbps - 192kbps.
*   **Sample Rate:** 44.1kHz or 48kHz.

### 3.2 Use Cases
*   **Background Music:** Loop-ready MP3/AAC.
*   **Sound Effects:** Short MP3 or OGG/WAV files for UI interactions.

## 4. File Organization & Naming

### 4.1 Structure
Media assets should generally co-locate with their content or live in a structured global assets folder.

*   **Film Assets:** `/content/films/[film-slug]/[asset-name]` (preferred for self-contained content).
*   **Shared Assets:** `/src/assets/img/`, `/src/assets/video/`.

### 4.2 Naming Conventions
*   **Style:** kebab-case (lowercase, hyphen-separated).
*   **Structure:** `[film-slug]-[type]-[descriptor].[ext]`
*   **Examples:**
    *   `absurdistan-poster.jpg`
    *   `tuvalu-trailer.mp4`
    *   `gondola-still-01.webp`

## 5. Metadata & Accessibility

*   **Alt Text:** All images must have descriptive `alt` text defined in the Frontmatter or Markdown.
*   **Captions:** Video content should ideally have VTT captions if dialogue is present.
*   **Copyright:** Retain any embedded metadata or sidecar files regarding copyright/photographer credits (e.g., `veit-helmer_copyright-by-boryana-pandova.jpg`).