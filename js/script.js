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

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  btn.addEventListener("click", () => {
    const expanded = btn.getAttribute("aria-expanded") === "true" || false;
    btn.setAttribute("aria-expanded", !expanded);
    menu.classList.toggle("hidden");
    
    // Ganti ikon
    const icon = btn.querySelector('i');
    if (icon.classList.contains('fa-bars')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Close dropdowns when clicking outside
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