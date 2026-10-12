/*==================================================
  MICA — PORTFOLIO
==================================================*/
const SITE = window.SITE || {};

/*=============== SOCIAL LINKS (from data.js) ===============*/
const initSocialLinks = () => {
    const instagramUrl = SITE.instagramUser
        ? `https://www.instagram.com/${encodeURIComponent(SITE.instagramUser.replace(/^@/, ''))}/`
        : '';

    document.querySelectorAll('[data-social="instagram"]').forEach((item) => {
        const link = item.matches('a') ? item : item.querySelector('a');
        if (instagramUrl && link) {
            link.href = instagramUrl;
            item.hidden = false;
        } else {
            item.hidden = true;
        }
    });
};

/*=============== HEADER ===============*/
const header = document.getElementById('header');
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');

const setMenu = (open) => {
    navMenu.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
};

navToggle.addEventListener('click', () => {
    setMenu(navToggle.getAttribute('aria-expanded') !== 'true');
});

navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
        setMenu(false);
        navToggle.focus();
    }
});

const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 16);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/*=============== ACTIVE LINK ===============*/
const navLinks = [...document.querySelectorAll('.nav__link')];

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('is-active', active);
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
        });
    });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

initSocialLinks();
