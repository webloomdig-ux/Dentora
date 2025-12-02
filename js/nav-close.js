document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const mobileOffcanvas = document.getElementById('mobileNav');
    let bsOffcanvas = null;
    
    if (mobileOffcanvas) {
        bsOffcanvas = new bootstrap.Offcanvas(mobileOffcanvas);
    }
    
    // Add scroll effect
    function handleScroll() {
        if (window.scrollY > 20) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                // Close mobile menu if open
                if (bsOffcanvas && mobileOffcanvas.classList.contains('show')) {
                    bsOffcanvas.hide();
                }
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300);
                }
            }
        });
    });
    
    // Update active link on scroll
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
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
    
    // Initialize
    window.addEventListener('scroll', function() {
        handleScroll();
        updateActiveLink();
    });
    
    handleScroll(); // Initial call
    updateActiveLink(); // Initial call
});