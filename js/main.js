// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initScrollAnimations();
    initSearch();
    initModals();
    initNotifications();
    initScrollTop();
    initForms();
});

// ===== NAVIGATION =====
function initNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.main-header');
    
    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                mobileToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scroll to sections
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const elements = document.querySelectorAll('.card, .project-card, .news-card, .blog-card, .event-card, .feature-card');
    elements.forEach(el => observer.observe(el));
}

// ===== SEARCH FUNCTIONALITY =====
function initSearch() {
    const searchBtn = document.querySelector('.search-btn');
    const searchModal = document.getElementById('searchModal');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Dummy search data
    const searchData = [
        { type: 'Karya', title: 'Digital Art: Sunset Dreams', category: 'art' },
        { type: 'Karya', title: 'Webtoon: The Last Hero', category: 'webtoon' },
        { type: 'Event', title: 'Anime Fest 2024', category: 'event' },
        { type: 'Blog', title: 'Tutorial Shading Digital Art', category: 'tutorial' },
        { type: 'Karya', title: 'Manga: Adventure Time', category: 'manga' },
        { type: 'Event', title: 'Meet Up Jakarta', category: 'event' }
    ];
    
    searchBtn.addEventListener('click', () => {
        searchModal.classList.add('active');
        searchInput.focus();
    });
    
    searchClose.addEventListener('click', () => {
        searchModal.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });
    
    // Close on backdrop click
    searchModal.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.classList.remove('active');
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = searchData.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    });
    
    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: #666;">Tidak ada hasil ditemukan</div>';
            return;
        }
        
        searchResults.innerHTML = results.map(item => `
            <div style="padding: 15px; border-bottom: 1px solid #e5e7eb; cursor: pointer; transition: background 0.2s;" 
                 onmouseover="this.style.background='#f3f4f6'" 
                 onmouseout="this.style.background='white'">
                <div style="font-size: 0.875rem; color: #7fddcc; font-weight: 600; margin-bottom: 5px;">${item.type}</div>
                <div style="font-weight: 600; color: #1f2937;">${item.title}</div>
            </div>
        `).join('');
    }
}

// ===== MODALS =====
function initModals() {
    const loginBtn = document.querySelector('.login-btn');
    const loginModal = document.getElementById('loginModal');
    const loginClose = document.getElementById('loginClose');
    
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', () => {
            loginModal.classList.add('active');
        });
        
        loginClose.addEventListener('click', () => {
            loginModal.classList.remove('active');
        });
        
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                loginModal.classList.remove('active');
            }
        });
    }
}

// ===== NOTIFICATIONS =====
function initNotifications() {
    // Show welcome notification after 2 seconds
    setTimeout(() => {
        showNotification('🎉 Selamat datang di Clover Studio × CloverOtaku!');
    }, 2000);
    
    // Random new artwork notification
    setTimeout(() => {
        showNotification('🎨 Karya baru telah ditambahkan! Cek galeri sekarang.');
    }, 10000);
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationMessage = notification.querySelector('.notification-message');
    const notificationClose = notification.querySelector('.notification-close');
    
    notificationMessage.textContent = message;
    notification.classList.add('active');
    
    // Auto hide after 5 seconds
    const autoHide = setTimeout(() => {
        notification.classList.remove('active');
    }, 5000);
    
    // Manual close
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('active');
        clearTimeout(autoHide);
    });
}

// ===== SCROLL TO TOP =====
function initScrollTop() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== FORMS =====
function initForms() {
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('✅ Pesan Anda telah terkirim! Kami akan segera merespons.');
            contactForm.reset();
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('✅ Terima kasih! Anda telah berlangganan newsletter kami.');
            newsletterForm.reset();
        });
    }
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showNotification('✅ Login berhasil! Selamat datang kembali.');
            document.getElementById('loginModal').classList.remove('active');
            loginForm.reset();
        });
    }
}

// ===== UTILITY FUNCTIONS =====
function debounce(func, wait) {
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

// Export for use in other files
window.showNotification = showNotification;