#!/bin/bash

# Batch trailer acquisition script
# Processes multiple trailers from a URL list file

set -e

ACQUISITION_SCRIPT="./scripts/acquire_trailer.sh"

if [ ! -f "$ACQUISITION_SCRIPT" ]; then
    echo "Error: Acquisition script not found: $ACQUISITION_SCRIPT"
    exit 1
fi

echo "=========================================="
echo "Batch Trailer Acquisition"
echo "=========================================="
echo ""

# List of trailers to acquire (film-slug|URL pairs)
TRAILERS=(
    "the-bra|https://www.youtube.com/watch?v=Pf5FwO5pUXk"
    "baikonur|https://www.youtube.com/watch?v=YbBDh5Md3ko"
    "absurdistan|https://www.youtube.com/watch?v=nLdyGDJWuBo"
    # Add more as you find them:
    # "film-slug|URL"
)

SUCCESS=0
FAILED=0
SKIPPED=0

for ENTRY in "${TRAILERS[@]}"; do
    FILM="${ENTRY%%|*}"
    URL="${ENTRY#*|}"
    
    echo "----------------------------------------"
    echo "Processing: $FILM"
    echo "URL: $URL"
    echo "----------------------------------------"
    
    # Check if trailer already exists
    if [ -f "content/films/$FILM/trailer.mp4" ]; then
        echo "⚠️  Trailer already exists, skipping..."
        ((SKIPPED++))
        echo ""
        continue
    fi
    
    # Run acquisition script
    if "$ACQUISITION_SCRIPT" "$FILM" "$URL"; then
        echo "✅ Success: $FILM"
        ((SUCCESS++))
    else
        echo "❌ Failed: $FILM"
        ((FAILED++))
    fi
    
    echo ""
    
    # Brief pause between downloads to be respectful
    sleep 3
done

echo "=========================================="
echo "Batch Processing Complete"
echo "=========================================="
echo "Success: $SUCCESS"
echo "Failed: $FAILED"
echo "Skipped: $SKIPPED"
echo "Total: $((SUCCESS + FAILED + SKIPPED))"
echo "=========================================="
