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

/*=============== PROJECTS (from data.js) ===============*/
const escapeHtml = (value = '') => String(value).replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[ch]));

const PROJECT_IMG = './assets/img/projects/';
const arrowIcon = '<svg class="icon" aria-hidden="true"><use href="#i-arrow-up-right"/></svg>';

const stackList = (stack = []) => (stack.length
    ? `<ul class="tags" aria-label="Stack">${stack.map((s) => `<li class="tag">${escapeHtml(s)}</li>`).join('')}</ul>`
    : '');

const featuredCard = (p) => `
    <article class="project">
        <div class="project__media">
            ${p.image ? `<img
                src="${PROJECT_IMG}${p.image}-960.webp"
                srcset="${PROJECT_IMG}${p.image}-640.webp 640w, ${PROJECT_IMG}${p.image}-960.webp 960w"
                sizes="(min-width: 960px) 580px, 92vw"
                width="960" height="540"
                alt="Preview of ${escapeHtml(p.title)}"
                loading="lazy" decoding="async">` : ''}
        </div>
        <div class="project__body">
            <span class="project__category eyebrow eyebrow--plain">${escapeHtml(p.category)}</span>
            <h3 class="project__title">
                <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="project__link">${escapeHtml(p.title)}</a>
            </h3>
            ${p.description ? `<p class="project__description">${escapeHtml(p.description)}</p>` : ''}
            ${stackList(p.stack)}
            <span class="project__cta" aria-hidden="true">${escapeHtml(p.linkLabel || 'View Project')} ${arrowIcon}</span>
        </div>
    </article>`;

const listRow = (p, index) => `
    <li class="row">
        <a href="${escapeHtml(p.url)}" target="_blank" rel="noopener noreferrer" class="row__link">
            <span class="row__index mono" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span>
            <span class="row__main">
                <span class="row__title">${escapeHtml(p.title)}</span>
                ${p.description || p.stack?.length
                    ? `<span class="row__meta">${escapeHtml(p.stack?.length ? p.stack.join(' · ') : p.description)}</span>`
                    : ''}
            </span>
            <span class="row__category mono">${escapeHtml(p.category)}</span>
            <span class="row__arrow">${arrowIcon}<span class="visually-hidden">${escapeHtml(p.linkLabel || 'View Project')} (opens in a new tab)</span></span>
        </a>
    </li>`;

const renderProjects = () => {
    const projects = window.PROJECTS || [];
    const featuredEl = document.getElementById('work-featured');
    const listEl = document.getElementById('work-list');
    if (!featuredEl || !listEl) return;

    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);

    featuredEl.innerHTML = featured.map(featuredCard).join('');
    listEl.innerHTML = rest.map(listRow).join('');
    listEl.closest('.work__more').hidden = rest.length === 0;
};

/*=============== STATS COUNTERS ===============*/
/* The final value is already in the HTML, so numbers are never stuck at 0
   (no JS, slow JS or reduced motion all show the real figure). */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const animateCount = (el) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    if (!Number.isFinite(target) || reduceMotion.matches) return;

    const duration = 900;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        el.textContent = `${Math.round(target * ease(t))}${suffix}`;
        if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};

const initCounters = () => {
    const counters = document.querySelectorAll('[data-count]');
    if (!('IntersectionObserver' in window)) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            animateCount(entry.target);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.6 });

    counters.forEach((el) => counterObserver.observe(el));
};

/*=============== CONTACT FORM (EmailJS) ===============*/
const EMAILJS = {
    serviceId: 'service_mrdcpac',
    templateId: 'template_cbb877k',
    publicKey: 'muhxO1EMxdGToY0L-',
};

const initContactForm = () => {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const message = document.getElementById('contact-message');
    const submit = form.querySelector('.form__submit');
    const submitLabel = form.querySelector('.form__submit-label');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const showMessage = (text, type) => {
        message.textContent = text;
        message.className = `form__message is-${type}`;
    };

    const setSending = (sending) => {
        submit.disabled = sending;
        submitLabel.textContent = sending ? 'Sending…' : 'Send Message';
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fields = [...form.querySelectorAll('.form__input')];
        fields.forEach((f) => f.removeAttribute('aria-invalid'));

        const empty = fields.filter((f) => !f.value.trim());
        if (empty.length) {
            empty.forEach((f) => f.setAttribute('aria-invalid', 'true'));
            empty[0].focus();
            showMessage('Please fill in all fields', 'error');
            return;
        }

        const email = form.elements.user_email;
        if (!emailRegex.test(email.value.trim())) {
            email.setAttribute('aria-invalid', 'true');
            email.focus();
            showMessage('Please enter a valid email address', 'error');
            return;
        }

        if (!window.emailjs) {
            showMessage('The form could not load. Please email me directly at micaela.klosterquintana@gmail.com', 'error');
            return;
        }

        setSending(true);
        try {
            await window.emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, form, {
                publicKey: EMAILJS.publicKey,
            });
            showMessage("Message sent successfully! I'll get back to you soon.", 'success');
            form.reset();
        } catch (error) {
            showMessage('Oops! Something went wrong. Please try again.', 'error');
            console.error('EmailJS error:', error);
        } finally {
            setSending(false);
        }
    });
};

initSocialLinks();
renderProjects();
initCounters();
initContactForm();
