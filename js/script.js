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

// berita
const container = document.getElementById('newsContainer');
const btnLeft = document.getElementById('scrollLeft');
const btnRight = document.getElementById('scrollRight');

// Show buttons on md+ screens
function toggleButtons() {
  if (window.innerWidth >= 640) {
    btnLeft.classList.remove('hidden');
    btnRight.classList.remove('hidden');
  } else {
    btnLeft.classList.add('hidden');
    btnRight.classList.add('hidden');
  }
}
toggleButtons();
window.addEventListener('resize', toggleButtons);

btnLeft.addEventListener('click', () => {
  container.scrollBy({ left: -300, behavior: 'smooth' });
});

btnRight.addEventListener('click', () => {
  container.scrollBy({ left: 300, behavior: 'smooth' });
});

// Optional: allow keyboard arrow keys to scroll the container when focused
container.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  } else if (e.key === 'ArrowLeft') {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  }
});


// project
const cards = document.querySelectorAll('.project-card');
    const background = document.getElementById('projectBackground');
    const scrollContainer = document.getElementById('projectCards');
    
    // Set first card as active initially
    cards[0].classList.add('ring-4', 'ring-blue-500');
    
    // Hover effects
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const bgImage = card.getAttribute('data-bg');
        background.src = bgImage;
      });
      
      card.addEventListener('click', (e) => {
        e.preventDefault();
        cards.forEach(c => c.classList.remove('ring-4', 'ring-blue-500'));
        card.classList.add('ring-4', 'ring-blue-500');
        const bgImage = card.getAttribute('data-bg');
        background.src = bgImage;
        // You can add navigation logic here
        window.location.href = card.getAttribute('href');
      });
    });
    
    // Scroll buttons
    document.getElementById('scrollProjectLeft').addEventListener('click', () => {
      scrollContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    document.getElementById('scrollProjectRight').addEventListener('click', () => {
      scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });