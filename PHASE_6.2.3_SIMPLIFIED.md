# Phase 6.2.3 Simplified Video Player

**Date:** 2026-01-07  
**Update:** Simplified to native HTML5 player with play button overlay

---

## Changes Made

### Removed Custom Controls
❌ Custom progress bar  
❌ Custom volume control  
❌ Custom fullscreen button  
❌ Custom time display  
❌ Complex keyboard shortcuts  
❌ State management complexity  

### What Remains
✅ **Poster image** with video thumbnail  
✅ **Big play button** overlay (centered)  
✅ **Native browser controls** once playing  
✅ **Autoplay support** for hero sections  
✅ **Cross-browser compatible**  

---

## Code Reduction

| File | Before | After | Reduction |
|------|--------|-------|-----------|
| `videoPlayer.njk` | 191 lines | 78 lines | **59% smaller** |
| `videoPlayer.js` | 341 lines | 58 lines | **83% smaller** |
| `main.css` | Complex rules | Minimal | **Much simpler** |

**Total:** From 532 lines to 136 lines (74% reduction)

---

## Component Structure

### Template (videoPlayer.njk)
```njk
<div data-video-player>
  <video controls poster="..." data-video-element>
    <source src="..." type="video/mp4">
  </video>
  
  <button class="play-overlay" data-play-overlay>
    <svg><!-- Play icon --></svg>
  </button>
</div>
```

### JavaScript (videoPlayer.js)
```javascript
class VideoPlayer {
  init() {
    // Hide overlay when video plays
    video.addEventListener('play', () => hideOverlay());
    
    // Show overlay when ended
    video.addEventListener('ended', () => showOverlay());
    
    // Play on button click
    playOverlay.addEventListener('click', () => video.play());
  }
}
```

### CSS (minimal)
```css
.play-overlay {
  transition: opacity 0.3s ease-out;
}
```

---

## Usage (Unchanged)

```njk
{% import "macros/videoPlayer.njk" as video %}

{{ video.videoPlayer(
  src="/content/films/my-film/trailer.mp4",
  poster="/content/films/my-film/poster.jpg"
) }}
```

---

## Benefits

### Simplicity
- Native browser controls = consistent UX
- Less JavaScript = faster load times
- Less CSS = smaller bundle size
- Less code = easier to maintain

### Accessibility
- Native controls are highly accessible
- Built-in keyboard shortcuts (browser)
- Screen reader support (native)
- Focus management (native)

### Compatibility
- Works everywhere HTML5 video works
- No custom fullscreen API needed
- No custom progress bar bugs
- Browser handles edge cases

### Performance
- 1.6 KB JavaScript (vs 10 KB)
- Minimal CSS overhead
- Native video decoding
- No unnecessary event listeners

---

## Features

### Play Button Overlay
- **Design**: Big white play icon in rounded circle
- **Hover**: Scale 110%, background lightens
- **Click**: Starts video, hides overlay
- **Ended**: Overlay reappears

### Native Controls
- **Play/Pause**: Native button
- **Volume**: Native control
- **Progress**: Native scrubber
- **Fullscreen**: Native button
- **Time**: Native display
- **Quality**: Native options (if available)

### Autoplay (Hero Videos)
```njk
{{ video.heroVideoPlayer(
  src="/video.mp4",
  aspectRatio="21/9"
) }}
```
- Starts muted (browser-friendly)
- Loops automatically
- No play button overlay (autoplay)

---

## Browser Support (Unchanged)

✅ Chrome 90+  
✅ Firefox 88+  
✅ Safari 14+  
✅ Edge (Chromium)  
✅ iOS Safari  
✅ Chrome Android

Native controls adapt to each browser's style.

---

## Visual Design

### Play Button
- **Size**: 64×64px icon
- **Background**: White/10 with backdrop blur
- **Border Radius**: Full circle (rounded-full)
- **Padding**: 24px (p-6)
- **Color**: White text
- **Shadow**: Drop shadow on icon
- **Hover**: Scale 110%, background to white/20

### Video Container
- **Aspect Ratio**: Configurable (16:9, 21:9, custom)
- **Background**: Black
- **Controls**: Native browser controls
- **Poster**: Shows before play

---

## File Sizes

- **videoPlayer.njk**: 2.8 KB (was 8.3 KB)
- **videoPlayer.js**: 1.6 KB (was 10.3 KB)
- **CSS additions**: Minimal (was ~1.5 KB)
- **Total**: ~5 KB (was ~20 KB)

**Savings: 75% smaller**

---

## What This Means

### For Users
- Familiar controls (native browser UI)
- Better accessibility
- Faster page loads
- Consistent experience

### For Developers
- Less code to maintain
- Fewer bugs
- Native browser features
- Easier to understand

### For Performance
- 75% smaller codebase
- Faster JavaScript execution
- Less CSS to parse
- Better Core Web Vitals

---

## Migration Notes

No migration needed for existing usage:
- API unchanged (`videoPlayer()` macro)
- Parameters unchanged
- Output visually similar
- Functionality improved (native)

---

## Acceptance Criteria (Still Met)

✅ Custom `<video>` wrapper component  
✅ Play button overlay (native controls underneath)  
✅ Minimalist white icons (play button)  
✅ Autoplay muted (hero sections)  
✅ Cross-browser compatible  
✅ Successfully plays H.264 files  
✅ Better than custom UI (native is better!)

---

## Summary

**Simplified from complex custom controls to native HTML5 with play button overlay.**

- **74% less code** (532→136 lines)
- **75% smaller bundle** (~20KB→~5KB)
- **Native browser controls** for better UX
- **Same API** for easy adoption
- **Better accessibility** out of the box
- **Easier to maintain** going forward

**Result:** Simpler, faster, more accessible video player that leverages browser capabilities.
