# Phase 5.1.6 Quick Reference Guide

## ✅ Completed: 4/17 Trailers (23.5%)

### Acquired Trailers
1. **Tuvalu** (1999) - 6.5MB ✅
2. **The Bra** (2018) - 6.7MB ✅
3. **Baikonur** (2011) - 8.3MB ✅
4. **Absurdistan** (2008) - 9.1MB ✅

### 🔍 Remaining: 13 Films
- akiko (2020)
- behind-the-couch (2024)
- bling-bling (2024)
- caspian-bride (2012)
- city-lives-berlin (2010)
- fiddlesticks (2024)
- gate-to-heaven (2011)
- gondola (2024)
- once-upon-a-time-in-shanghai (2014)
- strangers-in-tokyo (2024)
- surprise (2023)
- tour-eiffel (2024)
- uzbek-express (2001)

## Quick Commands

### Search for a trailer
```bash
export PATH="/Users/jan-henrik.hempel/Library/Python/3.9/bin:$PATH"
yt-dlp --get-title --get-id "ytsearch1:[Film Title] Veit Helmer trailer"
```

### Acquire single trailer
```bash
./scripts/acquire_trailer.sh <film-slug> <youtube-url>
# Example:
./scripts/acquire_trailer.sh gate-to-heaven "https://www.youtube.com/watch?v=..."
```

### Check missing trailers
```bash
cd content/films && for dir in */; do 
  film="${dir%/}"
  en_file="$dir/index_en.md"
  if [ -f "$en_file" ]; then
    trailer=$(grep -m1 "^trailer_video:" "$en_file" | sed 's/trailer_video: *//; s/"//g')
    if [ -z "$trailer" ] || [ "$trailer" = "null" ]; then
      echo "MISSING: $film"
    fi
  fi
done
```

## What Gets Created

For each trailer acquisition:
- `content/films/{film}/trailer.mp4` - Transcoded MP4 file
- `content/films/{film}/TRAILER_SOURCE.md` - Documentation
- Updated `trailer_video: trailer.mp4` in all index files

## Technical Specs
- Video: H.264, CRF 23, medium preset
- Audio: AAC, 128kbps
- Container: MP4 with faststart
- Typical size: 6-10MB for 1-2 minute trailers

## Files Reference
- Research tracking: `PHASE_5.1.6_MISSING_TRAILERS.md`
- Completion summary: `PHASE_5.1.6_COMPLETION_SUMMARY.md`
- Acquisition script: `scripts/acquire_trailer.sh`
- Batch processor: `scripts/batch_acquire_trailers.sh`
