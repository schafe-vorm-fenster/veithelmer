# Phase 4.2.2: Legacy Video Transcoding Guide

## Overview

This document describes the process for transcoding all legacy video files (FLV, MOV, WMV) from the inventory into modern H.264 MP4 format.

## Prerequisites

Install ffmpeg if not already available:
```bash
brew install ffmpeg
```

## Video Inventory

From `project-management/inventory-microsites.md`, the following 10 legacy video files need transcoding:

### FLV Files (2)
1. `legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv` - Absurdistan trailer
2. `legacy/movie-websites/baikonur/de/media/trailer.flv` - Baikonur trailer (German)

### MOV Files (5)
3. `legacy/movie-websites/tuvalu/de/video/tuvalu.mov` - Tuvalu video (German)
4. `legacy/movie-websites/tuvalu/en/video/tuvalu.mov` - Tuvalu video (English)
5. `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_hi.mov` - Tor zum Himmel trailer (high quality)
6. `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_med.mov` - Tor zum Himmel trailer (medium quality)
7. `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_low.mov` - Tor zum Himmel trailer (low quality)

### WMV Files (3)
8. `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_hi.wmv` - Tor zum Himmel trailer (high quality)
9. `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_med.wmv` - Tor zum Himmel trailer (medium quality)
10. `legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_low.wmv` - Tor zum Himmel trailer (low quality)

## Tools Created

### 1. `scripts/media_standards`

Command-line tool for transcoding individual video files with standardized H.264 MP4 settings.

**Usage:**
```bash
scripts/media_standards <input_file> <output_file>
```

**Example:**
```bash
scripts/media_standards legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv \
                        legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.mp4
```

**Encoding Settings:**
- Video codec: H.264 (libx264)
- Audio codec: AAC
- Quality: CRF 23 (constant rate factor for balanced quality/size)
- Preset: medium (balanced encoding speed/compression)
- Audio bitrate: 128k
- Optimizations: `faststart` flag for web streaming
- Metadata: Preserved from source

**Features:**
- Validates input file exists and is correct format
- Extracts and displays ffprobe metadata before transcoding
- Creates output directories as needed
- Displays ffprobe metadata after transcoding
- Shows file size comparison

### 2. `scripts/transcode-legacy-videos.sh`

Batch processing script that transcodes all 10 legacy video files automatically.

**Usage:**
```bash
scripts/transcode-legacy-videos.sh
```

**Process:**
1. Validates all source files exist
2. For each video:
   - Extracts metadata using ffprobe
   - Transcodes to MP4 using `media_standards`
   - Moves original file to `legacy-archives/` (preserving directory structure)
   - Logs conversion with metadata to `transcode-log.json`
3. Displays summary of successes/failures

**Features:**
- Skips files where MP4 already exists
- Preserves directory structure in archives
- Creates structured JSON log with:
  - Timestamp
  - Source file path
  - Destination file path
  - Status (success/failed)
  - Original ffprobe metadata
- Color-coded progress output
- Comprehensive summary report

## Execution

### Option 1: Automated Batch Processing (Recommended)

Run the batch script to transcode all videos:

```bash
cd /private/var/folders/sj/p4ymrdn16pzbn6g8jf00bb4w0000gn/T/vibe-kanban/worktrees/c01f-phase-4-2-2-tran/veithelmer
scripts/transcode-legacy-videos.sh
```

This will:
- Transcode all 10 legacy videos
- Archive originals to `legacy-archives/`
- Generate `transcode-log.json` with full metadata

### Option 2: Manual Individual Processing

For individual files or troubleshooting:

```bash
# Example: Transcode Absurdistan trailer
scripts/media_standards \
    legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv \
    legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.mp4

# Archive the original
mkdir -p legacy-archives/legacy/movie-websites/absurdistan/trailer/
mv legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv \
   legacy-archives/legacy/movie-websites/absurdistan/trailer/
```

## Output Structure

### Transcoded Videos
MP4 files are created in the same directory as the originals:
```
legacy/movie-websites/
├── absurdistan/trailer/
│   ├── absurdistan_trailer.mp4    (NEW)
│   └── absurdistan_trailer.flv    (moved to archive)
├── baikonur/de/media/
│   ├── trailer.mp4                 (NEW)
│   └── trailer.flv                 (moved to archive)
└── ...
```

### Archived Originals
Original files are preserved in `legacy-archives/`:
```
legacy-archives/
└── legacy/movie-websites/
    ├── absurdistan/trailer/
    │   └── absurdistan_trailer.flv
    ├── baikonur/de/media/
    │   └── trailer.flv
    └── ...
```

### Transcode Log
`transcode-log.json` contains detailed records:
```json
[
  {
    "timestamp": "2026-01-07T12:34:56Z",
    "source": "legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv",
    "destination": "absurdistan/trailer/absurdistan_trailer.flv",
    "status": "success",
    "metadata": "{\"streams\":[...],\"format\":{...}}"
  }
]
```

## Verification

After transcoding, verify:

1. **All MP4 files created:**
   ```bash
   find legacy/movie-websites -name "*.mp4" | wc -l
   # Should show at least 10 files
   ```

2. **All originals archived:**
   ```bash
   find legacy-archives -type f \( -name "*.flv" -o -name "*.mov" -o -name "*.wmv" \) | wc -l
   # Should show 10 files
   ```

3. **No legacy formats in working directory:**
   ```bash
   find legacy/movie-websites -type f \( -name "*.flv" -o -name "*.mov" -o -name "*.wmv" \)
   # Should return empty
   ```

4. **Review transcode log:**
   ```bash
   cat transcode-log.json | jq '.[] | {source, status}'
   ```

## Troubleshooting

### ffmpeg not installed
```
Error: ffmpeg is not installed
Install with: brew install ffmpeg
```

### Permission denied
Ensure scripts are executable:
```bash
chmod +x scripts/media_standards
chmod +x scripts/transcode-legacy-videos.sh
```

### File not found
Verify the legacy video files exist:
```bash
find legacy/movie-websites -type f \( -name "*.flv" -o -name "*.mov" -o -name "*.wmv" \)
```

### Transcode failures
Check individual file with verbose output:
```bash
ffmpeg -i input.flv -c:v libx264 -crf 23 -c:a aac output.mp4
```

## Next Steps

After successful transcoding:

1. Update film markdown files to reference new MP4 paths
2. Update any HTML references to legacy video formats
3. Test video playback in target Eleventy site
4. Consider CDN upload for optimized delivery
5. Document video migration in `migration_log.md`

## Standards Reference

H.264 MP4 settings follow modern web video best practices:
- **H.264 Level 4.0**: Maximum compatibility
- **CRF 23**: Default ffmpeg quality (visually lossless for most content)
- **AAC Audio**: Universal browser support
- **faststart**: Enables progressive download/streaming
- **Medium preset**: Good balance of encoding time and compression

These settings ensure compatibility with all modern browsers and devices while maintaining good visual quality at reasonable file sizes.
