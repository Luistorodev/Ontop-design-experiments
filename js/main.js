// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // Basic navigation interaction for the mockup
    const navItems = document.querySelectorAll(".nav-item");
    
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            // Remove active class from all
            navItems.forEach(nav => nav.classList.remove("active"));
            // Add active class to clicked item
            item.classList.add("active");
        });
    });

    // Make carousels drag-to-scroll for desktop testing
    const sliders = document.querySelectorAll('.accounts-carousel, .offers-carousel');
    let isDragging = false;
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isDragging = false;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
            // Slight delay before resetting isDragging to ensure click event fires correctly with the state
            setTimeout(() => {
                isDragging = false;
            }, 50);
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed factor
            if (Math.abs(walk) > 5) {
                isDragging = true;
            }
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Initial state
        slider.style.cursor = 'grab';
    });

    // Sub-interaction: animate account cards on click
    const accountCards = document.querySelectorAll('.account-card');
    accountCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!isDragging) {
                // Smoothly scroll the card to the center of the carousel
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest', 
                    inline: 'center' 
                });
            }
        });
    });
});
