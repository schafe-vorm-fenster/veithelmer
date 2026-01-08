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
    const wrapper = container.parentElement;
    const section = wrapper.closest('section');
    
    if (!section) return;

    // Create nav container
    const navContainer = document.createElement('div');
    navContainer.className = 'scroll-nav-arrows';
    
    // Create buttons
    const prevBtn = createButton('prev', '←');
    const nextBtn = createButton('next', '→');
    
    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);
    
    // Insert nav before the scroll container
    section.insertBefore(navContainer, wrapper);
    
    // Scroll handler
    const updateButtons = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      prevBtn.disabled = scrollLeft <= 0;
      nextBtn.disabled = scrollLeft + clientWidth >= scrollWidth - 1;
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
