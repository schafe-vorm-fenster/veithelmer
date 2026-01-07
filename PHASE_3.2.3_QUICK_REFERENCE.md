# Phase 3.2.3 - Quick Reference Card

## 🚀 Start Capture Session

```bash
./scripts/start-ruffle-capture.sh
```

Then open: **http://localhost:8080/ruffle-test-interface.html**

---

## 📸 Screenshot Shortcuts

| OS | Shortcut | Notes |
|---|---|---|
| macOS | `Cmd + Shift + 4` | Drag for region, Space for window |
| Windows | `Win + Shift + S` | Snipping Tool |
| Linux | `Shift + PrtScn` | Varies by DE |

---

## 🎬 Movies to Capture

### ✅ Priority 1: Full Sites
- [ ] **absurdistan** - absurdistan.swf, player.swf
- [ ] **quatsch** - index.html
- [ ] **vom-lokfuehrer-der-die-liebe-suchte** - index.html

### ✅ Priority 2: Intro SWFs  
- [ ] **torzumhimmel** - torzumhimmel.swf (DE), torzumhimmel_en.swf (EN)
- [ ] **tuvalu** - de/intro.swf, en/intro.swf

### ✅ Priority 3: Investigate
- [ ] **baikonur** - player-licensed.swf
- [ ] **behindthecouch** - Check for SWF content
- [ ] **the-bra** - Check for SWF content

---

## 📋 Capture Checklist (Per Movie)

- [ ] Landing/splash screen
- [ ] Main navigation menu
- [ ] Each menu item (before click)
- [ ] Each destination page (after click)
- [ ] Hover states on buttons/links
- [ ] Animation key frames
- [ ] Language toggle (if DE/EN available)
- [ ] Pop-ups/modals
- [ ] End screens/credits
- [ ] Any error states

---

## 💾 Save Screenshots To

```
legacy/movie-websites/[slug]/ruffle/
```

---

## 🏷️ Naming Convention

```
[slug]_[section]_[state]_[number].png
```

**Examples:**
- `absurdistan_landing_initial_01.png`
- `absurdistan_menu_main_01.png`
- `absurdistan_menu_main_hover_01.png`
- `absurdistan_page_about_01.png`
- `torzumhimmel_en_menu_main_01.png`

---

## 📝 Document Progress

Update: `legacy/movie-websites/[slug]/ruffle/CAPTURE_LOG.md`

---

## 📚 Full Documentation

- **Complete Guide:** `PHASE_3.2.3_RUFFLE_CAPTURE_GUIDE.md`
- **Setup Summary:** `PHASE_3.2.3_SETUP_COMPLETE.md`

---

## 🎯 Minimum Success

- ✓ 5-10 screenshots per movie
- ✓ Landing + main navigation captured
- ✓ Capture log filled out

## 🌟 Ideal Success

- ✓ 20+ screenshots per movie
- ✓ All navigation paths explored
- ✓ Hover states + animations captured
- ✓ Both languages (where applicable)

---

**Status:** Ready to capture | **Created:** 2026-01-07
