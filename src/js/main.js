/**
 * Main JavaScript Entry Point
 * Phase 6.1.1 - Greenfield Eleventy + Tailwind Base
 * 
 * Includes hooks for:
 * - GSAP animations
 * - Ruffle Flash emulation
 */

// GSAP Hook - Import and initialize when needed
let gsap = null;

export async function initGSAP() {
  if (!gsap) {
    const { gsap: gsapCore } = await import('gsap');
    gsap = gsapCore;
    console.log('GSAP initialized');
  }
  return gsap;
}

// Ruffle Hook - Initialize Flash emulation for legacy SWF content
let ruffle = null;

export async function initRuffle() {
  if (!ruffle) {
    const { default: RufflePlayer } = await import('@ruffle-rs/ruffle');
    ruffle = RufflePlayer.newest();
    window.RufflePlayer = ruffle;
    console.log('Ruffle initialized for Flash emulation');
  }
  return ruffle;
}

// Auto-initialize Ruffle for any embedded Flash content
document.addEventListener('DOMContentLoaded', async () => {
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
