/**
 * Video Player Component
 * Phase 6.2.3: Native HTML5 Video Player
 * 
 * Simple video player with play button overlay
 * - Big play button on poster image
 * - Hides overlay when video plays
 * - Uses native browser controls
 * 
 * Browser support: Chrome, Firefox, Safari (desktop/mobile)
 */

class VideoPlayer {
  constructor(container) {
    this.container = container;
    this.video = container.querySelector('[data-video-element]');
    this.playOverlay = container.querySelector('[data-play-overlay]');
    
    if (!this.video || !this.playOverlay) return;
    
    this.init();
  }
  
  init() {
    // Hide overlay when video plays
    this.video.addEventListener('play', () => {
      this.playOverlay.style.opacity = '0';
      this.playOverlay.style.pointerEvents = 'none';
    });
    
    // Show overlay when video ends or is paused (optional)
    this.video.addEventListener('ended', () => {
      this.playOverlay.style.opacity = '1';
      this.playOverlay.style.pointerEvents = 'auto';
    });
    
    // Play button click
    this.playOverlay.addEventListener('click', () => {
      this.video.play();
    });
  }
}

// Initialize all video players on page load
function initVideoPlayers() {
  const players = document.querySelectorAll('[data-video-player]');
  players.forEach(player => new VideoPlayer(player));
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initVideoPlayers);
} else {
  initVideoPlayers();
}

// Export for manual initialization
export { VideoPlayer, initVideoPlayers };
