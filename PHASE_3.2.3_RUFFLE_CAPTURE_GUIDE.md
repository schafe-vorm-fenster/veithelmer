# Phase 3.2.3: Extensive Ruffle Screenshot Capture Guide

## Overview
This guide walks through capturing comprehensive visual documentation of legacy SWF websites using Ruffle emulation.

## Setup Instructions

### 1. Start Local Server
```bash
# From project root
npx serve legacy/movie-websites -p 8080
```

Access at: http://localhost:8080

### 2. Install Ruffle Browser Extension
- **Chrome/Edge**: https://chrome.google.com/webstore/detail/ruffle/donbcfbmhbcapadipfkeojnmajbakjdc
- **Firefox**: https://addons.mozilla.org/en-US/firefox/addon/ruffle_rs/
- Or use Ruffle Desktop: https://ruffle.rs/downloads

### 3. Configure Ruffle
- Open Ruffle extension settings
- Enable "Replace all Flash content"
- Set quality to "High" for better screenshots
- Disable "Warn on unsupported content" for smoother testing

## Movie Websites Inventory

### Sites with SWF Files:
1. **absurdistan/** - `absurdistan.swf`, `player.swf`
2. **torzumhimmel/** - `torzumhimmel.swf`, `torzumhimmel_en.swf`
3. **tuvalu/** - `de/intro.swf`, `en/intro.swf`
4. **baikonur/** - `de/template/global/jwplayer/player-licensed.swf`

### Sites with HTML Entry Points:
- absurdistan/index.html
- quatsch/index.html
- tuvalu/index.html
- vom-lokfuehrer-der-die-liebe-suchte/index.html

## Capture Methodology

### For Each Movie Website:

#### A. Initial Access
```
URL Pattern: http://localhost:8080/[movie-slug]/index.html
OR: http://localhost:8080/[movie-slug]/[movie-slug].swf
```

#### B. Screenshot Checklist
Document each unique state:
- [ ] **Landing/Splash Screen** - Initial load state
- [ ] **Main Menu** - Navigation hub
- [ ] **Each Navigation Item** - Before click
- [ ] **Each Sub-page** - After click
- [ ] **Hover States** - Interactive elements highlighted
- [ ] **Animation Keyframes** - Mid-animation captures
- [ ] **Video Player States** - Play, pause, controls
- [ ] **Language Toggles** - DE/EN versions if available
- [ ] **Pop-ups/Modals** - Any overlays
- [ ] **Loading States** - Transitions between sections
- [ ] **Credits/About** - End screens
- [ ] **Error States** - Any fallback screens

#### C. Screenshot Naming Convention
```
[movie-slug]_[section]_[state]_[number].png

Examples:
absurdistan_landing_initial_01.png
absurdistan_menu_main_01.png
absurdistan_nav_about_hover_01.png
absurdistan_page_synopsis_01.png
torzumhimmel_en_menu_main_01.png
tuvalu_intro_animation_frame_03.png
```

#### D. Save Location
```
legacy/movie-websites/[movie-slug]/ruffle/
```

### Screenshot Tools
- **macOS**: Cmd+Shift+4, then Space (window capture) or drag selection
- **Windows**: Snipping Tool or Win+Shift+S
- **Browser DevTools**: F12 → Take screenshot (full page option)
- **Browser Extensions**: Nimbus, Awesome Screenshot

## Testing Protocol

### Priority 1: Full Interactive Sites
1. **absurdistan** - Has main SWF and HTML
2. **quatsch** - Has HTML entry
3. **vom-lokfuehrer-der-die-liebe-suchte** - Has HTML entry

### Priority 2: Intro/Player SWFs
4. **torzumhimmel** - DE and EN versions
5. **tuvalu** - DE and EN intro SWFs

### Priority 3: Supporting Components
6. **baikonur** - Video player SWF
7. **behindthecouch** - Investigate for SWF content
8. **the-bra** - Investigate for SWF content

## Navigation Strategy

### 1. Systematic Exploration
```
Start → Document → Click → Document → Back → Next Option
```

### 2. State Coverage Checklist
For each clickable element:
- Default state
- Hover state (if visible)
- Active/clicked state
- Resulting page/content
- Return to previous state

### 3. Animation Capture
- Let animations complete at least once
- Capture key frames (beginning, middle, end)
- Note animation loops vs. one-time sequences

### 4. Multi-language Sites
- Test both DE and EN versions separately
- Document language toggle mechanism

## Technical Notes

### Common Issues & Solutions

**Issue: SWF doesn't load**
- Check browser console for CORS errors
- Ensure server is running on http://localhost:8080
- Try direct SWF URL instead of HTML wrapper

**Issue: Ruffle compatibility error**
- Note the ActionScript version/features not supported
- Capture error state as documentation
- Note in capture log

**Issue: Interactive elements don't respond**
- Try different browsers
- Check Ruffle version/settings
- Document as partial compatibility

**Issue: Animations run too fast/slow**
- Use browser DevTools to adjust playback speed
- Note actual vs. intended timing in log

### Browser DevTools Tips
```javascript
// Slow down animations (Chrome DevTools Console)
document.querySelector('embed').playbackRate = 0.5;

// Take programmatic screenshot
// Use DevTools → Cmd+Shift+P → "Capture screenshot"
```

## Capture Log Template

Create a capture log for each movie:

```markdown
# [Movie Name] Ruffle Capture Session

**Date:** [Date]
**Ruffle Version:** [Version]
**Browser:** [Browser + Version]

## Files Tested
- [ ] main.swf - Status, notes
- [ ] intro.swf - Status, notes

## Screens Captured
1. Landing - [filename] - Notes
2. Main Menu - [filename] - Notes
3. ...

## Navigation Map
```
Landing
├── About (page)
├── Synopsis (page)
├── Gallery
│   ├── Photos (12 items)
│   └── Videos (3 items)
└── Contact (page)
```

## Issues Encountered
- [Issue description and workaround]

## Completion Status
- Total screens: XX
- Unique states: XX
- Coverage: [Complete/Partial/Blocked]
```

## Success Criteria

✅ **Minimum Requirements:**
- Landing screen captured for all sites
- Main navigation documented
- At least 5-10 unique states per interactive site
- Language variants captured where available

✅ **Ideal Completion:**
- Every clickable element documented
- All navigation paths explored
- Hover states captured
- Animation sequences documented
- Both language versions complete

## Next Steps After Capture

1. Review screenshots for completeness
2. Create visual index/catalog (Phase 3.2.4)
3. Document interaction flows
4. Archive capture logs with screenshots
5. Update project documentation

## Resources

- **Ruffle Documentation**: https://github.com/ruffle-rs/ruffle/wiki
- **Flash/ActionScript Reference**: For understanding SWF behavior
- **Browser DevTools**: For debugging and programmatic control

---

**Status**: Ready for execution
**Created**: 2026-01-07
**Phase**: 3.2.3
