#!/usr/bin/env bash
#
# audit-video-coverage.sh - Deep audit of legacy video conversion coverage
#
# This script performs a comprehensive check to ensure 100% conversion coverage
# of all legacy video assets to modern MP4 format.

set -euo pipefail

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
AUDIT_REPORT="$PROJECT_ROOT/PHASE_4.2.5_AUDIT_REPORT.md"

echo -e "${BLUE}=== Phase 4.2.5: Deep Legacy Video Audit ===${NC}"
echo ""

# Find all video files in legacy directory
echo "Scanning legacy/ directory for video files..."
LEGACY_VIDEOS=$(find "$PROJECT_ROOT/legacy" -type f \( -iname "*.flv" -o -iname "*.wmv" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mp4" \) 2>/dev/null | sort || true)

# Count by extension (use grep -c which returns count, but handle no match case)
FLV_COUNT=$(echo "$LEGACY_VIDEOS" | grep -ic '\.flv$' 2>/dev/null) || FLV_COUNT=0
WMV_COUNT=$(echo "$LEGACY_VIDEOS" | grep -ic '\.wmv$' 2>/dev/null) || WMV_COUNT=0
MOV_COUNT=$(echo "$LEGACY_VIDEOS" | grep -ic '\.mov$' 2>/dev/null) || MOV_COUNT=0
AVI_COUNT=$(echo "$LEGACY_VIDEOS" | grep -ic '\.avi$' 2>/dev/null) || AVI_COUNT=0
MP4_COUNT=$(echo "$LEGACY_VIDEOS" | grep -ic '\.mp4$' 2>/dev/null) || MP4_COUNT=0

TOTAL_VIDEOS=$(echo "$LEGACY_VIDEOS" | grep -vc '^$' 2>/dev/null) || TOTAL_VIDEOS=0
NEEDS_CONVERSION=$((FLV_COUNT + WMV_COUNT + MOV_COUNT + AVI_COUNT))

echo ""
echo "=== Video File Discovery ==="
echo "Total video files found: $TOTAL_VIDEOS"
echo "  - FLV files: $FLV_COUNT"
echo "  - WMV files: $WMV_COUNT"
echo "  - MOV files: $MOV_COUNT"
echo "  - AVI files: $AVI_COUNT"
echo "  - MP4 files: $MP4_COUNT"
echo ""
echo "Files needing conversion: $NEEDS_CONVERSION"
echo ""

# Check transcode log
if [ -f "$PROJECT_ROOT/transcode-log.json" ]; then
    if command -v jq &> /dev/null; then
        TRANSCODED_COUNT=$(jq 'length' "$PROJECT_ROOT/transcode-log.json")
        SUCCESS_COUNT=$(jq '[.[] | select(.status == "success")] | length' "$PROJECT_ROOT/transcode-log.json")
        FAILED_COUNT=$(jq '[.[] | select(.status == "failed")] | length' "$PROJECT_ROOT/transcode-log.json")
        
        echo "=== Transcode Log Analysis ==="
        echo "Total entries: $TRANSCODED_COUNT"
        echo "  - Successful: $SUCCESS_COUNT"
        echo "  - Failed: $FAILED_COUNT"
        echo ""
    fi
fi

# Check for archived originals
ARCHIVED_VIDEOS=$(find "$PROJECT_ROOT/legacy-archives" -type f \( -iname "*.flv" -o -iname "*.wmv" -o -iname "*.mov" -o -iname "*.avi" \) 2>/dev/null | wc -l | tr -d ' ')
echo "=== Archive Status ==="
echo "Archived legacy files: $ARCHIVED_VIDEOS"
echo ""

# Detailed file analysis
echo "=== Detailed File List ===" 
echo ""

MISSING_MP4=()
HAS_BOTH=()
ONLY_MP4=()

if [ "$NEEDS_CONVERSION" -gt 0 ]; then
    echo -e "${YELLOW}Non-MP4 files requiring conversion:${NC}"
    while IFS= read -r line; do
        if [ -n "$line" ]; then
            # Check if corresponding MP4 exists
            DIR=$(dirname "$line")
            BASE=$(basename "$line")
            NAME="${BASE%.*}"
            MP4_PATH="$DIR/${NAME}.mp4"
            
            if [ -f "$MP4_PATH" ]; then
                echo "  ✓ $line → MP4 exists"
                HAS_BOTH+=("$line")
            else
                echo -e "  ${RED}✗ $line → MP4 MISSING${NC}"
                MISSING_MP4+=("$line")
            fi
        fi
    done < <(echo "$LEGACY_VIDEOS" | grep -iE '\.(flv|wmv|mov|avi)$')
    echo ""
fi

if [ "$MP4_COUNT" -gt 0 ]; then
    echo -e "${GREEN}MP4 files in legacy/:${NC}"
    while IFS= read -r line; do
        if [ -n "$line" ]; then
            echo "  • $line"
            ONLY_MP4+=("$line")
        fi
    done < <(echo "$LEGACY_VIDEOS" | grep -i '\.mp4$')
    echo ""
fi

# Generate audit report
cat > "$AUDIT_REPORT" << EOF
# Phase 4.2.5: Deep Legacy Video Audit Report

**Date:** $(date -u +"%Y-%m-%d %H:%M:%S UTC")
**Status:** $([ ${#MISSING_MP4[@]} -eq 0 ] && echo "✅ PASS - 100% Coverage" || echo "❌ FAIL - Missing Conversions")

## Executive Summary

- **Total video files in legacy/:** $TOTAL_VIDEOS
- **Files needing conversion:** $NEEDS_CONVERSION
  - FLV: $FLV_COUNT
  - WMV: $WMV_COUNT
  - MOV: $MOV_COUNT
  - AVI: $AVI_COUNT
- **MP4 files present:** $MP4_COUNT
- **Archived legacy files:** $ARCHIVED_VIDEOS

## Conversion Coverage

### Status Breakdown
- **Files with MP4 counterpart:** ${#HAS_BOTH[@]}
- **MP4-only files (no conversion needed):** ${#ONLY_MP4[@]}
- **Missing MP4 conversions:** ${#MISSING_MP4[@]}

EOF

if [ ${#MISSING_MP4[@]} -gt 0 ]; then
    cat >> "$AUDIT_REPORT" << EOF

## ❌ Missing Conversions

The following legacy files do NOT have corresponding MP4 files:

EOF
    for file in "${MISSING_MP4[@]}"; do
        echo "- \`$file\`" >> "$AUDIT_REPORT"
    done
    echo "" >> "$AUDIT_REPORT"
fi

if [ ${#HAS_BOTH[@]} -gt 0 ]; then
    cat >> "$AUDIT_REPORT" << EOF

## ✅ Files with MP4 Counterparts

The following legacy files have corresponding MP4 files and may be candidates for archival:

EOF
    for file in "${HAS_BOTH[@]}"; do
        DIR=$(dirname "$file")
        BASE=$(basename "$file")
        NAME="${BASE%.*}"
        MP4_PATH="$DIR/${NAME}.mp4"
        echo "- \`$file\` → \`$MP4_PATH\`" >> "$AUDIT_REPORT"
    done
    echo "" >> "$AUDIT_REPORT"
fi

if [ ${#ONLY_MP4[@]} -gt 0 ]; then
    cat >> "$AUDIT_REPORT" << EOF

## 📦 MP4 Files (Already Converted or Native)

EOF
    for file in "${ONLY_MP4[@]}"; do
        echo "- \`$file\`" >> "$AUDIT_REPORT"
    done
    echo "" >> "$AUDIT_REPORT"
fi

cat >> "$AUDIT_REPORT" << EOF

## Transcode Log Summary

EOF

if [ -f "$PROJECT_ROOT/transcode-log.json" ]; then
    if command -v jq &> /dev/null; then
        cat >> "$AUDIT_REPORT" << EOF
- Total transcoding operations: $TRANSCODED_COUNT
- Successful: $SUCCESS_COUNT
- Failed: $FAILED_COUNT

### Transcoded Files
EOF
        jq -r '.[] | "- `\(.source)` → `\(.destination)` (\(.status))"' "$PROJECT_ROOT/transcode-log.json" >> "$AUDIT_REPORT"
        echo "" >> "$AUDIT_REPORT"
    fi
else
    echo "No transcode log found." >> "$AUDIT_REPORT"
    echo "" >> "$AUDIT_REPORT"
fi

cat >> "$AUDIT_REPORT" << EOF

## Recommendations

EOF

if [ ${#MISSING_MP4[@]} -gt 0 ]; then
    cat >> "$AUDIT_REPORT" << EOF
1. **CRITICAL:** Transcode ${#MISSING_MP4[@]} missing file(s) using \`scripts/media_standards\`
2. Verify all MP4 outputs are playable and properly encoded
3. Archive source files to \`legacy-archives/\` after successful conversion
EOF
elif [ ${#HAS_BOTH[@]} -gt 0 ]; then
    cat >> "$AUDIT_REPORT" << EOF
1. Archive ${#HAS_BOTH[@]} source file(s) to \`legacy-archives/\` (MP4 conversions already exist)
2. Validate MP4 playback quality before archiving sources
EOF
else
    cat >> "$AUDIT_REPORT" << EOF
1. ✅ All video files are in MP4 format - no action needed
2. Consider validating MP4 encoding parameters match media standards
EOF
fi

echo "" >> "$AUDIT_REPORT"

cat >> "$AUDIT_REPORT" << EOF

## Acceptance Criteria

- [$([ ${#MISSING_MP4[@]} -eq 0 ] && echo "x" || echo " ")] All legacy video files have MP4 counterparts
- [$([ "$ARCHIVED_VIDEOS" -gt 0 ] && echo "x" || echo " ")] Source files archived after conversion
- [$([ -f "$PROJECT_ROOT/transcode-log.json" ] && echo "x" || echo " ")] Transcoding operations logged
- [$([ ${#MISSING_MP4[@]} -eq 0 ] && echo "x" || echo " ")] Zero missing video files

---

**Phase 4.2.5 Status:** $([ ${#MISSING_MP4[@]} -eq 0 ] && echo "✅ COMPLETE" || echo "⚠️  ACTION REQUIRED")
EOF

echo ""
echo -e "${GREEN}Audit report generated: $AUDIT_REPORT${NC}"
echo ""

# Print summary
if [ ${#MISSING_MP4[@]} -eq 0 ]; then
    echo -e "${GREEN}=== ✅ AUDIT PASSED ===${NC}"
    echo "100% conversion coverage achieved!"
    echo "All legacy video files have MP4 counterparts."
    exit 0
else
    echo -e "${RED}=== ❌ AUDIT FAILED ===${NC}"
    echo "${#MISSING_MP4[@]} file(s) require conversion:"
    for file in "${MISSING_MP4[@]}"; do
        echo "  - $file"
    done
    echo ""
    echo "Run transcode operations to achieve 100% coverage."
    exit 1
fi
