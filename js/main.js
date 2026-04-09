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
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
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
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed factor
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Initial state
        slider.style.cursor = 'grab';
    });
});
