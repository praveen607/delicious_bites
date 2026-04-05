const nav = document.getElementById('mainNav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    // Hamburger toggle + collapse (custom)
    const toggler = document.getElementById('navToggler');
    const navCollapse = document.getElementById('navbarNav');

    toggler.addEventListener('click', () => {
      toggler.classList.toggle('active');
      navCollapse.classList.toggle('show');
    });

    // Close on link click (mobile)
    document.querySelectorAll('.navbar .nav-link').forEach(a => {
      a.addEventListener('click', () => {
        toggler.classList.remove('active');
        navCollapse.classList.remove('show');
      });
    });

    // Smooth scroll (JS) with correct offset for fixed navbar
    // (This ensures smooth scroll works even in browsers where CSS behavior is inconsistent.)
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        const target = document.querySelector(href);
        if(!target) return;

        e.preventDefault();

        const navOffset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-offset')) || 78;
        const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

        window.scrollTo({ top, behavior: 'smooth' });
      });
    });

    // Active link on scroll
    const sections = [...document.querySelectorAll('header.hero, section')];
    const links = [...document.querySelectorAll('.navbar .nav-link')];

    function setActiveLink(){
      const y = window.scrollY + 140;
      let id = 'home';
      for (const s of sections){
        if (s.offsetTop <= y) id = s.id || 'home';
      }
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
    }
    window.addEventListener('scroll', setActiveLink);
    setActiveLink();

    // Reveal on scroll
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) en.target.classList.add('in');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));

    // Menu filter
    const filterBtns = document.querySelectorAll('.menu-filter button');
    const items = document.querySelectorAll('.menu-item');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.dataset.category;
        items.forEach(it => {
          const show = (cat === 'all') || (it.dataset.category === cat);
          it.classList.toggle('hide', !show);
        });
      });
    });

    // Lightbox for gallery
    function openLightbox(src){
      const lb = document.createElement('div');
      lb.style.cssText = `
        position:fixed; inset:0; background:rgba(0,0,0,.88);
        display:grid; place-items:center; z-index:9999; padding:18px;
        animation:lbFade .2s ease;
      `;
      lb.innerHTML = `
        <div style="max-width:1000px; width:100%; position:relative;">
          <img src="${src}" style="width:100%; border-radius:14px; box-shadow:0 20px 60px rgba(0,0,0,.55); animation:lbZoom .2s ease;">
          <button aria-label="Close" style="
            position:absolute; top:-10px; right:-10px; width:44px; height:44px;
            border:0; border-radius:999px; background:var(--primary); color:#111;
            font-weight:900; box-shadow:0 10px 25px rgba(0,0,0,.35);
          ">×</button>
        </div>
      `;
      const close = () => lb.remove();
      lb.addEventListener('click', (e) => { if(e.target === lb) close(); });
      lb.querySelector('button').addEventListener('click', close);
      document.body.appendChild(lb);
    }
    document.querySelectorAll('.gallery-item').forEach(g => {
      g.addEventListener('click', () => openLightbox(g.dataset.full || g.querySelector('img').src));
    });

    // Scroll to top
    const toTop = document.getElementById('toTop');
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('show', window.scrollY > 350);
    });
    toTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

    // Reservation form
    document.getElementById('reservationForm').addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Reservation request sent! We will contact you to confirm.');
      e.target.reset();
    });

    // Lightbox animations
    const animStyle = document.createElement('style');
    animStyle.textContent = `
      @keyframes lbFade{from{opacity:0}to{opacity:1}}
      @keyframes lbZoom{from{transform:scale(.96)}to{transform:scale(1)}}
    `;
    document.head.appendChild(animStyle);