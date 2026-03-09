/**
 * @fileoverview Portfolio Web Interactivo - Main JavaScript
 * @description Este archivo contiene toda la lógica de interactividad del portfolio,
 * incluyendo el carrusel de proyectos, efectos visuales y animaciones.
 * 
 * @author Florencia Antonella Caminos Garcia
 * @version 3.0.0
 * @license MIT
 */

const Portfolio = (function() {
    'use strict';

    // State
    let currentSlide = 0;
    let totalSlides = 0;
    let track = null;
    let indicators = null;

    // ============================================
    // CAROUSEL FUNCTIONS
    // ============================================

    function initCarousel() {
        track = document.getElementById('projectsTrack');
        indicators = document.querySelectorAll('.indicator');
        
        if (!track) return;
        
        const slides = track.querySelectorAll('.project-slide');
        totalSlides = slides.length;
        
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => navigateSlide(-1));
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => navigateSlide(1));
        }
        
        // Initialize indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => goToSlide(index));
        });
        
        updateCarousel();
    }

    function navigateSlide(direction) {
        currentSlide += direction;
        
        if (currentSlide < 0) {
            currentSlide = totalSlides - 1;
        } else if (currentSlide >= totalSlides) {
            currentSlide = 0;
        }
        
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function updateCarousel() {
        if (!track) return;
        
        // Move track
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update buttons
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        
        if (prevBtn) prevBtn.disabled = false;
        if (nextBtn) nextBtn.disabled = false;
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================

    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                        const toggler = document.querySelector('.navbar-toggler');
                        if (toggler) {
                            toggler.click();
                        }
                    }
                }
            });
        });
    }

    // ============================================
    // THEME TOGGLE
    // ============================================

    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
        });
    }

    // ============================================
    // INTERSECTION OBSERVER
    // ============================================

    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -30px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe sections and cards
        document.querySelectorAll('section, .project-card, .activity-item').forEach(el => {
            observer.observe(el);
        });
    }

    // ============================================
    // NAVBAR EFFECTS
    // ============================================

    function initNavbarEffects() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '';
            }
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================

    function initKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Only navigate if not typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
            
            if (e.key === 'ArrowLeft') {
                navigateSlide(-1);
            } else if (e.key === 'ArrowRight') {
                navigateSlide(1);
            }
        });
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        initCarousel();
        initSmoothScroll();
        initThemeToggle();
        initIntersectionObserver();
        initNavbarEffects();
        initKeyboardNavigation();
        
        console.log('Portfolio initialized successfully');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        init: init,
        navigateSlide: navigateSlide,
        goToSlide: goToSlide
    };
})();

// Global utilities
window.Portfolio = Portfolio;

