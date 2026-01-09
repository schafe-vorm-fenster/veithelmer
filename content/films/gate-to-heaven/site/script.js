// Gate to Heaven Microsite JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const galleryImages = document.querySelectorAll('.gallery-grid img');
    
    if (galleryImages.length > 0 && lightbox) {
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                lightboxImg.src = this.src;
                lightbox.classList.add('active');
            });
        });
        
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                lightbox.classList.remove('active');
            }
        });
        
        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                lightbox.classList.remove('active');
            }
        });
    }
    
    // Highlight active nav item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        }
    });
    
    // Smooth scroll for content
    const contentBox = document.querySelector('.content-box');
    if (contentBox) {
        // Add scroll arrows if needed
        const scrollUp = document.createElement('div');
        const scrollDown = document.createElement('div');
        scrollUp.className = 'scroll-arrow scroll-up';
        scrollDown.className = 'scroll-arrow scroll-down';
        scrollUp.innerHTML = '▲';
        scrollDown.innerHTML = '▼';
        
        contentBox.parentNode.style.position = 'relative';
    }
});

// Sound toggle (placeholder for potential future audio)
let soundEnabled = false;

function toggleSound() {
    soundEnabled = !soundEnabled;
    const btn = document.querySelector('.sound-toggle');
    if (btn) {
        btn.textContent = soundEnabled ? 'SOUND ON' : 'SOUND OFF';
    }
}
