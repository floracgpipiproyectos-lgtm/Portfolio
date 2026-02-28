document.addEventListener('DOMContentLoaded', function() {

    // 1. EFECTO CORAZÓN - Versión mejorada
    const heart = document.querySelector('.favorite-icon');

    if (heart) {
        heart.addEventListener('click', function() {
            // Alternar entre colores
            const currentColor = heart.style.color;
            heart.style.color = currentColor === 'red' ? '#ff6b6b' : 'red';

            // Añadir efecto de rebote extra
            heart.style.transform = 'scale(1.5)';
            setTimeout(() => {
                heart.style.transform = 'scale(1)';
            }, 200);

            // Crear mini-corazones (efecto especial)
            createFloatingHearts(heart);
        });
    }

    // 2. EFECTO ESCRITURA - Separado y mejorado
    function initTypeWriter() {
        const title = document.querySelector('h2');
        if (!title) return;

        const text = title.textContent;
        title.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Velocidad de escritura
            } else {
                // Cuando termina, espera 2 segundos y borra (opcional)
                setTimeout(eraseText, 2000);
            }
        }

        // Función para borrar el texto (opcional - para efecto cíclico)
        function eraseText() {
            if (i > 0) {
                title.textContent = text.substring(0, i - 1);
                i--;
                setTimeout(eraseText, 50);
            } else {
                setTimeout(typeWriter, 500);
            }
        }

        typeWriter();
    }

    // 3. FUNCIÓN ADICIONAL: Mini-corazones flotantes
    function createFloatingHearts(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#ff6b6b', '#ff4757', '#ff3838', '#ff5252'];

        for (let i = 0; i < 5; i++) {
            const miniHeart = document.createElement('span');
            miniHeart.innerHTML = '❤️';
            miniHeart.style.position = 'fixed';
            miniHeart.style.left = rect.left + rect.width / 2 + 'px';
            miniHeart.style.top = rect.top + rect.height / 2 + 'px';
            miniHeart.style.fontSize = '20px';
            miniHeart.style.color = colors[Math.floor(Math.random() * colors.length)];
            miniHeart.style.pointerEvents = 'none';
            miniHeart.style.zIndex = '1000';
            miniHeart.style.transition = 'all 1s ease-out';

            document.body.appendChild(miniHeart);

            // Animación aleatoria
            setTimeout(() => {
                miniHeart.style.transform = `translate(${Math.random() * 100 - 50}px, ${-100 - Math.random() * 50}px) rotate(${Math.random() * 360}deg)`;
                miniHeart.style.opacity = '0';
            }, 10);

            // Eliminar del DOM
            setTimeout(() => {
                document.body.removeChild(miniHeart);
            }, 1000);
        }
    }

    // 4. EFECTO DE HOVER SUAVE EN TARJETAS
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s, box-shadow 0.3s';
            this.style.boxShadow = '0 15px 30px rgba(102, 126, 234, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // 5. INICIAR EFECTOS
    initTypeWriter();

    // 6. EFECTO DE SCROLL SUAVE
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

    // 7. DETECTAR CUANDO LOS ELEMENTOS ENTRAN EN PANTALLA (opcional)
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

    // Observar elementos con clase .fade-in
    document.querySelectorAll('.project-card, .social-link').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });

});

// FUNCIÓN DE UTILIDAD: Para debugear
function logMessage(message) {
    console.log('Portfolio:', message);
}