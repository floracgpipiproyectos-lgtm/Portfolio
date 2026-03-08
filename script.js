/**
 * @fileoverview Portfolio Web Interactivo - Main JavaScript
 * @description Este archivo contiene toda la lógica de interactividad del portfolio,
 * incluyendo efectos visuales, animaciones y manipulación del DOM.
 * 
 * @author Florencia Antonella Caminos Garcia
 * @version 2.0.0
 * @license MIT
 */

/**
 * @namespace Portfolio
 * @description Espacio de nombres principal para todas las funcionalidades del portfolio
 */
const Portfolio = (function() {
    'use strict';

    // ============================================
    // CONSTANTES PRIVADAS
    // ============================================

    /** @constant {number} TYPEWRITER_SPEED - Velocidad de escritura en milisegundos */
    const TYPEWRITER_SPEED = 100;

    /** @constant {number} ERASE_SPEED - Velocidad de borrado en milisegundos */
    const ERASE_SPEED = 50;

    // ============================================
    // FUNCIONES PRIVADAS
    // ============================================

    /**
     * @function typeWriter
     * @description Efecto de máquina de escribir para el título
     * @param {HTMLElement} title - Elemento HTML del título
     * @param {string} text - Texto a escribir
     * @param {number} i - Índice actual
     * @returns {void}
     * @private
     */
    function typeWriter(title, text, i) {
        if (i < text.length) {
            title.textContent += text.charAt(i);
            i++;
            setTimeout(() => typeWriter(title, text, i), TYPEWRITER_SPEED);
        } else {
            // Cuando termina, espera y borra (efecto cíclico)
            setTimeout(() => eraseText(title, text, i), 3000);
        }
    }

    /**
     * @function eraseText
     * @description Efecto de borrado para el título (efecto cíclico)
     * @param {HTMLElement} title - Elemento HTML del título
     * @param {string} text - Texto original
     * @param {number} i - Índice actual
     * @returns {void}
     * @private
     */
    function eraseText(title, text, i) {
        if (i > 0) {
            title.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(() => eraseText(title, text, i), ERASE_SPEED);
        } else {
            setTimeout(() => typeWriter(title, text, 0), 500);
        }
    }

    /**
     * @function initTypeWriter
     * @description Inicializa el efecto typewriter en el elemento h2
     * @returns {void}
     * @private
     */
    function initTypeWriter() {
        const title = document.querySelector('h2');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        
        // Agregar clase para estilizado
        title.classList.add('typewriter');
        
        typeWriter(title, text, 0);
    }

    /**
     * @function initCardHoverEffects
     * @description Inicializa los efectos hover en las tarjetas de proyectos
     * @returns {void}
     * @private
     */
    function initCardHoverEffects() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transition = 'transform 0.3s, box-shadow 0.3s';
                this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.2)';
                this.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
                this.style.transform = 'translateY(0)';
            });
        });
    }

    /**
     * @function initSmoothScroll
     * @description Inicializa el scroll suave para enlaces internos
     * @returns {void}
     * @private
     */
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * @function initIntersectionObserver
     * @description Inicializa el IntersectionObserver para animaciones de entrada
     * @returns {void}
     * @private
     */
    function initIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos con clase .fade-in o secciones
        document.querySelectorAll('section, .project-card').forEach(el => {
            if (!el.style.opacity) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s, transform 0.6s';
                observer.observe(el);
            }
        });
    }

    /**
     * @function initThemeToggle
     * @description Inicializa el botón de cambio de tema
     * @returns {void}
     * @private
     */
    function initThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }

        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            // Update icon
            const icon = this.querySelector('.material-symbols-outlined');
            if (icon) {
                icon.textContent = isDark ? 'light_mode' : 'dark_mode';
            }
        });
    }

    /**
     * @function initNavbarScroll
     * @description Efecto en el navbar al hacer scroll
     * @returns {void}
     * @private
     */
    function initNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '';
            }
        });
    }

    // ============================================
    // API PÚBLICA
    // ============================================

    /**
     * @function init
     * @description Inicializa todas las funcionalidades del portfolio
     * @returns {void}
     * @public
     */
    function init() {
        initTypeWriter();
        initCardHoverEffects();
        initSmoothScroll();
        initIntersectionObserver();
        initThemeToggle();
        initNavbarScroll();
        
        console.log('Portfolio inicializado correctamente');
    }

    // ============================================
    // INICIALIZACIÓN
    // ============================================

    // Inicializar cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // EXPORTAR API PÚBLICA
    // ============================================

    return {
        init: init
    };
})();

// ============================================
// UTILIDADES GLOBALES
// ============================================

/**
 * @function PortfolioUtils
 * @description Utilidades adicionales del portfolio
 * @namespace PortfolioUtils
 */
const PortfolioUtils = {
    /**
     * @function formatDate
     * @description Formatea una fecha según el locale especificado
     * @param {Date} date - Fecha a formatear
     * @param {string} [locale='es-ES'] - Locale para formato
     * @returns {string} Fecha formateada
     */
    formatDate: function(date, locale = 'es-ES') {
        return new Intl.DateTimeFormat(locale, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    },

    /**
     * @function debounce
     * @description Crea una función debounced
     * @param {Function} func - Función a debounce
     * @param {number} wait - Tiempo de espera en ms
     * @returns {Function} Función debounced
     */
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
};

// Exportar para uso global
window.Portfolio = Portfolio;
window.PortfolioUtils = PortfolioUtils;

