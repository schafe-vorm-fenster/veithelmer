#!/usr/bin/env bash
#
# transcode-legacy-videos.sh - Batch transcode all legacy videos to H.264 MP4
#
# This script processes all FLV, MOV, and WMV files from the legacy movie websites,
# transcoding them to modern H.264 MP4 format and archiving the originals.

set -euo pipefail

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MEDIA_STANDARDS="$SCRIPT_DIR/media_standards"
LOG_FILE="$PROJECT_ROOT/transcode-log.json"
ARCHIVE_DIR="$PROJECT_ROOT/legacy-archives"

# Initialize log array
echo "[]" > "$LOG_FILE"

# Helper function to add entry to log
log_transcode() {
    local source="$1"
    local dest="$2"
    local status="$3"
    local metadata="$4"
    local timestamp=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
    
    # Read existing log
    local temp_log=$(mktemp)
    jq --arg ts "$timestamp" \
       --arg src "$source" \
       --arg dst "$dest" \
       --arg st "$status" \
       --arg meta "$metadata" \
       '. += [{
           timestamp: $ts,
           source: $src,
           destination: $dst,
           status: $st,
           metadata: $meta
       }]' "$LOG_FILE" > "$temp_log"
    mv "$temp_log" "$LOG_FILE"
}

echo -e "${BLUE}=== Legacy Video Transcoding ===${NC}"
echo "This script will transcode all legacy FLV, MOV, and WMV files to H.264 MP4"
echo ""

# Check for required tools
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}Warning: jq not installed. Install with: brew install jq${NC}"
    echo "Continuing without structured logging..."
fi

# Find all legacy video files
LEGACY_VIDEOS=(
    "legacy/movie-websites/absurdistan/trailer/absurdistan_trailer.flv"
    "legacy/movie-websites/baikonur/de/media/trailer.flv"
    "legacy/movie-websites/tuvalu/de/video/tuvalu.mov"
    "legacy/movie-websites/tuvalu/en/video/tuvalu.mov"
    "legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_hi.mov"
    "legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_hi.wmv"
    "legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_med.mov"
    "legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_med.wmv"
    "legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_low.mov"
    "legacy/movie-websites/torzumhimmel/video/tzh/TorZumHimmel-Tr_low.wmv"
)

TOTAL=${#LEGACY_VIDEOS[@]}
CURRENT=0
SUCCESS=0
FAILED=0

echo "Found $TOTAL legacy video files to transcode"
echo ""

for VIDEO in "${LEGACY_VIDEOS[@]}"; do
    CURRENT=$((CURRENT + 1))
    
    # Full path to video
    VIDEO_PATH="$PROJECT_ROOT/$VIDEO"
    
    # Check if file exists
    if [ ! -f "$VIDEO_PATH" ]; then
        echo -e "${YELLOW}[$CURRENT/$TOTAL] SKIP: $VIDEO (file not found)${NC}"
        continue
    fi
    
    # Generate output path (same location, .mp4 extension)
    VIDEO_DIR=$(dirname "$VIDEO_PATH")
    VIDEO_BASENAME=$(basename "$VIDEO_PATH")
    VIDEO_NAME="${VIDEO_BASENAME%.*}"
    OUTPUT_PATH="$VIDEO_DIR/${VIDEO_NAME}.mp4"
    
    # Skip if MP4 already exists
    if [ -f "$OUTPUT_PATH" ]; then
        echo -e "${YELLOW}[$CURRENT/$TOTAL] SKIP: $VIDEO (MP4 already exists)${NC}"
        continue
    fi
    
    echo -e "${GREEN}[$CURRENT/$TOTAL] Processing: $VIDEO${NC}"
    
    # Extract metadata before transcoding
    if command -v ffprobe &> /dev/null; then
        METADATA=$(ffprobe -v quiet -print_format json -show_format -show_streams "$VIDEO_PATH" 2>&1 || echo "{}")
    else
        METADATA="{}"
    fi
    
    # Transcode using media_standards
    if "$MEDIA_STANDARDS" "$VIDEO_PATH" "$OUTPUT_PATH"; then
        SUCCESS=$((SUCCESS + 1))
        
        # Log success
        if command -v jq &> /dev/null; then
            log_transcode "$VIDEO" "${VIDEO#legacy/movie-websites/}" "success" "$METADATA"
        fi
        
        # Archive original
        ARCHIVE_PATH="$ARCHIVE_DIR/$VIDEO"
        ARCHIVE_DIR_PATH=$(dirname "$ARCHIVE_PATH")
        mkdir -p "$ARCHIVE_DIR_PATH"
        
        echo "Archiving original to: $ARCHIVE_PATH"
        mv "$VIDEO_PATH" "$ARCHIVE_PATH"
        
        echo -e "${GREEN}✓ Complete${NC}"
    else
        FAILED=$((FAILED + 1))
        
        # Log failure
        if command -v jq &> /dev/null; then
            log_transcode "$VIDEO" "${VIDEO#legacy/movie-websites/}" "failed" "$METADATA"
        fi
        
        echo -e "${YELLOW}✗ Failed${NC}"
    fi
    
    echo ""
done

# Summary
echo -e "${BLUE}=== Transcoding Summary ===${NC}"
echo "Total:   $TOTAL files"
echo "Success: $SUCCESS files"
echo "Failed:  $FAILED files"
echo "Skipped: $((TOTAL - SUCCESS - FAILED)) files"
echo ""
echo "Transcoding log: $LOG_FILE"
echo "Archived originals: $ARCHIVE_DIR"
