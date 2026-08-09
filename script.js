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