/**
 * Burger Menu Component
 * Handles desktop right panel and mobile full-screen menus
 */

export function initBurgerMenu() {
  // Desktop elements
  const burgerBtnDesktop = document.getElementById('burger-btn-desktop');
  const closeBtnDesktop = document.getElementById('close-btn-desktop');
  const burgerMenuDesktop = document.getElementById('burger-menu-desktop');
  
  // Mobile elements
  const burgerBtnMobile = document.getElementById('burger-btn-mobile');
  const closeBtnMobile = document.getElementById('close-btn-mobile');
  const burgerMenuMobile = document.getElementById('burger-menu-mobile');
  
  // Overlay
  const overlay = document.getElementById('menu-overlay');

  // Toggle desktop menu
  function toggleDesktopMenu(open) {
    if (open) {
      burgerMenuDesktop?.classList.remove('translate-x-full');
      overlay?.classList.remove('hidden');
      setTimeout(() => overlay?.classList.add('opacity-100'), 10);
      burgerBtnDesktop?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      burgerMenuDesktop?.classList.add('translate-x-full');
      overlay?.classList.remove('opacity-100');
      setTimeout(() => overlay?.classList.add('hidden'), 300);
      burgerBtnDesktop?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  // Toggle mobile menu
  function toggleMobileMenu(open) {
    if (open) {
      burgerMenuMobile?.classList.remove('translate-x-full');
      burgerBtnMobile?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      burgerMenuMobile?.classList.add('translate-x-full');
      burgerBtnMobile?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  // Event listeners
  burgerBtnDesktop?.addEventListener('click', () => toggleDesktopMenu(true));
  closeBtnDesktop?.addEventListener('click', () => toggleDesktopMenu(false));
  overlay?.addEventListener('click', () => toggleDesktopMenu(false));
  
  burgerBtnMobile?.addEventListener('click', () => toggleMobileMenu(true));
  closeBtnMobile?.addEventListener('click', () => toggleMobileMenu(false));

  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      toggleDesktopMenu(false);
      toggleMobileMenu(false);
    }
  });

  // Close menus when clicking on links
  const menuLinks = document.querySelectorAll('#burger-menu-desktop a, #burger-menu-mobile a');
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDesktopMenu(false);
      toggleMobileMenu(false);
    });
  });

  // Handle window resize - close menus when switching breakpoints
  let isDesktop = window.innerWidth >= 1024;
  window.addEventListener('resize', () => {
    const nowDesktop = window.innerWidth >= 1024;
    if (isDesktop !== nowDesktop) {
      toggleDesktopMenu(false);
      toggleMobileMenu(false);
      isDesktop = nowDesktop;
    }
  });
}
