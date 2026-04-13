// js/main.js
document.addEventListener("DOMContentLoaded", () => {
    // Complex navigation interaction for the mockup with view routing
    const navItems = document.querySelectorAll(".nav-item");
    const viewHome = document.getElementById("view-home");
    const viewCard = document.getElementById("view-card");
    const appContainer = document.querySelector(".app-container");
    
    // Map of nav indexes to views (0 = Home, 1 = Card)
    const viewMap = [viewHome, viewCard, null, null, null];
    let currentIndex = 0; // Starts at Home

    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            // Remove active class from all
            if (item.classList.contains("active")) return;
            
            navItems.forEach(nav => nav.classList.remove("active"));
            item.classList.add("active");

            // Handle routing if view exists
            const nextView = viewMap[index];
            const currentView = viewMap[currentIndex];
            
            if (nextView && currentView && nextView !== currentView) {
                // Scroll to top
                appContainer.scrollTop = 0;

                // Reset animation classes
                currentView.className = "app-content view-pane";
                nextView.className = "app-content view-pane";

                // Direction logic: if going to a higher index, slide right-to-left
                if (index > currentIndex) {
                    currentView.classList.add("slide-out-left");
                    nextView.classList.add("slide-in-right");
                } else {
                    // Sliding back, left-to-right
                    currentView.classList.add("slide-out-right");
                    nextView.classList.add("slide-in-left");
                }
                
                currentIndex = index;

                // After animation completes, clean up classes to keep it robust
                setTimeout(() => {
                    // Only apply if it's still the active view after the timeout
                    if (currentIndex === index) {
                        currentView.className = "app-content view-pane"; // Hide old
                        nextView.className = "app-content view-pane active"; // Show new
                    }
                }, 400); // matches the 0.4s CSS duration
            } else if (nextView === null) {
                // Fallback for unimplemented tabs, just update index
                currentIndex = index;
            }
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
