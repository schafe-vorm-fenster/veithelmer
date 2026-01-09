/**
 * Horizontal Scroll Navigation
 * Adds carousel-style forward/back arrows for mouse users
 * on horizontal scroll containers
 */

export function initHorizontalScrollNav() {
  const containers = document.querySelectorAll('.horizontal-scroll-container');
  
  if (containers.length === 0) return;

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  };

  const hasScrollSupport = () => {
    return CSS.supports('overflow-x', 'auto');
  };

  // Only enable for non-touch devices with scroll support
  if (isTouchDevice() && hasScrollSupport()) {
    return;
  }

  containers.forEach(container => {
    const section = container.closest('section');
    
    if (!section) return;

    // Create buttons with fixed positioning
    const prevBtn = createButton('prev', '←');
    const nextBtn = createButton('next', '→');
    
    // Append buttons to body for fixed positioning
    document.body.appendChild(prevBtn);
    document.body.appendChild(nextBtn);
    
    // Store reference to container on buttons
    prevBtn.dataset.containerId = container.id || `scroll-container-${Math.random().toString(36).substr(2, 9)}`;
    nextBtn.dataset.containerId = prevBtn.dataset.containerId;
    if (!container.id) container.id = prevBtn.dataset.containerId;
    
    // Scroll handler
    const updateButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (isVisible) {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
        prevBtn.disabled = scrollLeft <= 0;
        nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
      } else {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      }
    };
    
    // Scroll by one film tile width (320px + 24px gap)
    const scrollAmount = 344;
    
    prevBtn.addEventListener('click', () => {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', () => {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    container.addEventListener('scroll', updateButtons);
    window.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });
}

function createButton(type, label) {
  const btn = document.createElement('button');
  btn.className = `scroll-nav-btn scroll-nav-btn-${type}`;
  btn.setAttribute('aria-label', type === 'prev' ? 'Previous' : 'Next');
  btn.textContent = label;
  return btn;
}
