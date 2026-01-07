# Legacy Movie Websites - Ruffle Screenshot Capture

This directory contains legacy Flash (SWF) websites for Veit Helmer's films, along with infrastructure for capturing their visual history using Ruffle emulation.

## 🎬 Movie Websites

| Movie | SWF Files | Status |
|-------|-----------|--------|
| Absurdistan | absurdistan.swf, player.swf | Ready |
| Baikonur | player-licensed.swf | Ready |
| Behind the Couch | TBD | Investigate |
| Quatsch | index.html | Ready |
| The Bra | TBD | Investigate |
| Torzumhimmel | torzumhimmel.swf, torzumhimmel_en.swf | Ready |
| Tuvalu | de/intro.swf, en/intro.swf | Ready |
| Vom Lokführer... | index.html | Ready |

## 🚀 Quick Start

### Start Screenshot Capture Session

```bash
# From project root
./scripts/start-ruffle-capture.sh
```

Then open in browser: **http://localhost:8080/ruffle-test-interface.html**

## 📁 Directory Structure

```
legacy/movie-websites/
├── ruffle-test-interface.html   # Testing interface (Ruffle embedded)
├── [movie-slug]/                 # Each movie folder
│   ├── [movie-files]             # Original website files
│   └── ruffle/                   # Screenshot captures
│       ├── CAPTURE_LOG.md        # Session documentation
│       └── *.png                 # Screenshots (to be captured)
```

## 📸 Capture Workflow

1. **Load** movie in ruffle-test-interface.html
2. **Navigate** through all interactive elements
3. **Screenshot** each unique state (landing, menus, pages, hovers, animations)
4. **Name** files: `[slug]_[section]_[state]_[number].png`
5. **Save** to `[movie-slug]/ruffle/`
6. **Document** in `ruffle/CAPTURE_LOG.md`

## 🎯 What to Capture

- ✅ Landing/splash screens
- ✅ Main navigation menus
- ✅ Each menu item and destination page
- ✅ Hover states on interactive elements
- ✅ Animation key frames
- ✅ Language variants (DE/EN)
- ✅ Pop-ups, modals, overlays
- ✅ Video players (if functional)
- ✅ Credits, about pages
- ✅ Any error states

## 📖 Documentation

See project root for complete guides:
- `PHASE_3.2.3_RUFFLE_CAPTURE_GUIDE.md` - Complete methodology
- `PHASE_3.2.3_QUICK_REFERENCE.md` - One-page cheatsheet
- `PHASE_3.2.3_STATUS.md` - Status and setup verification

## 🛠️ Tools Needed

- **Ruffle** (built into test interface or browser extension)
- **Screenshots**: OS built-in tools (Cmd+Shift+4 on macOS, Win+Shift+S on Windows)
- **Browser**: Any modern browser

## 📊 Expected Output

After capture, each movie will have:
```
[movie-slug]/ruffle/
├── CAPTURE_LOG.md (completed)
├── [slug]_landing_initial_01.png
├── [slug]_menu_main_01.png
├── [slug]_page_about_01.png
└── ... (10-50+ screenshots)
```

## ⏱️ Time Estimate

- **Per movie**: 30-60 minutes for thorough capture
- **Total project**: 4-6 hours

## 🎯 Success Criteria

**Minimum** (per movie):
- Landing screen + main navigation
- 5-10 unique states
- Capture log completed

**Ideal** (per movie):
- All navigation explored
- 20+ unique states
- Hover states + animations
- Both language versions

---

**Phase**: 3.2.3 - Extensive Ruffle Screenshot Capture  
**Status**: Infrastructure Complete - Ready for Execution  
**Created**: 2026-01-07
