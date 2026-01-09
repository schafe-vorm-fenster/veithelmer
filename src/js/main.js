/**
 * Main JavaScript Entry Point
 * Phase 6.1.1 - Greenfield Eleventy + Tailwind Base
 * 
 * Includes hooks for:
 * - GSAP animations
 * - Ruffle Flash emulation
 * - Video Player (Phase 6.2.3)
 * - Burger Menu
 * - Horizontal Scroll Navigation
 */

// Video Player - Phase 6.2.3
import { initVideoPlayers } from './videoPlayer.js';

// Horizontal Scroll Navigation
import { initHorizontalScrollNav } from './horizontalScrollNav.js';

// Burger Menu
import { initBurgerMenu } from './burgerMenu.js';

// GSAP Hook - Import and initialize when needed
let gsap = null;

export async function initGSAP() {
  if (!gsap) {
    const { gsap: gsapCore } = await import('https://cdn.skypack.dev/gsap');
    gsap = gsapCore;
    console.log('GSAP initialized');
  }
  return gsap;
}

// Ruffle Hook - Initialize Flash emulation for legacy SWF content
let ruffle = null;

export async function initRuffle() {
  if (!ruffle) {
    const { default: RufflePlayer } = await import('https://cdn.skypack.dev/@ruffle-rs/ruffle');
    ruffle = RufflePlayer.newest();
    window.RufflePlayer = ruffle;
    console.log('Ruffle initialized for Flash emulation');
  }
  return ruffle;
}

// Auto-initialize components
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize video players (Phase 6.2.3)
  initVideoPlayers();
  
  // Initialize horizontal scroll navigation
  initHorizontalScrollNav();
  
  // Add scroll shadow to navigation
  const nav = document.getElementById('main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) {
        nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)';
      } else {
        nav.style.boxShadow = 'none';
      }
    });
  }
  
  // Initialize burger menu
  initBurgerMenu();
  
  // Check for Flash/SWF embeds
  const flashElements = document.querySelectorAll('embed[type="application/x-shockwave-flash"], object[type="application/x-shockwave-flash"]');
  
  if (flashElements.length > 0) {
    await initRuffle();
    console.log(`Found ${flashElements.length} Flash element(s), Ruffle ready`);
  }
  
  // Optional: Initialize GSAP for animations
  // Uncomment when animations are needed:
  // await initGSAP();
  // gsap.from('.fade-in', { opacity: 0, duration: 1 });
});

// Export utilities for use in other modules
export { gsap, ruffle };
