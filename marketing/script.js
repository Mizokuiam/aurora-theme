document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    document.querySelectorAll('.feature-card, .variant-card, .editor-card, .pricing-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        observer.observe(card);
    });

    // Theme variant preview hover effects
    document.querySelectorAll('.variant-card').forEach(card => {
        const preview = card.querySelector('.preview');
        
        card.addEventListener('mousemove', (e) => {
            const rect = preview.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            preview.style.background = `
                radial-gradient(
                    circle at ${x}px ${y}px,
                    var(--theme-color) 0%,
                    transparent 50%
                )
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            preview.style.background = 'var(--theme-color)';
            preview.style.opacity = '0.1';
        });
    });

    // Pricing toggle animation
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.transition = 'transform 0.3s ease-out';
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('featured')) {
                card.style.transform = 'none';
            } else {
                card.style.transform = 'scale(1.05)';
            }
        });
    });

    // Scroll-based navigation highlight
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Load editor icons
    const editorIcons = {
        vscode: 'data:image/svg+xml,<svg>...</svg>',
        jetbrains: 'data:image/svg+xml,<svg>...</svg>',
        sublime: 'data:image/svg+xml,<svg>...</svg>',
        atom: 'data:image/svg+xml,<svg>...</svg>'
    };

    document.querySelectorAll('.editor-card img').forEach(img => {
        const editor = img.alt.toLowerCase().split(' ')[0];
        if (editorIcons[editor]) {
            img.src = editorIcons[editor];
        }
    });
});
