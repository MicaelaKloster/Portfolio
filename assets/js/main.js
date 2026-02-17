/*=============== LOADING SCREEN ===============*/
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1500);
});

/*=============== SCROLL PROGRESS ===============*/
const scrollProgress = document.getElementById('scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    scrollProgress.style.width = scrollPercentage + '%';
});

/*=============== HEADER SCROLL EFFECT ===============*/
const header = document.getElementById('header');

const scrollHeader = () => {
    if (window.scrollY >= 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};
window.addEventListener('scroll', scrollHeader);

/*=============== SHOW/HIDE MENU ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLinks = document.querySelectorAll('.nav__link');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

/*=============== ACTIVE LINK ON SCROLL ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const sectionLink = document.querySelector('.nav__link[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionLink?.classList.add('active-link');
        } else {
            sectionLink?.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);

/*=============== SCROLL UP BUTTON ===============*/
const scrollUp = document.getElementById('scroll-up');

const showScrollUp = () => {
    if (window.scrollY >= 350) {
        scrollUp.classList.add('show-scroll');
    } else {
        scrollUp.classList.remove('show-scroll');
    }
};
window.addEventListener('scroll', showScrollUp);

// Click handler for scroll-up button
if (scrollUp) {
    scrollUp.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/*=============== DARK/LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-line';

// Previously selected theme (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// Check current theme
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line';

// Validate if user previously chose a theme
if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-line' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate theme manually
themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);
    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
});

/*=============== ANIMATED STATISTICS COUNTER ===============*/
const animateCounter = (element, target, duration = 2000) => {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.about__stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const aboutSection = document.querySelector('.about');
if (aboutSection) {
    statsObserver.observe(aboutSection);
}

/*=============== SCROLL REVEAL ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Elements to animate on scroll
const animateElements = document.querySelectorAll(`
    .about__content,
    .about__stats,
    .skills__category,
    .work__card,
    .contact__content,
    .contact__form
`);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

/*=============== CONTACT FORM SUBMISSION ===============*/
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactProject = document.getElementById('contact-project');
const contactMessage = document.getElementById('contact-message');

const sendEmail = (e) => {
    e.preventDefault();

    // Validate fields
    if (!contactName.value || !contactEmail.value || !contactProject.value) {
        showMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactEmail.value)) {
        showMessage('Please enter a valid email address', 'error');
        return;
    }

    // EmailJS configuration
    // Replace these with your actual EmailJS credentials
    emailjs.sendForm(
        'service_mrdcpac',
        'template_cbb877k',
        '#contact-form',
        'muhxO1EMxdGToY0L-'
    ).then(() => {
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        
        // Clear form
        contactName.value = '';
        contactEmail.value = '';
        contactProject.value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            contactMessage.textContent = '';
            contactMessage.className = 'contact__message';
        }, 5000);
    }).catch((error) => {
        showMessage('Oops! Something went wrong. Please try again.', 'error');
        console.error('EmailJS Error:', error);
    });
};

const showMessage = (message, type) => {
    contactMessage.textContent = message;
    contactMessage.className = `contact__message ${type}`;
};

contactForm.addEventListener('submit', sendEmail);

/*=============== SMOOTH SCROLL FOR ANCHOR LINKS ===============*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== PARALLAX EFFECT (OPTIONAL) ===============*/
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const homeImage = document.querySelector('.home__image-wrapper');
    
    if (homeImage && scrolled < window.innerHeight) {
        homeImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

/*=============== TYPING EFFECT FOR HOME SUBTITLE (OPTIONAL - DISABLED) ===============*/
/*
const subtitleElement = document.querySelector('.home__subtitle');
if (subtitleElement) {
    const originalText = subtitleElement.textContent;
    subtitleElement.textContent = '';
    
    let charIndex = 0;
    const typingSpeed = 50;
    
    setTimeout(() => {
        const typeWriter = () => {
            if (charIndex < originalText.length) {
                subtitleElement.textContent += originalText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        };
        typeWriter();
    }, 1000);
}
*/

/*=============== CURSOR TRAIL EFFECT (OPTIONAL - DESKTOP ONLY) ===============*/
if (window.innerWidth > 1024) {
    const coords = { x: 0, y: 0 };
    let mouseMoving = false;
    let timeoutId;
    
    // Create cursor circles if they don't exist
    const cursorContainer = document.createElement('div');
    cursorContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    cursorContainer.className = 'cursor-container';
    
    for (let i = 0; i < 8; i++) {
        const circle = document.createElement('div');
        circle.className = 'cursor-circle';
        circle.style.cssText = `
            position: absolute;
            width: ${6 - i * 0.4}px;
            height: ${6 - i * 0.4}px;
            border-radius: 50%;
            background-color: var(--color-accent);
            opacity: ${0.6 - i * 0.07};
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: opacity 0.2s ease;
        `;
        cursorContainer.appendChild(circle);
    }
    document.body.appendChild(cursorContainer);
    
    const circles = document.querySelectorAll('.cursor-circle');
    
    window.addEventListener('mousemove', (e) => {
        coords.x = e.clientX;
        coords.y = e.clientY;
        
        // Show cursor trail when moving
        if (!mouseMoving) {
            mouseMoving = true;
            cursorContainer.style.opacity = '1';
        }
        
        // Hide after 1 second of no movement
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            mouseMoving = false;
            cursorContainer.style.opacity = '0';
        }, 1000);
    });
    
    function animateCircles() {
        let x = coords.x;
        let y = coords.y;
        
        circles.forEach((circle, index) => {
            circle.style.left = x + 'px';
            circle.style.top = y + 'px';
            circle.style.transform = `translate(-50%, -50%) scale(${(circles.length - index) / circles.length})`;
            
            const nextCircle = circles[index + 1] || circles[0];
            const nextX = parseFloat(nextCircle.style.left) || x;
            const nextY = parseFloat(nextCircle.style.top) || y;
            
            x += (nextX - x) * 0.3;
            y += (nextY - y) * 0.3;
        });
        
        requestAnimationFrame(animateCircles);
    }
    
    animateCircles();
}

/*=============== PERFORMANCE OPTIMIZATION ===============*/
// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// console.log('%c Portfolio loaded successfully! 🚀', 'color: #0066FF; font-size: 16px; font-weight: bold;');