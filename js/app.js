(function () {
    'use strict';

    /* Footer year */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Sticky nav background on scroll */
    var nav = document.getElementById('nav');
    function onScroll() {
        if (window.scrollY > 24) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* Mobile menu toggle */
    var toggle = document.getElementById('nav-toggle');
    var links = document.getElementById('nav-links');
    function closeMenu() {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
    }
    if (toggle) {
        toggle.addEventListener('click', function () {
            var open = links.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(open));
        });
    }

    /* Smooth scroll for in-page links */
    document.querySelectorAll('a.smoothscroll').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (!href || href.charAt(0) !== '#') return;
            var target = href === '#top' ? document.body : document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            var top = href === '#top' ? 0 : target.getBoundingClientRect().top + window.scrollY - 64;
            window.scrollTo({ top: top, behavior: 'smooth' });
            closeMenu();
        });
    });

    /* Reveal on scroll */
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        revealEls.forEach(function (el) { el.classList.add('in'); });
    }

    /* Active nav link via scroll-spy */
    var sections = ['about', 'experience', 'skills', 'projects', 'education', 'contact']
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
    var navAnchors = {};
    document.querySelectorAll('.nav-links a').forEach(function (a) {
        var href = a.getAttribute('href');
        if (href && href.charAt(0) === '#') navAnchors[href.slice(1)] = a;
    });
    if ('IntersectionObserver' in window) {
        var spy = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var a = navAnchors[entry.target.id];
                if (!a) return;
                if (entry.isIntersecting) {
                    Object.keys(navAnchors).forEach(function (k) { navAnchors[k].classList.remove('active'); });
                    a.classList.add('active');
                }
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        sections.forEach(function (s) { spy.observe(s); });
    }

    /* Hero rotator */
    var rotator = document.getElementById('rotator');
    if (rotator) {
        var phrases = ['AI data platforms', 'intelligent agents', 'RAG pipelines', 'scalable backends'];
        var i = 0;
        setInterval(function () {
            i = (i + 1) % phrases.length;
            rotator.style.opacity = '0';
            setTimeout(function () {
                rotator.textContent = phrases[i];
                rotator.style.opacity = '1';
            }, 300);
        }, 2600);
    }
})();
