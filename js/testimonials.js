document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonial-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentSlide = 0;
    let slideCount = Math.ceil(slides.length / 3); // 3 slides per view on desktop
    let autoSlideInterval;
    
    // Determine how many slides to show based on screen width
    function getSlidesPerView() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 3;
    }
    
    // Update slide count based on current viewport
    function updateSlideCount() {
        slideCount = Math.ceil(slides.length / getSlidesPerView());
        updateDots();
        goToSlide(currentSlide);
    }
    
    // Update the dots based on current slide count
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index < slideCount) {
                dot.style.display = 'block';
            } else {
                dot.style.display = 'none';
            }
        });
    }
    
    // Go to a specific slide
    function goToSlide(slideIndex) {
        const slidesPerView = getSlidesPerView();
        currentSlide = slideIndex;
        
        // Ensure we don't go beyond the available slides
        if (currentSlide >= slideCount) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slideCount - 1;
        
        // Calculate the translateX value
        const translateX = -currentSlide * (100 / slidesPerView);
        track.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Next slide
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Previous slide
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Start auto sliding
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 3000); // Change every 3 seconds
    }
    
    // Stop auto sliding
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    prevBtn.addEventListener('click', function() {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    });
    
    nextBtn.addEventListener('click', function() {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    });
    
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            stopAutoSlide();
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
            startAutoSlide();
        });
    });
    
    // Pause auto slide on hover
    track.addEventListener('mouseenter', stopAutoSlide);
    track.addEventListener('mouseleave', startAutoSlide);
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            stopAutoSlide();
            prevSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            stopAutoSlide();
            nextSlide();
            startAutoSlide();
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', updateSlideCount);
    
    // Initialize
    updateSlideCount();
    startAutoSlide();
});