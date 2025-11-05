// ===== Mobile Navigation Toggle =====
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');

if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
}

// ===== Close Mobile Menu on Link Click =====
document.querySelectorAll('.nav-menu > li > a:not(.dropdown)').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Mobile Dropdown Toggle =====
document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        if (window.innerWidth <= 1024) {
            e.preventDefault();
            const parent = dropdown.parentElement;
            
            document.querySelectorAll('.nav-menu li').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('show');
                }
            });
            
            parent.classList.toggle('show');
        }
    });
});

// ===== Navbar Scroll Effects =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        if (navbar) navbar.classList.add('scrolled');
    } else {
        if (navbar) navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Scroll Progress Bar =====
window.addEventListener('scroll', () => {
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / scrollHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    }
});

// ===== Smooth Scrolling for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            if (navMenu) navMenu.classList.remove('active');
            if (mobileToggle) mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
            
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 70;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Active Link Highlighting =====
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id], div[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    let currentSection = '';
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ===== Close Mobile Menu on Outside Click =====
document.addEventListener('click', (e) => {
    if (navMenu && mobileToggle) {
        if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ===== Home Slider =====
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dots .dot');
const nextBtn = document.querySelector('.nav-arrow.right');
const prevBtn = document.querySelector('.nav-arrow.left');

if (slides.length > 0) {
    let current = 0;
    let timer;

    const showSlide = index => {
        slides.forEach((s, i) => {
            s.classList.toggle('active', i === index);
        });
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
        current = index;
    };

    const nextSlide = () => {
        showSlide((current + 1) % slides.length);
    };
    
    const prevSlide = () => {
        showSlide((current - 1 + slides.length) % slides.length);
    };

    const startAutoSlide = () => { 
        timer = setInterval(nextSlide, 5000); 
    };
    
    const resetAutoSlide = () => { 
        clearInterval(timer); 
        startAutoSlide(); 
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => { 
            nextSlide(); 
            resetAutoSlide(); 
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { 
            prevSlide(); 
            resetAutoSlide(); 
        });
    }
    
    dots.forEach(dot => dot.addEventListener('click', e => {
        showSlide(parseInt(e.target.dataset.slide));
        resetAutoSlide();
    }));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        }
    });

    startAutoSlide();
}

// ===== Achievement & Placement Banners =====
let currentAchievementSlide = 0;
let currentPlacementSlide = 0;

function showAchievementSlide(index) {
    const images = document.querySelectorAll('#nitAchievementBanner .nit-banner-img');
    const dots = document.querySelectorAll('#nitAchievementDots .nit-dot');
    
    if (images.length > 0) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentAchievementSlide = index;
    }
}

function showPlacementSlide(index) {
    const images = document.querySelectorAll('#nitPlacementBanner .nit-banner-img');
    const dots = document.querySelectorAll('#nitPlacementDots .nit-dot');
    
    if (images.length > 0) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        images[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentPlacementSlide = index;
    }
}

// Auto-play achievements
const achievementImages = document.querySelectorAll('#nitAchievementBanner .nit-banner-img');
if (achievementImages.length > 0) {
    setInterval(() => {
        currentAchievementSlide = (currentAchievementSlide + 1) % achievementImages.length;
        showAchievementSlide(currentAchievementSlide);
    }, 4000);
}

// Auto-play placements
const placementImages = document.querySelectorAll('#nitPlacementBanner .nit-banner-img');
if (placementImages.length > 0) {
    setInterval(() => {
        currentPlacementSlide = (currentPlacementSlide + 1) % placementImages.length;
        showPlacementSlide(currentPlacementSlide);
    }, 4500);
}

// ===== Performance Optimization: Debounce =====
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

const debouncedUpdateActive = debounce(updateActiveLink, 100);
window.addEventListener('scroll', debouncedUpdateActive);

// ===== Preload Critical Images =====
function preloadImages(urls) {
    urls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

const criticalImages = [
    './img/campus1-1.png',
    './img/IMG_8886-2048x1365.jpg',
    './img/campus5-1.png',
    './img/2.jpg'
];

preloadImages(criticalImages);

// ===== Console Welcome Message =====
console.log('%c Welcome to Nagpur Institute of Technology! ', 
    'background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); color: white; font-size: 16px; padding: 12px; border-radius: 6px; font-weight: bold;'
);

// ===== Prevent Animation Overload on Low-End Devices =====
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.body.classList.add('reduced-motion');
}

// ===== Page Visibility API - Pause animations when tab is hidden =====
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (timer) clearInterval(timer);
    } else {
        if (slides.length > 0) {
            startAutoSlide();
        }
    }
});

// ===== Scroll Animation System =====
function initScrollAnimations() {
    const scrollElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in, .scroll-rotate-in, .scroll-bounce-in, .scroll-flip-in'
    );

    const elementInView = (el, offset = 120) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (el) => {
        el.classList.add('visible');
    };

    const hideScrollElement = (el) => {
        el.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', debounce(handleScrollAnimation, 100));
    handleScrollAnimation();
}

// Initialize scroll animations after DOM loads
document.addEventListener('DOMContentLoaded', initScrollAnimations);


// vision &mission
  const nitMissionItems = document.querySelectorAll('.nit-mission-item');
        const nitObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    nitMissionItems.forEach((item, index) => {
                        setTimeout(() => item.classList.add('show'), index * 200);
                    });
                    nitObserver.disconnect();
                }
            });
        }, { threshold: 0.2 });
        nitObserver.observe(document.querySelector('#nit-vision'));

















// ===== Scroll Animation System =====
function initScrollAnimations() {
    // Automatically add scroll animation class to all .nit-container and .nit-badge-section elements
    document.querySelectorAll('.nit-container, .nit-badge-section, .nit-vision-section, .nit-footer, .ib-header, .ib-courses-grid, .nitsectionn, .niit-stats, .niit-section-title .niit-section-sub, .niit-facility-grid, .niit-photo-box, .niit-bottom, .niit-hero, .niit-section-title, .niit-section-sub, .niit-tour-btn, .niit-cta ').forEach(el => {
        el.classList.add('scroll-fade-in');
    });

    // Select all elements that should animate
    const scrollElements = document.querySelectorAll(
        '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-zoom-in, .scroll-rotate-in, .scroll-bounce-in, .scroll-flip-in ');

    const elementInView = (el, offset = 120) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) - offset
        );
    };

    const displayScrollElement = (el) => {
        el.classList.add('visible');
    };

    const hideScrollElement = (el) => {
        el.classList.remove('visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // Debounce to improve performance
    window.addEventListener('scroll', debounce(handleScrollAnimation, 100));
    handleScrollAnimation();
}






// Initialize scroll animations after DOM loads
document.addEventListener('DOMContentLoaded', initScrollAnimations);


// courses
   // Ripple effect on click for each card
        document.querySelectorAll('.ib-course-card').forEach(card => {
            card.addEventListener('click', function (e) {
                // create ripple
                const rect = card.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.className = 'ib-ripple';
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + 'px';
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                card.appendChild(ripple);
                // remove after animation
                ripple.addEventListener('animationend', () => ripple.remove());

                // Simple action: show alert or open details - replace with real navigation
                const course = card.getAttribute('data-course') || 'Course';
                // For demo, show a subtle in-page toast instead of alert (non-blocking)
                showToast(course + ' — Explore clicked');
            });
        });

        // minimal toast system
        function showToast(text) {
            let t = document.createElement('div');
            t.textContent = text;
            t.style.position = 'fixed';
            t.style.left = '50%';
            t.style.transform = 'translateX(-50%)';
            t.style.bottom = '28px';
            t.style.background = 'rgba(2,6,23,0.85)';
            t.style.color = '#fff';
            t.style.padding = '10px 18px';
            t.style.borderRadius = '999px';
            t.style.boxShadow = '0 8px 30px rgba(0,0,0,0.6)';
            t.style.zIndex = 9999;
            t.style.fontSize = '.92rem';
            t.style.opacity = '0';
            t.style.transition = 'opacity .25s ease, transform .25s ease';
            document.body.appendChild(t);
            requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(-50%) translateY(-6px)'; });
            setTimeout(() => {
                t.style.opacity = '0';
                t.style.transform = 'translateX(-50%) translateY(0)';
                t.addEventListener('transitionend', () => t.remove(), { once: true });
            }, 1600);
        }

        // Optional: make particles slower/faster on hover (nice micro-interaction)
        document.querySelectorAll('.ib-course-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.querySelectorAll('.ib-particle').forEach((p, i) => {
                    p.style.animationDuration = (3 + i * 0.2) + 's';
                });
            });
            card.addEventListener('mouseleave', () => {
                card.querySelectorAll('.ib-particle').forEach((p, i) => {
                    p.style.animationDuration = (4 + i * 0.2) + 's';
                });
            });
        });

        // Accessibility: allow keyboard activation (Enter/Space) on focused cards
        document.querySelectorAll('.ib-course-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });


        // archievements 
            // University Rankers Carousel
        const rankersTrack = document.getElementById('rankersTrack');
        const rankerCards = Array.from(rankersTrack.children);
        const carouselDots = document.getElementById('carouselDots');
        let currentIndex = 0;
        let carouselInterval;

        // Create dots
        const visibleCards = Math.floor(window.innerWidth / 330);
        const totalSlides = Math.max(1, rankerCards.length - visibleCards + 1);
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            carouselDots.appendChild(dot);
        }

        function updateCarousel() {
            const cardWidth = rankerCards[0].offsetWidth + 30;
            rankersTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
            
            document.querySelectorAll('.carousel-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetCarouselInterval();
        }

        function resetCarouselInterval() {
            clearInterval(carouselInterval);
            carouselInterval = setInterval(nextSlide, 3000);
        }

        carouselInterval = setInterval(nextSlide, 3000);

        // Achievements Rotator
        const achievementsBento = document.getElementById('achievementsBento');
        const achievementProgress = document.getElementById('achievementProgress');
        
        const achievementSets = [
            [
                {img: 'img/arc-plac-img/arc8.jpeg', title: 'National Award 2024'},
                {img: 'img/arc-plac-img/arc2.jpeg', title: 'Best Institution'},
                {img: 'img/arc-plac-img/arc3.jpeg', title: '100% Placements'},
                {img: 'img/arc-plac-img/arc6.jpeg', title: 'Research Excellence'},
                {img: 'img/arc-plac-img/arc5.jpeg', title: 'Innovation Hub'},
                {img: 'img/arc-plac-img/arc6.jpeg', title: 'Sports Champions'},
                {img: 'img/arc-plac-img/arc3.jpeg', title: 'Industry Partners'},
                {img: 'img/arc-plac-img/arc8.jpeg', title: 'Global Recognition'}
            ],
            [
                {img: 'img/arc-plac-img/arc2.jpeg', title: 'Excellence Award'},
                {img: 'img/arc-plac-img/arc4.jpeg', title: 'Green Campus'},
                {img: 'img/arc-plac-img/arc5.jpeg', title: 'Top Ranked'},
                {img: 'img/arc-plac-img/arc3.jpeg', title: 'Tech Leaders'},
                {img: 'img/arc-plac-img/arc4.jpeg', title: 'Future Ready'},
                {img: 'img/arc-plac-img/arc6.jpeg', title: 'Career Success'},
                {img: 'img/arc-plac-img/arc7.jpeg', title: 'Team Spirit'},
                {img: 'img/arc-plac-img/arc4.jpeg', title: 'Smart Learning'}
            ]
        ];

        let currentAchievementSet = 0;

        // Create progress dots
        achievementSets.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('achievement-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => changeAchievementSet(index));
            achievementProgress.appendChild(dot);
        });

        function updateAchievements(setIndex) {
            achievementsBento.classList.add('fading');
            
            setTimeout(() => {
                achievementsBento.innerHTML = '';
                achievementSets[setIndex].forEach(item => {
                    const div = document.createElement('div');
                    div.classList.add('achievement-item');
                    div.innerHTML = `
                        <img src="${item.img}" alt="${item.title}">
                        <div class="achievement-overlay">
                            <h4>${item.title}</h4>
                        </div>
                    `;
                    achievementsBento.appendChild(div);
                });
                
                achievementsBento.classList.remove('fading');
                
                document.querySelectorAll('.achievement-dot').forEach((dot, index) => {
                    dot.classList.toggle('active', index === setIndex);
                });
            }, 400);
        }

        function changeAchievementSet(index) {
            currentAchievementSet = index;
            updateAchievements(currentAchievementSet);
            resetAchievementInterval();
        }

        function rotateAchievements() {
            currentAchievementSet = (currentAchievementSet + 1) % achievementSets.length;
            updateAchievements(currentAchievementSet);
        }

        let achievementInterval = setInterval(rotateAchievements, 5000);

        function resetAchievementInterval() {
            clearInterval(achievementInterval);
            achievementInterval = setInterval(rotateAchievements, 5000);
        }

        // Scroll to Top Button Functionality
        const scrollTopBtn = document.getElementById('scrollTopBtn');

        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        // Smooth scroll to top when clicked
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Responsive carousel update
        window.addEventListener('resize', () => {
            const newVisibleCards = Math.floor(window.innerWidth / 330);
            const newTotalSlides = Math.max(1, rankerCards.length - newVisibleCards + 1);
            
            if (newTotalSlides !== totalSlides) {
                location.reload();
            }
        });