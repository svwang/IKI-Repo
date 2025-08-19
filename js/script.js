// Toggle desktop dropdowns - bekerja untuk klik dan hover
function toggleDropdown(button) {
  const panel = button.parentElement.querySelector('.dropdown-panel');
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  // Tutup semua dropdown lainnya
  if (!isExpanded) {
    document.querySelectorAll('.dropdown-panel').forEach(p => {
      if (p !== panel) {
        p.classList.add('invisible', 'opacity-0');
      }
    });
    document.querySelectorAll('.dropdown-trigger').forEach(btn => {
      if (btn !== button) {
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('i').classList.remove('rotate-180');
      }
    });
  }
  
  button.setAttribute('aria-expanded', !isExpanded);
  const icon = button.querySelector('i');
  icon.classList.toggle('rotate-180');
  
  if (isExpanded) {
    panel.classList.add('invisible', 'opacity-0');
  } else {
    panel.classList.remove('invisible', 'opacity-0');
  }
}

// Toggle mobile dropdowns
function toggleMobileDropdown(button) {
  const panel = button.nextElementSibling;
  const isExpanded = button.getAttribute('aria-expanded') === 'true';
  
  button.setAttribute('aria-expanded', !isExpanded);
  const icon = button.querySelector('i');
  icon.classList.toggle('rotate-180');
  
  if (isExpanded) {
    panel.classList.add('hidden');
  } else {
    panel.classList.remove('hidden');
  }
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen')
    const mainContent = document.getElementById('main-contents')

    loadingScreen.style.opacity = '0'

    setTimeout(() => {
      loadingScreen.style.display = 'none'
      mainContent.style.display = 'block'
    }, 500)
  }, 3000)

  const nav = document.querySelector('nav');
  let lastScroll = 0;
  
  // Add necessary classes
  nav.classList.add('fixed', 'top-0', 'left-0', 'right-0', 'transition-all', 'duration-300');
  
  // Initial state - transparent with white text
  nav.style.backgroundColor = 'transparent';
  nav.style.boxShadow = 'none';
  
  // Function to update navbar colors
  function updateNavColors(isTransparent) {
    if (isTransparent) {
      if (window.innerWidth >= 1024) { // lg breakpoint
        nav.querySelectorAll('a:not(.dropdown-panel a), button:not(.dropdown-panel button), span:not(.dropdown-panel span), i:not(.dropdown-panel i)').forEach(el => {
          el.style.color = 'white';
        });
      }
      
      // Logo dan teks perusahaan
      nav.querySelector('.text-blue-900').style.color = 'white';
      nav.querySelector('.text-gray-600').style.color = 'rgba(255,255,255,0.8)';
      
      // Ikon hamburger
      document.getElementById('menu-btn').querySelector('i').style.color = 'white';
    } else {
      // Navbar solid - teks default
      nav.querySelectorAll('a, button, span, i').forEach(el => {
        el.style.color = '';
      });
      
      // Kembalikan warna asli logo dan teks perusahaan
      nav.querySelector('.text-blue-900').style.color = '';
      nav.querySelector('.text-gray-600').style.color = '';
    }
  }

  // Set initial state
  updateNavColors(true);

  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    const scrollThreshold = 10;
    
    if (currentScroll <= scrollThreshold) {
      // At top of page - transparent with white text
      nav.style.backgroundColor = 'transparent';
      nav.style.boxShadow = 'none';
      updateNavColors(true);
      nav.style.transform = 'translateY(0)';
    } else {
      // When scrolled - white background with default text colors
      nav.style.backgroundColor = 'white';
      nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      updateNavColors(false);
      
      // Hide/show logic
      if (currentScroll > lastScroll && currentScroll > nav.offsetHeight) {
        // Scrolling down - hide navbar
        nav.style.transform = 'translateY(-100%)';
      } else if (currentScroll < lastScroll) {
        // Scrolling up - show navbar
        nav.style.transform = 'translateY(0)';
      }
    }
    
    lastScroll = currentScroll;
  });

  // Mobile menu toggle (existing code)
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true" || false;
    btn.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("hidden");
    
    // Change icon
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close dropdowns when clicking outside (existing code)
  document.addEventListener('click', (e) => {
    // Untuk desktop
    if (!e.target.closest('[data-dd]')) {
      document.querySelectorAll('.dropdown-panel').forEach(panel => {
        panel.classList.add('invisible', 'opacity-0');
      });
      document.querySelectorAll('.dropdown-trigger').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('i').classList.remove('rotate-180');
      });
    }
    
    // Untuk mobile
    if (!e.target.closest('.dropdown-trigger-mobile')) {
      document.querySelectorAll('.dropdown-panel-mobile').forEach(panel => {
        panel.classList.add('hidden');
      });
      document.querySelectorAll('.dropdown-trigger-mobile').forEach(btn => {
        btn.setAttribute('aria-expanded', 'false');
        btn.querySelector('i').classList.remove('rotate-180');
      });
    }
  });
});

// Inisialisasi AOS (jika digunakan)
if (typeof AOS !== 'undefined') {
  AOS.init();
}


// 1. Fix background image change functionality
  const background = document.getElementById('projectBackground');
  const projectCards = document.querySelectorAll('.project-card');
  
  // Set first card's image as default background
  if (projectCards.length > 0) {
    const firstBg = projectCards[0].getAttribute('data-bg');
    background.src = firstBg;
  }
  
  // Add hover and click events for all cards
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      const newBg = this.getAttribute('data-bg');
      background.src = newBg;
    });
    
    card.addEventListener('click', function(e) {
      e.preventDefault();
      const newBg = this.getAttribute('data-bg');
      background.src = newBg;
      // Optional: Add active state to clicked card
      projectCards.forEach(c => c.classList.remove('ring-2', 'ring-blue-500'));
      this.classList.add('ring-2', 'ring-blue-500');
    });
  });

  // 2. Fix arrow buttons functionality
  const scrollContainer = document.getElementById('projectCards');
  const scrollLeftBtn = document.getElementById('scrollProjectLeft');
  const scrollRightBtn = document.getElementById('scrollProjectRight');
  
  if (scrollLeftBtn && scrollRightBtn) {
    scrollLeftBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    });
    
    scrollRightBtn.addEventListener('click', function() {
      scrollContainer.scrollBy({
        left: 300, 
        behavior: 'smooth'
      });
    });
  }