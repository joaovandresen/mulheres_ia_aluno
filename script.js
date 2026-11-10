document.addEventListener('DOMContentLoaded', () => {
    // 1. ALTERNADOR DE TEMA COM MEMÓRIA DE SESSÃO
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeText = themeToggleBtn.querySelector('.theme-text');
        const currentTheme = localStorage.getItem('theme');

        if (currentTheme === 'light') {
            document.body.classList.add('light-theme');
            if (themeText) themeText.textContent = 'MODO ESCURO';
        }

        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            let theme = 'dark';
            if (document.body.classList.contains('light-theme')) {
                theme = 'light';
                if (themeText) themeText.textContent = 'MODO ESCURO';
            } else {
                if (themeText) themeText.textContent = 'MODO CLARO';
            }
            localStorage.setItem('theme', theme);
        });
    }

    // 2. BARRA DE PROGRESSO DE LEITURA
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // 3. EFEITO MOUSE GLOW & TILT 3D NOS CARDS
    const glowCards = document.querySelectorAll('.glow-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -4;
            const rotateY = ((x - centerX) / centerX) * 4;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // 4. ANIMAÇÃO SCROLL REVEAL SUAVE
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));

    // 5. MODAL DE VISUALIZAÇÃO RÁPIDA (PRÉVIA)
    const btnPrevias = document.querySelectorAll('.btn-previa');
    const btnFecharModais = document.querySelectorAll('.btn-fechar-modal');
    const modalOverlays = document.querySelectorAll('.modal-overlay');

    btnPrevias.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const modalId = btn.getAttribute('data-modal');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
            }
        });
    });

    btnFecharModais.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal-overlay');
            if (modal) modal.classList.remove('active');
        });
    });

    modalOverlays.forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.classList.remove('active');
            }
        });
    });

    // 6. BOTÃO DE COPIAR CITAÇÃO
    const btnCopiar = document.querySelector('.btn-copiar-citacao');
    if (btnCopiar) {
        btnCopiar.addEventListener('click', () => {
            const textoCitacao = document.getElementById('texto-citacao');
            const autor = document.querySelector('.citacao cite');
            
            if (textoCitacao && autor) {
                const textoCompleto = `${textoCitacao.textContent} ${autor.textContent}`;
                navigator.clipboard.writeText(textoCompleto).then(() => {
                    const textoOriginal = btnCopiar.textContent;
                    btnCopiar.textContent = 'Copiado!';
                    btnCopiar.style.borderColor = 'var(--accent-cyan)';
                    
                    setTimeout(() => {
                        btnCopiar.textContent = textoOriginal;
                    }, 2000);
                });
            }
        });
    }
});