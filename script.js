// Menu Mobile Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.style.display = 'none';
    });
});

// Adicionar efeito de scroll suave em links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de animação ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.game-card, .tournament-card, .community-item, .stat-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Botão "Começar Agora" - scroll para games
document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const targetId = this.getAttribute('data-target') || '#games';
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

document.querySelector('.hero .btn-primary').setAttribute('data-target', '#games');

// Estilo dos botões no hover
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Validação do formulário de contato
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff006e';
            } else {
                input.style.borderColor = '';
            }
        });
        
        if (isValid) {
            // Simular envio de mensagem
            const originalText = contactForm.querySelector('.btn').innerText;
            contactForm.querySelector('.btn').innerText = 'Mensagem Enviada! ✓';
            contactForm.querySelector('.btn').style.background = 'linear-gradient(90deg, #00ff00, #00d4ff)';
            
            setTimeout(() => {
                contactForm.reset();
                contactForm.querySelector('.btn').innerText = originalText;
                contactForm.querySelector('.btn').style.background = '';
            }, 3000);
        }
    });
}

// Efeito de brilho ao passar o mouse
document.querySelectorAll('.game-card, .tournament-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', x + 'px');
        card.style.setProperty('--mouse-y', y + 'px');
    });
});

// Contador animado para as estatísticas
const stats = document.querySelectorAll('.stat-number');
const animate = (element, target, duration = 2000) => {
    const start = 0;
    const range = target - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = element.textContent;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

// Observar stats e animar quando visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            const text = entry.target.textContent.replace(/[^0-9]/g, '');
            const target = parseInt(text) || 0;
            
            // Se houver múltiplos números (como "500K+"), pegar apenas o número
            if (target > 0) {
                animate(entry.target, target);
            }
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

// Efeito parallax no hero
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    });
}

// Ripple effect nos botões
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Efeito Glow nos títulos ao scroll
const sections = document.querySelectorAll('.section-title');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - window.innerHeight / 2);
        const glow = Math.max(0, 30 - distance / 10);
        section.style.textShadow = `0 0 ${glow}px var(--primary-color)`;
    });
});

// Log com estilo no console
console.log(
    '%cBem-vindo ao SiteGames! 🎮',
    'font-size: 20px; color: #00d4ff; font-weight: bold; text-shadow: 0 0 10px #00d4ff;'
);
console.log('%cUm site totalmente gamificado para você!', 'color: #ff006e; font-size: 14px;');
