// ===== SLIDER INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
});

function initSlider() {
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const dotsContainer = document.querySelector('.slider-dots');
    
    if (!sliderWrapper || slides.length === 0) return;
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    
    // Create dots
    createDots();
    
    // Initialize first slide
    showSlide(currentSlide);
    
    // Auto play
    startAutoPlay();
    
    // Event listeners
    prevBtn.addEventListener('click', () => {
        previousSlide();
        resetAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });
    
    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    sliderWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    sliderWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            nextSlide();
            resetAutoPlay();
        }
        if (touchEndX > touchStartX + 50) {
            previousSlide();
            resetAutoPlay();
        }
    }
    
    // Pause autoplay on hover
    sliderWrapper.addEventListener('mouseenter', () => {
        stopAutoPlay();
    });
    
    sliderWrapper.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
    
    // Functions
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        slides[index].classList.add('active');
        
        // Update dots
        updateDots(index);
        
        // Animate slide content
        animateSlideContent(slides[index]);
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    function previousSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }
    
    function createDots() {
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot';
            if (i === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                currentSlide = i;
                showSlide(currentSlide);
                resetAutoPlay();
            });
            
            dotsContainer.appendChild(dot);
        }
    }
    
    function updateDots(index) {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function animateSlideContent(slide) {
        const content = slide.querySelector('.slide-content');
        const image = slide.querySelector('.slide-image');
        
        if (content) {
            content.style.animation = 'none';
            setTimeout(() => {
                content.style.animation = 'slideInLeft 0.8s ease-out';
            }, 10);
        }
        
        if (image) {
            image.style.animation = 'none';
            setTimeout(() => {
                image.style.animation = 'slideInRight 0.8s ease-out';
            }, 10);
        }
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            nextSlide();
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }
    
    // CTA Button functionality
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const slideTitle = e.target.closest('.slide').querySelector('.slide-title').textContent;
            
            if (slideTitle.includes('Anime Fest')) {
                // Scroll to events section
                document.querySelector('#events').scrollIntoView({ behavior: 'smooth' });
            } else if (slideTitle.includes('Karya Terbaik')) {
                // Scroll to community section
                document.querySelector('#community').scrollIntoView({ behavior: 'smooth' });
            } else {
                // Scroll to projects section
                document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    const slider = document.querySelector('.slider-container');
    if (!slider) return;
    
    if (e.key === 'ArrowLeft') {
        document.querySelector('.slider-nav.prev').click();
    } else if (e.key === 'ArrowRight') {
        document.querySelector('.slider-nav.next').click();
    }
});