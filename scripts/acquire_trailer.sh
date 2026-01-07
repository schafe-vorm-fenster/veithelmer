#!/bin/bash

# Script to acquire and transcode a trailer for a film
# Usage: ./acquire_trailer.sh <film-slug> <youtube-url-or-video-id>

set -e

FILM_SLUG="$1"
VIDEO_URL="$2"

if [ -z "$FILM_SLUG" ] || [ -z "$VIDEO_URL" ]; then
    echo "Usage: $0 <film-slug> <video-url>"
    echo "Example: $0 the-bra https://www.youtube.com/watch?v=abc123"
    exit 1
fi

FILM_DIR="content/films/$FILM_SLUG"
if [ ! -d "$FILM_DIR" ]; then
    echo "Error: Film directory not found: $FILM_DIR"
    exit 1
fi

# Setup paths
TEMP_DIR="$FILM_DIR/temp_trailer"
OUTPUT_FILE="$FILM_DIR/trailer.mp4"
SOURCE_LOG="$FILM_DIR/TRAILER_SOURCE.md"

mkdir -p "$TEMP_DIR"

echo "=========================================="
echo "Acquiring trailer for: $FILM_SLUG"
echo "Source URL: $VIDEO_URL"
echo "=========================================="

# Step 1: Download with yt-dlp (best quality)
echo "Step 1: Downloading video..."
export PATH="/Users/jan-henrik.hempel/Library/Python/3.9/bin:$PATH"
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" \
    --merge-output-format mp4 \
    --extractor-args "youtube:player_client=android" \
    --user-agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" \
    -o "$TEMP_DIR/original.%(ext)s" \
    "$VIDEO_URL"

# Find the downloaded file
DOWNLOADED_FILE=$(find "$TEMP_DIR" -type f \( -name "*.mp4" -o -name "*.webm" -o -name "*.mkv" \) | head -1)

if [ -z "$DOWNLOADED_FILE" ]; then
    echo "Error: Download failed, no video file found"
    exit 1
fi

echo "Downloaded: $DOWNLOADED_FILE"

# Step 2: Transcode to project standards (H.264 MP4, AAC, CRF 23)
echo "Step 2: Transcoding to project standards..."
ffmpeg -i "$DOWNLOADED_FILE" \
    -c:v libx264 -crf 23 -preset medium \
    -c:a aac -b:a 128k \
    -movflags +faststart \
    -y "$OUTPUT_FILE"

# Step 3: Get video metadata
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$OUTPUT_FILE" | awk '{print int($1)}')
SIZE=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')
RESOLUTION=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$OUTPUT_FILE")

# Step 4: Create source documentation
echo "Step 4: Documenting source..."
cat > "$SOURCE_LOG" << EOF
# Trailer Source Documentation

**Film:** $FILM_SLUG
**Acquired:** $(date +"%Y-%m-%d")
**Source URL:** $VIDEO_URL
**License:** Fair use / promotional material
**Method:** Downloaded via yt-dlp, transcoded to project standards

## Technical Specifications
- **Output File:** trailer.mp4
- **Video Codec:** H.264 (CRF 23)
- **Audio Codec:** AAC (128kbps)
- **Resolution:** $RESOLUTION
- **Duration:** ${DURATION}s
- **File Size:** $SIZE

## Processing Log
1. Downloaded with yt-dlp (best available quality)
2. Transcoded with ffmpeg (H.264 MP4, AAC, CRF 23)
3. Optimized for web delivery (faststart flag)

EOF

# Step 5: Update frontmatter
echo "Step 5: Updating frontmatter..."
for lang_file in "$FILM_DIR"/index_*.md; do
    if [ -f "$lang_file" ]; then
        if grep -q "^trailer_video:" "$lang_file"; then
            sed -i.bak "s|^trailer_video:.*|trailer_video: trailer.mp4|" "$lang_file"
        else
            # Add after poster_image line
            sed -i.bak "/^poster_image:/a\\
trailer_video: trailer.mp4" "$lang_file"
        fi
        rm -f "$lang_file.bak"
        echo "Updated: $lang_file"
    fi
done

# Cleanup
echo "Step 6: Cleaning up..."
rm -rf "$TEMP_DIR"

echo "=========================================="
echo "✓ Trailer acquisition complete!"
echo "Output: $OUTPUT_FILE"
echo "Source log: $SOURCE_LOG"
echo "=========================================="
