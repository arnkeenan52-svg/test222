/* FadeClipper — interactions */
(function () {
  'use strict';

  /* year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* sticky nav background on scroll */
  var navwrap = document.getElementById('navwrap');
  var onScroll = function () {
    if (navwrap) navwrap.classList.toggle('scrolled', window.scrollY > 12);
    var bar = document.getElementById('buybar');
    if (bar) bar.classList.toggle('show', window.scrollY > 640);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.getElementById('mobileMenu');
  if (toggle && menu) {
    var setMenu = function (open) {
      menu.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    toggle.addEventListener('click', function () {
      setMenu(!menu.classList.contains('open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
  }

  /* scroll reveal */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el, i) {
      // small stagger for groups
      el.style.transitionDelay = (Math.min(i % 4, 3) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* single-open FAQ (nice-to-have) */
  var faqs = document.querySelectorAll('.faq details');
  faqs.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) {
        faqs.forEach(function (o) { if (o !== d) o.open = false; });
      }
    });
  });

  /* checkout button placeholder — wire to your real checkout URL */
  var checkout = document.getElementById('checkoutBtn');
  if (checkout) {
    checkout.addEventListener('click', function (ev) {
      if (checkout.getAttribute('href') === '#') {
        ev.preventDefault();
        alert('Connect this button to your checkout / Shopify / Stripe link in index.html (id="checkoutBtn").');
      }
    });
  }
})();
