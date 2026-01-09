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

  containers.forEach((container, index) => {
    const section = container.closest('section');
    
    if (!section) return;

    // Give container a unique ID if it doesn't have one
    if (!container.id) {
      container.id = `scroll-container-${index}`;
    }

    // Create wrapper for relative positioning
    const navWrapper = document.createElement('div');
    navWrapper.className = 'scroll-nav-wrapper';
    navWrapper.style.position = 'relative';
    
    // Create buttons
    const prevBtn = createButton('prev', '←', container.id);
    const nextBtn = createButton('next', '→', container.id);
    
    // Insert wrapper around container
    container.parentNode.insertBefore(navWrapper, container);
    navWrapper.appendChild(container);
    navWrapper.appendChild(prevBtn);
    navWrapper.appendChild(nextBtn);
    
    // Scroll handler
    const updateButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      
      prevBtn.disabled = scrollLeft <= 0;
      nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
      
      // Hide buttons if no overflow
      if (scrollWidth <= clientWidth) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
      } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
      }
    };
    
    // Scroll by one film tile width (320px + 24px gap)
    const scrollAmount = 344;
    
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    
    container.addEventListener('scroll', updateButtons);
    window.addEventListener('resize', updateButtons);
    updateButtons();
  });
}

function createButton(type, label, containerId) {
  const btn = document.createElement('button');
  btn.className = `scroll-nav-btn scroll-nav-btn-${type}`;
  btn.setAttribute('aria-label', type === 'prev' ? 'Previous' : 'Next');
  btn.dataset.containerId = containerId;
  btn.textContent = label;
  return btn;
}
