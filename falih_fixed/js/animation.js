/**
 * Animation JavaScript File
 * GSAP animations and scroll-triggered effects
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        initGSAPAnimations();
    }
    
    // Initialize floating elements
    initFloatingElements();
    
    // Initialize parallax effects
    initParallax();
    
    // Initialize text reveal animations
    initTextReveal();
    
    // Initialize sakura petals (subtle, only on hero)
    initSakuraPetals();
});

/**
 * GSAP ScrollTrigger Animations
 */
function initGSAPAnimations() {
    // Hero text animation
    const heroTl = gsap.timeline({ delay: 0.5 });
    
    heroTl.from('.greeting-jp', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    })
    .from('.greeting-text', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.title-line', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.title-name', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-description', {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.3')
    .from('.hero-buttons', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.4')
    .from('.hero-stats', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
    }, '-=0.3');

    // Profile image animation
    gsap.from('.profile-container', {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        delay: 0.3,
        ease: 'power3.out'
    });

    // Scroll-triggered animations for sections
    gsap.utils.toArray('.section-tag').forEach(tag => {
        gsap.from(tag, {
            scrollTrigger: {
                trigger: tag,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.6,
            ease: 'power3.out'
        });
    });

    // Parallax for decorations
    gsap.to('.feather-1', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: 100,
        rotation: 15,
        ease: 'none'
    });

    gsap.to('.feather-2', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1
        },
        y: -80,
        rotation: -10,
        ease: 'none'
    });

    // Timeline items animation
    gsap.utils.toArray('.timeline-item').forEach((item, i) => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            x: i % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });

    // Cards stagger animation
    gsap.utils.toArray('.info-card, .skill-card, .experience-card, .research-card, .portfolio-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none none'
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: (i % 3) * 0.1,
            ease: 'power3.out'
        });
    });

    // Footer animation
    gsap.from('.footer', {
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 95%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
}

/**
 * Floating Elements Animation
 */
function initFloatingElements() {
    const feathers = document.querySelectorAll('.floating-feather, .feather-1, .feather-2');
    
    feathers.forEach((feather, index) => {
        const duration = 6 + index * 2;
        const delay = index * 0.5;
        
        gsap.to(feather, {
            y: '+=20',
            rotation: '+=5',
            duration: duration,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: delay
        });
    });
}

/**
 * Parallax Effects
 */
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length === 0) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

/**
 * Text Reveal Animation
 */
function initTextReveal() {
    const textElements = document.querySelectorAll('.text-reveal');
    
    textElements.forEach(el => {
        const text = el.textContent;
        el.innerHTML = '';
        el.classList.add('revealed');
        
        text.split('').forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.transitionDelay = `${i * 0.03}s`;
            el.appendChild(span);
        });
    });
}

/**
 * Sakura Petals (Subtle background effect)
 */
function initSakuraPetals() {
    // Only on hero section and not on reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const petalCount = 5; // Very subtle
    
    for (let i = 0; i < petalCount; i++) {
        createPetal(hero);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    
    // Random properties
    const size = Math.random() * 15 + 10;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 10;
    const delay = Math.random() * 10;
    
    petal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        background: radial-gradient(circle, rgba(255, 183, 197, 0.6) 0%, rgba(255, 183, 197, 0.2) 100%);
        border-radius: 150% 0 150% 0;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;
    
    container.appendChild(petal);
    
    // Remove and recreate after animation
    setTimeout(() => {
        petal.remove();
        createPetal(container);
    }, (duration + delay) * 1000);
}

/**
 * Smooth Scroll with GSAP
 */
function smoothScrollTo(target, duration = 1) {
    if (typeof gsap !== 'undefined') {
        gsap.to(window, {
            duration: duration,
            scrollTo: {
                y: target,
                offsetY: 80
            },
            ease: 'power3.inOut'
        });
    } else {
        // Fallback
        target.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Page Transition Animation
 */
function pageTransition(callback) {
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);
    
    // Animate in
    requestAnimationFrame(() => {
        transition.classList.add('active');
    });
    
    // Execute callback and animate out
    setTimeout(() => {
        if (callback) callback();
        
        setTimeout(() => {
            transition.classList.remove('active');
            setTimeout(() => transition.remove(), 600);
        }, 100);
    }, 600);
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--soft-blue));
        z-index: 10001;
        transition: width 0.1s linear;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollTop / docHeight) * 100;
        progressBar.style.width = `${progress}%`;
    });
}

// Initialize scroll progress
initScrollProgress();