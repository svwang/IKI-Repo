const btn = document.getElementById("menu-btn");
    const menu = document.getElementById("mobile-menu");

    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true" || false;
      btn.setAttribute("aria-expanded", !expanded);
      menu.classList.toggle("hidden");
    });

    document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('nav');
  if (!nav) return;
  const items = nav.querySelectorAll('li[data-dd]');

  const openDelay = 120;   // ms sebelum membuka
  const closeDelay = 220;  // ms sebelum menutup

  items.forEach(item => {
    const trigger = item.querySelector('.dropdown-trigger');
    const panel = item.querySelector('.dropdown-panel');
    let openTimer = null;
    let closeTimer = null;

    const open = () => {
      clearTimeout(closeTimer);
      // tutup item lain segera
      items.forEach(i => {
        if (i !== item) {
          i.classList.remove('is-open');
          const b = i.querySelector('.dropdown-trigger');
          if (b) b.setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.add('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'true');
    };

    const close = () => {
      item.classList.remove('is-open');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    };

    // Buka ketika kursor masuk ke trigger atau panel (dengan delay kecil)
    [trigger, panel].forEach(el => {
      if (!el) return;
      el.addEventListener('mouseenter', () => {
        clearTimeout(closeTimer);
        clearTimeout(openTimer);
        openTimer = setTimeout(open, openDelay);
      });
      el.addEventListener('mouseleave', () => {
        clearTimeout(openTimer);
        closeTimer = setTimeout(() => {
          // hanya tutup jika kursor tidak berada di trigger/panel lainnya
          // (handler lain akan clearTimeout jika masuk lagi)
          close();
        }, closeDelay);
      });
    });

    // Toggle on click untuk mobile
    if (trigger) {
      trigger.addEventListener('click', (e) => {
        if (window.innerWidth < 768) {
          e.preventDefault();
          const nowOpen = item.classList.toggle('is-open');
          trigger.setAttribute('aria-expanded', nowOpen ? 'true' : 'false');
        }
      });
    }
  });

  // Klik di luar nav -> tutup semua
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      items.forEach(i => i.classList.remove('is-open'));
      items.forEach(i => {
        const b = i.querySelector('.dropdown-trigger');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // Resize: tutup semua saat lebar berubah ke desktop/mobile
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      items.forEach(i => i.classList.remove('is-open'));
    }
  });
  AOS.init();
});