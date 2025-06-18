document.addEventListener('DOMContentLoaded', () => {

    // --- Throttling function ---
    // Limits the execution of a function to once every `limit` milliseconds.
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // --- jQuery dependent plugins ---
    // Initialize Owl Carousel
    $(".banner-carousel").owlCarousel({
        items: 1,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        navText: ["&#10094;", "&#10095;"] // Custom navigation arrows
    });

    // Initialize Marquee
    $('.marquee').marquee({
        duration: 15000,
        gap: 50,
        delayBeforeStart: 0,
        direction: 'left',
        duplicated: true,
        pauseOnHover: true
    });


    // --- Vanilla JS for other interactions ---

    // 1. Welcome Video Controls
    const video = document.querySelector('.welcome-video-bg');
    const videoBtn = document.querySelector('.video-control-btn');
    const playIcon = document.querySelector('.icon-play');
    const pauseIcon = document.querySelector('.icon-pause');

    if (video && videoBtn && playIcon && pauseIcon) {
        const updateIcon = () => {
            if (video.paused) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
        };

        videoBtn.addEventListener('click', () => {
            video.paused ? video.play() : video.pause();
        });

        video.addEventListener('play', updateIcon);
        video.addEventListener('pause', updateIcon);
        updateIcon(); // Set initial state
    }

    // 2. Hero Cards Animations & Quotes
    const heroCards = document.querySelectorAll('.hero-card');

    if (heroCards.length > 0) {
        // Function to reveal cards on scroll
        const revealCards = () => {
            const windowHeight = window.innerHeight;
            heroCards.forEach(card => {
                if (!card.classList.contains('visible')) {
                    const rect = card.getBoundingClientRect();
                    // Reveal card when its top is 80px above the bottom of the viewport
                    if (rect.top < windowHeight - 80) {
                        card.classList.add('visible');
                    }
                }
            });
        };

        // Function to set the quote text from data attribute
        const setCardQuotes = () => {
            heroCards.forEach(card => {
                const quoteDiv = card.querySelector('.hero-quote');
                if (quoteDiv) {
                    quoteDiv.textContent = card.dataset.quote || '';
                }
            });
        };

        // Initial setup
        setCardQuotes();
        revealCards();

        // Throttled event listeners for performance
        window.addEventListener('scroll', throttle(revealCards, 200));
        window.addEventListener('resize', throttle(revealCards, 200));
    }
});

