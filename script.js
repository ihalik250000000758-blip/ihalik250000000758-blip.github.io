document.addEventListener('DOMContentLoaded', function () {

  /* =================================================================
     MOBILE NAV — hamburger toggle
  ================================================================= */
  var hamburger = document.getElementById('hamburger');
  var navbar = document.getElementById('navbar');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', function () {
      var isOpen = navbar.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu whenever a link is tapped
    navbar.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navbar.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* =================================================================
     SMOOTH SCROLL for in-page anchors
  ================================================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length < 2) return; // ignore bare "#"
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* =================================================================
     STAR RATING RENDERER
     Reads data-rating (0-5) on .stars elements and fills in
     FontAwesome star icons accordingly.
  ================================================================= */
  document.querySelectorAll('.stars').forEach(function (starEl) {
    var rating = parseInt(starEl.getAttribute('data-rating'), 10) || 0;
    rating = Math.max(0, Math.min(5, rating));
    var html = '';
    for (var i = 0; i < 5; i++) {
      html += i < rating
        ? '<i class="fa-solid fa-star"></i>'
        : '<i class="fa-solid fa-star star-empty"></i>';
    }
    starEl.innerHTML = html;
  });

  /* =================================================================
     CREATURE SPAWNER INFRASTRUCTURE (Skills section)
     ------------------------------------------------------------
     This section is intentionally empty of real assets. To add
     creatures later:

     1. List your assets in CREATURE_ROSTER below, e.g.
          { src: 'assets/creatures/slime.gif', width: 40 }

     2. Call initCreatureSpawner() (already wired up on load).

     Each creature is appended to #creature-layer, which is
     position:absolute across the bottom of the Skills section,
     sits behind the content (z-index below .section-inner) and
     has pointer-events:none — so it can never block, blur, or
     intercept clicks/text no matter how many are added.
  ================================================================= */
  var CREATURE_ROSTER = [
    // { src: 'assets/creatures/example.gif', width: 40, speed: 18 }
  ];

  function initCreatureSpawner() {
    var layer = document.getElementById('creature-layer');
    if (!layer || CREATURE_ROSTER.length === 0) return;

    CREATURE_ROSTER.forEach(function (creature, index) {
      var el = document.createElement('img');
      el.src = creature.src;
      el.className = 'creature';
      el.alt = '';
      el.style.width = (creature.width || 48) + 'px';
      el.style.animationDuration = (creature.speed || 20) + 's';
      el.style.animationDelay = (index * 3) + 's';
      layer.appendChild(el);
    });
  }

  initCreatureSpawner();

  /* =================================================================
     ACTIVE NAV LINK ON SCROLL (nice-to-have polish)
  ================================================================= */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

});